import React from 'react'
import { getServerSession } from 'next-auth'
import Pagination from '@/app/components/dashboard/pagination'
import Navbar from '@/app/components/dashboard/navbar'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ColleaguesTable from '@/app/components/tables/colleaguesTable'
import { getColleagues } from '@/app/lib/actions/colleague.actions'
import ColleagueTableHeader from '@/app/components/dashboard/colleagueTableHeader'
import { handleGetColleagues } from '@/app/lib/promises/handleGetColleagues'

export const metadata = {
	title: 'Colleagues | SELFManaged'
}

const Colleague = async () => {
	const session: any = await getServerSession(authOptions)
	const data = await getColleagues(session?.user?.userId as string)
	// const colleagues: ColleaguesDataTypes[] = data.colleagues

	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="Colleague"/>
			<section className='mt-5'>
				<ColleagueTableHeader/>
				{/* TABEL */}
				{data.colleagues ? (
					<ColleaguesTable colleagues={data?.colleagues as ColleaguesDataTypes[]}/>
				): (
					<div className='flex-center mt-10'>
						<p className='text-gray-700 dark:text-gray-300 font-medium'>{data?.error as string}</p>
					</div>
				)}
				{!data.error || data?.colleagues?.length > 0 ? (
					<Pagination/>
				) : null}
			</section>
		</section>
	)
}

export default Colleague