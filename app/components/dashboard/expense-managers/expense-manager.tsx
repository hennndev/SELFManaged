'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/button'
import { MdEdit, MdDelete } from 'react-icons/md'
import { PiListMagnifyingGlass } from 'react-icons/pi'

type PropsTypes = {
    handleOpenModalDelete: () => void
    handleOpenModalEdit: () => void
    data: ExpenseManagerDataTypes
}
const ExpenseManager = ({handleOpenModalDelete, handleOpenModalEdit, data}: PropsTypes) => {
    const router = useRouter()
    return (
        <div className='bg-transparent shadow-md rounded p-5 mb-4 inline-block dark:bg-[#181818]'>
            <div className="flex-between items-start">
                <h1 className='text-2xl text-gray-700 dark:text-gray-300 font-semibold line-clamp-2 mr-2'>
                    {data.title}
                </h1>
                <div className="flexx">
                    <div className="icon-button" onClick={handleOpenModalEdit}>
                        <MdEdit className='text-blue-500 text-xl'/>
                    </div>
                    <div className="icon-button" onClick={handleOpenModalDelete}>
                        <MdDelete className='text-red-500 text-xl'/>
                    </div>
                </div>
            </div>
            <p className='text-xl font-bold text-green-700 dark:text-green-300 mt-2'>{data.currency} {data.balance}</p>
            <p className='mt-2 text-gray-700 dark:text-gray-300 line-clamp-3 leading-[1.5]'>{data.description}</p>
            <div className="flexx space-x-2 mt-3">
                <Button type='button' variant='outline' size='sm' classes='text-sm' handleClick={() => router.push(`/dashboard/expense-managers/expense-manager/${data._id}`)}>
                    <PiListMagnifyingGlass className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                    Details Transactions
                </Button>
            </div>
        </div> 
    )
}

export default ExpenseManager