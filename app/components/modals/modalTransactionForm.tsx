'use client'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import Button from '@/app/components/ui/button'
import { useModalEditStore } from '@/app/store/zustand'
import ModalTitle from '@/app/components/utils/modalTitle'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addTransaction, editTransaction } from '@/app/lib/actions/transactionAction'

type PropsTypes = {
    isEdit?: boolean
    expenseManagerId: string
    handleClose: () => void
}
const ModalTransactionForm = ({isEdit, expenseManagerId, handleClose}: PropsTypes) => {
    const { dataEdit, handleDataEdit } = useModalEditStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: { errors }, setValue, watch, handleSubmit } = useForm<TransactionTypes>({defaultValues: {
        transactionName: '',
        transactionType: 'income',
        transactionCategory: '',
        transactionAmount: '',
        transactionDescription: '',
        transactionDate: moment(new Date).format('YYYY-MM-DD'),
        transactionTime: ''
    }})

    const handleAdd = (values: TransactionTypes) => {
        return addTransaction(expenseManagerId, values)
    }
    const handleEdit = (values: TransactionTypes) => {
        return editTransaction(expenseManagerId, dataEdit._id, values)
    }

    const onSubmit = async (values: TransactionTypes) => {
        setIsLoading(true)
        let promise
        try {
            if(isEdit) {
                promise = await handleEdit(values)
            } else {
                promise = await handleAdd(values)
            }
            if(promise) {
                handleDataEdit(null)
                toast.success(`Success ${isEdit ? 'edit' : 'add'} transaction`)
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
            setValue('transactionName', dataEdit.name)
            setValue('transactionType', dataEdit.type)
            setValue('transactionCategory', dataEdit.category)
            setValue('transactionAmount', dataEdit.amount)
            setValue('transactionDate', dataEdit.date)
            setValue('transactionTime', dataEdit.time)
            setValue('transactionDescription', dataEdit.description)
        }
    }, [isEdit])
    

    return (
        <ModalWrapper>
            {isLoading ? <div className='overlay-loading'/> : null}
             <ModalTitle handleClose={handleClose}>
                Add new transaction <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Description field and time field is optional, you can empty that field</span>
             </ModalTitle>
            <div className='p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* TRANSACTION NAME */}
                    <div className='mb-3'>
                        <input type='text' placeholder='Transaction Name' disabled={isLoading}
                            {...register('transactionName', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-base ${errors.transactionName?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    {/* TRANSACTION TYPE */}
                    <div className='mb-3'>
                        <select {...register('transactionType', {
                            required: 'Field is required'
                        })} disabled={isLoading} className={`input-border-bottom text-base [&>option]:dark:bg-[#181818] ${errors.transactionType?.message ? 'input-border-bottom-error' : ''}`}>
                            <option value="" selected>Choose transaction type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    {/* TRANSACTION CATEGORY */}
                    <div className='mb-3'>
                        <select {...register('transactionCategory', {
                            required: 'Field is required'
                        })} disabled={isLoading} className={`input-border-bottom text-base [&>option]:dark:bg-[#181818] ${errors.transactionCategory?.message ? 'input-border-bottom-error' : ''}`}>
                            <option value="" selected>Choose transaction category</option>
                            <option value="Salary">Salary</option>
                            <option value="Foods">Foods</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Education">Education</option>
                            <option value="Family">Family</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Holiday">Holiday</option>
                            <option value="Daily activity">Daily Activity</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    {/* TRANSACTION Amount */}
                    <div className='mb-3'>
                        <input type='number' placeholder='Transaction Amount' disabled={isLoading}
                            {...register('transactionAmount', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-base ${errors.transactionAmount?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    {/* TRANSACTION DATE */}
                    <div className='mb-3'>
                        <input type='date' disabled={isLoading}
                            {...register('transactionDate', {
                                required: 'Field is required'
                            })}
                            max={moment(new Date()).add(1, 'minutes').format('YYYY-MM-DD')}
                            className={`input-border-bottom text-base ${errors.transactionDate?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    {/* TRANSACTION TIME */}
                    <div className='mb-3'>
                        <input type='time' disabled={isLoading}
                            {...register('transactionTime')}
                            className={`input-border-bottom text-base ${errors.transactionTime?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    {/* TRANSACTION DESCRIPTION */}
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