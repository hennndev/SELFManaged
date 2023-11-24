import React from 'react'
import Link from 'next/link';
import Navbar from '@/app/components/navbar'
import { IoIosReturnLeft } from "react-icons/io"
import BreadCrumb from '@/app/components/utils/breadCrumb';
import ColleagueForm from '@/app/components/forms/colleagueForm'

const AddNewColleague = () => {
	return (
		<section className='flex-1 px-7 pb-10'>
			<Navbar title="Add New Colleague"/>
			
			{/* TABEL */}
			<section className='mt-5'>
				<div className='mb-7 flex-between'>
					<BreadCrumb/>
					<button className='flexx border border-[#ccc] outline-none bg-transparent text-gray-700 rounded-md px-3 py-2 text-sm mr-3'>
						<IoIosReturnLeft className='text-lg mr-2 text-gray-700'/>
                        <Link href="/colleague">
                            Back to previous
                        </Link>
					</button>
				</div>

				<div className='w-full border border-gray-200 p-3 rounded-md'>
					<ColleagueForm title="Add new colleague"/>
				</div>

            </section>
		
		</section>
	)
}

export default AddNewColleague