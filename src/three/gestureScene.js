import { createRenderer } from './renderer.js'
import { bindResize } from './resize.js'
import { makeRafLoop } from '../core/raf.js'
import { loadThree } from './threeLoader.js'

const createHolographicParticles=(THREE,count)=>{
  const positions=new Float32Array(count*3)
  const velocities=new Float32Array(count*3)
  const sizes=new Float32Array(count)
  const opacities=new Float32Array(count)
  const phases=new Float32Array(count)
  const baseRadii=new Float32Array(count)
  
  for(let i=0;i<count;i++){
    const r=Math.pow(Math.random(),0.5)*3.5
    const theta=Math.random()*Math.PI*2
    const phi=Math.acos(Math.random()*2-1)
    
    positions[i*3+0]=r*Math.sin(phi)*Math.cos(theta)
    positions[i*3+1]=r*Math.sin(phi)*Math.sin(theta)
    positions[i*3+2]=r*Math.cos(phi)
    
    velocities[i*3+0]=(Math.random()*2-1)*0.006
    velocities[i*3+1]=(Math.random()*2-1)*0.006
    velocities[i*3+2]=(Math.random()*2-1)*0.006
    
    sizes[i]=0.014+Math.random()*0.010
    opacities[i]=0.35+Math.random()*0.45
    phases[i]=Math.random()*Math.PI*2
    baseRadii[i]=r
  }
  
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3))
  geo.setAttribute('velocity',new THREE.BufferAttribute(velocities,3))
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1))
  geo.setAttribute('opacity',new THREE.BufferAttribute(opacities,1))
  geo.setAttribute('phase',new THREE.BufferAttribute(phases,1))
  geo.setAttribute('baseRadius',new THREE.BufferAttribute(baseRadii,1))
  return geo
}

