import { el } from '../../core/dom.js'

export const renderGesture=({root})=>{
  const main=el('main',{className:'gesture-shell'})
  const stage=el('section',{className:'gesture-stage'})
  const frame=el('div',{className:'stage-frame'})
  const canvasWrap=el('div',{className:'canvas-wrap',id:'gesture-canvas'})
  const hud=el('div',{className:'stage-hud'})
  const chipL=el('div',{className:'hud-chip',textContent:'Drag to orbit'})
  const statusChip=el('div',{className:'hud-chip',textContent:'Requesting camera'})
  const chipR=el('div',{className:'hud-chip',textContent:'Pointer attracts'})
  hud.appendChild(chipL)
  hud.appendChild(statusChip)
  hud.appendChild(chipR)

  frame.appendChild(canvasWrap)
  frame.appendChild(hud)
  stage.appendChild(frame)
  main.appendChild(stage)
  root.appendChild(main)

  return { canvasWrap, statusChip }
}
