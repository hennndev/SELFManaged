'use client'
import React, { Fragment, useState } from 'react'
import { MdFilterList } from 'react-icons/md'
import { GoChevronDown } from "react-icons/go"
import Button from '@/app/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import ModalTodoForm from '@/app/components/modals/modalTodoForm'

const TodoListHeader = () => {
    const [isModalAddTodo, setIsModalAddTodo] = useState<boolean>(false)
    return (
        <Fragment>
            {isModalAddTodo ? (
                <ModalTodoForm handleClose={() => setIsModalAddTodo(false)}/>
            ) : null}
            <AnimatePresence>
                <motion.div 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                    className='mb-7 flexx space-x-3 border-b border-gray-200 dark:border-gray-800 pb-5'>
                        <Button type='button' variant='outline' size='sm'>
                            <MdFilterList className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                            Filter Todos
                        </Button>
                        <Button type='button' variant='outline' size='sm'>
                            <GoChevronDown className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                            Sort by
                        </Button>
                        <Button type='button' handleClick={() => setIsModalAddTodo(true)}>
                            Add new todos
                        </Button>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}
export default TodoListHeader