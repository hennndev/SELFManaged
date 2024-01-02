'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { FaExclamation } from "react-icons/fa"
import { toggleTask } from '@/app/lib/actions/taskActions'

type PropsTypes = {
    isTable?: boolean
    task: TaskDataTypes
}
const Task = ({isTable, task}: PropsTypes) => {
    const [checked, setChecked] = useState(false)
    const [isClient, setIsClient] = useState<boolean>(false)
    const handleToggleTask = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsClient(true)
        setChecked(e.target.checked)
        toggleHandler(e.target.checked)
    }
    const toggleHandler = async (value: boolean) => await toggleTask(task._id, value)
    useEffect(() => {
        if(task) {
            setChecked(task.is_done)
        }
    }, [])
    return (
        <div className="flex-between">
            <div className="flexx space-x-2">
                <input type="checkbox" id={task.title} checked={isClient ? checked : task.is_done} className={`w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`} onChange={handleToggleTask}/>
                {!isTable ? (
                    <label  htmlFor={task.title} className={`flexx ${checked ? 'line-through text-gray-500 dark:text-gray-700' : 'text-gray-700 dark:text-gray-300'}`}>
                        {task?.title as string} {task.is_important ? <FaExclamation className='ml-1 text-red-600 text-md'/> : ''}
                    </label>
                ) : null}
            </div>
        </div>
    )
}

export default Task