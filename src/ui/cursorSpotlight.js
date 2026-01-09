import { prefersReducedMotion } from '../core/reduceMotion.js'

const clamp=(v,min,max)=>Math.max(min,Math.min(max,v))

export const mountCursorSpotlight=({root})=>{
  if(typeof window==='undefined') return {dispose:()=>{}}
  if(!root) return {dispose:()=>{}}

  // Keep it subtle even with reduced motion; just avoid smoothing loop.
  const reduced=prefersReducedMotion()

  let tx=50
  let ty=30
  let cx=50
  let cy=30
  let raf=0

  const apply=()=>{
    root.style.setProperty('--cx',cx.toFixed(2)+'%')
    root.style.setProperty('--cy',cy.toFixed(2)+'%')
  }

  const tick=()=>{
    raf=0
    const ease=0.10
    cx += (tx-cx)*ease
    cy += (ty-cy)*ease
    apply()
    if(Math.abs(tx-cx)>0.02 || Math.abs(ty-cy)>0.02) raf=requestAnimationFrame(tick)
  }

  const onMove=(e)=>{
    const w=Math.max(1,window.innerWidth)
    const h=Math.max(1,window.innerHeight)
    tx=clamp((e.clientX/w)*100,0,100)
    ty=clamp((e.clientY/h)*100,0,100)
    if(reduced){
      cx=tx
      cy=ty
      apply()
      return
    }
    if(!raf) raf=requestAnimationFrame(tick)
  }

  // default
  apply()
  window.addEventListener('pointermove',onMove,{passive:true})

  return {
    dispose(){
      window.removeEventListener('pointermove',onMove)
      if(raf) cancelAnimationFrame(raf)
      raf=0
      root.style.removeProperty('--cx')
      root.style.removeProperty('--cy')
    }
  }
}
