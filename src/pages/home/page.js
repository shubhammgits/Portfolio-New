import { renderShell } from '../../ui/shell.js'
import { renderHome } from './view.js'
import { bindScrollDepth } from '../../animation/scrollDepth.js'
import { mountHomeScene } from '../../three/homeScene.js'

export const mountHomePage=({root})=>{
  const shell=renderShell({root,active:'home'})
  const mainRoot=document.createElement('div')
  shell.appendChild(mainRoot)

  const view=renderHome({root:mainRoot})
  const depthDispose=bindScrollDepth({cards:view.cards})
  const scene=mountHomeScene({container:view.canvasWrap})

  return ()=>{
    depthDispose()
    scene.dispose()
  }
}
