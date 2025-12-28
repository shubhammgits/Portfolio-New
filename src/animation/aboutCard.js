import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindAboutCard=({card})=>{
  if(prefersReducedMotion()) return ()=>{}

  gsap.set(card,{transformPerspective:1000,transformOrigin:'50% 50%'})

  const tween=gsap.fromTo(card,
    {opacity:0,y:70,z:-320,rotationX:22,rotationY:-12},
    {
      opacity:1,
      y:0,
      z:0,
      rotationX:0,
      rotationY:0,
      ease:'none',
      scrollTrigger:{
        trigger:card,
        start:'top 90%',
        end:'top 55%',
        scrub:1.15,
        invalidateOnRefresh:true
      }
    }
  )

  const refresh=()=>ScrollTrigger.refresh()
  window.addEventListener('resize',refresh,{passive:true})

  return ()=>{
    window.removeEventListener('resize',refresh)
    tween.scrollTrigger?.kill()
    tween.kill()
    gsap.set(card,{clearProps:'transform,opacity'})
  }
}
