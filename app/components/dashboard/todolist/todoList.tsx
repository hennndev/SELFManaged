'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Todo from '@/app/components/dashboard/todolist/todo'

type PropsTypes = {
    todosData: Array<TodoDataTypes>
}
const TodoList = ({todosData}: PropsTypes) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y:0}}
                transition={{duration: 0.3, delay: 0.3}}
                className={`${todosData.length > 0 ? 'columns-1 sm:columns-2 lg:columns-3 gap-x-5' : ''}`}>
                    {todosData.length > 0 ? todosData.map((todo) => (
                        <Todo key={todo._id} todo={todo}/>
                    )) : (
                        <div className='flex-center flex-col space-y-3 mt-10'>
                            <p className='text-gray-700 dark:text-gray-300 font-medium text-lg'>Todo has not yet created</p>
                            <p className='text-gray-700 dark:text-gray-500 text-sm font-medium'>-- Do something great today --</p>
                        </div>
                    )}
            </motion.div>
        </AnimatePresence>
    )
}

export default TodoList