import { el } from '../../core/dom.js'

export const renderHome=({root})=>{
  const main=el('main',{className:'main'})

  const hero=el('section',{className:'hero'})
  const canvasWrap=el('div',{className:'canvas-wrap',id:'home-canvas'})
  const content=el('div',{className:'content-top hero-inner'})

  const orbits=el('div',{className:'hero-orbits',ariaHidden:'true'})
  const orbitA=el('div',{className:'orbit orbit-a'})
  const orbitB=el('div',{className:'orbit orbit-b'})
  const orbitC=el('div',{className:'orbit orbit-c'})

  const mkDot=(className)=>el('span',{className})
  orbitA.appendChild(mkDot('orbit-dot dot-lg'))
  orbitA.appendChild(mkDot('orbit-dot dot-sm'))
  orbitA.appendChild(mkDot('orbit-dot dot-md'))

  orbitB.appendChild(mkDot('orbit-dot dot-md'))
  orbitB.appendChild(mkDot('orbit-dot dot-sm'))

  orbitC.appendChild(mkDot('orbit-dot dot-sm'))
  orbitC.appendChild(mkDot('orbit-dot dot-md'))
  orbitC.appendChild(mkDot('orbit-dot dot-sm'))

  orbits.appendChild(orbitA)
  orbits.appendChild(orbitB)
  orbits.appendChild(orbitC)

  const greeting=el('div',{className:'hero-greeting',textContent:'Hey, I am'})
  const h1=el('div',{className:'h1',textContent:'Shubham'})
  const role=el('div',{className:'hero-role',textContent:'Full Stack Developer & AI/ML Engineer'})

  const tech=el('div',{className:'tech-marquee',ariaLabel:'Tech stack'})
  const techTrack=el('div',{className:'tech-track',ariaHidden:'true'})
  const techIcons=['react','node','js','html','css','python','tf','git','github']
  const techList=[...techIcons,...techIcons]
  techList.forEach((icon)=>{
    const img=el('img',{className:'tech-icon',src:`/assets/icons/${icon}.svg`,alt:''})
    techTrack.appendChild(img)
  })
  tech.appendChild(techTrack)

  const sub=el('div',{className:'sub',textContent:'Computer Science student specializing in Full Stack development and AI/ML. Building scalable applications and exploring deep learning solutions.'})

  content.appendChild(orbits)
  content.appendChild(greeting)
  content.appendChild(h1)
  content.appendChild(role)
  content.appendChild(tech)
  content.appendChild(sub)

  hero.appendChild(canvasWrap)
  hero.appendChild(content)


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
      status:'GitHub',
      github:'https://github.com/shubhammgits/Image-Classification-Deep-Learning-',
      preview:'https://github.com/shubhammgits/Image-Classification-Deep-Learning-',
      image:''
    },
    {
      title:'Diabetes Prediction',
      status:'GitHub',
      github:'https://github.com/shubhammgits/Diabetes-Prediction',
      preview:'https://github.com/shubhammgits/Diabetes-Prediction',
      image:''
    },
    {
      title:'Portfolio',
      status:'Deployed',
      github:'',
      preview:'/',
      image:''
    }
  ]

  const projectCards=[]

  items.forEach((item,idx)=>{
    const card=el('article',{className:'project-tile',dataset:{depth:String(idx+1)}})

    const media=el('div',{className:'project-media'})
    if(item.image){
      const img=el('img',{className:'project-thumb',src:item.image,alt:''})
      media.appendChild(img)
    }

    const row=el('div',{className:'project-row'})
    const info=el('div',{className:'project-info'})
    const name=el('div',{className:'project-name',textContent:item.title})
    const status=el('div',{className:'project-status',textContent:item.status||''})
    info.appendChild(name)
    info.appendChild(status)

    const actions=el('div',{className:'project-actions'})
    if(item.github){
      const gh=el('a',{className:'icon-btn',href:item.github,target:'_blank',rel:'noopener noreferrer',ariaLabel:'GitHub'})
      const ghImg=el('img',{src:'/assets/icons/github.svg',alt:''})
      gh.appendChild(ghImg)
      actions.appendChild(gh)
    }
    if(item.preview){
      const isExternal=/^https?:\/\//.test(item.preview)
      const prev=el('a',{
        className:'icon-btn',
        href:item.preview,
        target:isExternal?'_blank':undefined,
        rel:isExternal?'noopener noreferrer':undefined,
        ariaLabel:'Preview'
      })
      prev.textContent='↗'
      actions.appendChild(prev)
    }

    row.appendChild(info)
    row.appendChild(actions)

    card.appendChild(media)
    card.appendChild(row)

    projectsWrap.appendChild(card)
    projectCards.push(card)
  })

  projects.appendChild(projectsHead)
  projects.appendChild(projectsWrap)

  const contact=el('section',{className:'contact-stage',id:'contact'})
  const contactCard=el('div',{className:'contact-grid'})
  const left=el('div',{className:'contact-left'})
  const contactKicker=el('div',{className:'section-kicker',textContent:"Let's talk"})
  const contactTitle=el('div',{className:'contact-title',textContent:'Contact'})
  const contactBody=el('div',{className:'contact-body',textContent:'Have a question or a project in mind? Feel free to reach out.'})
  const contactMeta=el('div',{className:'contact-meta'})
  const contactMetaLabel=el('div',{className:'contact-meta-label',textContent:'Location:'})
  const contactMetaValue=el('div',{className:'contact-meta-value',textContent:'New Delhi, India'})
  contactMeta.appendChild(contactMetaLabel)
  contactMeta.appendChild(contactMetaValue)
  left.appendChild(contactKicker)
  left.appendChild(contactTitle)
  left.appendChild(contactBody)
  left.appendChild(contactMeta)

  const right=el('div',{className:'contact-right'})
  const form=el('form',{className:'contact-form',autocomplete:'on'})
  const name=el('input',{className:'contact-input',type:'text',name:'name',placeholder:'Name',required:true,autocomplete:'name'})
  const email=el('input',{className:'contact-input',type:'email',name:'email',placeholder:'Email',required:true,autocomplete:'email'})
  const message=el('textarea',{className:'contact-textarea',name:'message',placeholder:'Message',required:true,rows:6})
  const submit=el('button',{className:'contact-submit',type:'submit',textContent:'Submit'})
  form.appendChild(name)
  form.appendChild(email)
  form.appendChild(message)
  form.appendChild(submit)
  right.appendChild(form)

  contactCard.appendChild(left)
  contactCard.appendChild(right)
  contact.appendChild(contactCard)

  const footer=el('footer',{className:'footer'})
  const footerInner=el('div',{className:'footer-inner'})

  const footerLeft=el('div',{className:'footer-left'})
  const socials=el('div',{className:'footer-social'})
  const socialLinks=[
    {icon:'github',href:'https://github.com/shubhammgits',label:'GitHub'},
    {icon:'linkedin',href:'https://www.linkedin.com/in/shhshubham/',label:'LinkedIn'},
    {icon:'email',href:'mailto:shubhamm18.work@gmail.com',label:'Email'}
  ]
  socialLinks.forEach((l)=>{
    const isMail=l.href.startsWith('mailto:')
    const a=el('a',{
      className:'icon-btn footer-icon',
      href:l.href,
      target:isMail?undefined:'_blank',
      rel:isMail?undefined:'noopener noreferrer',
      ariaLabel:l.label
    })
    const img=el('img',{src:`/assets/icons/${l.icon}.svg`,alt:l.label})
    a.appendChild(img)
    socials.appendChild(a)
  })

  const like=el('button',{className:'pill footer-like',type:'button',ariaLabel:'Like'})
  like.textContent='♡ 0 Likes'

  footerLeft.appendChild(socials)
  footerLeft.appendChild(like)

  const footerRight=el('div',{className:'footer-right'})
  const spotify=el('div',{className:'spotify-card',ariaLabel:'Spotify playlist'})
  const iframe=el('iframe',{
    className:'spotify-embed',
    src:'https://open.spotify.com/embed/playlist/3reHqJToLNaswBhYsS0q1P?utm_source=generator&theme=0',
    allow:'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
    loading:'lazy',
    title:'Spotify playlist'
  })
  spotify.appendChild(iframe)
  footerRight.appendChild(spotify)

  footerInner.appendChild(footerLeft)
  footerInner.appendChild(footerRight)
  footer.appendChild(footerInner)

  main.appendChild(hero)

  const divider1=el('div',{className:'section-divider',ariaHidden:'true'})
  main.appendChild(divider1)

  main.appendChild(projects)

  const divider2=el('div',{className:'section-divider',ariaHidden:'true'})
  main.appendChild(divider2)

  main.appendChild(contact)

  const divider3=el('div',{className:'section-divider',ariaHidden:'true'})
  main.appendChild(divider3)

  main.appendChild(footer)

  root.appendChild(main)

  return {
    canvasWrap,
    cards:projectCards,
    heroContent:content,
    projectsSection:projects,
    contactCard,
    contactForm:form
    ,footerLike:like
  }
}
