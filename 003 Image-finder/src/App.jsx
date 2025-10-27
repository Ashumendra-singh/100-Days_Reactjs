import React, { useEffect, useState } from 'react'
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "remixicon/fonts/remixicon.css";


const API_KEY = "F4aMfE1NrkS8Mqm5kuukKZIoc7adRojNohgm0GgQNIQ0h3dAythuLsiQ"

function App() {
  
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("nature")

  const fetchImage = async()=>{
    try{
      setLoading(true)
      const options ={
        headers:{
          Authorization: API_KEY
        }  
      }
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, options)
      console.log(res.data)
      setPhotos([...photos, ...res.data.photos])
     
      
    }
    catch(e){
      toast.error("Failed to fetch images")
      
    }
    finally{
      setLoading(false)
    }
  }

  const loadMore = ()=>{
    setPage(pre => pre+1)
    
  }
  
  const search = (e)=>{
    e.preventDefault();
    const value = e.target.value;
    setPhotos([])
    setQuery(value)
  }

  useEffect(()=>{
    fetchImage();
    console.log(query)
  },[page, query])

  return (
    <div className='bg-blue-100/85 min-h-screen flex flex-col items-center py-8 gap-12 animate__animated animate__fadeIn'>
      <h1 className='text-4xl font-bold text-indigo-600'>📸 Image Gallery</h1>
      <form>
        <input onChange={search}  type="text"  className=' px-3 py-2 bg-white rounded-l-xl w-[300px] focus:outline-none' placeholder='Search image hare'/>
        <button  className='bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-bold px-9 py-2 rounded-r-xl hover:scale-102 hover:cursor-pointer transition-transform'>Search</button>
      </form>

      <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6 w-3/4'>
        {
          photos.map((item, index)=>(
            <div key={index} className=' rounded-xl mb-8 bg-slate-100 overflow-hidden'>
              <img src={`${item.src.large}`} alt={item.alt} className="w-full h-[180px] rounded-t-lg object-cover hover:scale-110 transition-transform duration-300"/>
              <div className='p-3'>
                <h1 className='text-md'>{item.photographer}</h1>
                <a target='_blank' href={item.src.large} className='flex items-center justify-center gap-1 mt-2 bg-gradient-to-tr hover:scale-104 hover:cursor-pointer transition-transform duration-300 from-cyan-800 to-green-400 rounded-xl px-2 py-1' >
                  <i class="ri-download-line"></i>
                  <p>
                    Download
                  </p>
                </a>
              </div>
            </div>
          ))
        }
      </div>
      {
        loading &&
        <p className='text-gray-400 mt-4'>
          Loading...
        </p>
      }
      <button onClick={loadMore} className='bg-rose-500 px-12 py-2 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>Load more</button>
      <ToastContainer/>
    </div>
  )
}

export default App
