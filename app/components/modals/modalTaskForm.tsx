'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addTask, editTask } from '@/app/lib/actions/taskActions'
import { useModalEditStore } from '@/app/store/zustand'

type PropsTypes = {
    todoId: string
    isEdit?: boolean
    handleClose: () => void
}

const ModalTaskForm = ({todoId, isEdit, handleClose}: PropsTypes) => {
    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: {errors}, setValue, watch, handleSubmit, clearErrors, reset } = useForm<TaskTypes>({defaultValues: {
        taskTitle: '',
        taskTimeStart: '',
        taskTimeEnd: '',
        taskDescription: '',
        isImportant: false
    }})
    const { handleDataEdit, dataEdit } = useModalEditStore()

    const clearForm = () => {
        clearErrors()
        reset()
    }
    const handleAdd = (values: TaskTypes) => {
        return addTask(user.userId as string, todoId, values)
    }
    const handleEdit = (values: TaskTypes) => {
        return editTask(dataEdit._id as string, values)
    }

    const onSubmit = async (values: TaskTypes) => {
        setIsLoading(true)
        try {
            let promise
            if(isEdit) {
                promise = await handleEdit(values)
            } else {
                promise = await handleAdd(values)
            }
            if(promise) {
                toast.success(isEdit ? 'Success edit task' : 'Success add new task')
                clearForm()
                if(isEdit) {
                    handleDataEdit(null)
                }
                handleClose()
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(isEdit) {
            setValue('taskTitle', dataEdit.title)
            setValue('taskTimeStart', dataEdit.timeStart)
            setValue('taskTimeEnd', dataEdit.timeEnd)
            setValue('taskDescription', dataEdit.description)
            setValue('isImportant' , dataEdit.isImportant)
        }
    }, [isEdit])

    return (
        <ModalWrapper>
            {isLoading ? <div className='overlay-loading'></div> : null}
            <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Add new task <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Time field and description is optional, you can empty that field</span>
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" onClick={handleClose}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <input type='text' placeholder='Todo Title' disabled={isLoading}
                            {...register('taskTitle', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-xl ${errors.taskTitle?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3 flexx space-x-3'>
                        <label htmlFor="" className='text-gray-700 dark:text-gray-300'>Time start: </label>
                        <input type='time' disabled={isLoading} 
                            {...register('taskTimeStart', {
                                validate: (value) => {
                                    const timeEnd = watch('taskTimeEnd') as string
                                    const valueFormat = value as string
                                    if(!timeEnd) return
                                    return +timeEnd?.split(':').join('') >= +valueFormat?.split(':').join('') || "Time start is higher than time end" 
                                }
                            })}
                            min="01:00"
                            max="24:00"
                            className={`flex-1 input-border-bottom text-base ${errors.taskTimeStart?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3 flexx space-x-3'>
                        <label htmlFor="" className='text-gray-700 dark:text-gray-300'>Time end: </label>
                        <input type='time' disabled={isLoading} 
                            {...register('taskTimeEnd', {
                            })}
                            min="01:00"
                            max="24:00"
                            className={`flex-1 input-border-bottom text-base ${errors.taskTimeEnd?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <textarea rows={3} disabled={isLoading} placeholder='About your task description' 
                            {...register('taskDescription')}
                            className={`input-border-bottom text-base ${errors.taskDescription?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className="flexx space-x-3 mb-5">
                        <input type='checkbox' {...register('isImportant')} id='isImportant' disabled={isLoading}
                             className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                        <label htmlFor='isImportant' className='text-gray-700 dark:text-gray-300'>Is important task?</label>
                    </div>
                    <div className="flexx space-x-3">
                        <Button isLoading={isLoading} type='submit' variant='primary'>Submit</Button>
                        {!isLoading ? <Button type='button' variant='outline' handleClick={handleClose}>Close</Button> : null}
                    </div>
                </form>
            </div>
        </ModalWrapper>
    )
}

export default ModalTaskForm