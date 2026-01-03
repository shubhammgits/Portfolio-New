import { el } from '../core/dom.js'

export const renderShell=({root,active})=>{
  root.textContent=''
  const shell=el('div',{className:'shell'})
  root.appendChild(shell)
  return shell
}
