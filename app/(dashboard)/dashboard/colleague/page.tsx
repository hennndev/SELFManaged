import React from 'react'
import { getServerSession } from 'next-auth'
import Pagination from '@/app/components/pagination'
import Navbar from '@/app/components/dashboard/navbar'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ColleaguesTable from '@/app/components/tables/colleaguesTable'
import { getColleagues } from '@/app/lib/actions/colleague.actions'
import ColleagueTableHeader from '@/app/components/dashboard/colleagueTableHeader'

export const metadata = {
	title: 'Colleagues | SELFManaged'
}

const Colleague = async () => {
	const session: any = await getServerSession(authOptions)
	const data = await getColleagues(session?.user?.userId as string)
	const colleagues: ColleaguesDataTypes[] = data.colleagues

	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="Colleague"/>
			<section className='mt-5'>
				<ColleagueTableHeader/>
				{/* TABEL */}
				<ColleaguesTable colleagues={colleagues}/>
				<Pagination/>
			</section>
		</section>
	)
}

export default Colleague