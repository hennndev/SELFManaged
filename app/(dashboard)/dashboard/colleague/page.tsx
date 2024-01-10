import React from 'react'
import { getServerSession } from 'next-auth'
import Navbar from '@/app/components/dashboard/navbar'
import Pagination from '@/app/components/dashboard/pagination'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getColleagues } from '@/app/lib/actions/colleague.actions'
import ColleaguesTable from '@/app/components/tables/colleaguesTable'
import EmptyDataMessage from '@/app/components/utils/emptyDataMessage'
import ColleagueTableHeader from '@/app/components/dashboard/colleague/colleagueTableHeader'

export const metadata = {
	title: 'Colleagues | SELFManaged'
}
const Colleague = async () => {
	const session = await getServerSession(authOptions)
	const user = session?.user as UserLoginTypes
	const response = await getColleagues(user.userId as string)
	return (
		<section className='flex-1'>
			<Navbar title="Colleague"/>
			<section className='mt-5 px-7 pb-10'>
				<ColleagueTableHeader/>
				{/* TABEL */}
				{response.data ? (
					<ColleaguesTable colleagues={response?.data}/>
				): (
					<EmptyDataMessage>
                        <div className='flex-center flex-col space-y-3 mt-10'>
                            <p className='text-gray-700 dark:text-gray-300 font-medium text-lg'>{response?.error as string}</p>
                            <p className='text-gray-500 dark:text-gray-500 text-sm font-medium'>-- Manage your colleagues data --</p>
                        </div>
                    </EmptyDataMessage>
				)}
				{response.data && response.data.length > 0 && !response.error ? (
					<Pagination/>
				) : null}
			</section>
		</section>
	)
}
export default Colleague