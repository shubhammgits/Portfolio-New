import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindScrollDepth=({cards})=>{
  if(prefersReducedMotion()) return ()=>{}
  const kills=[]
  for(const card of cards){
    const st=ScrollTrigger.create({
      trigger:card,
      start:'top bottom',
      end:'bottom top',
      scrub:true,
      onUpdate:(self)=>{
        const p=self.progress
        const tilt=(p-0.5)*10
        const lift=(0.5-Math.abs(p-0.5))*18
        card.style.transform=`perspective(900px) translateY(${-lift}px) rotateX(${tilt}deg) translateZ(0)`
      }
    })
    kills.push(()=>st.kill())
  }
  const refresh=()=>ScrollTrigger.refresh()
  window.addEventListener('resize',refresh,{passive:true})
  return ()=>{
    window.removeEventListener('resize',refresh)
    for(const k of kills) k()
    for(const card of cards) card.style.transform=''
  }
}
