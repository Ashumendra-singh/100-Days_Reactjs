import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import getYouTubeID from 'get-youtube-id';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const urlModel = [
    {
      width:120,
      height:90,
      url:'https://img.youtube.com/vi',
      filename:"default.jpg"
    },
    {
      width:320,
      height:180,
      url:'https://img.youtube.com/vi',
      filename:"mqdefault.jpg"
    },
    {
      width:480,
      height:360,
      url:'https://img.youtube.com/vi',
      filename:"hqdefault.jpg"
    },
    {
      width:640,
      height:480,
      url:'https://img.youtube.com/vi',
      filename:"sddefault.jpg"
    },
    {
      width:1280,
      height:720,
      url:'https://img.youtube.com/vi',
      filename:"maxresdefault.jpg"
    }
  ]

  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState([]);

  const fetchThumbnail = (e)=>{
    e.preventDefault()
    const videoId = getYouTubeID(url)
    if(videoId){
      const model = urlModel.map((item)=>{
        return {
          ...item,
          url: `${item.url}/${videoId}/${item.filename}`
        }
      })

      setThumbnail(model)
      
    }else{
      toast.error("Invalid video Url")
    }

  }



  return (
    <div className='min-h-screen p-8 bg-gray-200 flex flex-col gap-12'>
      <div className='text-center flex flex-col gap-6'>
        <h1 className='text-3xl  font-bold'>
          Youtube Thumbnail Downloader <span className='text-red-400'>{url}</span>
        </h1>
        <form onSubmit={fetchThumbnail}>
          <input
            className='bg-white px-2 py-1 rounded-l-sm outline-none'
            placeholder='Enter youtube video Url'
            onChange={(e)=>setUrl(e.target.value)}
          type="url" />
          <button type='submit' className='bg-blue-700 px-2 py-1 rounded-r-sm text-white cursor-pointer'><i class="ri-search-line"></i> Search</button>
        </form>
      </div>

      <div className='grid grid-cols-3 gap-6 w-10/12 mx-auto '>

        {
          thumbnail.map((item, index)=>(
            
            <div className='bg-white   rounded-lg overflow-hidden ' key={index}>
              {console.log(item.url)}
              <img src={item.url} alt="img" className='w-full object-cover object-center h-[180px] '/>
              <div className='p-3 bg-white rounded-xl flex justify-between'>
                <h1 className='text-xl font-medium'>{item.width} x {item.height}</h1>
                <a href={item.url} target='_blank'>
                  <button type='submit' className='bg-green-500 px-2 py-1 rounded-sm text-white cursor-pointer'><i class="ri-download-line"></i> Download</button>
                </a>
              </div>  
            </div>
          ))
        }
      
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
