'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/button'
import { PiListMagnifyingGlass } from "react-icons/pi"
import TaskList from '@/app/components/dashboard/todolist//taskList'
import { MdEdit, MdDelete, MdAddCircleOutline } from "react-icons/md"

type PropsTypes = {
    handleOpenModalAddTask: () => void
    handleOpenModalDelete: () => void
    handleOpenModalEdit: () => void
    todo: TodoDataTypes
}
const Todo = ({handleOpenModalAddTask, handleOpenModalDelete, handleOpenModalEdit, todo}: PropsTypes) => {
    const router = useRouter()
    return (
        <div className='bg-transparent aspect-video shadow-md rounded p-5 mb-4 inline-block dark:bg-[#181818]'>
            <div className="flex-between items-start">
                <h1 className='text-2xl text-gray-700 dark:text-gray-300 font-semibold line-clamp-2 break-all mr-2'>{todo.title}</h1>
                <div className="flexx">
                    <div className="icon-button" onClick={handleOpenModalEdit}>
                        <MdEdit className='text-blue-500 text-xl'/>
                    </div>
                    <div className="icon-button" onClick={handleOpenModalDelete}>
                        <MdDelete className='text-red-500 text-xl'/>
                    </div>
                </div>
            </div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>{todo.date}</p>
            <p className='mt-2 text-gray-700 dark:text-gray-300 line-clamp-2'>{todo.description}</p>
            <div className='flex flex-wrap mt-2 mb-2'>
                {todo.topics.map(topic => (
                    <div key={topic} className="flexx text-sm text-gray-700 dark:text-gray-300 mr-3 mb-2">
                        <p>{topic}</p>
                    </div>
                ))}
            </div>
            <TaskList tasks={todo.tasks}/>
            <div className="flexx space-x-2">
                <Button type='button' variant='outline' size='sm' classes='text-sm' handleClick={handleOpenModalAddTask}>
                    <MdAddCircleOutline className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                    Add task
                </Button>
                <Button type='button' variant='outline' size='sm' classes='text-sm' handleClick={() => router.push(`/dashboard/todo-list/todo/${todo._id}`)}>
                    <PiListMagnifyingGlass className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                    Details
                </Button>
            </div>
        </div> 
    )
}

export default Todo