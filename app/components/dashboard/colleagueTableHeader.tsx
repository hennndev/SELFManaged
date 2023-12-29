'use client'
import React from 'react'
import Link from 'next/link'
import { BiExport } from "react-icons/bi"
import Button from '@/app/components/ui/button'
import { GoChevronDown } from "react-icons/go"
import { AnimatePresence, motion } from 'framer-motion'
import { MdTableView, MdFilterList } from 'react-icons/md'

const ColleagueTableHeader = () => {
    return (
        <AnimatePresence>
            <motion.div 
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.1}}
                className='mb-7 flex-between'>
                <div className="flexx space-x-3">
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
                <Button type='button'>
                    <Link href="/dashboard/colleague/add-new-colleague">
                        Add new colleague
                    </Link>
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}

export default ColleagueTableHeader