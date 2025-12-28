import { createRenderer } from './renderer.js'
import { makeRafLoop } from '../core/raf.js'
import { loadThree } from './threeLoader.js'

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
  let mesh
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
    camera=new THREE.PerspectiveCamera(38,1,0.1,20)
    camera.position.set(0,0,5)

    geo=new THREE.IcosahedronGeometry(1.05,1)
    mat=new THREE.MeshBasicMaterial({
      color:new THREE.Color(0.90,0.92,0.98),
      wireframe:true,
      transparent:true,
      opacity:0.55
    })
    mesh=new THREE.Mesh(geo,mat)
    scene.add(mesh)

    scheduleSize()

    loop=makeRafLoop({
      update:(dt,t)=>{
        if(!mesh) return
        mesh.rotation.y+=dt*0.6
        mesh.rotation.x+=dt*0.35
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
