'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { todoTopics } from '@/app/utils/utils'
import Button from '@/app/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addTask, editTask } from '@/app/lib/actions/taskActions'

type PropsTypes = {
    todoId: string
    handleClose: () => void
}
type FormTypes = {
    taskTitle: string
    taskTimeStart: any
    taskTimeEnd: any
    taskDescription: string,
    isImportant: boolean
}

const ModalTaskForm = ({todoId, handleClose}: PropsTypes) => {
    const { data }: any = useSession()
    const user = data?.user 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: {errors}, handleSubmit, clearErrors, reset } = useForm<FormTypes>({defaultValues: {
        taskTitle: '',
        taskTimeStart: '',
        taskTimeEnd: '',
        taskDescription: '',
        isImportant: false
    }})

    const clearForm = () => {
        clearErrors()
        reset()
    }

    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
        try {
            const response = await addTask(user.userId as string, todoId, values)
            if(response) {
                toast.success('Success add new task')
                clearForm()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ModalWrapper>
            <Toaster/>
            {isLoading ? <div className='loading-overlay'></div> : null}
            <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                            {...register('taskTimeStart')}
                            min="01:00"
                            max="24:00"
                            className={`flex-1 input-border-bottom text-base ${errors.taskTimeStart?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3 flexx space-x-3'>
                        <label htmlFor="" className='text-gray-700 dark:text-gray-300'>Time end: </label>
                        <input type='time' disabled={isLoading} 
                            {...register('taskTimeEnd')}
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
                        <input type='checkbox' id='isImportant' disabled={isLoading}
                            {...register('isImportant')} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
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