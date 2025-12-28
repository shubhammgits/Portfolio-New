import '../../styles/index.css'
import { mountLoader } from '../../ui/loader.js'
import { mountGesturePage } from './page.js'

const boot=async()=>{
  const loader=mountLoader({label:'Gesture'})
  loader.setProgress(0.16)
  const {ready, ...rest}=mountGesturePage({root:document.getElementById('app')})
  loader.setProgress(0.44)
  await ready
  loader.setProgress(1)
  loader.done()
  return rest.dispose
}

boot()
