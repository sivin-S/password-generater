import { useEffect, useState,useCallback,useRef } from "react"

function App() {
  const [password,setPassword] = useState('')
  const [isSymbolAllowed,setCharAllowed] = useState(false)
  const [isNumberAllowed,setNumberAllowed] = useState(false)
  const [length,setLength] = useState(8)
  const passCopy = useRef(null)

  const  passGenerator = useCallback(function (){
     let str='ABCDEFGHIJKLMNOPQRSTUVWXYZ' 
     if(isNumberAllowed) str+='0123456789'
     if(isSymbolAllowed) str+='@!$%&^*()'
     let pass=''
     for(let index=1;index<str.length;index++){
        const randomIndexPick = Math.floor(Math.random()*length+1)
        pass+=str.charAt(randomIndexPick)
     }
     setPassword(pass)
  },[isNumberAllowed,isSymbolAllowed,length])

 // generate password...
  useEffect(()=>{
    passGenerator()
  },[length,isNumberAllowed,isSymbolAllowed])

  // console.log();
  
  let selection = function(){
    let {current} = passCopy
    
    window.navigator.clipboard.writeText(password)
    current.style.color = (current.style.color==='green') ? '' : 'green'
  }
  
  return (
    <div className="border flex flex-col border-white w-[35rem] h-[11.5rem] rounded-lg">
      <div className="border  h-[30%] font-semibold text-2xl text-center"><h2>Password generator</h2></div>
      <div className="border  h-[30%] flex items-center justify-center">
        <div className="w-full h-full flex">
        <input ref={passCopy} type="text" readOnly name="" value={password} id="" className="w-full text-center py-[0.7rem]"/>
        <button onClick={ selection } className="font-semibold px-5 py-[0.7rem] bg-blue-500">copy</button>
        </div>
      </div>
      <div className="h-[30%] flex items-center justify-center gap-5">
        <input type="range"
         onChange={(e)=> setLength(e.target.value)}
        min={8} max={44}  value={length} className="accent-green-600" id="range"/>
        <label htmlFor="range">range:{length}</label>
        <label htmlFor="numberAllowed">Numbers</label>
        <input type="checkbox" className="accent-green-600" id="numberAllowed"
        onClick={()=>setNumberAllowed((prev)=> !prev)}
        />
        <label htmlFor="characterAllowed">Characters</label>
        <input type="checkbox"  className="accent-green-600" id="characterAllowed"
         onClick={()=>setCharAllowed((prev)=> !prev)}
        />
      </div>
    </div>
  )
}

export default App