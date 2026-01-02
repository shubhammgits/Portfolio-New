export const bindResize=({renderer,camera,onResize,pixelRatioCap=2,element}={})=>{
  let lastW=0
  let lastH=0
  const handle=()=>{
    const rect=element?.getBoundingClientRect?.()
    const w=Math.max(1,Math.floor(rect?.width||window.innerWidth))
    const h=Math.max(1,Math.floor(rect?.height||window.innerHeight))
    if(w===lastW && h===lastH) return
    lastW=w
    lastH=h
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,pixelRatioCap))
    renderer.setSize(w,h,false)
    if(camera){
      camera.aspect=w/h
      camera.updateProjectionMatrix()
    }
    onResize?.(w,h)
  }
  window.addEventListener('resize',handle,{passive:true})
  handle()
  return ()=>window.removeEventListener('resize',handle)
}
