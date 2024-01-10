import React from 'react'
import { getServerSession } from 'next-auth'
import Navbar from '@/app/components/dashboard/navbar'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EmptyDataMessage from '@/app/components/utils/emptyDataMessage'
import { getExpenseManagers } from '@/app/lib/actions/expenseManagerActions'
import ExpenseManagerHeader from '@/app/components/dashboard/expense-managers/expenseManagersHeader'
import ExpenseManagerContent from '@/app/components/dashboard/expense-managers/expenseManagers'

export const metadata = {
    title: 'Expense Managers | SELFManaged'
}
const ExpenseManagers = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user as UserLoginTypes
    const response = await getExpenseManagers(user.userId)
    return (
        <section className='flex-1'>
            <Navbar title="Expense Managers"/>
            <section className="mt-5 px-7 pb-10">
                {/* ❌ Not yet cleared */}
                <ExpenseManagerHeader/>
                {/* All clear ✅ */}
                {response.data ? (
                    // If data expense manager have 1 or more length data, then will showing its data
                    <ExpenseManagerContent expenseManagersData={response.data}/>
                ): (
                    // If data expense manager length is < 1, then will return this error message
                    <EmptyDataMessage>
                        <div className='flex-center flex-col space-y-3 mt-10'>
                            <p className='text-gray-700 dark:text-gray-300 font-medium text-lg'>{response?.error as string}</p>
                            <p className='text-gray-500 dark:text-gray-500 text-sm font-medium'>-- Manage your financial be eficient --</p>
                        </div>
                    </EmptyDataMessage>
                )}
            </section>
        </section>
    )
}
export default ExpenseManagers