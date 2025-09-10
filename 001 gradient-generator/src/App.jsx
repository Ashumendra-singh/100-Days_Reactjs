import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [num, setNum] = useState(12);
  const [type, setType] = useState('linear');
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = ()=>{
    const rgb = 255*255*255
    const random = Math.floor(Math.random()*rgb)
    
    const hexCode = random.toString(16)
    const colorHex = hexCode.padStart(6, '0')
    
    return `#${colorHex}`;
    
  }


  const onCopy = (css)=>{
    navigator.clipboard.writeText(css)
    toast.success("Gradient code copied")
  }

  useEffect(()=>{
    generateGradient()
  },[num, type]);

  function getRandomString(str1, str2) {
  return Math.random() < 0.5 ? str1 : str2;
}

  const generateGradient = ()=>{
    const colors = [];
    for(let i=0; i<num; i++){
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random()*360);
      const degreeString = `${degree}deg`
      if(type==='radial'){
        const shape = getRandomString("circle", "ellipse")
        colors.push({
        gradient:`radial-gradient(${shape}, ${color1}, ${color2})`,
        css: `background: 'radial-gradient(${shape}, ${color1}, ${color2})'`
      })
      }
      else
      colors.push({
        gradient:`linear-gradient(${degreeString}, ${color1}, ${color2})`,
        css: `background: 'linear-gradient(${degreeString}, ${color1}, ${color2})'`
      })
    }
    
    setGradients(colors)
  }


  return (
    <div className='min-h-screen bg-white py-12'>
      <div className='w-3/4 mx-auto space-y-12'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold'>
           🎨 Gradient Generator
          </h1>

          <div className='flex gap-4'>
            <input className='border-slate-300 rounded-lg border w-[100px] p-2 hover:cursor-pointer'
            placeholder='12'
            type='number'
            min='1'
            onChange={(e)=>{
              setNum(e.target.value)
            }}/>

            <select  className='border-slate-300 rounded-lg border w-[100px] p-2 hover:cursor-pointer' onChange={(e)=>{setType(e.target.value)}}>
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>

            <button className='border rounded-lg border-slate-300 px-10 hover:cursor-pointer bg-red-500 text-white' onClick={generateGradient}>Generate</button>
          </div>
          
        </div>
        
        <div className='grid grid-cols-4 gap-4'>
          {
            gradients.map((item, index) => (
              
              <div key={index}
              className='h-[150px] w-[200px] rounded-xl relative' 
              style={{
                background: item.gradient

              }}>
              <button onClick={()=>onCopy(item.css)} className='bg-black/50 hover:bg-black text-white rounded-lg absolute bottom-3 right-3 py-1 px-2 text-[10px] uppercase hover:cursor-pointer'>Copy</button>

              </div>
            ))
          }
        </div>
      
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
