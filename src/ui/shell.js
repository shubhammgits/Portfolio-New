import { el } from '../core/dom.js'

export const renderShell=({root,active})=>{
  root.textContent=''
  const shell=el('div',{className:'shell'})

  const top=el('header',{className:'topbar'})
  const brand=el('a',{className:'brand',href:'/',textContent:'Shubham'})

  const nav=el('nav',{className:'nav'})
  const work=el('a',{className:'pill',href:'#work',textContent:'Work'})
  const contact=el('a',{className:'pill',href:'#contact',textContent:'Contact'})

  const gh=el('a',{className:'icon-btn',href:'https://github.com/shubhammgits',target:'_blank',rel:'noopener noreferrer',ariaLabel:'GitHub'})
  gh.appendChild(el('img',{src:'/assets/icons/github.svg',alt:'GitHub'}))
  const li=el('a',{className:'icon-btn',href:'https://www.linkedin.com/in/shhshubham/',target:'_blank',rel:'noopener noreferrer',ariaLabel:'LinkedIn'})
  li.appendChild(el('img',{src:'/assets/icons/linkedin.svg',alt:'LinkedIn'}))

  if(active==='home') work.style.borderColor='var(--ring)'

  nav.appendChild(work)
  nav.appendChild(contact)
  nav.appendChild(gh)
  nav.appendChild(li)

  top.appendChild(brand)
  top.appendChild(nav)
  shell.appendChild(top)
  root.appendChild(shell)
  return shell
}
