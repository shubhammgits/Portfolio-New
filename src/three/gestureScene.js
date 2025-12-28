import * as THREE from 'three'
import { createRenderer } from './renderer.js'
import { bindResize } from './resize.js'
import { makeRafLoop } from '../core/raf.js'

const makeParticles=(count)=>{
  const positions=new Float32Array(count*3)
  const velocities=new Float32Array(count*3)
  for(let i=0;i<count;i++){
    const a=Math.random()*Math.PI*2
    const r=Math.pow(Math.random(),0.45)*2.8
    const y=(Math.random()*2-1)*1.6
    positions[i*3+0]=Math.cos(a)*r
    positions[i*3+1]=y
    positions[i*3+2]=Math.sin(a)*r
    velocities[i*3+0]=(Math.random()*2-1)*0.02
    velocities[i*3+1]=(Math.random()*2-1)*0.02
    velocities[i*3+2]=(Math.random()*2-1)*0.02
  }
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3))
  geo.setAttribute('velocity',new THREE.BufferAttribute(velocities,3))
  return geo
}

export const mountGestureScene=({container})=>{
  const canvas=document.createElement('canvas')
  canvas.style.width='100%'
  canvas.style.height='100%'
  container.appendChild(canvas)

  const renderer=createRenderer({canvas,alpha:true})
  const scene=new THREE.Scene()
  const camera=new THREE.PerspectiveCamera(55,1,0.05,80)
  camera.position.set(0,0.3,7)

  const count=Math.min(9000,Math.max(3500,Math.floor(window.innerWidth*window.innerHeight/220)))
  const geo=makeParticles(count)
  const mat=new THREE.PointsMaterial({
    color:new THREE.Color(0.74,0.80,0.98),
    size:0.016,
    sizeAttenuation:true,
    transparent:true,
    opacity:0.72,
    depthWrite:false
  })
  const points=new THREE.Points(geo,mat)
  scene.add(points)

  const glowGeo=new THREE.SphereGeometry(1.45,24,16)
  const glowMat=new THREE.MeshStandardMaterial({
    color:new THREE.Color(0.20,0.22,0.28),
    roughness:0.75,
    metalness:0.18,
    transparent:true,
    opacity:0.36
  })
  const core=new THREE.Mesh(glowGeo,glowMat)
  scene.add(core)

  const key=new THREE.DirectionalLight(new THREE.Color(0.92,0.92,1.0),1.1)
  key.position.set(3,2,4)
  scene.add(key)

  const fill=new THREE.DirectionalLight(new THREE.Color(0.55,0.65,0.9),0.55)
  fill.position.set(-3,-1,3)
  scene.add(fill)

  scene.add(new THREE.AmbientLight(new THREE.Color(0.10,0.12,0.18),0.85))

  let dragging=false
  let px=0
  let py=0
  let yaw=0
  let pitch=-0.1
  let targetYaw=0
  let targetPitch=-0.1
  let pointerNdcX=0
  let pointerNdcY=0

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v))

  const onDown=(e)=>{
    dragging=true
    px=e.clientX
    py=e.clientY
  }
  const onUp=()=>{ dragging=false }
  const onMove=(e)=>{
    pointerNdcX=(e.clientX/window.innerWidth)*2-1
    pointerNdcY=(e.clientY/window.innerHeight)*2-1
    if(!dragging) return
    const dx=e.clientX-px
    const dy=e.clientY-py
    px=e.clientX
    py=e.clientY
    targetYaw+=dx*0.004
    targetPitch=clamp(targetPitch+dy*0.003,-0.95,0.55)
  }

  canvas.addEventListener('pointerdown',onDown,{passive:true})
  window.addEventListener('pointerup',onUp,{passive:true})
  window.addEventListener('pointermove',onMove,{passive:true})

  const v=geo.getAttribute('velocity')
  const p=geo.getAttribute('position')

  const loop=makeRafLoop({
    update:(dt,t)=>{
      const k=1-Math.pow(0.001,dt)
      yaw+=(targetYaw-yaw)*k
      pitch+=(targetPitch-pitch)*k

      const r=7
      const cx=Math.cos(yaw)*Math.cos(pitch)*r
      const cy=Math.sin(pitch)*r*0.55
      const cz=Math.sin(yaw)*Math.cos(pitch)*r
      camera.position.set(cx,cy,cz)
      camera.lookAt(0,0,0)

      const ax=pointerNdcX*0.42
      const ay=-pointerNdcY*0.24
      core.position.x+=(ax-core.position.x)*k
      core.position.y+=(ay-core.position.y)*k

      const swirl=0.55
      const pull=0.06
      const damp=Math.pow(0.04,dt)
      const pos=p.array
      const vel=v.array

      for(let i=0;i<count;i++){
        const ix=i*3
        let x=pos[ix+0]
        let y=pos[ix+1]
        let z=pos[ix+2]
        let vx=vel[ix+0]
        let vy=vel[ix+1]
        let vz=vel[ix+2]

        const dx=ax-x
        const dy=ay-y
        const dz=-z
        const d2=dx*dx+dy*dy+dz*dz+0.45
        const inv=1/Math.sqrt(d2)

        const tx=-dz*inv*swirl
        const tz=dx*inv*swirl

        vx=(vx+dx*inv*pull+tx*0.02)*damp
        vy=(vy+dy*inv*pull)*damp
        vz=(vz+dz*inv*pull+tz*0.02)*damp

        x+=vx
        y+=vy
        z+=vz

        const rr=x*x+z*z
        const maxR=3.2
        if(rr>maxR*maxR){
          const invr=maxR/Math.sqrt(rr)
          x*=invr
          z*=invr
          vx*=-0.2
          vz*=-0.2
        }
        const maxY=1.9
        if(y>maxY){ y=maxY; vy*=-0.25 }
        if(y<-maxY){ y=-maxY; vy*=-0.25 }

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

  const unbind=bindResize({renderer,camera})
  loop.start()

  return {
    ready:new Promise((resolve)=>{
      requestAnimationFrame(()=>{
        renderer.render(scene,camera)
        resolve()
      })
    }),
    dispose(){
      loop.stop()
      unbind()
      canvas.removeEventListener('pointerdown',onDown)
      window.removeEventListener('pointerup',onUp)
      window.removeEventListener('pointermove',onMove)
      glowGeo.dispose()
      glowMat.dispose()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }
}
