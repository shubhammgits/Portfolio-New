import '../../styles/index.css'
import { mountLoader } from '../../ui/loader.js'
import { mountGesturePage } from './page.js'

const boot=async()=>{
  const loader=mountLoader({label:'Gesture'})
  loader.setProgress(0.16)
  const dispose=mountGesturePage({root:document.getElementById('app')})
  loader.setProgress(0.82)
  await new Promise((r)=>requestAnimationFrame(r))
  loader.setProgress(1)
  loader.done()
  return dispose
}

boot()
