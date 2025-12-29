import { createRenderer } from './renderer.js'
import { makeRafLoop } from '../core/raf.js'
import { loadThree } from './threeLoader.js'

const createNoiseField=(THREE,count)=>{
  const positions=new Float32Array(count*3)
  const sizes=new Float32Array(count)
  const opacities=new Float32Array(count)
  
  for(let i=0;i<count;i++){
    const r=Math.pow(Math.random(),0.7)*1.8
    const theta=Math.random()*Math.PI*2
    const phi=Math.acos(Math.random()*2-1)
    
    positions[i*3+0]=r*Math.sin(phi)*Math.cos(theta)
    positions[i*3+1]=r*Math.sin(phi)*Math.sin(theta)
    positions[i*3+2]=r*Math.cos(phi)
    
    sizes[i]=0.008+Math.random()*0.006
    opacities[i]=0.2+Math.random()*0.3
  }
  
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3))
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1))
  geo.setAttribute('opacity',new THREE.BufferAttribute(opacities,1))
  return geo
}

export const mountAboutBadge=({container})=>{
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
  let io
  let resizeRaf=0

  const scheduleSize=()=>{
    if(resizeRaf) return
    resizeRaf=requestAnimationFrame(()=>{
      resizeRaf=0
      if(!renderer||!camera) return
      const r=container.getBoundingClientRect()
      const w=Math.max(1,Math.floor(r.width))
      const h=Math.max(1,Math.floor(r.height))
      renderer.setSize(w,h,false)
      camera.aspect=w/h
      camera.updateProjectionMatrix()
    })
  }

  const ready=(async()=>{
    const THREE=await loadThree()
    if(disposed) return
    renderer=await createRenderer({THREE,canvas,alpha:true,pixelRatioCap:2})
    if(disposed) return
    scene=new THREE.Scene()
    camera=new THREE.PerspectiveCamera(40,1,0.1,20)
    camera.position.set(0,0,4.5)

    const count=800
    geo=createNoiseField(THREE,count)
    
    const vertexShader=`
      attribute float size;
      attribute float opacity;
      varying float vOpacity;
      varying vec3 vColor;
      uniform float uTime;
      void main(){
        vec3 pos=position;
        float t=uTime*0.3;
        pos.x+=sin(t+position.y*2.0)*0.08;
        pos.y+=cos(t*0.8+position.x*1.5)*0.08;
        pos.z+=sin(t*0.6+position.z*2.0)*0.08;
        
        vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
        gl_Position=projectionMatrix*mvPosition;
        gl_PointSize=size*(200.0/-mvPosition.z);
        
        vOpacity=opacity;
        vColor=vec3(0.45,0.55,0.75);
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
        gl_FragColor=vec4(vColor,alpha*vOpacity*0.6);
      }
    `
    
    mat=new THREE.ShaderMaterial({
      uniforms:{uTime:{value:0}},
      vertexShader,
      fragmentShader,
      transparent:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending
    })
    
    points=new THREE.Points(geo,mat)
    scene.add(points)

    scheduleSize()

    loop=makeRafLoop({
      update:(dt,t)=>{
        if(!points||!mat) return
        mat.uniforms.uTime.value=t
        points.rotation.y+=dt*0.15
        points.rotation.x+=dt*0.08
        renderer.render(scene,camera)
      }
    })

    if('IntersectionObserver' in window){
      io=new IntersectionObserver((entries)=>{
        const on=entries.some(e=>e.isIntersecting)
        if(on) loop.start()
        else loop.stop()
      },{root:null,threshold:0.1})
      io.observe(container)
    } else {
      loop.start()
    }

    window.addEventListener('resize',scheduleSize,{passive:true})

    await new Promise((resolve)=>requestAnimationFrame(resolve))
    if(disposed) return
    scheduleSize()
    renderer.render(scene,camera)
  })()

  return {
    ready,
    dispose(){
      disposed=true
      if(resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf=0
      io?.disconnect()
      loop?.stop()
      window.removeEventListener('resize',scheduleSize)
      geo?.dispose()
      mat?.dispose()
      renderer?.dispose()
      canvas.remove()
    }
  }
}
