import { el } from '../../core/dom.js'

export const renderHome=({root})=>{
  const main=el('main',{className:'main'})

  const hero=el('section',{className:'hero'})
  const canvasWrap=el('div',{className:'canvas-wrap',id:'home-canvas'})
  const content=el('div',{className:'content-top hero-inner'})

  const h1=el('div',{className:'h1',textContent:'Modern 3D portfolio'})
  const sub=el('div',{className:'sub',textContent:'Scroll-based depth, subtle real-time 3D, and a gesture-driven particle stage.'})
  const ctas=el('div',{style:'display:flex;gap:10px;flex-wrap:wrap'})
  const a1=el('a',{className:'pill',href:'#work',textContent:'Explore'})
  const a2=el('a',{className:'pill',href:'/gesture/',textContent:'Gesture Stage'})
  ctas.appendChild(a1)
  ctas.appendChild(a2)

  content.appendChild(h1)
  content.appendChild(sub)
  content.appendChild(ctas)

  hero.appendChild(canvasWrap)
  hero.appendChild(content)

  const grid=el('section',{className:'grid',id:'work'})
  const cardA=el('article',{className:'card',dataset:{depth:'1'}})
  const tA=el('div',{className:'card-title',textContent:'Projects'})
  const bA=el('div',{className:'card-body',textContent:'A focused set of work highlights with performance-first visuals.'})
  cardA.appendChild(tA)
  cardA.appendChild(bA)

  const cardB=el('article',{className:'card',dataset:{depth:'2'}})
  const tB=el('div',{className:'card-title',textContent:'Skills'})
  const bB=el('div',{className:'card-body',textContent:'Engineering, UI, and motion integrated as a single system.'})
  cardB.appendChild(tB)
  cardB.appendChild(bB)

  const cardC=el('article',{className:'card',dataset:{depth:'3'}})
  const tC=el('div',{className:'card-title',textContent:'Contact'})
  const bC=el('div',{className:'card-body',textContent:'Fast paths to reach out and connect.'})
  cardC.appendChild(tC)
  cardC.appendChild(bC)

  grid.appendChild(cardA)
  grid.appendChild(cardB)
  grid.appendChild(cardC)

  const footer=el('footer',{className:'footer'})
  footer.textContent=''

  main.appendChild(hero)
  main.appendChild(grid)
  main.appendChild(footer)

  root.appendChild(main)

  return {
    canvasWrap,
    cards:[cardA,cardB,cardC]
  }
}
