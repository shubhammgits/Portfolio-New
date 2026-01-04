import { el } from '../core/dom.js'

export const renderShell=({root,active})=>{
  root.textContent=''
  const shell=el('div',{className:'shell'})

  const top=el('header',{className:'topbar'})
  const nav=el('nav',{className:'nav',ariaLabel:'Primary'})

  const links=[
    {label:'Home',href:'#top'},
    {label:'Projects',href:'#work'},
    {label:'Contact',href:'#contact'},
    {label:'Music?',href:'#music'},
    {label:'Resume',href:'/assets/resume.pdf',target:'_blank',rel:'noopener noreferrer'}
  ]

  links.forEach(({label,href,target,rel})=>{
    const a=el('a',{className:'nav-link',href,textContent:label,target,rel})
    nav.appendChild(a)
  })

  shell.appendChild(top)
  top.appendChild(nav)
  root.appendChild(shell)
  return shell
}
