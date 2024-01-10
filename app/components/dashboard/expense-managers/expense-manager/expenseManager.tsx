'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TransactionsTable from '@/app/components/tables/transactionsTable'

type PropsTypes = {
    data: ExpenseManagerDataTypes
}
const ExpenseManager = ({data}: PropsTypes) => {
    const balanceFormatted = new Intl.NumberFormat(data.currency === 'IDR' ? 'id-ID' : 'en-EN', { maximumSignificantDigits: 3 }).format(data.balance)
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y:0 }}
                transition={{duration: 0.3, delay: 0.3}}>
                <div className='text-gray-700 dark:text-gray-200 mb-5'>
                    <h1 className='text-[40px] font-bold'>{data.title}</h1>
                    <h2 className={`text-3xl font-bold mt-1 ${data.balance > 0 ? 'text-green-700 dark:text-green-400' : data.balance === 0 ? 'text-gray-700 dark:text-gray-300' : 'text-red-700 dark:text-red-400'}`}>
                        {data.currency} {balanceFormatted}
                    </h2>
                    <p className='mt-2'>{data.description}</p>
                </div>
                <TransactionsTable expenseManagerId={data._id} data={data.transactions}/>
            </motion.div>
        </AnimatePresence>
    )
}
export default ExpenseManager