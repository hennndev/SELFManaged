'use client'
import React, { useState, Fragment } from 'react'
import { MdFilterList } from 'react-icons/md'
import Button from '@/app/components/ui/button'
import { useModalEditStore } from '@/app/store/zustand'
import { AnimatePresence, motion } from 'framer-motion'
import BreadCrumb from '@/app/components/utils/breadCrumb'
import BackButton from '@/app/components/utils/backButton'
import ModalTransactionForm from '@/app/components/modals/modalTransactionForm'
import ModalExpenseManagerForm from '@/app/components/modals/modalExpenseManagerForm'

type PropsTypes = {
    data: ExpenseManagerDataTypes
}
const ExpenseManagerHeader = ({data}: PropsTypes) => {
    const { handleDataEdit } = useModalEditStore()
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
    const [isOpenModalAddTransaction, setIsOpenModalAddTransaction] = useState<null | string>(null)
    const handleOpenModalEdit = () => {
        setIsOpenModalEdit(true)
        handleDataEdit({
            _id: data._id,
            expenseManagerTitle: data.title,
            expenseManagerCurrency: data.currency,
            expenseManagerDescription: data.description,
        })
    }
    return (
        <Fragment>
            {isOpenModalAddTransaction ? (
                <ModalTransactionForm expenseManagerId={isOpenModalAddTransaction as string} handleClose={() => setIsOpenModalAddTransaction(null)}/>
            ) : null}
            {isOpenModalEdit ? (
                <ModalExpenseManagerForm isEdit handleClose={() => setIsOpenModalEdit(false)}/>
            ) : null}
            <AnimatePresence>
                <motion.div 
                        initial={{opacity: 0, y: -100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.1}}
                        className='mb-1 flex-between border-b border-gray-200 dark:border-gray-800 pb-5'>
                            <BreadCrumb/>
                            <div className='flexx space-x-3'>
                                <Button type='button' variant='outline' size='sm'>
                                    <MdFilterList className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                                    Filter Transactions
                                </Button>
                                <Button type='button' handleClick={handleOpenModalEdit}>
                                    Edit expense manager
                                </Button>
                                <Button type='button' handleClick={() => setIsOpenModalAddTransaction(data._id)}>
                                    Add transaction
                                </Button>
                                <BackButton linkHref='expense-managers'/>
                            </div>
                    </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}
export default ExpenseManagerHeader