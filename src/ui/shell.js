import { el } from '../core/dom.js'

export const renderShell=({root,active})=>{
  root.textContent=''
  const shell=el('div',{className:'shell'})
  const top=el('header',{className:'topbar'})
  const brand=el('div',{className:'brand',textContent:'Portfolio'})
  const nav=el('nav',{className:'nav'})
  const home=el('a',{className:'pill',href:'/',textContent:'Home'})
  if(active==='home') home.style.borderColor='var(--ring)'
  nav.appendChild(home)
  top.appendChild(brand)
  top.appendChild(nav)
  shell.appendChild(top)
  root.appendChild(shell)
  return shell
}
