import { createRenderer } from './renderer.js'
import { bindResize } from './resize.js'
import { makeRafLoop } from '../core/raf.js'
import { prefersReducedMotion } from '../core/reduceMotion.js'
import { loadThree } from './threeLoader.js'

const createParticleSpriteTexture=(THREE)=>{
  const canvas=document.createElement('canvas')
  canvas.width=64
  canvas.height=64
  const ctx=canvas.getContext('2d')

  const g=ctx.createRadialGradient(32,32,0,32,32,32)
  g.addColorStop(0.0,'rgba(255, 235, 220, 0.95)')
  g.addColorStop(0.12,'rgba(255, 190, 120, 0.90)')
  g.addColorStop(0.30,'rgba(255, 155, 70, 0.80)')
  g.addColorStop(0.58,'rgba(255, 120, 30, 0.24)')
  g.addColorStop(1.0,'rgba(0,0,0,0)')

  ctx.fillStyle=g
  ctx.fillRect(0,0,64,64)

  const tex=new THREE.CanvasTexture(canvas)
  tex.colorSpace=THREE.SRGBColorSpace
  tex.needsUpdate=true
  return tex
}

const createParticleSphere=(THREE,{count=15000,radius=1.85,thickness=0.22}={})=>{
  const geo=new THREE.BufferGeometry()
  geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(count*3),3))
  geo.setAttribute('color',new THREE.BufferAttribute(new Float32Array(count*3),3))

  const pos=geo.attributes.position.array
  const cols=geo.attributes.color.array
  const color=new THREE.Color()

  for(let i=0;i<count;i++){
    const t=Math.random()*Math.PI*2
    const u=Math.random()*2-1
    const r=radius+Math.random()*thickness

    const phi=Math.acos(u)
    const x=r*Math.sin(phi)*Math.cos(t)
    const y=r*Math.sin(phi)*Math.sin(t)
    const z=r*u

    pos[i*3+0]=x
    pos[i*3+1]=y
    pos[i*3+2]=z

    const heat=THREE.MathUtils.clamp(1.0-(r-radius)/thickness,0,1)
    const hue=0.055+(1.0-heat)*0.015
    const sat=1.0
    const light=0.42+heat*0.18
    color.setHSL(hue,sat,light)

    cols[i*3+0]=color.r
    cols[i*3+1]=color.g
    cols[i*3+2]=color.b
  }

  geo.attributes.position.needsUpdate=true
  geo.attributes.color.needsUpdate=true
  return geo
}

export const mountHomeScene=({container})=>{
  const canvas=document.createElement('canvas')
  canvas.style.width='100%'
  canvas.style.height='100%'
  container.appendChild(canvas)

  const hero=container.closest?.('.hero')
  const nameEl=hero?.querySelector?.('.h1')||null

  let disposed=false
  let renderer
  let scene
  let camera
  let geo
  let mat
  let points
  let spriteTex
  let loop
  let unbind=()=>{}

  let vw=window.innerWidth
  let vh=window.innerHeight

  let scrollProgress=0

  let lastAlignAt=0
  const clamp01=(v)=>Math.max(0,Math.min(1,v))
  const smoothstep=(edge0,edge1,x)=>{
    const t=clamp01((x-edge0)/(edge1-edge0))
    return t*t*(3-2*t)
  }

  const ALIGN_Y_OFFSET_PX=64
  const SPHERE_SCALE=0.6

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
    camera=new THREE.PerspectiveCamera(50,1,0.1,2000)
    camera.position.set(0,0,5.4)

    const count=15000
    geo=createParticleSphere(THREE,{count,radius:1.85,thickness:0.22})
    spriteTex=createParticleSpriteTexture(THREE)
    mat=new THREE.PointsMaterial({
      size:0.05,
      map:spriteTex,
      transparent:true,
      opacity:0.92,
      alphaTest:0.01,
      blending:THREE.AdditiveBlending,
      depthWrite:false,
      vertexColors:true
    })

    points=new THREE.Points(geo,mat)
  points.scale.setScalar(SPHERE_SCALE)
    scene.add(points)

    loop=makeRafLoop({
      update:(dt,t)=>{
        if(!points) return

        const fade=clamp01(1-scrollProgress)
        canvas.style.opacity=String(0.88*fade)
        const blurAmt=8*smoothstep(0.15,1.0,scrollProgress)
        canvas.style.filter=blurAmt>0.01?`blur(${blurAmt.toFixed(2)}px)`:''

        if(nameEl && t-lastAlignAt>0.12){
          lastAlignAt=t
          const containerRect=container.getBoundingClientRect()
          const nameRect=nameEl.getBoundingClientRect()
          const nameCenterY=nameRect.top+nameRect.height*0.5
          const yInContainer=(nameCenterY+ALIGN_Y_OFFSET_PX-containerRect.top)/Math.max(1,containerRect.height)
          const yNdc=1-(yInContainer*2)

          const distance=camera.position.z-points.position.z
          const halfFovRad=(camera.fov*Math.PI/180)*0.5
          const viewHalfHeight=Math.tan(halfFovRad)*distance
          points.position.y=yNdc*viewHalfHeight
        }

        if(!reduced){
          points.rotation.y+=dt*0.072
          points.rotation.x+=dt*0.02
        }

        points.position.z=-scrollProgress*0.3
        renderer.render(scene,camera)
      }
    })

    unbind=bindResize({renderer,camera,element:container,pixelRatioCap:2,onResize:(w,h)=>{
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
      loop?.stop()
      unbind()
      geo?.dispose()
      mat?.dispose()
      spriteTex?.dispose()
      renderer?.dispose()
      canvas.remove()
    }
  }
}
