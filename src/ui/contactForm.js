import emailjs from '@emailjs/browser'

const buildMailtoUrl=({to,fromName,fromEmail,message})=>{
  const subject=`Portfolio contact from ${fromName}`
  const body=`Name: ${fromName}\nEmail: ${fromEmail}\n\n${message}`
  const params=new URLSearchParams({subject,body})
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`
}

export const bindContactForm=({form,toEmail})=>{
  const btn=form.querySelector('button[type="submit"]')

  const handler=async(e)=>{
    e.preventDefault()

    const fd=new FormData(form)
    const fromName=String(fd.get('name')||'').trim()
    const fromEmail=String(fd.get('email')||'').trim()
    const message=String(fd.get('message')||'').trim()

    if(!fromName || !fromEmail || !message) return

    const originalText=btn?.textContent||'Submit'
    if(btn){
      btn.disabled=true
      btn.textContent='Sending...'
    }

    const serviceId=import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId=import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey=import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try{
      if(serviceId && templateId && publicKey){
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email:toEmail,
            from_name:fromName,
            reply_to:fromEmail,
            message
          },
          {publicKey}
        )

        form.reset()
        if(btn){
          btn.textContent='Sent'
          window.setTimeout(()=>{
            btn.textContent=originalText
            btn.disabled=false
          },1200)
        }
        return
      }

      window.location.href=buildMailtoUrl({to:toEmail,fromName,fromEmail,message})
      if(btn){
        btn.textContent=originalText
        btn.disabled=false
      }
    }catch{
      if(btn){
        btn.textContent='Failed'
        window.setTimeout(()=>{
          btn.textContent=originalText
          btn.disabled=false
        },1400)
      }
    }
  }

  form.addEventListener('submit',handler)
  return ()=>form.removeEventListener('submit',handler)
}
