'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import Button from '@/app/components/ui/button'

type PropsTypes = {
    handleClose: () => void
}

const ModalTransactionForm = ({handleClose}: PropsTypes) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const onSubmit = async (values: TransactionTypes) => {
        console.log(values)
    }

    return (
        <ModalWrapper>
             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Add new transaction <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Description field is optional, you can empty that field</span>
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" onClick={handleClose}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className='p-4'>
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <input type='text' placeholder='Todo Title' disabled={isLoading}
                            {...register('todoTitle', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-2xl ${errors.todoTitle?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <textarea rows={3} disabled={isLoading} placeholder='About your todo description' 
                            {...register('todoDescription')}
                            className={`input-border-bottom text-lg ${errors.todoDescription?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className="flexx space-x-3">
                        <Button isLoading={isLoading} type='submit' variant='primary'>Submit</Button>
                        {!isLoading ? (
                            <Button type='button' variant='outline' handleClick={handleClose}>Close</Button>
                        ) : null}
                    </div>
                </form> */}
            </div>
        </ModalWrapper>
    )
}

export default ModalTransactionForm