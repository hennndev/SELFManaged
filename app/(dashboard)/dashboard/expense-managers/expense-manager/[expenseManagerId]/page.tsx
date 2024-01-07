import React from 'react'
import Navbar from '@/app/components/dashboard/navbar'

export const metadata = {
    title: 'Expense Manager | SELFManaged'
}

const ExpenseManager = () => {
    return (
        <section className='flex-1'>
            <Navbar title='Expense Manager'/>
            <section className='px-7 mt-5 pb-10'>
               
            </section>
        </section>
    )
}

export default ExpenseManager