'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TasksTable from '../../tables/tasksTable'

type PropsTypes = {
    todoData: TodoDataTypes
}
const TodoPageContent = ({todoData}: PropsTypes) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y:0}}
                transition={{duration: 0.3, delay: 0.3}}
                className={``}>
                    <div className='text-gray-700 dark:text-gray-200 mb-5'>
                        <h1 className='text-[50px] font-bold'>{todoData.title}</h1>
                        <p className='text-gray-700 dark:text-gray-200 mt-2'>{todoData.date}</p>
                        <p className='mt-2'>{todoData.description}</p>
                        <div className='flex flex-wrap mt-2 mb-2'>
                            {todoData.topics.map((topic: string) => (
                                <div key={topic} className="flexx text-gray-700 dark:text-gray-300 mr-3 mb-2">
                                    <p>{topic}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <TasksTable tasks={todoData.tasks}/>
            </motion.div>
        </AnimatePresence>
    )
}

export default TodoPageContent