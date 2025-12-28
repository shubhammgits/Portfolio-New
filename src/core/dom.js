export const qs=(s,r=document)=>r.querySelector(s)
export const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s))
export const el=(t,p={})=>{
	const node=document.createElement(t)
	for(const [k,v] of Object.entries(p||{})){
		if(k==='dataset' && v && typeof v==='object'){
			for(const [dk,dv] of Object.entries(v)) node.dataset[dk]=String(dv)
			continue
		}
		if(k==='style' && v && typeof v==='object'){
			Object.assign(node.style,v)
			continue
		}
		if(k in node){
			node[k]=v
			continue
		}
		if(v===false || v==null) continue
		node.setAttribute(k,v===true ? '' : String(v))
	}
	return node
}
