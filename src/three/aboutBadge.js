import * as THREE from 'three'
import { createRenderer } from './renderer.js'
import { makeRafLoop } from '../core/raf.js'

export const mountAboutBadge=({container})=>{
  const canvas=document.createElement('canvas')
  canvas.style.width='100%'
  canvas.style.height='100%'
  container.appendChild(canvas)

  const renderer=createRenderer({canvas,alpha:true})
  const scene=new THREE.Scene()
  const camera=new THREE.PerspectiveCamera(38,1,0.1,20)
  camera.position.set(0,0,5)

  const geo=new THREE.IcosahedronGeometry(1.05,1)
  const mat=new THREE.MeshBasicMaterial({
    color:new THREE.Color(0.90,0.92,0.98),
    wireframe:true,
    transparent:true,
    opacity:0.55
  })
  const mesh=new THREE.Mesh(geo,mat)
  scene.add(mesh)

  const size=()=>{
    const r=container.getBoundingClientRect()
    const w=Math.max(1,Math.floor(r.width))
    const h=Math.max(1,Math.floor(r.height))
    renderer.setSize(w,h,false)
    camera.aspect=w/h
    camera.updateProjectionMatrix()
  }

  size()

  const loop=makeRafLoop({
    update:(dt,t)=>{
      mesh.rotation.y+=dt*0.6
      mesh.rotation.x+=dt*0.35
      renderer.render(scene,camera)
    }
  })

  let io
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

  window.addEventListener('resize',size,{passive:true})

  const ready=new Promise((resolve)=>{
    requestAnimationFrame(()=>{
      size()
      renderer.render(scene,camera)
      resolve()
    })
  })

  return {
    ready,
    dispose(){
      io?.disconnect()
      loop.stop()
      window.removeEventListener('resize',size)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }
}
