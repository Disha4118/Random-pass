import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [char, setchar] = useState(false)
  const [number, setnumber] = useState(false)
  const [password, setpassword] = useState("")
  const ref = useRef(null)
  const passgene = useCallback(
    () => {
      let pass=""
      let s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(char)
        s+="!@#$%^&*(){}[]"
      if(number)
        s+="0123456789"
      for (let i=1; i<=length; i++) {
        let index=Math.floor(Math.random()*s.length+1)
        pass+=s.charAt(index)
      }
      setpassword(pass)
    }
    , [length, char, number, setpassword])
    const copypass=useCallback(()=>{
      window.navigator.clipboard.writeText(password)
    })
    useEffect(()=>{
      passgene()
    }, [length, char, number, passgene])
  return (
    <>
      <div className='w-full max-w-md mx-auto my-8 bg-gray-800 px-4 rounded-lg text-orange-400 '>
      <h1 className='text-center text-white text-2xl'>Password Generator</h1>
      <div className='rounded-lg overflow-hidden mb-6 mt-4 flex shadow '>
        <input type="text" 
        value={password}
        placeholder='Password'
        readOnly 
        reference={ref} 
        className='w-full'
        />
        <button onClick={copypass()} className='bg-black size-15 text-yellow-300 px-2'>Copy</button>
      </div>
      <div className='flex gap-x-2'>
        <div className='flex items-center gap-x-1 text-orange-400 '>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer' 
        onChange={(e) => {setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
        </div>
        <div className='ml-4 text-orange-400' >
          <input type="checkbox" 
          onChange={()=>{setchar((prev)=>!prev)}} />
          <label className='px-1 '>Character</label>
        </div>
        <div className='text-orange-400' >
          <input type="checkbox" 
          onChange={()=>{setnumber((prev)=>!prev)}} />
          <label className='px-1 '>Number</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
