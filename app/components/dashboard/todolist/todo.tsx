'use client'
import React, { useState } from 'react'
import Button from '../../ui/button'
import ModalTaskForm from '../../modals/modalTaskForm'
import { PiListMagnifyingGlass } from "react-icons/pi"
import { useSession } from 'next-auth/react'
import { MdEdit, MdDelete, MdAddCircleOutline } from "react-icons/md"

type PropsTypes = {
    todo: TodoDataTypes
}

const Todo = ({todo}: PropsTypes) => {

    const data: any = useSession()
    const user = data?.user
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalAddTask, setIsModalAddTask] = useState<null | string>(null)
    
    const onSubmit = async (values: any) => {
        setIsLoading(true)
        try {
            // const response = await addTask(user.userId as string, todoId, values)
            // if(response) {
            //     toast.success('Success add new task')
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isModalAddTask ? (
                <ModalTaskForm 
                    todoId={isModalAddTask as string}
                    handleClose={() => setIsModalAddTask(null)}/>
            ) : null}
            <div className='bg-transparent aspect-video shadow-md rounded p-5 mb-4 inline-block dark:bg-[#181818]'>
                <div className="flex-between items-start">
                    <h1 className='text-2xl text-gray-700 dark:text-gray-300 font-semibold'>{todo.title}</h1>
                    <div className="flexx">
                        <div className="icon-button">
                            <MdEdit className='text-blue-500 text-xl'/>
                        </div>
                        <div className="icon-button">
                            <MdDelete className='text-red-500 text-xl'/>
                        </div>
                    </div>
                </div>
                <p className='text-sm text-gray-700 dark:text-gray-300'>{new Date(todo.date).toLocaleDateString()}</p>
                <p className='mt-2 text-gray-700 dark:text-gray-300 line-clamp-2'>{todo.description}</p>
                <div className='flex flex-wrap mt-2 mb-2'>
                    {todo.topics.map(topic => (
                        <div key={topic} className="flexx text-sm text-gray-700 dark:text-gray-300 mr-3 mb-2">
                            <p>{topic}</p>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col space-y-2 mb-4'>
                    {todo.tasks.length > 0 ? todo.tasks.map(task => (
                        <div className="flexx space-x-2">
                            <input type="checkbox" className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                            <label className='text-gray-700 dark:text-gray-300'>Learn about nodeJS</label>
                        </div>

                    )) : (
                        <p className='text-sm text-gray-600 dark:text-gray-400'>--Your tasklist not yet created--</p>
                    )}
                </div>
                <div className="flexx space-x-2">
                    <Button type='button' variant='outline' size='sm' classes='text-sm' handleClick={() => setIsModalAddTask(todo._id)}>
                        <MdAddCircleOutline className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                        Add task
                    </Button>
                    <Button type='button' variant='outline' size='sm' classes='text-sm'>
                        <PiListMagnifyingGlass className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                        Details
                    </Button>
                </div>
            </div> 
        </>
    )
}

export default Todo