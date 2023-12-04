import React from 'react'
import Link from 'next/link';
import Navbar from '@/app/components/navbar'
import { IoIosReturnLeft } from "react-icons/io"
import Button from '@/app/components/utils/button'
import BreadCrumb from '@/app/components/utils/breadCrumb'
import ColleagueForm from '@/app/components/forms/colleagueForm'

const AddNewColleague = () => {
	return (
		<section className='flex-1 px-7 pb-10'>
			<Navbar title="Add New Colleague"/>
			<section className='mt-5'>
				<div className='mb-7 flex-between'>
					<BreadCrumb/>
					<Button type='button' variant='outline'>
						<IoIosReturnLeft className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                        <Link href="/colleague">
                            Back to previous
                        </Link>
					</Button>
				</div>
				<div className='w-full border border-gray-200 dark:border-[#222] p-5 rounded-md'>
					<ColleagueForm title="Add new colleague"/>
				</div>
            </section>
		</section>
	)
}

export default AddNewColleague