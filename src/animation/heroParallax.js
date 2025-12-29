import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindHeroParallax=({heroContent,onScrollProgress})=>{
  if(prefersReducedMotion()) return ()=>{}
  
  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:heroContent,
      start:'top top',
      end:'bottom top',
      scrub:1.2,
      invalidateOnRefresh:true,
      onUpdate:(self)=>{
        if(onScrollProgress) onScrollProgress(self.progress)
      }
    }
  })

  const children=Array.from(heroContent.children)
  
  tl.to(heroContent,{
    y:140,
    scale:0.94,
    opacity:0.3,
    ease:'none'
  },0)

  children.forEach((child,i)=>{
    const delay=i*0.08
    tl.to(child,{
      y:60+i*18,
      opacity:0,
      ease:'none'
    },delay)
  })

  const refresh=()=>ScrollTrigger.refresh()
  window.addEventListener('resize',refresh,{passive:true})

  return ()=>{
    window.removeEventListener('resize',refresh)
    tl.kill()
    ScrollTrigger.getAll().forEach(t=>{ if(t.trigger===heroContent) t.kill() })
    gsap.set(heroContent,'clearProps','all')
    children.forEach(c=>gsap.set(c,'clearProps','all'))
  }
}
