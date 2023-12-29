'use client'
import React from 'react'
import Link from 'next/link'
import Button from '@/app/components/ui/button'
import { IoIosReturnLeft } from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion'
import BreadCrumb from '@/app/components/utils/breadCrumb'

const ColleagueFormHeader = () => {
    return (
        <AnimatePresence>
            <motion.div 
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.1}}
                className='mb-7 flex-between'>
                <BreadCrumb/>
                <Button type='button' variant='outline'>
                    <IoIosReturnLeft className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
                    <Link href="/dashboard/colleague">
                        Back to previous
                    </Link>
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}

export default ColleagueFormHeader