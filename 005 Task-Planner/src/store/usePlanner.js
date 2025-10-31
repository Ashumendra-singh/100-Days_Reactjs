import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export const usePlanner = create(persist(
    (set)=>({
        tasks:[],
        addTask : (payload)=>
            set((state)=>({
                tasks:[...state.tasks, payload]
            })
        ),

        deleteTask : (payload)=>
            set((state)=>({
                tasks :[ ...state.tasks.filter((item)=> item.id !== payload)]
            })
        ),

        updateStatus: (id, status)=>
            set((state)=>({
                tasks : [...state.tasks.filter((task)=>{
                    if(task.id === id){
                        task.status = status
                    }
                    return task;
                })]
            }))

    }),
    {name:"planner"}
))












