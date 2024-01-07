'use client'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { todoTopics } from '@/app/utils/utils'
import Button from '@/app/components/ui/button'
import { useModalEditStore } from '@/app/store/zustand'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addTodo, editTodo } from '@/app/lib/actions/todoActions'

type PropsTypes = {
    isEdit?: boolean //just for edit todo action
    handleClose: () => void //close todo modal
}

const ModalTodoForm = ({isEdit, handleClose}: PropsTypes) => {

    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    const { register, formState: {errors}, setValue, handleSubmit, clearErrors, reset } = useForm<TodoTypes>({defaultValues: {
        todoTitle: '',
        todoDate: '',
        todoDescription: '',
        todoTopics: []
    }})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dataEdit } = useModalEditStore()

    const clearForm = () => {
        clearErrors()
        reset()
    }

    const handleAdd = (values: TodoTypes) => {
        return addTodo(user.userId as string, {
            ...values,
            todoDate: moment(values.todoDate).format('YYYY-MM-DD')
        })
    }
    const handleEdit = (values: TodoTypes) => {
        return editTodo(dataEdit._id, {
            ...values,
            todoDate: moment(values.todoDate).format('YYYY-MM-DD')
        })
    }

    const onSubmit = async (values: TodoTypes) => {
        setIsLoading(true)
        let promise
        try {
            if(isEdit) {
                promise = await handleEdit(values)
            } else {
                promise = await handleAdd(values)
            }
            if(promise) {
                clearForm()
                toast.success(`${isEdit ? 'Success edit todo' : 'Success add new todo'}`)
                handleClose()
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Side effect triggered when isEdit props is true
        if(isEdit) {
            setValue('todoTitle', dataEdit.todoTitle)
            setValue('todoDescription', dataEdit.todoDescription)
            setValue('todoDate', dataEdit.todoDate)
            setValue('todoTopics', dataEdit.todoTopics)
        }
    }, [isEdit])

    return (
        <ModalWrapper>
            {isLoading ? <div className='overlay-loading'></div> : null}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Add new todo <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Description field is optional, you can empty that field</span>
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" onClick={handleClose}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <input type='text' placeholder='Todo Title' disabled={isLoading}
                            {...register('todoTitle', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-2xl ${errors.todoTitle?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <input type='date' disabled={isLoading} 
                            {...register('todoDate', {
                                required: 'Field is required'
                            })}
                            min={moment(new Date()).format('YYYY-MM-DD')}
                            max={moment(new Date()).add(30, 'days').format('YYYY-MM-DD')}
                            className={`input-border-bottom text-lg ${errors.todoDate?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <textarea rows={3} disabled={isLoading} placeholder='About your todo description' 
                            {...register('todoDescription')}
                            className={`input-border-bottom text-lg ${errors.todoDescription?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3 flex flex-col'>
                        <label className='label text-lg mb-5'>Todo Topics (Optional)</label>
                        <div className='flexx flex-wrap'>
                            {todoTopics.map(todo => (
                                <div className="flexx space-x-2 mb-3 mr-5" key={todo.id}>
                                    <input type="checkbox" id={todo.id} value={todo.value} {...register('todoTopics')} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                                    <label htmlFor={todo.id} className='text-gray-700 dark:text-gray-300 text-sm'>{todo.value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flexx space-x-3">
                        <Button isLoading={isLoading} type='submit' variant='primary'>Submit</Button>
                        {!isLoading ? (
                            <Button type='button' variant='outline' handleClick={handleClose}>Close</Button>
                        ) : null}
                    </div>
                </form>
            </div>
        </ModalWrapper>
    )
}

export default ModalTodoForm