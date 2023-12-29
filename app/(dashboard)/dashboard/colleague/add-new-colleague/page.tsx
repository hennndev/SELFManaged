import React from 'react'
import Navbar from '@/app/components/dashboard/navbar'
import ColleagueForm from '@/app/components/forms/colleagueForm'
import ColleagueFormHeader from '@/app/components/dashboard/colleagueFormHeader'

const AddNewColleague = () => {
	return (
		<section className='flex-1 px-7 pb-10'>
			<Navbar title="Add New Colleague"/>
			<section className='mt-5'>
				<ColleagueFormHeader/>
				<ColleagueForm title="Add new colleague"/>
            </section>
		</section>
	)
}

export default AddNewColleague