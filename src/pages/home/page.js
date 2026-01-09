import { renderShell } from '../../ui/shell.js'
import { renderHome } from './view.js'
import { bindScrollDepth } from '../../animation/scrollDepth.js'
import { bindHeroParallax } from '../../animation/heroParallax.js'
import { bindContactDepth } from '../../animation/contactDepth.js'
import { bindProjectsContactCrossfade } from '../../animation/projectsContactCrossfade.js'
import { bindProjectsDepth } from '../../animation/projectsDepth.js'
import { mountHomeScene } from '../../three/homeScene.js'
import { bindContactForm } from '../../ui/contactForm.js'
import { bindLikeButton } from '../../ui/likeButton.js'
import { bindHoverTilt } from '../../animation/hoverTilt.js'
import { mountCursorSpotlight } from '../../ui/cursorSpotlight.js'

export const mountHomePage=({root})=>{
  const shell=renderShell({root,active:'home'})
  const spotlight=mountCursorSpotlight({root:shell})
  const mainRoot=document.createElement('div')
  shell.appendChild(mainRoot)

  const view=renderHome({root:mainRoot})
  const scene=mountHomeScene({container:view.canvasWrap})
  const heroDispose=bindHeroParallax({
    heroContent:view.heroContent,
    onScrollProgress:(p)=>scene.setScrollProgress?.(p)
  })
  const depthDispose=bindScrollDepth({cards:view.cards})
  const hoverDispose=bindHoverTilt({elements:view.cards,maxRotate:11,maxLift:10})
  const contactDispose=bindContactDepth({card:view.contactCard})
  const projectsDepthDispose=bindProjectsDepth({section:view.projectsSection})
  const crossfadeDispose=bindProjectsContactCrossfade({projects:view.projectsSection,contact:view.contactCard})
  const formDispose=view.contactForm ? bindContactForm({form:view.contactForm,toEmail:'shubhamm18.work@gmail.com'}) : ()=>{}
  const likeDispose=view.footerLike ? bindLikeButton({button:view.footerLike,initialCount:0}) : ()=>{}

  return {
    dispose(){
      heroDispose()
      depthDispose()
      hoverDispose()
      contactDispose()
      projectsDepthDispose()
      crossfadeDispose()
      formDispose()
      likeDispose()
      scene.dispose()
      spotlight.dispose()
    },
    ready:Promise.allSettled([scene.ready]).then(()=>{})
  }
}
