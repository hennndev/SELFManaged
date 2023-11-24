import React from 'react'
import Link from 'next/link';
import Navbar from '@/app/components/navbar'
import { IoIosReturnLeft } from "react-icons/io";

const EditColleague = () => {
	return (
		<section className='flex-1 px-7 pb-10'>
			<Navbar title="Edit Colleague"/>
			
			{/* TABEL */}
			<section className='mt-5'>
				<div className='mb-7 flex-between'>
					<h2 className='text-gray-400'>Colleague / <span className='text-blue-500'>Edit Colleague</span></h2>
					<button className='flexx border border-[#ccc] outline-none bg-transparent text-gray-700 rounded-md px-3 py-2 text-sm mr-3'>
						<IoIosReturnLeft className='text-lg mr-2 text-gray-700'/>
                        <Link href="/colleague">
                            Back to previous
                        </Link>
					</button>
				</div>

				<div className='w-full border border-gray-200 p-3 rounded-md'>
					<form>
						{/* <h1 className='text-gray-700 font-medium mb-5 text-center'>Add new colleague</h1> */}
						<div className='flex flex-col mb-5'>
							<label htmlFor="name" className='mb-2 text-gray-700'>Colleague name</label>
							<input type="text" placeholder='Input colleague name...' className='border border-gray-200 outline-none rounded-md p-2'/>
						</div>
						<div className='flex flex-col mb-5'>
							<label htmlFor="job" className='mb-2 text-gray-700'>Colleague job</label>
							<input type="text" placeholder='Input colleague job...' className='border border-gray-200 outline-none rounded-md p-2'/>
						</div>
						<div className='flex flex-col mb-5'>
							<label htmlFor="address" className='mb-2 text-gray-700'>Colleague address</label>
							<textarea id="address" rows={5} className='border border-gray-200 outline-none rounded-md p-2'></textarea>
						</div>
						<div className='flex flex-col mb-5'>
							<label htmlFor="telpNumber" className='mb-2 text-gray-700'>Colleague telp number</label>
							<input type="number" placeholder='Input colleague telp number...' className='border border-gray-200 outline-none rounded-md p-2'/>
						</div>
						<div className='flex flex-col mb-5'>
							<label htmlFor="region" className='mb-2 text-gray-700'>Colleague region currently</label>
							<input type="text" placeholder='Input colleague region currently...' className='border border-gray-200 outline-none rounded-md p-2'/>
						</div>
						<div className='flex flex-col mb-5'>
							<label htmlFor="isFavorite" className='mb-2 text-gray-700'>Make him/her as a favorite person 😍</label>
							<select id="isFavorite" className='border border-gray-200 outline-none rounded-md p-2'>
								<option selected>Choose option</option>
								<option value="favorite">Favorite person 😍</option>
								<option value="ordinary">Just ordinary person 😊</option>
							</select>
						</div>
						<div className="flexx mt-10">
							<button className='border-none outline-none px-3 py-2 bg-blue-700 text-white rounded-md mr-3'>Submit new colleague</button>
							<button className='border-none outline-none px-3 py-2 bg-red-700 text-white rounded-md'>Clear form</button>
						</div>
					</form>
				</div>

            </section>
		
		</section>
	)
}

export default EditColleague