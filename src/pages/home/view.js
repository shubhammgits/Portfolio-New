import { el } from '../../core/dom.js'

export const renderHome=({root})=>{
  const main=el('main',{className:'main'})

  const hero=el('section',{className:'hero'})
  const canvasWrap=el('div',{className:'canvas-wrap',id:'home-canvas'})
  const content=el('div',{className:'content-top hero-inner'})

  const greeting=el('div',{className:'hero-greeting',textContent:'Hey, I am'})
  const h1=el('div',{className:'h1',textContent:'Shubham'})
  const role=el('div',{className:'hero-role',textContent:'Full Stack Developer & AI/ML Engineer'})
  const sub=el('div',{className:'sub',textContent:'Computer Science student specializing in Full Stack development and AI/ML. Building scalable applications and exploring deep learning solutions.'})
  const ctas=el('div',{style:'display:flex;gap:12px;flex-wrap:wrap;margin-top:8px'})
  const a1=el('a',{className:'pill',href:'#work',textContent:'View Work'})
  const a2=el('a',{className:'pill',href:'/gesture/',textContent:'Gesture Lab'})
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
  const skillsTitle=el('div',{className:'skills-title',textContent:'Technologies'})
  const skillsList=el('div',{className:'skills-grid'})

  const skillsData=[
    {name:'C++',icon:'cpp'},
    {name:'JavaScript',icon:'js'},
    {name:'HTML',icon:'html'},
    {name:'CSS',icon:'css'},
    {name:'React',icon:'react'},
    {name:'Node.js',icon:'node'},
    {name:'Python',icon:'python'},
    {name:'TensorFlow',icon:'tf'},
    {name:'Git',icon:'git'},
    {name:'GitHub',icon:'github'}
  ]

  skillsData.forEach((skill)=>{
    const item=el('div',{className:'skill-item'})
    const iconWrap=el('div',{className:'skill-icon-wrap'})
    const img=el('img',{src:`/assets/icons/${skill.icon}.svg`,alt:skill.name})
    const label=el('div',{className:'skill-label',textContent:skill.name})
    iconWrap.appendChild(img)
    item.appendChild(iconWrap)
    item.appendChild(label)
    skillsList.appendChild(item)
  })

  skills.appendChild(skillsTitle)
  skills.appendChild(skillsList)

  const projects=el('section',{className:'projects',id:'work'})
  const projectsTitle=el('div',{className:'projects-title',textContent:'Projects'})
  const projectsWrap=el('div',{className:'projects-grid'})

  const items=[
    {
      title:'Deep Learning Happy vs Sad Detection',
      problem:'Emotion recognition in images using deep learning',
      desc:'Convolutional neural network implementation for binary emotion classification. Trained on curated datasets with data augmentation and transfer learning techniques.',
      tech:['python','tf','git','github'],
      link:'https://github.com/shubhammgits/Image-Classification-Deep-Learning-'
    },
    {
      title:'Data Science Industry Analysis',
      problem:'Predictive modeling for healthcare insights',
      desc:'Comprehensive data analysis pipeline with feature engineering, statistical modeling, and visualization. Focus on pattern recognition and predictive accuracy.',
      tech:['python','js','git','github'],
      link:'https://github.com/shubhammgits/Diabetes-Prediction'
    }
  ]

  const projectCards=[]

  items.forEach((item,idx)=>{
    const card=el('article',{className:'card project-card',dataset:{depth:String(idx+1)}})
    const title=el('div',{className:'card-title',textContent:item.title})
    const problem=el('div',{className:'card-problem',textContent:item.problem})
    const body=el('div',{className:'card-body',textContent:item.desc})
    const stack=el('div',{className:'stack-row'})
    item.tech.forEach((t)=>{
      const icon=el('img',{src:`/assets/icons/${t}.svg`,alt:''})
      stack.appendChild(icon)
    })
    const link=el('a',{className:'pill project-link',href:item.link,target:'_blank',rel:'noopener noreferrer',textContent:'View on GitHub'})
    card.appendChild(title)
    card.appendChild(problem)
    card.appendChild(body)
    card.appendChild(stack)
    card.appendChild(link)
    projectsWrap.appendChild(card)
    projectCards.push(card)
  })

  projects.appendChild(projectsTitle)
  projects.appendChild(projectsWrap)

  const contact=el('section',{className:'contact-stage',id:'contact'})
  const contactCard=el('article',{className:'card contact-card'})
  const contactTitle=el('div',{className:'contact-title',textContent:'Connect'})
  const contactBody=el('div',{className:'contact-body',textContent:'Open to collaboration, freelance opportunities, and interesting projects.'})
  const contactLinks=el('div',{className:'contact-links'})

  const links=[
    {icon:'linkedin',href:'https://www.linkedin.com/in/shhshubham/',label:'LinkedIn'},
    {icon:'github',href:'https://github.com/shubhammgits',label:'GitHub'}
  ]

  links.forEach((link)=>{
    const a=el('a',{className:'contact-link',href:link.href,target:'_blank',rel:'noopener noreferrer'})
    const iconWrap=el('div',{className:'contact-icon'})
    const img=el('img',{src:`/assets/icons/${link.icon}.svg`,alt:link.label})
    const label=el('span',{textContent:link.label})
    iconWrap.appendChild(img)
    a.appendChild(iconWrap)
    a.appendChild(label)
    contactLinks.appendChild(a)
  })

  contactCard.appendChild(contactTitle)
  contactCard.appendChild(contactBody)
  contactCard.appendChild(contactLinks)
  contact.appendChild(contactCard)

  const footer=el('footer',{className:'footer'})
  footer.textContent=''

  main.appendChild(hero)
  main.appendChild(about)
  main.appendChild(skills)
  main.appendChild(projects)
  main.appendChild(contact)
  main.appendChild(footer)

  root.appendChild(main)

  return {
    canvasWrap,
    cards:projectCards,
    heroContent:content,
    aboutCard,
    aboutBadge,
    skillsList,
    contactCard
  }
}
