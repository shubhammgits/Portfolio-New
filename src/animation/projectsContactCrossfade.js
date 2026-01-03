import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindProjectsContactCrossfade=({projects,contact})=>{
  if(prefersReducedMotion()) return ()=>{}
  if(!projects || !contact) return ()=>{}

  gsap.set(projects,{opacity:1})
  gsap.set(contact,{opacity:0})

  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:contact,
      start:'top 88%',
      end:'top 60%',
      scrub:1.2,
      invalidateOnRefresh:true
    }
  })

  tl.to(projects,{opacity:0.18,ease:'none'},0)
  tl.to(contact,{opacity:1,ease:'none'},0)

  const refresh=()=>ScrollTrigger.refresh()
  window.addEventListener('resize',refresh,{passive:true})

  return ()=>{
    window.removeEventListener('resize',refresh)
    tl.kill()
    tl.scrollTrigger?.kill()
    gsap.set(projects,{clearProps:'opacity'})
    gsap.set(contact,{clearProps:'opacity'})
  }
}
