import React from 'react'
import Navbar from '@/app/components/dashboard/navbar'
import ColleagueForm from '@/app/components/forms/colleagueForm'
import ColleagueFormHeader from '@/app/components/dashboard/colleague/colleagueFormHeader'

export const metadata = {
	title: 'Edit colleageu | SELFManaged'
}
const EditColleague = () => {
	return (
		<section className='flex-1'>
			<Navbar title="Edit Colleague"/>
			<section className='mt-5 px-7 pb-10'>
				<ColleagueFormHeader/>
				<ColleagueForm isEdit title="Edit colleague"/>
            </section>
		</section>
	)
}
export default EditColleague