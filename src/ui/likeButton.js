const COUNT_KEY='portfolio_like_count'
const LIKED_KEY='portfolio_like_liked'

const readCount=()=>{
  const n=Number.parseInt(window.localStorage.getItem(COUNT_KEY)||'0',10)
  return Number.isFinite(n) && n>=0 ? n : 0
}

const writeCount=(n)=>{
  window.localStorage.setItem(COUNT_KEY,String(Math.max(0,Math.floor(n))))
}

const readLiked=()=>window.localStorage.getItem(LIKED_KEY)==='1'
const writeLiked=(v)=>window.localStorage.setItem(LIKED_KEY,v?'1':'0')

const render=(btn,{count,liked})=>{
  // Using the red heart emoji for “red heart” without introducing new color tokens.
  btn.textContent=`${liked ? '❤️' : '♡'} ${count} Likes`
  btn.setAttribute('aria-pressed',liked?'true':'false')
}

export const bindLikeButton=({button,initialCount=0})=>{
  if(!button) return ()=>{}

  let count=readCount()
  if(count===0 && window.localStorage.getItem(COUNT_KEY)===null) count=initialCount
  let liked=readLiked()

  render(button,{count,liked})

  const onClick=()=>{
    if(!liked){
      liked=true
      count+=1
    }else{
      liked=false
      count=Math.max(0,count-1)
    }

    writeLiked(liked)
    writeCount(count)
    render(button,{count,liked})
  }

  button.addEventListener('click',onClick)
  return ()=>button.removeEventListener('click',onClick)
}
