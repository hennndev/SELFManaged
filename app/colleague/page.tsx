import React from 'react'
import Link from 'next/link';
import Navbar from '@/app/components/navbar'
import { GoChevronDown } from "react-icons/go"
import BreadCrumb from '@/app/components/utils/breadCrumb'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFilter, AiFillStar } from "react-icons/ai";


const Colleague = () => {
	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="Colleague"/>
			
			{/* TABEL */}
			<section className='mt-5'>
				<div className='mb-7 flex-between justify-end'>
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
							<Link href="/colleague/add-new-colleague">
							Add new colleague
							</Link>
						</button>
					</div>
				</div>
				<table className="table-auto min-w-full shadow-md rounded-md">
					<thead>
						<tr className='bg-gray-50'>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700'>No</th>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700 max-w-[300px]'>Name</th>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700'>Job</th>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700'>Telp Number</th>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700'>Address</th>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700'>Description</th>
							<th scope='col' className='text-start text-sm px-3 py-2 font-semibold text-gray-700'>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr className='text-gray-700'>
							<td className='px-3 py-3 text-sm font-normal'>1</td>
							<td className='px-3 py-3 text-sm font-normal'>Hendra Adriyanto Permana Putra</td>
							<td className='px-3 py-3 text-sm font-normal'>Frontend Dev</td>
							<td className='px-3 py-3 text-sm font-normal'>+62895377111674</td>
							<td className='px-3 py-3 text-sm font-normal'>Purbalingga</td>
							<td className='px-3 py-3 text-sm font-normal'>
								<button className='border-none outline-none bg-gray-700 text-white rounded-md px-3 py-[5px] text-xs'>Description</button>
							</td>
							<td className='px-3 py-3 flexx'>
								<AiOutlineEdit className='text-xl text-blue-700 mr-2'/>
								<AiOutlineDelete className='text-xl text-red-700'/>
							</td>
						</tr>
						<tr className='text-gray-700'>
							<td className='relative px-3 py-3 text-sm font-normal'>
								2
								<AiFillStar className="absolute text-lg text-blue-500 top-4 -left-2"/>
							</td>
							<td className='px-3 py-3 text-sm font-normal'>Zulfa Aulia Hanafi 😁</td>
							<td className='px-3 py-3 text-sm font-normal'>UI/UX</td>
							<td className='px-3 py-3 text-sm font-normal'>+62895377111674</td>
							<td className='px-3 py-3 text-sm font-normal'>Depok</td>
							<td className='px-3 py-3 text-sm font-normal'>
								<button className='border-none outline-none bg-gray-700 text-white rounded-md px-3 py-[5px] text-xs'>Description</button>
							</td>
							<td className='px-3 py-3 flexx'>
								<AiOutlineEdit className='text-xl text-blue-700 mr-2'/>
								<AiOutlineDelete className='text-xl text-red-700'/>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		
		</section>
	)
}

export default Colleague