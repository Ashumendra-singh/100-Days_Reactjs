import React, { useEffect } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import {Badge, Card, Tag, Select, Modal, Form, Input, Button, DatePicker, Empty} from 'antd'

import { Plus } from 'lucide-react';
import { useState } from 'react'
import { usePlanner } from './store/usePlanner';
import '@ant-design/v5-patch-for-react-19';
import moment from 'moment';


function App() {
  const [form ] = Form.useForm()
  const [date , setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString())
  const {tasks, addTask, deleteTask, updateStatus} = usePlanner();

  const highest = tasks.filter((item)=>{
    let value = new Date(item.createdAt)
    value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    let d2 = null
    if(date!==null)
      d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if(d2 === null){
      return item.priority === 'highest'
    }
    return item.priority === 'highest' && value.getTime()===d2.getTime()
  } 
  )

  const medium = tasks.filter((item)=>
    {
    let value = new Date(item.createdAt)
    value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    let d2 = null
    if(date!==null)
      d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if(d2 === null)
      return item.priority === 'medium'
    return item.priority === 'medium' && value.getTime()===d2.getTime()
  } 
  )

  const lowest = tasks.filter((item)=>
    {
    let value = new Date(item.createdAt)
    value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    let d2 = null
    if(date!==null)
      d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if(d2 === null)
      return item.priority === 'lowest'
    return item.priority === 'lowest' && value.getTime()===d2.getTime()
  } 
  )
  

  const tsetDate = (d)=>{
    setDate(new Date(d))
  }
  const createTask = (value)=>{
    value.status = 'Pending'
    value.id = Date.now();
    value.createdAt = new Date()
    addTask(value)
    handleClose()
  }

  const handleClose = ()=>{
    setOpen((pre)=>!pre)
    form.resetFields()
  }

  const deleteTaskbyid = (id)=>{
    deleteTask(id)
  }
  
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimer(new Date().toLocaleTimeString())
    },1000)
    

    return ()=>{
      clearInterval(interval)
    }
  },[])

  return (

      <div className='bg-gray-200 h-screen overflow-hidden'>
        <nav className='bg-linear-to-r from-rose-400 via-slate-800 to-slate-900 h-[60px] text-white fixed top-0 left-0 w-full flex px-8 items-center justify-between'>
          <div className='flex items-center'>
            <button className='border-none font-medium text-xl w-10 h-10 rounded-full bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(268.9,81.87712%,_48.30516%)_100%)]'>PL</button>
            <h1 className='font-medium text-xl p-px'>anner </h1>
          </div>
          <div className='flex gap-4'>
            <h1 className='text-2xl font-bold hidden sm:block'>{timer} </h1>
            <DatePicker className='py-1.5' onChange={(v)=>tsetDate(v && v.$d)}/>
            <button className='top-2 z-10 cursor-pointer hover:scale-102 transition-all duration-300 px-2 py-1 bg-linear-to-br from-blue-600 via-blue-400 to-blue-600 rounded-md flex gap-0 sm:gap-2 text-white font-medium ' onClick={()=>setOpen((pre)=>!pre)}>
              <Plus/>
              <span>
                Add Task
              </span>
            </button>
          </div>
        </nav>

        <section className='fixed top-[60px]  2xl:left-8   h-[calc(100%-120px)] w-full overflow-x-auto lg:overflow-y-auto flex flex-col lg:flex-row gap-8 items-center p-4 xl:justify-center'> 
          <div className='w-[350px] lg:min-w-[400px] lg:max-w-[450px] '>
            <Badge.Ribbon
            text="Highest"
              color='red'
            >
              
              <div className='bg-white z-10  p-4 rounded-lg h-[350px] lg:h-[calc(100vh-150px)] min-h-0 overflow-auto'>
                <div className='space-y-2'>
                  
                <div className='flex flex-col gap-2'>
                  {
                    highest.length === 0 && (
                      <>
                        <Empty description={'There is no Task added as a highest priority'}/>
                        <button className='mx-auto my-8  top-2 z-10 cursor-pointer hover:scale-102 transition-all duration-300 px-2 py-1 bg-linear-to-br from-blue-600 via-blue-400 to-blue-600 rounded-md flex gap-0 sm:gap-2 text-white font-medium ' onClick={()=>setOpen((pre)=>!pre)}>
                          <Plus/>
                          <span>
                            Add Task
                          </span>
                        </button>
                      </>
                    )
                  }
                    {
                      highest.map((item, index)=>(
                        <Card  className=' bg-red-400' key={index} hoverable>
                          <Card.Meta title={item.title} description={item.description} />
                          <div className='flex flex-row justify-between pt-8'>
                            <div className='flex flex-row'>
                              <Tag>{item.status}</Tag>
                              <Tag className='bg-rose-500! border-rose-500! text-white!' onClick={()=>deleteTaskbyid(item.id)}>Delete</Tag>
                            </div>
                            <Select size='small' placeholder='Change Status' className='w-20' onChange={(v)=>updateStatus(item.id, v)}>
                              <Select.Option value='Pending'>
                                  Pending
                              </Select.Option>
                              <Select.Option value='InProgress'>
                                  InProgress
                              </Select.Option>
                              <Select.Option value='Completed'>
                                  Completed
                              </Select.Option>
                            </Select>
                          </div>
                            <label className='text-slate-600 text-xs flex justify-end mt-3'>{moment(item.createdAt).format('DD MMM YYYY  hh:mm ')}</label>
                        </Card> 
                      ))
                    }
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
          </div>
          <div className='w-[350px] lg:min-w-[400px] lg:max-w-[450px]'>
            <Badge.Ribbon
            text="medium"
              color='blue'
            >
              
              <div className='bg-white z-10  p-4 rounded-lg h-[350px] lg:h-[calc(100vh-150px)] min-h-0 overflow-auto'>
                <div className='space-y-2'>
                  
                <div className='flex flex-col gap-2'>
                  {
                    medium.length === 0 && (
                      <>
                        <Empty description={'There is no Task added as a medium priority'}/>
                        <button className='mx-auto my-8  top-2 z-10 cursor-pointer hover:scale-102 transition-all duration-300 px-2 py-1 bg-linear-to-br from-blue-600 via-blue-400 to-blue-600 rounded-md flex gap-0 sm:gap-2 text-white font-medium ' onClick={()=>setOpen((pre)=>!pre)}>
                          <Plus/>
                          <span>
                            Add Task
                          </span>
                        </button>
                      </>
                    )
                  }
                    {
                      medium.map((item, index)=>(
                        <Card  className=' bg-red-400' key={index} hoverable>
                          <Card.Meta title={item.title} description={item.description}/>
                          <div className='flex flex-row justify-between pt-8'>
                            <div className='flex flex-row'>
                              <Tag>{item.status}</Tag>
                              <Tag className='bg-rose-500! border-rose-500! text-white!' onClick={()=>deleteTaskbyid(item.id)}>Delete</Tag>
                            </div>
                            <Select size='small' placeholder='Change Status' className='w-20' onChange={(v)=>updateStatus(item.id, v)}>
                              <Select.Option value='Pending'>
                                  Pending
                              </Select.Option>
                              <Select.Option value='InProgress'>
                                  InProgress
                              </Select.Option>
                              <Select.Option value='Completed'>
                                  Completed
                              </Select.Option>
                            </Select>
                          </div>
                          <label className='text-slate-600 text-xs flex justify-end mt-3'>{moment(item.createdAt).format('DD MMM YYYY  hh:mm ')}</label>
                        </Card> 
                      ))
                    }
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
          </div>
          <div className='w-[350px] lg:min-w-[400px] lg:max-w-[450px]'>
            <Badge.Ribbon
            text="Lowest"
              color='green'
            >
              
              <div className='bg-white z-10  p-4 rounded-lg h-[350px] lg:h-[calc(100vh-150px)] min-h-0 overflow-auto'>
                <div className='space-y-2'>
                  
                <div className='flex flex-col gap-2'>
                  {
                    lowest.length === 0 && (
                      <>
                        <Empty description={'There is no Task added as a lowest priority'}/>
                        <button className='mx-auto my-8 top-2 z-10 cursor-pointer hover:scale-102 transition-all duration-300 px-2 py-1 bg-linear-to-br from-blue-600 via-blue-400 to-blue-600 rounded-md flex gap-0 sm:gap-2 text-white font-medium ' onClick={()=>setOpen((pre)=>!pre)}>
                          <Plus/>
                          <span>
                            Add Task
                          </span>
                        </button>
                      </>
                    )
                  }
                    {
                      lowest.map((item, index)=>(
                        <Card  className=' bg-red-400' key={index} hoverable>
                          <Card.Meta title={item.title} description={item.description}/>
                          
                          <div className='flex flex-row justify-between pt-8'>
                            <div className='flex flex-row'>
                              <Tag>{item.status}</Tag>
                              <Tag className='bg-rose-500! border-rose-500! text-white!' onClick={()=>deleteTaskbyid(item.id)}>Delete</Tag>
                            </div>
                            <Select size='small' placeholder='Change Status' className='w-20' onChange={(v)=>updateStatus(item.id, v)}>
                              <Select.Option value='Pending'>
                                  Pending
                              </Select.Option>
                              <Select.Option value='InProgress'>
                                  InProgress
                              </Select.Option>
                              <Select.Option value='Completed'>
                                  Completed
                              </Select.Option>
                            </Select>
                          </div>
                          <label className='text-slate-600 text-xs flex justify-end mt-3'>{moment(item.createdAt).format('DD MMM YYYY  hh:mm ')}</label>
                        </Card> 
                      ))
                    }
                  </div>
                </div>
              </div>
            </Badge.Ribbon>
          </div>
        </section>

        <footer className='bg-linear-to-r from-slate-900 via-slate-800 to-rose-400 text-white h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-8'>
            <h1 className='text-2xl font-bold'>Total Task - {tasks.length}</h1>
            
        </footer>

        <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false}>
              <Form onFinish={createTask} form={form}>
                <h1 className='text-lg font-medium mb-4' >New Task</h1>
                <Form.Item 
                  name={'title'}
                  rules={[{required:true}]}
                >
                  <Input placeholder='Task Name'
                  />
                  
                </Form.Item>

                <Form.Item 
                  name={'description'}
                  rules={[{required:true}]}
                >
                  <Input.TextArea placeholder='Task Description'
                    rows={5}
                  />
                  
                </Form.Item>
                <Form.Item 
                  name={'priority'}
                  rules={[{required:true}]}
                >
                <Select size='large' placeholder="Choose priority">
                  <Select.Option value="highest" >
                    Highest
                  </Select.Option>
                  <Select.Option value="medium">
                    Midium
                  </Select.Option>
                  <Select.Option value="lowest">
                    Lowest
                  </Select.Option>
                </Select>
                  
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary'>Submit</Button>
                </Form.Item>
              </Form>
        </Modal>
      
      </div>
    
  )
}

export default App
