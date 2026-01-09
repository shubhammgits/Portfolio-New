import { prefersReducedMotion } from '../core/reduceMotion.js'

const clamp=(v,min,max)=>Math.max(min,Math.min(max,v))

export const bindHoverTilt=({elements,maxRotate=10,maxLift=10})=>{
  if(prefersReducedMotion()) return ()=>{}
  const els=(elements||[]).filter(Boolean)
  const cleanups=[]

  for(const el of els){
    const onMove=(e)=>{
      const rect=el.getBoundingClientRect()
      const cx=rect.left+rect.width/2
      const cy=rect.top+rect.height/2
      const x=((e.clientX-cx)/(rect.width/2))
      const y=((e.clientY-cy)/(rect.height/2))
      const nx=clamp(x,-1,1)
      const ny=clamp(y,-1,1)

      const ry=nx*maxRotate
      const rx=(-ny)*maxRotate*0.8

      el.style.setProperty('--ht-ry',ry.toFixed(3))
      el.style.setProperty('--ht-rx',rx.toFixed(3))

      const mx=((e.clientX-rect.left)/Math.max(1,rect.width))*100
      const my=((e.clientY-rect.top)/Math.max(1,rect.height))*100
      el.style.setProperty('--mx',mx.toFixed(2)+'%')
      el.style.setProperty('--my',my.toFixed(2)+'%')
      el.style.setProperty('--ht-lift',String(maxLift))
    }

    const onLeave=()=>{
      el.style.setProperty('--ht-ry','0')
      el.style.setProperty('--ht-rx','0')
      el.style.setProperty('--ht-lift','0')
    }

    el.addEventListener('pointermove',onMove)
    el.addEventListener('pointerleave',onLeave)
    cleanups.push(()=>{
      el.removeEventListener('pointermove',onMove)
      el.removeEventListener('pointerleave',onLeave)
      el.style.removeProperty('--ht-ry')
      el.style.removeProperty('--ht-rx')
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
      el.style.removeProperty('--ht-lift')
    })
  }

  return ()=>{ for(const c of cleanups) c() }
}
