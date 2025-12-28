export const qs=(s,r=document)=>r.querySelector(s)
export const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s))
export const el=(t,p={})=>Object.assign(document.createElement(t),p)
