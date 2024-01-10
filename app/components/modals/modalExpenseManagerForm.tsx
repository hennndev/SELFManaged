'use client'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import Button from '@/app/components/ui/button'
import useCurrentUser from '@/app/hooks/useCurrentUser'
import { useModalEditStore } from '@/app/store/zustand'
import ModalTitle from '@/app/components/utils/modalTitle'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { addExpenseManager, editExpenseManager } from '@/app/lib/actions/expenseManagerActions'

type PropsTypes = {
    isEdit?: boolean
    handleClose: () => void
}
// ✅ All Clear
const ModalExpenseManagerForm = ({isEdit, handleClose}: PropsTypes) => {
    const user = useCurrentUser()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: { errors },  handleSubmit, setValue, clearErrors, reset  } = useForm<ExpenseManagerTypes>({defaultValues: {
        expenseManagerTitle: '',
        expenseManagerCurrency: 'IDR',
        expenseManagerDescription: ''
    }})
    const { dataEdit, handleDataEdit } = useModalEditStore()
    // This function was for handle add new expense manager data
    const handleAdd = (values: ExpenseManagerTypes) => {
        return addExpenseManager(user.userId, values)
    }
    // This function was for handle edit expense manager data
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
            // When async function is resolved, then will doing this
            if(promise) {
                clearForm()
                toast.success(isEdit ? 'Success edit expense manager' : 'Success add new expense manager')
                handleDataEdit(null) //data term from zustand will removed
                handleClose() //close modal
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        // This condition always be called every this modal as an edit modal
        if(isEdit) {
            setValue('expenseManagerTitle', dataEdit.expenseManagerTitle)
            setValue('expenseManagerCurrency', dataEdit.expenseManagerCurrency)
            setValue('expenseManagerDescription', dataEdit.expenseManagerDescription)
        }
    }, [isEdit])

    return (
        <ModalWrapper>
            {isLoading ? <div className='overlay-loading'/> : null}
            <ModalTitle handleClose={handleClose}>
                {isEdit ? 'Edit ' : 'Add new '} expense manager <br /><span className='text-sm font-normal text-gray-600 dark:text-gray-400'>Description field is optional, you can empty that field</span>
            </ModalTitle>
            <div className='p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* EXPENSE MANAGER TITLE */}
                    <div className='mb-3'>
                        <input type='text' placeholder='Expense Manager Title' disabled={isLoading}
                            {...register('expenseManagerTitle', {
                                required: 'Field is required'
                            })}
                            className={`input-border-bottom text-2xl ${errors.expenseManagerTitle?.message ? 'input-border-bottom-error' : ''}`}/>
                    </div>
                    {/* EXPENSE MANAGER CURRENCY (IDR/USD) */}
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
                    {/* EXPENSE MANAGER DESCRIPTION */}
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