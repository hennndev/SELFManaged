'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { todoTopics } from '@/app/utils/utils'
import Button from '@/app/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { addTodo } from '@/app/lib/actions/todoActions'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'

type PropsTypes = {
    isEdit?: boolean
    handleClose: () => void
}

const ModalTodoForm = ({isEdit, handleClose}: PropsTypes) => {

    const { data } = useSession()
    const user: any = data?.user
    const { register, formState: {errors}, handleSubmit, clearErrors, reset } = useForm<TodoTypes>({defaultValues: {
        todoTitle: '',
        todoDate: '',
        todoDescription: '',
        todoTopics: []
    }})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const clearForm = () => {
        clearErrors()
        reset()
        handleClose()
    }

    const onSubmit = async (values: TodoTypes) => {
        setIsLoading(true)
        try {
            const response = await addTodo(user.userId as string, values)
            console.log('Whahahahaha')
            if(response) {
                clearForm()
                toast.success('Success add new todo')
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ModalWrapper>
            <Toaster/>
            {isLoading ? <div className='overlay-loading'></div> : null}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add new todo <br /><span className='text-sm font-normal'>Description field is optional, you can empty that field</span>
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