import React from 'react'
import Navbar from '@/app/components/navbar'

const MyProgress = () => {
	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="Dashboard"/>
			<section className='mt-5'>
				<h1 className='text-xl font-medium text-gray-700'>Hello, Hendra 🙌</h1>
				<p className='text-sm tracking-wide mt-2 text-gray-600'>What's your planning today?</p>
				<div className='p-5 rounded-md border-2 border-blue-300 w-max mt-3'>
					<p className='text-sm mb-2 cursor-pointer text-blue-600 hover:underline'>Make an achievment?</p>
					<p className='text-sm mb-2 cursor-pointer text-blue-600 hover:underline'>Make your planning?</p>
					<p className='text-sm mb-2 cursor-pointer text-blue-600 hover:underline'>Create your todo list today?</p>
					<p className='text-sm mb-2 cursor-pointer text-blue-600 hover:underline'>Create your todo list today?</p>
					<p className='text-sm mb-2 cursor-pointer text-blue-600 hover:underline'>Something else...?</p>
				</div>
			</section>
		
		</section>
	)
}

export default MyProgress