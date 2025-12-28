import { el } from '../core/dom.js'

export const renderShell=({root,active})=>{
  root.textContent=''
  const shell=el('div',{className:'shell'})
  const top=el('header',{className:'topbar'})
  const brand=el('div',{className:'brand',textContent:'Portfolio'})
  const nav=el('nav',{className:'nav'})
  const home=el('a',{className:'pill',href:'/',textContent:'Home'})
  const gesture=el('a',{className:'pill',href:'/gesture/',textContent:'Gesture'})
  if(active==='home') home.style.borderColor='var(--ring)'
  if(active==='gesture') gesture.style.borderColor='var(--ring)'
  nav.appendChild(home)
  nav.appendChild(gesture)
  top.appendChild(brand)
  top.appendChild(nav)
  shell.appendChild(top)
  root.appendChild(shell)
  return shell
}
