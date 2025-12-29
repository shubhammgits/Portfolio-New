import { createRenderer } from './renderer.js'
import { bindResize } from './resize.js'
import { makeRafLoop } from '../core/raf.js'
import { prefersReducedMotion } from '../core/reduceMotion.js'
import { loadThree } from './threeLoader.js'

const createParticleGeometry=(THREE,count)=>{
  const positions=new Float32Array(count*3)
  const velocities=new Float32Array(count*3)
  const sizes=new Float32Array(count)
  const opacities=new Float32Array(count)
  const phases=new Float32Array(count)
  
  for(let i=0;i<count;i++){
    const r=Math.pow(Math.random(),0.6)*3.2
    const theta=Math.random()*Math.PI*2
    const phi=Math.acos(Math.random()*2-1)
    
    positions[i*3+0]=r*Math.sin(phi)*Math.cos(theta)
    positions[i*3+1]=r*Math.sin(phi)*Math.sin(theta)
    positions[i*3+2]=r*Math.cos(phi)
    
    velocities[i*3+0]=(Math.random()*2-1)*0.008
    velocities[i*3+1]=(Math.random()*2-1)*0.008
    velocities[i*3+2]=(Math.random()*2-1)*0.008
    
    sizes[i]=0.012+Math.random()*0.008
    opacities[i]=0.3+Math.random()*0.4
    phases[i]=Math.random()*Math.PI*2
  }
  
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3))
  geo.setAttribute('velocity',new THREE.BufferAttribute(velocities,3))
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1))
  geo.setAttribute('opacity',new THREE.BufferAttribute(opacities,1))
  geo.setAttribute('phase',new THREE.BufferAttribute(phases,1))
  return geo
}

