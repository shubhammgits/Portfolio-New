import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindProjectsDepth=({section})=>{
  if(prefersReducedMotion()) return ()=>{}
  if(!section) return ()=>{}

  gsap.set(section,{transformPerspective:1000,transformOrigin:'50% 50%'})

  const tween=gsap.fromTo(section,
    {z:-260,scale:0.965,filter:'blur(10px)'},
    {
      z:0,
      scale:1,
      filter:'blur(0px)',
      ease:'none',
      scrollTrigger:{
        trigger:section,
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
    gsap.set(section,{clearProps:'transform,filter'})
  }
}
