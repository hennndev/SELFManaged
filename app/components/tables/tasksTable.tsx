'use client'
import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import { FaExclamation } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import Task from '@/app/components/dashboard/todolist/task'
import { MdModeEdit, MdDelete, MdStar } from "react-icons/md"

type PropsTypes = {
    tasks: TaskDataTypes[]
}
const TasksTable = ({tasks}: PropsTypes) => {
    return (
        <Fragment>
            <AnimatePresence>
                <motion.table 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.2}}
                    className="table-auto overflow-hidden min-w-full shadow-md rounded-md dark:bg-[#181818]">
                    <thead>
                        <tr className='bg-gray-50 dark:bg-[#222]'>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tl-md'>
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
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
                            <tr className={`text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] ${task.is_important && !task.is_done ? 'bg-red-100 hover:bg-red-200 dark:bg-red-200 dark:hover:bg-red-200 dark:text-gray-700' : ''} ${task.is_done ? 'bg-green-100 hover:bg-green-200 dark:bg-green-200 dark:hover:bg-green-300 dark:text-gray-700' : ''}`} key={task._id}>
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
                                    <div className="icon-button">
                                        <MdModeEdit className='text-xl text-blue-700 dark:text-blue-500 cursor-pointer'/>
                                    </div>
                                    <div className="icon-button">
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