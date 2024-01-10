'use client'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { todoTopics } from '@/app/utils/utils'
import Button from '@/app/components/ui/button'
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useModalEditStore } from '@/app/store/zustand'
import ModalTitle from '@/app/components/utils/modalTitle'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addTodo, editTodo } from '@/app/lib/actions/todoActions'

type PropsTypes = {
    isEdit?: boolean //just for edit todo action
    handleClose: () => void //close todo modal
}

const ModalTodoForm = ({isEdit, handleClose}: PropsTypes) => {

    const user = useCurrentUser()
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
            <ModalTitle handleClose={handleClose}>
                Add new todo <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Description field is optional, you can empty that field</span>
            </ModalTitle>
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