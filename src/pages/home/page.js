import { renderShell } from '../../ui/shell.js'
import { renderHome } from './view.js'
import { bindScrollDepth } from '../../animation/scrollDepth.js'
import { bindHeroParallax } from '../../animation/heroParallax.js'
import { bindAboutCard } from '../../animation/aboutCard.js'
import { bindSkillsFloat } from '../../animation/skillsFloat.js'
import { mountHomeScene } from '../../three/homeScene.js'
import { mountAboutBadge } from '../../three/aboutBadge.js'

export const mountHomePage=({root})=>{
  const shell=renderShell({root,active:'home'})
  const mainRoot=document.createElement('div')
  shell.appendChild(mainRoot)

  const view=renderHome({root:mainRoot})
  const heroDispose=bindHeroParallax({heroContent:view.heroContent})
  const aboutDispose=bindAboutCard({card:view.aboutCard})
  const skillsDispose=bindSkillsFloat({container:view.skillsList})
  const depthDispose=bindScrollDepth({cards:view.cards})
  const scene=mountHomeScene({container:view.canvasWrap})
  const badge=mountAboutBadge({container:view.aboutBadge})

  return {
    dispose(){
      heroDispose()
      aboutDispose()
      skillsDispose()
      depthDispose()
      badge.dispose()
      scene.dispose()
    },
    ready:Promise.all([scene.ready,badge.ready]).then(()=>{})
  }
}
