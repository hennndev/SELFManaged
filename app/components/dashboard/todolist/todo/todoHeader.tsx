'use client'
import React, { Fragment, useState } from 'react'
import { MdFilterList } from 'react-icons/md'
import { GoChevronDown } from "react-icons/go"
import Button from '@/app/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useModalEditStore } from '@/app/store/zustand'
import BackButton from '@/app/components/utils/backButton'
import BreadCrumb from '@/app/components/utils/breadCrumb'
import ModalTaskForm from '@/app/components/modals/modalTaskForm'
import ModalTodoForm from '@/app/components/modals/modalTodoForm'

type PropsTypes = {
    todo: TodoDataTypes
}
const TodoHeader = ({todo}: PropsTypes) => {
    const [isModalAddTask, setIsModalAddTask] = useState<null | string>(null)
    const [isModalEditTodo, setIsModalEditTodo] = useState<boolean>(false)
    const { handleDataEdit } = useModalEditStore()
    const handleOpenModalEditTodo = () => {
        setIsModalEditTodo(true)
        handleDataEdit({
            _id: todo._id,
            todoTitle: todo.title,
            todoDescription: todo.description,
            todoDate: todo.date,
            todoTopics: todo.topics,
        })
    }
    return (
        <Fragment>
            {isModalAddTask ? (
                <ModalTaskForm 
                    todoId={isModalAddTask as string}
                    handleClose={() => setIsModalAddTask(null)}/>
            ) : null}
            {isModalEditTodo ? (
               <ModalTodoForm isEdit handleClose={() => setIsModalEditTodo(false)}/>
            ) : null}     
            <AnimatePresence>
                <motion.div 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                    className='mb-7 flex-between border-b border-gray-200 dark:border-gray-800 pb-5'>
                        <BreadCrumb/>
                        <div className='flexx space-x-3'>
                            <Button type='button' variant='outline' size='sm'>
                                <MdFilterList className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                                Filter Tasks
                            </Button>
                            <Button type='button' variant='outline' size='sm'>
                                <GoChevronDown className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                                Sort by
                            </Button>
                            <Button type='button' handleClick={handleOpenModalEditTodo}>
                                Edit todo
                            </Button>
                            <Button type='button' classes='!mr-5' handleClick={() => setIsModalAddTask(todo._id)}>
                                Add new task
                            </Button>
                            <BackButton linkHref='todo-list'/>
                        </div>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}
export default TodoHeader