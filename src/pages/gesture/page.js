import { renderShell } from '../../ui/shell.js'
import { renderGesture } from './view.js'
import { mountGestureScene } from '../../three/gestureScene.js'

export const mountGesturePage=({root})=>{
  const shell=renderShell({root,active:'gesture'})
  const mainRoot=document.createElement('div')
  shell.appendChild(mainRoot)

  const view=renderGesture({root:mainRoot})
  const scene=mountGestureScene({container:view.canvasWrap})

  return {
    dispose(){
      scene.dispose()
    },
    ready:scene.ready
  }
}
