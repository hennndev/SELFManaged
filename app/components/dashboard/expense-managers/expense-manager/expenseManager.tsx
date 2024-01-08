'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type PropsTypes = {
    data: ExpenseManagerDataTypes
}

const ExpenseManager = ({data}: PropsTypes) => {
    console.log(data)
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y:0 }}
                transition={{duration: 0.3, delay: 0.3}}>
                <div className='text-gray-700 dark:text-gray-200 mb-5'>
                    <h1 className='text-[40px] font-bold'>{data.title}</h1>
                    <h2 className='text-green-700 dark:text-green-400 text-2xl font-bold mt-2'>
                        {data.currency} {data.balance}
                    </h2>
                    <p className='mt-2'>{data.description}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ExpenseManager