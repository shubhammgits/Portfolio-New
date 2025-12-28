import { renderShell } from '../../ui/shell.js'
import { renderGesture } from './view.js'
import { mountGestureScene } from '../../three/gestureScene.js'
import { startHands } from '../../gesture/hands.js'

export const mountGesturePage=({root})=>{
  const shell=renderShell({root,active:'gesture'})
  const mainRoot=document.createElement('div')
  shell.appendChild(mainRoot)

  const view=renderGesture({root:mainRoot})
  const scene=mountGestureScene({container:view.canvasWrap})

  const setStatus=(text)=>{
    if(view.statusChip) view.statusChip.textContent=text
  }

  const hands=startHands({
    onGesture:(v)=>{ scene.setGesture?.(v) },
    onStatus:(s)=>{
      if(s==='Camera unavailable') setStatus('Camera blocked — pointer mode')
      else if(s==='Requesting camera') setStatus('Allow camera for gestures')
      else if(s==='Gesture active') setStatus('Gesture active')
      else if(s==='Gesture fallback') setStatus('Gesture fallback — pointer mode')
      else setStatus(s)
    }
  })

  hands.ready.then((info)=>{
    if(info?.mode==='fallback') scene.setGesture?.(null)
  }).catch(()=>{
    setStatus('Gesture fallback — pointer mode')
    scene.setGesture?.(null)
  })

  const sleep=(ms)=>new Promise((r)=>setTimeout(r,ms))
  const handsWarm=Promise.race([
    hands.ready.catch(()=>null),
    sleep(1400)
  ])

  return {
    dispose(){
      hands.dispose()
      scene.dispose()
    },
    ready:Promise.all([scene.ready,handsWarm]).then(()=>{})
  }
}
