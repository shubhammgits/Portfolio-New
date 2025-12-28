export const makeRafLoop=({update})=>{
  let raf=0
  let last=performance.now()
  const tick=(now)=>{
    const dt=Math.min(0.05,(now-last)/1000)
    last=now
    update(dt,now/1000)
    raf=requestAnimationFrame(tick)
  }
  return {
    start(){ if(!raf) raf=requestAnimationFrame(tick) },
    stop(){ if(raf) cancelAnimationFrame(raf); raf=0 }
  }
}
