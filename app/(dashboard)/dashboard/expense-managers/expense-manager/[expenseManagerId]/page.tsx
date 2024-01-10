import React from 'react'
import { redirect } from 'next/navigation'
import Navbar from '@/app/components/dashboard/navbar'
import { getExpenseManager } from '@/app/lib/actions/expenseManagerActions'
import ExpenseManagerContent from '@/app/components/dashboard/expense-managers/expense-manager/expenseManager'
import ExpenseManagerHeader from '@/app/components/dashboard/expense-managers/expense-manager/expenseManagerHeader'

export const metadata = {
    title: 'Expense Manager | SELFManaged'
}
const ExpenseManager = async ({params}: {params: {expenseManagerId: string}}) => {
    const response = await getExpenseManager(params.expenseManagerId)
    if(response.error) {
        redirect('/dashboard/expense-managers')
    }
    return (
        <section className='flex-1'>
            <Navbar title='Expense Manager'/>
            <section className='px-7 mt-5 pb-10'>
                <ExpenseManagerHeader data={response.data as ExpenseManagerDataTypes}/>
                <ExpenseManagerContent data={response.data as ExpenseManagerDataTypes}/>
            </section>
        </section>
    )
}
export default ExpenseManager