export const mountHomeScene=({container})=>{
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

  let vw=window.innerWidth
  let vh=window.innerHeight

  let hoverTarget=0
  let hover=0
  const onEnter=()=>{ hoverTarget=1 }
  const onLeave=()=>{ hoverTarget=0 }
  canvas.addEventListener('pointerenter',onEnter,{passive:true})
  canvas.addEventListener('pointerleave',onLeave,{passive:true})

  let targetX=0
  let targetY=0
  let scrollProgress=0
  const onMove=(e)=>{
    const x=(e.clientX/vw)*2-1
    const y=(e.clientY/vh)*2-1
    targetX=x
    targetY=y
  }
  window.addEventListener('pointermove',onMove,{passive:true})

  const setScrollProgress=(p)=>{
    scrollProgress=Math.max(0,Math.min(1,p))
  }

  const reduced=prefersReducedMotion()
  const ready=(async()=>{
    const THREE=await loadThree()
    if(disposed) return
    renderer=await createRenderer({THREE,canvas,alpha:true,pixelRatioCap:2})
    if(disposed) return
    scene=new THREE.Scene()
    camera=new THREE.PerspectiveCamera(50,1,0.05,50)
    camera.position.set(0,0,8)

    const count=Math.min(12000,Math.max(5000,Math.floor(window.innerWidth*window.innerHeight/180)))
    geo=createParticleGeometry(THREE,count)
    
    const vertexShader=`
      attribute float size;
      attribute float opacity;
      attribute float phase;
      varying float vOpacity;
      varying vec3 vColor;
      uniform float uTime;
      uniform float uHover;
      uniform float uScroll;
      void main(){
        vec3 pos=position;
        float t=uTime*0.4+phase;
        pos.x+=sin(t*0.8+phase)*0.12;
        pos.y+=cos(t*0.6+phase*1.2)*0.12;
        pos.z+=sin(t*0.7+phase*0.8)*0.12;
        
        float dist=length(pos);
        float depth=1.0-clamp(dist/4.0,0.0,1.0);
        
        vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
        gl_Position=projectionMatrix*mvPosition;
        gl_PointSize=size*(300.0/-mvPosition.z)*(1.0+uHover*0.3+uScroll*0.2);
        
        vOpacity=opacity*depth*(0.6+uHover*0.3);
        vColor=mix(vec3(0.4,0.5,0.7),vec3(0.6,0.75,0.95),uHover*0.5+uScroll*0.3);
      }
    `
    
    const fragmentShader=`
      varying float vOpacity;
      varying vec3 vColor;
      void main(){
        vec2 center=gl_PointCoord-vec2(0.5);
        float dist=length(center);
        if(dist>0.5) discard;
        float alpha=1.0-smoothstep(0.0,0.5,dist);
        gl_FragColor=vec4(vColor,alpha*vOpacity);
      }
    `
    
    mat=new THREE.ShaderMaterial({
      uniforms:{
        uTime:{value:0},
        uHover:{value:0},
        uScroll:{value:0}
      },
      vertexShader,
      fragmentShader,
      transparent:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending
    })
    
    points=new THREE.Points(geo,mat)
    scene.add(points)

    const rimLight=new THREE.DirectionalLight(new THREE.Color(0.5,0.6,0.85),0.8)
    rimLight.position.set(2,1,3)
    scene.add(rimLight)

    const fillLight=new THREE.DirectionalLight(new THREE.Color(0.3,0.35,0.5),0.4)
    fillLight.position.set(-2,-1,2)
    scene.add(fillLight)

    scene.add(new THREE.AmbientLight(new THREE.Color(0.08,0.1,0.15),0.6))

    const v=geo.getAttribute('velocity')
    const p=geo.getAttribute('position')
    const phases=geo.getAttribute('phase')

    loop=makeRafLoop({
      update:(dt,t)=>{
        if(!points||!mat) return
        const hk=1-Math.pow(0.008,dt)
        hover+=(hoverTarget-hover)*hk
        
        mat.uniforms.uTime.value=t
        mat.uniforms.uHover.value=hover
        mat.uniforms.uScroll.value=scrollProgress

        const pos=p.array
        const vel=v.array
        const phase=phases.array

        const attractX=targetX*1.2
        const attractY=-targetY*0.8
        const attractZ=-2+scrollProgress*1.5

        for(let i=0;i<count;i++){
          const ix=i*3
          let x=pos[ix+0]
          let y=pos[ix+1]
          let z=pos[ix+2]

          const dx=attractX-x
          const dy=attractY-y
          const dz=attractZ-z
          const d2=dx*dx+dy*dy+dz*dz+0.3
          const inv=1/Math.sqrt(d2)

          const pull=0.04*(1+hover*0.5)
          vel[ix+0]+=dx*inv*pull
          vel[ix+1]+=dy*inv*pull
          vel[ix+2]+=dz*inv*pull

          const damp=Math.pow(0.92,dt*60)
          vel[ix+0]*=damp
          vel[ix+1]*=damp
          vel[ix+2]*=damp

          x+=vel[ix+0]
          y+=vel[ix+1]
          z+=vel[ix+2]

          const r=length(x,y,z)
          const maxR=3.5+scrollProgress*0.8
          if(r>maxR){
            const scale=maxR/r
            x*=scale
            y*=scale
            z*=scale
            vel[ix+0]*=-0.3
            vel[ix+1]*=-0.3
            vel[ix+2]*=-0.3
          }

          pos[ix+0]=x
          pos[ix+1]=y
          pos[ix+2]=z
        }

        p.needsUpdate=true

        if(!reduced){
          camera.position.x+=(targetX*0.4-camera.position.x)*(1-Math.pow(0.01,dt))
          camera.position.y+=(-targetY*0.3-camera.position.y)*(1-Math.pow(0.01,dt))
          camera.position.z=8-scrollProgress*2
        }
        camera.lookAt(0,0,0)

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
    setScrollProgress,
    dispose(){
      disposed=true
      window.removeEventListener('pointermove',onMove)
      canvas.removeEventListener('pointerenter',onEnter)
      canvas.removeEventListener('pointerleave',onLeave)
      loop?.stop()
      unbind()
      geo?.dispose()
      mat?.dispose()
      renderer?.dispose()
      canvas.remove()
    }
  }
}

function length(x,y,z){
  return Math.sqrt(x*x+y*y+z*z)
}
