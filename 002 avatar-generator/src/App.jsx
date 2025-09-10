import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css';
import 'animate.css';
import { toast, ToastContainer } from 'react-toastify';

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed="
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed="
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed="
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed="
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed="
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men/"
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women/"
  }
]

function App() {

  const [src, setSrc] = useState(null)
  const [option, setOption] = useState("male");

  const generate = ()=>{
    const obj = data.find((item)=>item.value === option)
    if(option==='male' || option==='female'){
      const unique = Math.floor(Math.random()*99 +1)
      const imageUrl = `${obj.url}${unique}.jpg`
      setSrc(imageUrl)
    }
    else{
      const unique = Date.now()
      const imageUrl = `${obj.url}${unique}`
      setSrc(imageUrl)
    }
    

  }

  const onOptionChange = (e)=>{
    const value = e.target.value;
    setOption(value)
  }

  const download = (url)=>{
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Date.now()}.jpg`
    a.click()
    a.remove()
  }

  const copy = (url)=>{
    navigator.clipboard.writeText(url)
    toast.success("Image copied")
  }

  useEffect(()=>{
    generate()
  },[option])

  return (
    <div className='animate__animated animate__fadeIn min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center text-white'>
      <div className='animate__animated animate__slideInDown flex gap-4 flex-col items-center w-full max-w-min rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 p-10'>
        <img src={src || 'src/assets/src.jpg'}
        className='w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover' />
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-wide'>Avatar Generator</h1>
          <p>Generate unlimited avatar for your website</p>
        </div>

        <div className='w-full space-y-4'>

          <select value={option} onChange={onOptionChange} className='bg-slate-900/60 w-full rounded-xl p-3'>
            {
              data.map((item, index)=>(
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))
            }
          </select>
          <div className='bg-slate-900/60 rounded-xl w-full p-3'>
            {src}
          </div>
        </div>

        <div className='w-full flex gap-4'>
          <button className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 px-1 rounded-md hover:cursor-pointer font-medium hover:scale-105 transition-transform' onClick={generate}>
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change 
          </button>
          <button className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 px-1 rounded-md hover:cursor-pointer font-medium hover:scale-105 transition-transform' onClick={()=>download(src)}>
            <i className="ri-download-line mr-1"></i>
            Download 
          </button>
          <button className='flex-1 bg-gradient-to-r from-orange-600 to-amber-500 px-1 rounded-md hover:cursor-pointer font-medium hover:scale-105 transition-transform' onClick={()=>copy(src)}>
            <i className="ri-file-copy-line mr-1"></i>
            Copy 
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App
