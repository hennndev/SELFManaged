'use client'
import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/button'
import { PiListMagnifyingGlass } from 'react-icons/pi'
import CardActions from '@/app/components/utils/cardActions'

type PropsTypes = {
    handleOpenModalDelete: () => void
    handleOpenModalEdit: () => void
    data: ExpenseManagerDataTypes
}
const ExpenseManager = ({handleOpenModalDelete, handleOpenModalEdit, data}: PropsTypes) => {
    const router = useRouter()
    const balanceFormatted = new Intl.NumberFormat(data.currency === 'IDR' ? 'id-ID' : 'en-EN', { maximumSignificantDigits: 3 }).format(data.balance)
    return (
        <div className='bg-transparent shadow-md rounded p-5 mb-4 inline-block dark:bg-[#181818]'>
            <div className="flex-between items-start">
                <h1 className='text-2xl text-gray-700 dark:text-gray-300 font-semibold line-clamp-2 mr-2'>
                    {data.title}
                </h1>
                <CardActions handleOpenModalEdit={handleOpenModalEdit} handleOpenModalDelete={handleOpenModalDelete}/>
            </div>
            <p className={`text-xl font-bold mt-2 ${String(data.balance).includes('-') ? 'text-red-700 dark:text-red-400' : data.balance === 0 ? 'text-gray-700 dark:text-gray-400' : 'text-green-700 dark:text-green-400'}`}>{data.currency} {balanceFormatted}</p>
            <p className='mt-2 text-gray-700 dark:text-gray-300 line-clamp-3 leading-[1.5]'>{data.description}</p>
            <p className='mt-2 text-gray-700 dark:text-gray-300 text-sm'>Created at {moment(data.createdAt).format('YYYY-MM-DD h:mm')}</p>
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