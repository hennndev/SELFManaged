'use client'
import React, { useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModalEditStore } from '@/app/store/zustand'
import { deleteTodo } from '@/app/lib/actions/todoActions'
import Todo from '@/app/components/dashboard/todolist/todoItem'
import ModalTodoForm from '@/app/components/modals/modalTodoForm'
import ModalTaskForm from '@/app/components/modals/modalTaskForm'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'

type PropsTypes = {
    todosData: Array<TodoDataTypes>
}
const TodoList = ({todosData}: PropsTypes) => {
    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalDelete, setIsModalDelete] = useState<null | string>(null)
    const [isModalAddTask, setIsModalAddTask] = useState<null | string>(null)
    const [isModalEditTodo, setIsModalEditTodo] = useState<boolean>(false)
    const { handleDataEdit } = useModalEditStore()

    const handleDeleteTodo = async () => {
        setIsLoading(true)
        try {
            const response = await deleteTodo(user.userId as string, isModalDelete as string)
            if(response) {
                toast.success('Success delete todo')
                setIsModalDelete(null)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const handleOpenModalEditTodo = (todo: TodoDataTypes) => {
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
            {/* Showing add task modal */}
            {isModalAddTask ? (
                <ModalTaskForm 
                    todoId={isModalAddTask as string}
                    handleClose={() => setIsModalAddTask(null)}/>
            ) : null}
            {/* Showing delete todo modal confirmation*/}
            {isModalDelete ? (
                <ModalConfirmation
                    title='Are you sure want to delete this todos?'
                    handleCancel={() => setIsModalDelete(null)}
                    handleClick={handleDeleteTodo}
                    isLoading={isLoading}
                    variant='danger'
                    btnTitle='Delete now'/>
            ) : null}
            {/* Showing edit todo modal */}
            {isModalEditTodo ? (
               <ModalTodoForm isEdit handleClose={() => setIsModalEditTodo(false)}/>
            ) : null}
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y:0}}
                    transition={{duration: 0.3, delay: 0.3}}
                    className={`${todosData.length > 0 ? 'columns-1 sm:columns-2 lg:columns-3 gap-x-5' : ''}`}>
                        {todosData.length > 0 ? todosData.map((todo) => (
                            <Todo 
                                key={todo._id} 
                                todo={todo}
                                handleOpenModalAddTask={() => setIsModalAddTask(todo._id)}
                                handleOpenModalDelete={() => setIsModalDelete(todo._id)}
                                handleOpenModalEdit={() => handleOpenModalEditTodo(todo)}/>
                        )) : (
                            <div className='flex-center flex-col space-y-3 mt-10'>
                                <p className='text-gray-700 dark:text-gray-300 font-medium text-lg'>Todo has not yet created</p>
                                <p className='text-gray-700 dark:text-gray-500 text-sm font-medium'>-- Do something great today --</p>
                            </div>
                        )}
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}

export default TodoList