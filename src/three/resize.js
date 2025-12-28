export const bindResize=({renderer,camera,onResize})=>{
  const handle=()=>{
    const w=window.innerWidth
    const h=window.innerHeight
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
