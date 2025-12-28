export const prefersReducedMotion=()=>{
  if(typeof window==='undefined') return true
  const mq=window.matchMedia?.('(prefers-reduced-motion: reduce)')
  return Boolean(mq?.matches)
}
