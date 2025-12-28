import { createRenderer } from './renderer.js'
import { bindResize } from './resize.js'
import { makeRafLoop } from '../core/raf.js'
import { prefersReducedMotion } from '../core/reduceMotion.js'
import { loadThree } from './threeLoader.js'

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
  let mesh
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
  const onMove=(e)=>{
    const x=(e.clientX/vw)*2-1
    const y=(e.clientY/vh)*2-1
    targetX=x
    targetY=y
  }
  window.addEventListener('pointermove',onMove,{passive:true})

  const reduced=prefersReducedMotion()
  const ready=(async()=>{
    const THREE=await loadThree()
    if(disposed) return
    renderer=await createRenderer({THREE,canvas,alpha:true,pixelRatioCap:2})
    if(disposed) return
    scene=new THREE.Scene()
    camera=new THREE.PerspectiveCamera(45,1,0.1,40)
    camera.position.set(0,0,6)

    geo=new THREE.IcosahedronGeometry(1.2,1)
    mat=new THREE.MeshStandardMaterial({
      color:new THREE.Color(0.68,0.73,0.85),
      roughness:0.55,
      metalness:0.18,
      emissive:new THREE.Color(0.02,0.03,0.05),
      flatShading:true
    })
    mesh=new THREE.Mesh(geo,mat)
    mesh.position.x=1.25
    scene.add(mesh)

    const light1=new THREE.DirectionalLight(new THREE.Color(0.92,0.92,1.0),1.0)
    light1.position.set(2.8,2.1,3.8)
    scene.add(light1)

    const light2=new THREE.DirectionalLight(new THREE.Color(0.55,0.65,0.9),0.55)
    light2.position.set(-3.2,-1.4,2.8)
    scene.add(light2)

    const ambient=new THREE.AmbientLight(new THREE.Color(0.12,0.14,0.18),0.9)
    scene.add(ambient)

    loop=makeRafLoop({
      update:(dt,t)=>{
        if(!mesh) return
        const hk=1-Math.pow(0.01,dt)
        hover+=(hoverTarget-hover)*hk
        const pulse=1+hover*0.22+(1-hover)*0.04*Math.sin(t*1.2)
        const s=Math.min(1.28,Math.max(0.88,pulse))
        mesh.scale.setScalar(s)
        mat.emissiveIntensity=0.55+hover*0.85
        if(!reduced){
          mesh.rotation.y+=dt*(0.22+hover*0.55)
          mesh.rotation.x+=dt*(0.14+hover*0.35)
        }
        const k=1-Math.pow(0.001,dt)
        mesh.rotation.y+=(targetX*0.35-mesh.rotation.y)*k
        mesh.rotation.x+=(-targetY*0.18-mesh.rotation.x)*k
        renderer.render(scene,camera)
      }
    })

    unbind=bindResize({renderer,camera,pixelRatioCap:2,onResize:(w,h)=>{
      vw=w
      vh=h
      const s=Math.min(w,h)
      mesh.scale.setScalar(Math.max(0.92,Math.min(1.18,s/900)))
    }})

    loop.start()

    await new Promise((resolve)=>requestAnimationFrame(resolve))
    if(disposed) return
    renderer.render(scene,camera)
  })()

  return {
    ready,
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
