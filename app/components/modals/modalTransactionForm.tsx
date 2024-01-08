'use client'
import React, { useState } from 'react'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import Button from '@/app/components/ui/button'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'

type PropsTypes = {
    expenseManagerId: string
    handleClose: () => void
}

const ModalTransactionForm = ({expenseManagerId, handleClose}: PropsTypes) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit } = useForm<TransactionTypes>({defaultValues: {
        transactionName: '',
        transactionType: 'income',
        transactionCategory: '',
        transactionAmount: '',
        transactionDescription: '',
        transactionDate: moment(new Date).format('YYYY-MM-DD'),
        transactionTime: ''
    }})

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <input type='text' placeholder='Transaction Name' disabled={isLoading}
                            {...register('transactionName', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-base ${errors.transactionName?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <select {...register('transactionType')} disabled={isLoading} className={`input-border-bottom text-base [&>option]:dark:bg-[#181818] ${errors.transactionType?.message ? 'input-border-bottom-error' : ''}`}>
                            <option value="" selected>Choose transaction type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <select {...register('transactionCategory')} disabled={isLoading} className={`input-border-bottom text-base [&>option]:dark:bg-[#181818] ${errors.transactionCategory?.message ? 'input-border-bottom-error' : ''}`}>
                            <option value="" selected>Choose transaction category</option>
                            <option value="income">Salary</option>
                            <option value="expense">Foods</option>
                            <option value="expense">Shopping</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <input type='number' placeholder='Transaction Amount' disabled={isLoading}
                            {...register('transactionAmount', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-base ${errors.transactionAmount?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <input type='date' disabled={isLoading}
                            {...register('transactionDate', {
                                required: 'Field is required'
                            })}
                            max={moment(new Date()).add(1, 'minutes').format('YYYY-MM-DD')}
                            className={`input-border-bottom text-base ${errors.transactionDate?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <input type='time' disabled={isLoading}
                            {...register('transactionTime', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-base ${errors.transactionTime?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <textarea rows={3} disabled={isLoading} placeholder='About your transaction description' 
                            {...register('transactionDescription')}
                            className={`input-border-bottom text-base ${errors.transactionDescription?.message ? 'input-border-bottom-error' : ''}`}/>
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

export default ModalTransactionForm