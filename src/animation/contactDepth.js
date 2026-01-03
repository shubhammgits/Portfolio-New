import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindContactDepth=({card})=>{
  if(prefersReducedMotion()) return ()=>{}

  gsap.set(card,{transformPerspective:1000,transformOrigin:'50% 50%'})

  const tween=gsap.fromTo(card,
    {y:60,z:-240,rotationX:18},
    {
      y:0,
      z:0,
      rotationX:0,
      ease:'none',
      scrollTrigger:{
        trigger:card,
        start:'top 88%',
        end:'top 60%',
        scrub:1.2,
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
    gsap.set(card,{clearProps:'transform'})
  }
}
