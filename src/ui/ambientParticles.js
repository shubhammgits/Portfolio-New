import { makeRafLoop } from '../core/raf.js'
import { prefersReducedMotion } from '../core/reduceMotion.js'

const clamp=(v,min,max)=>Math.max(min,Math.min(max,v))

export const mountAmbientParticles=({root})=>{
  if(typeof document==='undefined') return {dispose:()=>{}}
  if(prefersReducedMotion()) return {dispose:()=>{}}

  const canvas=document.createElement('canvas')
  canvas.className='ambient-particles'
  canvas.setAttribute('aria-hidden','true')
  const ctx=canvas.getContext('2d',{alpha:true})
  if(!ctx) return {dispose:()=>{}}

  let w=1,h=1,dpr=1
  let mouseX=0.5,mouseY=0.5
  let hasMouse=false

  const particles=[]
  const baseCount=56

  const resize=()=>{
    const rect={w:window.innerWidth,h:window.innerHeight}
    dpr=clamp(window.devicePixelRatio||1,1,2)
    w=Math.max(1,Math.floor(rect.w*dpr))
    h=Math.max(1,Math.floor(rect.h*dpr))
    canvas.width=w
    canvas.height=h
    canvas.style.width=rect.w+'px'
    canvas.style.height=rect.h+'px'

    const area=(rect.w*rect.h)/1000000
    const target=Math.round(baseCount*clamp(area,0.65,1.65))
    while(particles.length<target) particles.push(spawn())
    while(particles.length>target) particles.pop()
  }

  const spawn=()=>{
    const z=Math.random()
    return {
      x:Math.random(),
      y:Math.random(),
      vx:(Math.random()*2-1)*(0.006+z*0.014),
      vy:(Math.random()*2-1)*(0.006+z*0.014),
      r:(0.8+z*2.6),
      a:(0.10+z*0.18),
      z
    }
  }

  const onMove=(e)=>{
    hasMouse=true
    mouseX=clamp(e.clientX/(window.innerWidth||1),0,1)
    mouseY=clamp(e.clientY/(window.innerHeight||1),0,1)
  }

  const draw=(dt)=>{
    ctx.clearRect(0,0,w,h)

    const mx=hasMouse ? mouseX : 0.5
    const my=hasMouse ? mouseY : 0.35

    const driftX=(mx-0.5)*0.06
    const driftY=(my-0.5)*0.06

    const nowGlowX=(mx-0.5)*0.18
    const nowGlowY=(my-0.5)*0.18

    // soft vignette glow
    ctx.save()
    ctx.globalCompositeOperation='lighter'
    const gx=w*(0.5+nowGlowX)
    const gy=h*(0.35+nowGlowY)
    const grad=ctx.createRadialGradient(gx,gy,0,gx,gy,Math.max(w,h)*0.55)
    grad.addColorStop(0,'rgba(94,124,226,0.10)')
    grad.addColorStop(1,'rgba(94,124,226,0)')
    ctx.fillStyle=grad
    ctx.fillRect(0,0,w,h)
    ctx.restore()

    for(const p of particles){
      p.x+=p.vx*dt*60
      p.y+=p.vy*dt*60
      if(p.x<-0.1) p.x=1.1
      if(p.x>1.1) p.x=-0.1
      if(p.y<-0.1) p.y=1.1
      if(p.y>1.1) p.y=-0.1

      const px=(p.x+driftX*(0.25+p.z))*w
      const py=(p.y+driftY*(0.25+p.z))*h
      const rr=p.r*dpr*(0.9+p.z*1.2)

      ctx.beginPath()
      ctx.fillStyle=`rgba(232,237,245,${p.a})`
      ctx.arc(px,py,rr,0,Math.PI*2)
      ctx.fill()

      // accent micro-glint
      if(p.z>0.72){
        ctx.beginPath()
        ctx.fillStyle='rgba(94,124,226,0.10)'
        ctx.arc(px,py,rr*1.9,0,Math.PI*2)
        ctx.fill()
      }
    }
  }

  resize()

  const loop=makeRafLoop({update:(dt)=>draw(dt)})
  loop.start()

  window.addEventListener('resize',resize,{passive:true})
  window.addEventListener('pointermove',onMove,{passive:true})

  // mount behind main content
  root.prepend(canvas)

  return {
    dispose(){
      loop.stop()
      window.removeEventListener('resize',resize)
      window.removeEventListener('pointermove',onMove)
      canvas.remove()
    }
  }
}
