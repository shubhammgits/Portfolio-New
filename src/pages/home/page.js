import { renderShell } from '../../ui/shell.js'
import { renderHome } from './view.js'
import { bindScrollDepth } from '../../animation/scrollDepth.js'
import { bindHeroParallax } from '../../animation/heroParallax.js'
import { bindContactDepth } from '../../animation/contactDepth.js'
import { mountHomeScene } from '../../three/homeScene.js'

export const mountHomePage=({root})=>{
  const shell=renderShell({root,active:'home'})
  const mainRoot=document.createElement('div')
  shell.appendChild(mainRoot)

  const view=renderHome({root:mainRoot})
  const scene=mountHomeScene({container:view.canvasWrap})
  const heroDispose=bindHeroParallax({
    heroContent:view.heroContent,
    onScrollProgress:(p)=>scene.setScrollProgress?.(p)
  })
  const depthDispose=bindScrollDepth({cards:view.cards})
  const contactDispose=bindContactDepth({card:view.contactCard})

  return {
    dispose(){
      heroDispose()
      depthDispose()
      contactDispose()
      scene.dispose()
    },
    ready:Promise.allSettled([scene.ready]).then(()=>{})
  }
}
