'use client'
import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import { MdFilterList } from 'react-icons/md'
import { GoChevronDown } from "react-icons/go"
import { IoIosReturnLeft } from 'react-icons/io'
import Button from '@/app/components/ui/button'
import { useModalEditStore } from '@/app/store/zustand'
import { AnimatePresence, motion } from 'framer-motion'
import BreadCrumb from '@/app/components/utils/breadCrumb'
import ModalTransactionForm from '@/app/components/modals/modalTransactionForm'
import ModalExpenseManagerForm from '@/app/components/modals/modalExpenseManagerForm'

type PropsTypes = {
    expenseManager: ExpenseManagerDataTypes
}
const ExpenseManagerHeader = ({expenseManager}: PropsTypes) => {

    const [isModalAddTransaction, setIsModalAddTransaction] = useState<null | string>(null)
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
    const { handleDataEdit } = useModalEditStore()

    const handleOpenModalEdit = () => {
        setIsOpenModalEdit(true)
        handleDataEdit({
            _id: expenseManager._id,
            expenseManagerTitle: expenseManager.title,
            expenseManagerCurrency: expenseManager.currency,
            expenseManagerDescription: expenseManager.description,
        })
    }

    return (
        <Fragment>
            {isModalAddTransaction ? (
                <ModalTransactionForm 
                    expenseManagerId={isModalAddTransaction as string}
                    handleClose={() => setIsModalAddTransaction(null)}/>
            ) : null}
            {isOpenModalEdit ? (
                <ModalExpenseManagerForm isEdit handleClose={() => setIsOpenModalEdit(false)}/>
            ) : null}
            <AnimatePresence>
                <motion.div 
                        initial={{opacity: 0, y: -100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.1}}
                        className='mb-7 flex-between border-b border-gray-200 dark:border-gray-800 pb-5'>
                            <BreadCrumb/>
                            <div className='flexx space-x-3'>
                                <Button type='button' variant='outline' size='sm'>
                                    <MdFilterList className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                                    Filter Tasks
                                </Button>
                                <Button type='button' variant='outline' size='sm'>
                                    <GoChevronDown className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                                    Sort by
                                </Button>
                                <Button type='button' handleClick={handleOpenModalEdit}>
                                    Edit expense manager
                                </Button>
                                <Button type='button' classes='!mr-5' handleClick={() => setIsModalAddTransaction(expenseManager._id)}>
                                    Add transaction
                                </Button>
                                <Button type='button' variant='outline'>
                                    <IoIosReturnLeft className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                                    <Link href="/dashboard/expense-managers">
                                        Back to previous
                                    </Link>
                                </Button>
                            </div>
                    </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}

export default ExpenseManagerHeader