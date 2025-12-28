import * as THREE from 'three'
import { createRenderer } from './renderer.js'
import { bindResize } from './resize.js'
import { makeRafLoop } from '../core/raf.js'
import { prefersReducedMotion } from '../core/reduceMotion.js'

export const mountHomeScene=({container})=>{
  const canvas=document.createElement('canvas')
  canvas.style.width='100%'
  canvas.style.height='100%'
  container.appendChild(canvas)

  const renderer=createRenderer({canvas,alpha:true})
  const scene=new THREE.Scene()
  const camera=new THREE.PerspectiveCamera(45,1,0.1,40)
  camera.position.set(0,0,6)

  const geo=new THREE.IcosahedronGeometry(1.2,1)
  const mat=new THREE.MeshStandardMaterial({
    color:new THREE.Color(0.68,0.73,0.85),
    roughness:0.55,
    metalness:0.18,
    emissive:new THREE.Color(0.02,0.03,0.05),
    flatShading:true
  })
  const mesh=new THREE.Mesh(geo,mat)
  scene.add(mesh)

  const light1=new THREE.DirectionalLight(new THREE.Color(0.92,0.92,1.0),1.0)
  light1.position.set(2.8,2.1,3.8)
  scene.add(light1)

  const light2=new THREE.DirectionalLight(new THREE.Color(0.55,0.65,0.9),0.55)
  light2.position.set(-3.2,-1.4,2.8)
  scene.add(light2)

  const ambient=new THREE.AmbientLight(new THREE.Color(0.12,0.14,0.18),0.9)
  scene.add(ambient)

  let targetX=0
  let targetY=0
  const onMove=(e)=>{
    const x=(e.clientX/window.innerWidth)*2-1
    const y=(e.clientY/window.innerHeight)*2-1
    targetX=x
    targetY=y
  }
  window.addEventListener('pointermove',onMove,{passive:true})

  const reduced=prefersReducedMotion()
  const loop=makeRafLoop({
    update:(dt,t)=>{
      if(!reduced){
        mesh.rotation.y+=dt*0.22
        mesh.rotation.x+=dt*0.14
      }
      const k=1-Math.pow(0.001,dt)
      mesh.rotation.y+=(targetX*0.35-mesh.rotation.y)*k
      mesh.rotation.x+=(-targetY*0.18-mesh.rotation.x)*k
      renderer.render(scene,camera)
    }
  })

  const unbind=bindResize({renderer,camera,onResize:(w,h)=>{
    const s=Math.min(w,h)
    mesh.scale.setScalar(Math.max(0.92,Math.min(1.18,s/900)))
  }})

  loop.start()

  return {
    dispose(){
      loop.stop()
      unbind()
      window.removeEventListener('pointermove',onMove)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }
}
