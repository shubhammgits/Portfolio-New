import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../core/reduceMotion.js'

gsap.registerPlugin(ScrollTrigger)

export const bindSkillsFloat=({container})=>{
  if(prefersReducedMotion()) return ()=>{}

  const items=Array.from(container.children)

  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:container,
      start:'top 85%',
      end:'top 50%',
      scrub:1.1,
      invalidateOnRefresh:true
    }
  })

  tl.fromTo(items,
    {opacity:0,y:40,scale:0.9},
    {opacity:1,y:0,scale:1,ease:'none',stagger:0.04}
  )

  items.forEach((item,i)=>{
    const float=gsap.to(item,{
      y:'-=8',
      duration:2.8+ i*0.08,
      ease:'sine.inOut',
      repeat:-1,
      yoyo:true
    })
    item._floatTween=float
  })

  const refresh=()=>ScrollTrigger.refresh()
  window.addEventListener('resize',refresh,{passive:true})

  return ()=>{
    window.removeEventListener('resize',refresh)
    tl.scrollTrigger?.kill()
    tl.kill()
    items.forEach((item)=>{
      item._floatTween?.kill()
      gsap.set(item,{clearProps:'all'})
    })
  }
}
