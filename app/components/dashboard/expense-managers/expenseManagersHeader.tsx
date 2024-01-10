'use client'
import React, { useState, Fragment } from 'react'
import { MdFilterList } from 'react-icons/md'
import Button from '@/app/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import ModalExpenseManagerForm from '@/app/components/modals/modalExpenseManagerForm'

// ❌ Filter transaction not yet created
const ExpenseManagerHeader = () => {
    const [isModalAddExpenseManager, setIsModalAddExpenseManager] = useState<boolean>(false)
    return (
        <Fragment>
            {isModalAddExpenseManager ? (
                <ModalExpenseManagerForm handleClose={() => setIsModalAddExpenseManager(false)}/>
            ) : null}
            <AnimatePresence>
                <motion.div 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                    className='mb-7 flexx space-x-3 border-b border-gray-200 dark:border-gray-800 pb-5'>
                        <Button type='button' variant='outline' size='sm'>
                            <MdFilterList className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                            Filter Expense Manager
                        </Button>
                        {/* Button for open modal add expense manager */}
                        <Button type='button' handleClick={() => setIsModalAddExpenseManager(true)}>
                            Add expense manager
                        </Button>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}
export default ExpenseManagerHeader