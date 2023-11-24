import React from 'react'
import Link from 'next/link';
import Navbar from '@/app/components/navbar'
import { GoChevronDown } from "react-icons/go"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFilter } from "react-icons/ai";


const MyCourses = () => {
	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="My Courses"/>
			
			{/* TABEL */}
			<section className='mt-5'>
				<div className='mb-7 flex-between'>
					<h2 className='text-blue-500'>My Courses</h2>
					<div className="flexx">
						<button className='flexx border border-[#ccc] outline-none bg-transparent text-gray-700 rounded-md px-3 py-2 text-sm mr-3'>
							<AiOutlineFilter className='text-lg mr-2 text-gray-700'/>
							Filter Table
						</button>
						<button className='flexx border border-[#ccc] outline-none bg-transparent text-gray-700 rounded-md px-3 py-2 text-sm mr-3'>
							<GoChevronDown className='text-lg mr-2 text-gray-700'/>
							Sort by
						</button>
						<button className='border-none outline-none bg-gray-700 text-white rounded-md px-3 py-2 text-sm'>
							<Link href="/my-courses/add-my-course">
								Add my courses list
							</Link>
						</button>
					</div>
				</div>
			</section>
		
		</section>
	)
}

export default MyCourses