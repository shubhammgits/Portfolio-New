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
  const projectsHead=el('div',{className:'section-head'})
  const projectsKicker=el('div',{className:'section-kicker',textContent:'My work'})
  const projectsTitle=el('div',{className:'projects-title',textContent:'Projects'})
  const projectsIntro=el('div',{className:'section-intro',textContent:'A few projects I’ve built recently. GitHub has the code and Preview opens the live demo (when available).'})
  projectsHead.appendChild(projectsKicker)
  projectsHead.appendChild(projectsTitle)
  projectsHead.appendChild(projectsIntro)

  const projectsWrap=el('div',{className:'projects-grid'})

  const items=[
    {
      title:'Deep Learning Happy vs Sad Detection',
      problem:'Emotion recognition in images using deep learning',
      desc:'Convolutional neural network implementation for binary emotion classification. Trained on curated datasets with data augmentation and transfer learning techniques.',
      tech:['python','tf','git','github'],
      github:'https://github.com/shubhammgits/Image-Classification-Deep-Learning-',
      preview:'https://github.com/shubhammgits/Image-Classification-Deep-Learning-'
    },
    {
      title:'Data Science Industry Analysis',
      problem:'Predictive modeling for healthcare insights',
      desc:'Comprehensive data analysis pipeline with feature engineering, statistical modeling, and visualization. Focus on pattern recognition and predictive accuracy.',
      tech:['python','js','git','github'],
      github:'https://github.com/shubhammgits/Diabetes-Prediction',
      preview:'https://github.com/shubhammgits/Diabetes-Prediction'
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

    const actions=el('div',{className:'project-actions'})
    const gh=el('a',{className:'pill project-link',href:item.github,target:'_blank',rel:'noopener noreferrer',textContent:'GitHub'})
    const prev=el('a',{className:'pill project-link',href:item.preview,target:'_blank',rel:'noopener noreferrer',textContent:'Preview'})
    actions.appendChild(gh)
    actions.appendChild(prev)

    card.appendChild(title)
    card.appendChild(problem)
    card.appendChild(body)
    card.appendChild(stack)
    card.appendChild(actions)

    projectsWrap.appendChild(card)
    projectCards.push(card)
  })

  projects.appendChild(projectsHead)
  projects.appendChild(projectsWrap)

  const contact=el('section',{className:'contact-stage',id:'contact'})
  const contactCard=el('article',{className:'card contact-card'})
  const contactKicker=el('div',{className:'section-kicker',textContent:"Let's talk"})
  const contactTitle=el('div',{className:'contact-title',textContent:'Contact'})
  const contactBody=el('div',{className:'contact-body',textContent:'Have a question or a project in mind? Feel free to reach out.'})
  const contactMeta=el('div',{className:'contact-meta'})
  const contactMetaLabel=el('div',{className:'contact-meta-label',textContent:'Location:'})
  const contactMetaValue=el('div',{className:'contact-meta-value',textContent:'New Delhi, India'})
  contactMeta.appendChild(contactMetaLabel)
  contactMeta.appendChild(contactMetaValue)
  const contactLinks=el('div',{className:'contact-links'})

  const links=[
    {icon:'email',href:'mailto:your-email@example.com',label:'Email'},
    {icon:'linkedin',href:'https://www.linkedin.com/in/shhshubham/',label:'LinkedIn'},
    {icon:'github',href:'https://github.com/shubhammgits',label:'GitHub'}
  ]

  links.forEach((link)=>{
    const isMail=link.href.startsWith('mailto:')
    const a=el('a',{
      className:'contact-link',
      href:link.href,
      target:isMail?undefined:'_blank',
      rel:isMail?undefined:'noopener noreferrer'
    })
    const iconWrap=el('div',{className:'contact-icon'})
    const img=el('img',{src:`/assets/icons/${link.icon}.svg`,alt:link.label})
    const label=el('span',{textContent:link.label})
    iconWrap.appendChild(img)
    a.appendChild(iconWrap)
    a.appendChild(label)
    contactLinks.appendChild(a)
  })

  contactCard.appendChild(contactKicker)
  contactCard.appendChild(contactTitle)
  contactCard.appendChild(contactBody)
  contactCard.appendChild(contactMeta)
  contactCard.appendChild(contactLinks)
  contact.appendChild(contactCard)

  const footer=el('footer',{className:'footer'})
  const footerInner=el('div',{className:'footer-inner'})
  const footerLeft=el('div',{className:'footer-left',textContent:`Copyright © ${new Date().getFullYear()} Shubham. All rights reserved.`})
  const footerRight=el('div',{className:'footer-right'})
  const footerBuilt=el('div',{className:'footer-built',textContent:'Built with Vite • Three.js • GSAP'})
  footerRight.appendChild(footerBuilt)
  footerInner.appendChild(footerLeft)
  footerInner.appendChild(footerRight)
  footer.appendChild(footerInner)

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
