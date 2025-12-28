import { el } from '../core/dom.js'

export const mountLoader=({label})=>{
  const root=el('div',{className:'loader',id:'loader'})
  const inner=el('div',{className:'loader-inner'})
  const bar=el('div',{className:'loader-bar'})
  const fill=el('div',{})
  const meta=el('div',{className:'loader-meta'})
  const left=el('div',{textContent:label})
  const right=el('div',{textContent:'Loading'})
  bar.appendChild(fill)
  meta.appendChild(left)
  meta.appendChild(right)
  inner.appendChild(bar)
  inner.appendChild(meta)
  root.appendChild(inner)
  document.body.appendChild(root)
  let displayed=0
  let target=0
  let raf=0
  const tick=()=>{
    displayed+=Math.max(0.02,(target-displayed)*0.18)
    if(displayed>target) displayed=target
    const pct=Math.min(100,Math.max(0,displayed*100))
    fill.style.width=`${pct.toFixed(0)}%`
    right.textContent=`${pct.toFixed(0)}%`
    if(displayed>=0.999){
      cancelAnimationFrame(raf)
      raf=0
      root.style.transition='opacity 260ms ease'
      root.style.opacity='0'
      window.setTimeout(()=>{ root.remove() },320)
      return
    }
    raf=requestAnimationFrame(tick)
  }
  const setProgress=(v)=>{
    target=Math.max(target,Math.min(1,v))
    if(!raf) raf=requestAnimationFrame(tick)
  }
  const done=()=>{
    setProgress(1)
  }
  setProgress(0.08)
  return { setProgress, done }
}
