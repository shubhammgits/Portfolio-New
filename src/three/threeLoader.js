let threePromise

export const loadThree=()=>{
  if(!threePromise) threePromise=import('three')
  return threePromise
}
