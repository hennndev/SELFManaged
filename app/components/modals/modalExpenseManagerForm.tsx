'use client'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import { useModalEditStore } from '@/app/store/zustand'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addExpenseManager, editExpenseManager } from '@/app/lib/actions/expenseManagerActions'

type PropsTypes = {
    isEdit?: boolean
    handleClose: () => void
}
const ModalExpenseManagerForm = ({isEdit, handleClose}: PropsTypes) => {

    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: { errors },  handleSubmit, setValue, clearErrors, reset  } = useForm<ExpenseManagerTypes>({defaultValues: {
        expenseManagerTitle: '',
        expenseManagerCurrency: 'IDR',
        expenseManagerDescription: ''
    }})
    const { dataEdit, handleDataEdit } = useModalEditStore()
    const handleAdd = (values: ExpenseManagerTypes) => {
        return addExpenseManager(user.userId, values)
    }
    const handleEdit = (values: ExpenseManagerTypes) => {
        return editExpenseManager(dataEdit._id, values)
    }
    const clearForm = () => {
        clearErrors()
        reset()
    }
    const onSubmit = async (values: ExpenseManagerTypes) => {
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
                toast.success(isEdit ? 'Success edit expense manager' : 'Success add new expense manager')
                handleDataEdit(null)
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
            setValue('expenseManagerTitle', dataEdit.expenseManagerTitle)
            setValue('expenseManagerCurrency', dataEdit.expenseManagerCurrency)
            setValue('expenseManagerDescription', dataEdit.expenseManagerDescription)
        }
    }, [isEdit])

    return (
        <ModalWrapper>
             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {isEdit ? 'Edit ' : 'Add new '} expense manager <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Description field is optional, you can empty that field</span>
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
                        <input type='text' placeholder='Expense Manager Title' disabled={isLoading}
                            {...register('expenseManagerTitle', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-2xl ${errors.expenseManagerTitle?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    <div className='mb-3'>
                        <select disabled={isLoading}
                            {...register('expenseManagerCurrency', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-lg [&>option]:dark:bg-[#181818] ${errors.expenseManagerCurrency?.message ? 'input-border-bottom-error' : ''}`}>
                                <option value="" selected>Choose your currency</option>
                                <option value="IDR">IDR</option>
                                <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <textarea rows={3} disabled={isLoading} placeholder='About your expense manager description' 
                            {...register('expenseManagerDescription')}
                            className={`input-border-bottom text-lg ${errors.expenseManagerDescription?.message ? 'input-border-bottom-error' : ''}`}/>
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

export default ModalExpenseManagerForm