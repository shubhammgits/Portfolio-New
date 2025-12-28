import { el } from '../../core/dom.js'

export const renderHome=({root})=>{
  const main=el('main',{className:'main'})

  const hero=el('section',{className:'hero'})
  const canvasWrap=el('div',{className:'canvas-wrap',id:'home-canvas'})
  const content=el('div',{className:'content-top hero-inner'})

  const greeting=el('div',{className:'hero-greeting',textContent:'Hey, I am'})
  const h1=el('div',{className:'h1',textContent:'Shubham'})
  const role=el('div',{className:'hero-role',textContent:'Full Stack Developer & AI/ML Engineer'})
  const sub=el('div',{className:'sub',textContent:'Computer Science student specializing in Full Stack development and AI/ML. I love experimenting with new technologies, optimizing code, and turning ideas into functional, user-friendly projects.'})
  const ctas=el('div',{style:'display:flex;gap:10px;flex-wrap:wrap'})
  const a1=el('a',{className:'pill',href:'#work',textContent:'Explore'})
  const a2=el('a',{className:'pill',href:'/gesture/',textContent:'Gesture Stage'})
  ctas.appendChild(a1)
  ctas.appendChild(a2)

  content.appendChild(greeting)
  content.appendChild(h1)
  content.appendChild(role)
  content.appendChild(sub)
  content.appendChild(ctas)

  hero.appendChild(canvasWrap)
  hero.appendChild(content)

  const about=el('section',{className:'about-stage',id:'about'})
  const aboutCard=el('article',{className:'card about-card'})
  const aboutTop=el('div',{className:'about-top'})
  const aboutKicker=el('div',{className:'about-kicker',textContent:'About'})
  const aboutMeta=el('div',{className:'about-meta',textContent:'New Delhi, India'})
  const aboutBadge=el('div',{className:'about-badge',ariaHidden:'true'})
  aboutTop.appendChild(aboutKicker)
  aboutTop.appendChild(aboutMeta)
  aboutTop.appendChild(aboutBadge)

  const aboutTitle=el('div',{className:'about-title',textContent:'Computer Science student'})
  const aboutBody=el('div',{className:'about-body',textContent:'I specialize in Full Stack development and AI/ML. I love experimenting with new technologies, optimizing code, and turning ideas into functional, problem solving and user friendly projects.'})
  aboutCard.appendChild(aboutTop)
  aboutCard.appendChild(aboutTitle)
  aboutCard.appendChild(aboutBody)
  about.appendChild(aboutCard)

  const skills=el('section',{className:'skills-stage',id:'skills'})
  const skillsWrap=el('div',{className:'skills-card'})
  const skillsList=el('div',{className:'skills-icons'})

  const icons=[
    'cpp','js','html','css','react','node','python','tf','git','github'
  ]
  icons.forEach((name)=>{
    const item=el('div',{className:'skill-icon'})
    const img=el('img',{src:`/assets/icons/${name}.svg`,alt:''})
    item.appendChild(img)
    skillsList.appendChild(item)
  })

  skillsWrap.appendChild(skillsList)
  skills.appendChild(skillsWrap)

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
  main.appendChild(about)
  main.appendChild(skills)
  main.appendChild(grid)
  main.appendChild(footer)

  root.appendChild(main)

  return {
    canvasWrap,
    cards:[cardA,cardB,cardC],
    heroContent:content,
    aboutCard,
    aboutBadge,
    skillsList
  }
}
