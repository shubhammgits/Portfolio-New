import { Hands } from '@mediapipe/hands'

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v))

export const startHands=({onGesture,onStatus})=>{
  let stream
  let raf=0
  let disposed=false
  let inFlight=false

  const video=document.createElement('video')
  video.playsInline=true
  video.muted=true
  video.autoplay=true
  video.style.position='fixed'
  video.style.left='-9999px'
  video.style.top='-9999px'
  video.style.width='1px'
  video.style.height='1px'

  const ready=Promise.resolve().then(async()=>{
    onStatus?.('Requesting camera')
    try{
      stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false})
    } catch {
      onStatus?.('Camera unavailable')
      onGesture?.(null)
      return {mode:'fallback'}
    }

    if(disposed) return {mode:'fallback'}

    document.body.appendChild(video)
    video.srcObject=stream

    await new Promise((resolve,reject)=>{
      const onOk=()=>{ cleanup(); resolve() }
      const onErr=()=>{ cleanup(); reject(new Error('video')) }
      const cleanup=()=>{
        video.removeEventListener('loadeddata',onOk)
        video.removeEventListener('error',onErr)
      }
      video.addEventListener('loadeddata',onOk,{once:true})
      video.addEventListener('error',onErr,{once:true})
    })

    await video.play().catch(()=>{})

    const hands=new Hands({
      locateFile:(file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
    })

    hands.setOptions({
      modelComplexity:0,
      maxNumHands:1,
      minDetectionConfidence:0.55,
      minTrackingConfidence:0.55
    })

    hands.onResults((results)=>{
      const lm=results.multiHandLandmarks?.[0]
      if(!lm){
        onGesture?.(null)
        return
      }
      const a=lm[4]
      const b=lm[8]
      const dx=a.x-b.x
      const dy=a.y-b.y
      const d=Math.hypot(dx,dy)
      const v=clamp((d-0.03)/(0.18-0.03),0,1)
      onGesture?.(v)
    })

    const loop=async()=>{
      if(disposed) return
      if(inFlight){
        raf=requestAnimationFrame(loop)
        return
      }
      inFlight=true
      try{
        await hands.send({image:video})
      } catch {
        onStatus?.('Gesture fallback')
        onGesture?.(null)
      }
      inFlight=false
      raf=requestAnimationFrame(loop)
    }

    onStatus?.('Gesture active')
    raf=requestAnimationFrame(loop)

    return {mode:'hands',hands}
  })

  const dispose=()=>{
    disposed=true
    if(raf) cancelAnimationFrame(raf)
    raf=0
    try{ video.remove() } catch {}
    try{ stream?.getTracks?.().forEach(t=>t.stop()) } catch {}
  }

  return { ready, dispose }
}
