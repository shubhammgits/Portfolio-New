import '../../styles/index.css'
import { mountLoader } from '../../ui/loader.js'
import { mountHomePage } from './page.js'

const boot=async()=>{
  const loader=mountLoader({label:'Home'})
  loader.setProgress(0.18)
  const dispose=mountHomePage({root:document.getElementById('app')})
  loader.setProgress(0.78)
  await new Promise((r)=>requestAnimationFrame(r))
  loader.setProgress(1)
  loader.done()
  return dispose
}

boot()