export const mountGestureScene=({container})=>{
  const canvas=document.createElement('canvas')
  canvas.style.width='100%'
  canvas.style.height='100%'
  container.appendChild(canvas)

  let disposed=false
  let renderer
  let scene
  let camera
  let geo
  let mat
  let points
  let loop
  let unbind=()=>{}

  const count=Math.min(15000,Math.max(6000,Math.floor(window.innerWidth*window.innerHeight/150)))

  let dragging=false
  let px=0
  let py=0
  let yaw=0
  let pitch=-0.15
  let targetYaw=0
  let targetPitch=-0.15
  let pointerNdcX=0
  let pointerNdcY=0

  let vw=window.innerWidth
  let vh=window.innerHeight

  let gestureValue=null
  let gestureSmooth=0.5

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v))

  const onDown=(e)=>{
    dragging=true
    px=e.clientX
    py=e.clientY
  }
  const onUp=()=>{ dragging=false }
  const onMove=(e)=>{
    pointerNdcX=(e.clientX/vw)*2-1
    pointerNdcY=(e.clientY/vh)*2-1
    if(!dragging) return
    const dx=e.clientX-px
    const dy=e.clientY-py
    px=e.clientX
    py=e.clientY
    targetYaw+=dx*0.0035
    targetPitch=clamp(targetPitch+dy*0.0025,-0.9,0.6)
  }

  canvas.addEventListener('pointerdown',onDown,{passive:true})
  window.addEventListener('pointerup',onUp,{passive:true})
  window.addEventListener('pointermove',onMove,{passive:true})

  const setGesture=(v)=>{
    gestureValue=(typeof v==='number' && Number.isFinite(v)) ? clamp(v,0,1) : null
  }

  const ready=(async()=>{
    const THREE=await loadThree()
    if(disposed) return
    renderer=await createRenderer({THREE,canvas,alpha:true,pixelRatioCap:2})
    if(disposed) return
    scene=new THREE.Scene()
    camera=new THREE.PerspectiveCamera(50,1,0.05,100)
    camera.position.set(0,0,8)

    geo=createHolographicParticles(THREE,count)
    
    const vertexShader=`
      attribute float size;
      attribute float opacity;
      attribute float phase;
      attribute float baseRadius;
      varying float vOpacity;
      varying vec3 vColor;
      varying float vDepth;
      uniform float uTime;
      uniform float uGesture;
      void main(){
        vec3 pos=position;
        float t=uTime*0.5+phase;
        
        float baseR=baseRadius;
        float targetR=baseR*(0.4+uGesture*1.2);
        float currentR=length(pos);
        float rRatio=currentR/(baseR+0.001);
        
        vec3 dir=normalize(pos);
        pos=dir*mix(currentR,targetR,0.15);
        
        float swirl=0.08*(1.0+uGesture*0.6);
        pos.x+=sin(t*0.7+phase)*swirl;
        pos.y+=cos(t*0.6+phase*1.3)*swirl;
        pos.z+=sin(t*0.8+phase*0.9)*swirl;
        
        vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
        float dist=length(mvPosition.xyz);
        vDepth=1.0-clamp(dist/12.0,0.0,1.0);
        
        gl_Position=projectionMatrix*mvPosition;
        gl_PointSize=size*(400.0/-mvPosition.z)*(1.0+uGesture*0.4);
        
        float baseOpacity=opacity*vDepth;
        vOpacity=baseOpacity*(0.6+uGesture*0.4);
        
        vec3 baseColor=vec3(0.4,0.65,0.9);
        vec3 accentColor=vec3(0.5,0.8,1.0);
        vColor=mix(baseColor,accentColor,uGesture*0.6);
      }
    `
    
    const fragmentShader=`
      varying float vOpacity;
      varying vec3 vColor;
      varying float vDepth;
      void main(){
        vec2 center=gl_PointCoord-vec2(0.5);
        float dist=length(center);
        if(dist>0.5) discard;
        
        float edge=1.0-smoothstep(0.0,0.5,dist);
        float core=1.0-smoothstep(0.0,0.2,dist);
        
        vec3 finalColor=vColor*(1.0+core*0.3);
        float alpha=edge*vOpacity*(0.8+core*0.2);
        
        gl_FragColor=vec4(finalColor,alpha);
      }
    `
    
    mat=new THREE.ShaderMaterial({
      uniforms:{
        uTime:{value:0},
        uGesture:{value:0.5}
      },
      vertexShader,
      fragmentShader,
      transparent:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending
    })
    
    points=new THREE.Points(geo,mat)
    scene.add(points)

    const rimLight=new THREE.DirectionalLight(new THREE.Color(0.4,0.5,0.7),0.6)
    rimLight.position.set(2,1,3)
    scene.add(rimLight)

    scene.add(new THREE.AmbientLight(new THREE.Color(0.05,0.08,0.12),0.4))

    const v=geo.getAttribute('velocity')
    const p=geo.getAttribute('position')
    const baseRadii=geo.getAttribute('baseRadius')

    loop=makeRafLoop({
      update:(dt,t)=>{
        if(!camera||!points||!mat) return
        const k=1-Math.pow(0.002,dt)
        yaw+=(targetYaw-yaw)*k
        pitch+=(targetPitch-pitch)*k

        const gk=1-Math.pow(0.015,dt)
        const gTarget=gestureValue==null ? 0.5 : gestureValue
        gestureSmooth+=(gTarget-gestureSmooth)*gk
        mat.uniforms.uGesture.value=gestureSmooth
        mat.uniforms.uTime.value=t

        const r=8
        const cx=Math.cos(yaw)*Math.cos(pitch)*r
        const cy=Math.sin(pitch)*r*0.6
        const cz=Math.sin(yaw)*Math.cos(pitch)*r
        camera.position.set(cx,cy,cz)
        camera.lookAt(0,0,0)

        const attractX=pointerNdcX*0.5
        const attractY=-pointerNdcY*0.3
        const attractZ=-1.5

        const pullStrength=0.05*(0.7+gestureSmooth*0.6)
        const swirlStrength=0.08*(0.6+gestureSmooth*0.5)
        const damp=Math.pow(0.88,dt*60)

        const pos=p.array
        const vel=v.array
        const baseR=baseRadii.array

        const baseRadius=3.0
        const minRadius=baseRadius*(0.3+gestureSmooth*0.2)
        const maxRadius=baseRadius*(1.0+gestureSmooth*0.4)

        for(let i=0;i<count;i++){
          const ix=i*3
          let x=pos[ix+0]
          let y=pos[ix+1]
          let z=pos[ix+2]
          let vx=vel[ix+0]
          let vy=vel[ix+1]
          let vz=vel[ix+2]

          const dx=attractX-x
          const dy=attractY-y
          const dz=attractZ-z
          const d2=dx*dx+dy*dy+dz*dz+0.2
          const inv=1/Math.sqrt(d2)

          const pullX=dx*inv*pullStrength
          const pullY=dy*inv*pullStrength
          const pullZ=dz*inv*pullStrength

          const tx=-dz*inv*swirlStrength
          const tz=dx*inv*swirlStrength

          vx=(vx+pullX+tx*0.015)*damp
          vy=(vy+pullY)*damp
          vz=(vz+pullZ+tz*0.015)*damp

          x+=vx
          y+=vy
          z+=vz

          const r=Math.sqrt(x*x+y*y+z*z)
          if(r<minRadius){
            const scale=minRadius/(r+0.001)
            x*=scale
            y*=scale
            z*=scale
            vx*=-0.25
            vy*=-0.25
            vz*=-0.25
          } else if(r>maxRadius){
            const scale=maxRadius/(r+0.001)
            x*=scale
            y*=scale
            z*=scale
            vx*=-0.2
            vy*=-0.2
            vz*=-0.2
          }

          pos[ix+0]=x
          pos[ix+1]=y
          pos[ix+2]=z
          vel[ix+0]=vx
          vel[ix+1]=vy
          vel[ix+2]=vz
        }

        p.needsUpdate=true
        renderer.render(scene,camera)
      }
    })

    unbind=bindResize({renderer,camera,pixelRatioCap:2,onResize:(w,h)=>{
      vw=w
      vh=h
    }})
    loop.start()

    await new Promise((resolve)=>requestAnimationFrame(resolve))
    if(disposed) return
    renderer.render(scene,camera)
  })()

  return {
    ready,
    setGesture,
    dispose(){
      disposed=true
      loop?.stop()
      unbind()
      canvas.removeEventListener('pointerdown',onDown)
      window.removeEventListener('pointerup',onUp)
      window.removeEventListener('pointermove',onMove)
      geo?.dispose()
      mat?.dispose()
      renderer?.dispose()
      canvas.remove()
    }
  }
}
