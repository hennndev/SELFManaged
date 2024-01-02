'use client'
import React from 'react'
import Task from '@/app/components/dashboard/todolist/task'

type PropsTypes = {
    tasks:  Array<TaskDataTypes>
}
const TaskList = ({tasks}: PropsTypes) => {
    return (
        <div className='flex flex-col space-y-2 mb-4'>
            {tasks.length > 0 ? tasks.map((task) => (
                <Task key={task._id} task={task}/>
            )) : (
                <p className='text-sm text-gray-600 dark:text-gray-400'>--Your tasklist has not yet created--</p>
            )}
        </div>
    )
}
export default TaskList