import React from 'react'
import Link from 'next/link';
import { BiExport } from "react-icons/bi"
import Navbar from '@/app/components/navbar'
import { GoChevronDown } from "react-icons/go"
import Button from '@/app/components/ui/button'
import Pagination from '@/app/components/pagination'
import { MdTableView, MdFilterList } from 'react-icons/md'
import ColleaguesTable from '@/app/components/tables/colleaguesTable'


const Colleague = () => {
	return (
		<section className='flex-1 py-2 px-7'>
			<Navbar title="Colleague"/>
			{/* TABEL */}
			<section className='mt-5'>
				<div className='mb-7 flex-between'>
					<div className="flexx">
						<Button type='button' variant='outline' size='sm'>
							<MdFilterList className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
							Filter Table
						</Button>
						<Button type='button' variant='outline' size='sm'>
							<GoChevronDown className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
							Sort by
						</Button>
						<Button type='button' variant='outline' size='sm'>
							<MdTableView className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
							Change table views
						</Button>
						<Button type='button' variant='outline' size='sm'>
							<BiExport className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
							Export table
						</Button>
					</div>
					<Button type='button' >
						<Link href="/colleague/add-new-colleague">
							Add new colleague
						</Link>
					</Button>
				</div>
				<ColleaguesTable/>
				<Pagination/>
			</section>
		</section>
	)
}

export default Colleague