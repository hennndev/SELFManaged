'use client'
import React, { useState, Fragment } from 'react'
import moment from 'moment'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { MdModeEdit, MdDelete } from "react-icons/md"
import { useModalEditStore } from '@/app/store/zustand'
import { deleteTransaction } from '@/app/lib/actions/transactionAction'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'
import ModalTransactionForm from '@/app/components/modals/modalTransactionForm'

type PropsTypes = {
    expenseManagerId: string
    data: Array<TransactionDataTypes>
}
const TransactionTable = ({expenseManagerId, data}: PropsTypes) => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenModalEditTransaction, setIsOpenModalEditTransaction] = useState<null | string>(null)
    const [isOpenModalDeleteTransaction, setIsOpenModalDeleteTransaction] = useState<null | string>(null)
    const { handleDataEdit } = useModalEditStore()

    const handleDeleteTransaction = async () => {
        setIsLoading(true)
        try {
            const response = await deleteTransaction(expenseManagerId, isOpenModalDeleteTransaction as string)
            if(response) {
                toast.success('Success delete this transaction')
                setIsOpenModalDeleteTransaction(null)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const handleOpenModalEditTransaction = (transaction: TransactionDataTypes) => {
        setIsOpenModalEditTransaction(transaction._id)
        handleDataEdit({
            _id: transaction._id,
            name: transaction.name,
            type: transaction.type,
            category: transaction.category,
            amount: transaction.amount,
            date: transaction.date,
            time: transaction.time,
            description: transaction.description
        })
    }
    return (
        <Fragment>
             {isOpenModalEditTransaction ? (
                <ModalTransactionForm 
                    isEdit
                    expenseManagerId={params.expenseManagerId as string}
                    handleClose={() => setIsOpenModalEditTransaction(null)}/>
            ) : null}
            {isOpenModalDeleteTransaction ? (
                <ModalConfirmation
                    title='Are you sure want to delete this transaction?'
                    handleCancel={() => setIsOpenModalDeleteTransaction(null)}
                    handleClick={handleDeleteTransaction}
                    isLoading={isLoading}
                    variant='danger'
                    btnTitle='Delete now'/>
            ) : null}
            <motion.table 
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.2}}
                className="table-auto overflow-hidden min-w-full shadow-md rounded-md dark:bg-[#181818]">
                <thead>
                    <tr className='bg-gray-50 dark:bg-[#222]'>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tl-md'>No</th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 max-w-[300px]'>
                            Name
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>
                            Type
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>
                            Category    
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>
                            Amount
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>
                            Date
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>
                            Time
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>
                            Description
                        </th>
                        <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tr-md'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((transaction, index) => (
                        <tr key={transaction._id} className={`text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]`}>
                            <td className='px-3 py-3 text-[14px]'>{index + 1}</td>
                            <td className='px-3 py-3 text-[14px]'>{transaction.name}</td>
                            <td className={`px-3 py-3 text-[14px] ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'} font-medium`}>
                                {transaction.type}
                            </td>
                            <td className='px-3 py-3 text-[14px]'>{transaction.category}</td>
                            <td className={`px-3 py-3 text-[14px] font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>{transaction.amount}</td>
                            <td className='px-3 py-3 text-[14px]'>
                                {moment(transaction.date).format('YYYY-MM-DD')}
                            </td>
                            <td className="px-3 py-3 text-[14px]">
                                {transaction.time ? transaction.time : 'none'}
                            </td>
                            <td className='px-3 py-3 text-[14px] max-w-[250px]'>
                                {transaction.description ? transaction.description : 'none'}
                            </td>
                            <td className='px-3 py-3 flexx'>
                                <div className="icon-button">
                                    <MdModeEdit className='text-xl text-blue-700 dark:text-blue-500 cursor-pointer' onClick={() => handleOpenModalEditTransaction(transaction)}/>
                                </div>
                                <div className="icon-button" onClick={() => setIsOpenModalDeleteTransaction(transaction._id)}>
                                    <MdDelete className='text-xl text-red-700 dark:text-red-500 cursor-pointer'/>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr className='text-gray-700'>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500 relative'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>no data</td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>
                                no data
                            </td>
                            <td className='px-3 py-3 text-gray-400 dark:text-gray-500'>
                                no data
                            </td>
                        </tr>
                    )}
                </tbody>
            </motion.table>
        </Fragment>
    )
}

export default TransactionTable