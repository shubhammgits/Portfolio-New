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

  const projects=el('section',{className:'projects',id:'work'})
  const projectsWrap=el('div',{className:'projects-grid'})

  const items=[
    {
      title:'Deep Learning Happy vs Sad Detection',
      desc:'Image classification to distinguish happy vs sad expressions using convolutional networks.',
      tech:['python','tf','git','github'],
      link:'https://github.com/shubhammgits/Image-Classification-Deep-Learning-'
    },
    {
      title:'Data Science Industry Analysis',
      desc:'Data exploration, feature analysis, and metric tracking for industry insights.',
      tech:['python','js','git','github'],
      link:'https://github.com/shubhammgits/Diabetes-Prediction'
    }
  ]

  const projectCards=[]

  items.forEach((item,idx)=>{
    const card=el('article',{className:'card project-card',dataset:{depth:String(idx+1)}})
    const title=el('div',{className:'card-title',textContent:item.title})
    const body=el('div',{className:'card-body',textContent:item.desc})
    const stack=el('div',{className:'stack-row'})
    item.tech.forEach((t)=>{
      const icon=el('img',{src:`/assets/icons/${t}.svg`,alt:''})
      stack.appendChild(icon)
    })
    const link=el('a',{className:'pill project-link',href:item.link,textContent:'GitHub'})
    card.appendChild(title)
    card.appendChild(body)
    card.appendChild(stack)
    card.appendChild(link)
    projectsWrap.appendChild(card)
    projectCards.push(card)
  })

  projects.appendChild(projectsWrap)

  const footer=el('footer',{className:'footer'})
  footer.textContent=''

  main.appendChild(hero)
  main.appendChild(about)
  main.appendChild(skills)
  main.appendChild(projects)
  main.appendChild(footer)

  root.appendChild(main)

  return {
    canvasWrap,
    cards:projectCards,
    heroContent:content,
    aboutCard,
    aboutBadge,
    skillsList
  }
}
