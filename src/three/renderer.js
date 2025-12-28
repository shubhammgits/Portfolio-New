import { loadThree } from './threeLoader.js'

export const createRenderer=async({THREE,canvas,alpha=false,pixelRatioCap=2})=>{
  const T=THREE||await loadThree()
  const renderer=new T.WebGLRenderer({canvas,antialias:false,alpha,powerPreference:'high-performance'})
  renderer.setClearAlpha(alpha?0:1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,pixelRatioCap))
  renderer.setSize(window.innerWidth,window.innerHeight,false)
  renderer.outputColorSpace=T.SRGBColorSpace
  return renderer
}
