import React from 'react'
import Link from 'next/link';
import Navbar from '@/app/components/dashboard/navbar'
import { IoIosReturnLeft } from "react-icons/io";

const AddMyCourse = () => {
	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="Add My Course"/>
			
			{/* TABEL */}
			<section className='mt-5'>
				<div className='mb-7 flex-between'>
					<h2 className='text-gray-400'>My Courses / <span className='text-blue-500'>Add My Course</span></h2>
					<button className='flexx border border-[#ccc] outline-none bg-transparent text-gray-700 rounded-md px-3 py-2 text-sm mr-3'>
						<IoIosReturnLeft className='text-lg mr-2 text-gray-700'/>
                        <Link href="/my-courses">
                            Back to previous
                        </Link>
					</button>
				</div>
            </section>
		
		</section>
	)
}

export default AddMyCourse