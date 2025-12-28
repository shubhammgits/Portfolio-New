import * as THREE from 'three'

export const createRenderer=({canvas,alpha=false})=>{
  const renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha,powerPreference:'high-performance'})
  renderer.setClearAlpha(alpha?0:1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2))
  renderer.setSize(window.innerWidth,window.innerHeight,false)
  renderer.outputColorSpace=THREE.SRGBColorSpace
  return renderer
}
