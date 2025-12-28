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
  let p=0
  const setProgress=(v)=>{
    p=Math.max(0,Math.min(1,v))
    fill.style.width=`${(p*100).toFixed(0)}%`
    right.textContent=`${(p*100).toFixed(0)}%`
  }
  const done=()=>{
    root.style.transition='opacity 240ms ease'
    root.style.opacity='0'
    window.setTimeout(()=>{ root.remove() },260)
  }
  setProgress(0.08)
  return { setProgress, done }
}
