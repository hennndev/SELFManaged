import React from 'react'
import Navbar from '@/app/components/dashboard/navbar'
import ColleagueForm from '@/app/components/forms/colleagueForm'
import ColleagueFormHeader from '@/app/components/dashboard/colleague/colleagueFormHeader'

export const metadata = {
	title: 'Add new colleague | SELFManaged'
}
const AddNewColleague = () => {
	return (
		<section className='flex-1'>
			<Navbar title="Add New Colleague"/>
			<section className='mt-5 px-7 pb-10'>
				<ColleagueFormHeader/>
				<ColleagueForm title="Add new colleague"/>
            </section>
		</section>
	)
}
export default AddNewColleague