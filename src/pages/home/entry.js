import '../../styles/index.css'
import { mountLoader } from '../../ui/loader.js'
import { mountHomePage } from './page.js'

const boot=async()=>{
  const loader=mountLoader({label:'Home'})
  try{
    loader.setProgress(0.18)
    const {ready, ...rest}=mountHomePage({root:document.getElementById('app')})
    loader.setProgress(0.42)
    await ready
    loader.setProgress(1)
    loader.done()
    return rest.dispose
  } catch (e){
    loader.setProgress(1)
    loader.done()
    throw e
  }
}

boot()
