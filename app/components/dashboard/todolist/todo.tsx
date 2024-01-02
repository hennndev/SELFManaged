'use client'
import React, { useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import { PiListMagnifyingGlass } from "react-icons/pi"
import { useModalEditStore } from '@/app/store/zustand'
import { deleteTodo } from '@/app/lib/actions/todoActions'
import ModalTodoForm from '@/app/components/modals/modalTodoForm'
import ModalTaskForm from '@/app/components/modals/modalTaskForm'
import TaskList from '@/app/components/dashboard/todolist//taskList'
import { MdEdit, MdDelete, MdAddCircleOutline } from "react-icons/md"
import ModalConfirmation from '@/app/components/modals/modalConfirmation'

type PropsTypes = {
    todo: TodoDataTypes
}

const Todo = ({todo}: PropsTypes) => {
    const router = useRouter()
    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
    const [isModalAddTask, setIsModalAddTask] = useState<null | string>(null)
    const [isModalEditTodo, setIsModalEditTodo] = useState<boolean>(false)
    const { handleDataEdit } = useModalEditStore()

    const handleDeleteTodo = async () => {
        setIsLoading(true)
        try {
            const response = await deleteTodo(user.userId as string, todo._id)
            if(response) {
                toast.success('Success delete todo')
                setIsModalDelete(false)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
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
                    handleCancel={() => setIsModalDelete(false)}
                    handleClick={handleDeleteTodo}
                    isLoading={isLoading}
                    variant='danger'
                    btnTitle='Delete now'/>
            ) : null}
            {/* Showing edit todo modal */}
            {isModalEditTodo ? (
               <ModalTodoForm isEdit handleClose={() => setIsModalEditTodo(false)}/>
            ) : null}
            <div className='bg-transparent aspect-video shadow-md rounded p-5 mb-4 inline-block dark:bg-[#181818]'>
                <div className="flex-between items-start">
                    <h1 className='text-2xl text-gray-700 dark:text-gray-300 font-semibold line-clamp-2 break-all mr-2'>{todo.title}</h1>
                    <div className="flexx">
                        <div className="icon-button" onClick={handleOpenModalEditTodo}>
                            <MdEdit className='text-blue-500 text-xl'/>
                        </div>
                        <div className="icon-button" onClick={() => setIsModalDelete(true)}>
                            <MdDelete className='text-red-500 text-xl'/>
                        </div>
                    </div>
                </div>
                <p className='text-sm text-gray-700 dark:text-gray-300'>{todo.date}</p>
                <p className='mt-2 text-gray-700 dark:text-gray-300 line-clamp-2'>{todo.description}</p>
                <div className='flex flex-wrap mt-2 mb-2'>
                    {todo.topics.map(topic => (
                        <div key={topic} className="flexx text-sm text-gray-700 dark:text-gray-300 mr-3 mb-2">
                            <p>{topic}</p>
                        </div>
                    ))}
                </div>
                <TaskList tasks={todo.tasks}/>
                <div className="flexx space-x-2">
                    <Button type='button' variant='outline' size='sm' classes='text-sm' handleClick={() => setIsModalAddTask(todo._id)}>
                        <MdAddCircleOutline className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                        Add task
                    </Button>
                    <Button type='button' variant='outline' size='sm' classes='text-sm' handleClick={() => router.push(`/dashboard/todo-list/todo/${todo._id}`)}>
                        <PiListMagnifyingGlass className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                        Details
                    </Button>
                </div>
            </div> 
        </Fragment>
    )
}

export default Todo