'use client'
import React, { useState, Fragment, ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'
import { FaExclamation } from 'react-icons/fa'
import { MdModeEdit, MdDelete } from "react-icons/md"
import { useModalEditStore } from '@/app/store/zustand'
import { AnimatePresence, motion } from 'framer-motion'
import Task from '@/app/components/dashboard/todolist/task'
import ModalTaskForm from '@/app/components/modals/modalTaskForm'
import { toggleAllTask, deleteTask, } from '@/app/lib/actions/taskActions'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'

type PropsTypes = {
    tasks: TaskDataTypes[]
}
const TasksTable = ({tasks}: PropsTypes) => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalEditTask, setIsModalEditTask] = useState<null | string>(null)
    const [isModalDeleteTask, setIsModalDeleteTask] = useState<null | string>(null)
    const { handleDataEdit } = useModalEditStore()

    const handleOpenModalEditTask = (task: TaskDataTypes) => {
        if(task.is_done) {
            toast.error('This task has been done, you can uncheck to edit this task')
        } else {
            setIsModalEditTask(task._id)
            handleDataEdit({
                _id: task._id,
                title: task.title,
                timeStart: task.time.time_start,
                timeEnd: task.time.time_end,
                description: task.description,
                isImportant: task.is_important
            })
        }
    }
    const handleDeleteTask = async () => {
        setIsLoading(true)
        try {
            const response = await deleteTask(isModalDeleteTask as string, params.todoId as string)
            if(response) {
                toast.success('Success delete todo')
                setIsModalDeleteTask(null)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const handleCheckedAllTask = async (e: ChangeEvent<HTMLInputElement>) => {
        await toggleAllTask(params.todoId as string, e.target.checked as boolean)
    }
    const allTasksDone = tasks.length > 0 ? tasks.every(task => task.is_done) : false
    
    return (
        <Fragment>
            {isModalEditTask ? (
                <ModalTaskForm 
                    isEdit
                    todoId={params.todoId as string}
                    handleClose={() => setIsModalEditTask(null)}/>
            ) : null}
            {isModalDeleteTask ? (
                <ModalConfirmation
                    title='Are you sure want to delete this task?'
                    handleCancel={() => setIsModalDeleteTask(null)}
                    handleClick={handleDeleteTask}
                    isLoading={isLoading}
                    variant='danger'
                    btnTitle='Delete now'/>
            ) : null}
            <AnimatePresence>
                <motion.table 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.2}}
                    className="table-auto overflow-hidden min-w-full shadow-md rounded-md dark:bg-[#181818]">
                    <thead>
                        <tr className='bg-gray-50 dark:bg-[#222]'>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tl-md'>
                                {tasks.length > 0 ? (
                                    <input type="checkbox" checked={allTasksDone} className={`w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`} onChange={handleCheckedAllTask}/>
                                ) : '-'}
                            </th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tl-md'>No</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 max-w-[300px]'>Task</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Time Start</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Time End</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Description</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tr-md'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? tasks?.map((task: TaskDataTypes, index: number) => (
                            <tr className={`text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] ${task.is_done ? 'bg-green-100 hover:bg-green-100 dark:bg-green-800 dark:hover:bg-green-800' : ''}`} key={task._id}>
                                <td className='px-3 py-3 text-sm font-normal flexx space-x-2'>
                                    <Task isTable task={task}/>
                                    {task.is_important ? <FaExclamation className='ml-1 text-red-600 text-md'/> : null}
                                </td>
                                <td className='px-3 py-3'>{index + 1}</td>
                                <td className='px-3 py-3'>{task.title}</td>
                                <td className='px-3 py-3'>{task.time.time_start || 'none'}</td>
                                <td className='px-3 py-3'>{task.time.time_end || 'none'}</td>
                                <td className='px-3 py-3 max-w-[400px]'>{task.description || 'none'}</td>
                                <td className='px-3 py-3 flexx'>
                                    <div className="icon-button" onClick={() => handleOpenModalEditTask(task)}>
                                        <MdModeEdit className='text-xl text-blue-700 dark:text-blue-500 cursor-pointer'/>
                                    </div>
                                    <div className="icon-button" onClick={() => setIsModalDeleteTask(task._id)}>
                                        <MdDelete className='text-xl text-red-700 dark:text-red-500 cursor-pointer'/>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr className='text-gray-700'>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500 relative'>no data</td>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>
                                    no data
                                </td>
                                <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>
                                    no data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </motion.table>
            </AnimatePresence>
        </Fragment>
    )
}

export default TasksTable