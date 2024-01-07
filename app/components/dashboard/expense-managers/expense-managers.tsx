'use client'
import React, { useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModalEditStore } from '@/app/store/zustand'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'
import { deleteExpenseManager } from '@/app/lib/actions/expenseManagerActions'
import ModalExpenseManagerForm from '@/app/components/modals/modalExpenseManagerForm'
import ExpenseManager from '@/app/components/dashboard/expense-managers/expense-manager'

type PropsTypes = {
    expenseManagersData: Array<ExpenseManagerDataTypes>
}

const ExpenseManagers = ({expenseManagersData}: PropsTypes) => {
    const { data: dataUser } = useSession()
    const user = dataUser?.user as UserLoginTypes
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
    const [isModalDelete, setIsModalDelete] = useState<null | string>(null)
    const { handleDataEdit } = useModalEditStore()

    const handleDeleteExpenseManager = async () => {
        setIsLoading(true)
        try {
            await deleteExpenseManager(user?.userId, isModalDelete as string)
            toast.success('Success delete this expense manager')
            setIsModalDelete(null)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const handleOpenModalEditExpenseManager = (data: ExpenseManagerDataTypes) => {
        setIsModalEdit(true)
        handleDataEdit({
            _id: data._id,
            expenseManagerTitle: data.title,
            expenseManagerCurrency: data.currency,
            expenseManagerDescription: data.description
        })
    }
    return (
        <Fragment>
            {isModalEdit ? (
                <ModalExpenseManagerForm isEdit handleClose={() => setIsModalEdit(false)}/>
            ): null}
            {isModalDelete ? (
                <ModalConfirmation 
                    title='Are you sure want to delete this expense manager?' 
                    btnTitle='Delete now'
                    isLoading={isLoading}
                    handleCancel={() => setIsModalDelete(null)}
                    handleClick={handleDeleteExpenseManager}
                    variant='danger'/>
            ): null}
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.3}}>
                    <div className='grid grid-cols-cards gap-5'>
                        {expenseManagersData.map((obj) => (
                            <ExpenseManager 
                                key={obj._id} 
                                data={obj}
                                handleOpenModalDelete={() => setIsModalDelete(obj._id)}
                                handleOpenModalEdit={() => handleOpenModalEditExpenseManager(obj)}/>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>        
        </Fragment>
    )
}

export default ExpenseManagers