'use client'
import React from 'react'
import Button from '@/app/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { MdEdit, MdDelete, MdAddCircleOutline } from "react-icons/md"
import { PiListMagnifyingGlass } from "react-icons/pi"
import Todo from './todo'

type PropsTypes = {
    todosData: Array<TodoDataTypes>
}

const TodoList = ({todosData}: PropsTypes) => {
    console.log(todosData)
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y:0}}
                transition={{duration: 0.3, delay: 0.3}}
                className='columns-1 sm:columns-2 lg:columns-3 gap-x-5 mb-5'>
                    {todosData.map((todo) => (
                        <Todo key={todo._id} todo={todo}/>
                    ))}
            </motion.div>
        </AnimatePresence>
    )
}

export default TodoList