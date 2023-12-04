'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/app/components/utils/button'
import { AnimatePresence, motion } from 'framer-motion'
import LogoTitle from '@/app/components/utils/logoTitle'
import DarkMode from '@/app/components/primary/darkMode'
import { RiMenuFill, RiCloseLine } from "react-icons/ri"

const Navbar = () => {

    const [isSidebar, setIsSidebar] = useState<boolean>(false)
    const handleSidebar = () => {
        setIsSidebar(!isSidebar)
    }
    const handleCloseSidebar = () => {
        setIsSidebar(false)
    }
    return (
        <AnimatePresence>
            <motion.header 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 0.3 }}
                className='container sticky top-0 bg-white dark:bg-[#111] py-3 px-5 z-50'>
                <div className='flex-between'>
                    <h1 className='bg-gradient-to-r from-fuchsia-600 to-blue-600 dark:from-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent text-2xl font-extrabold'>
                        SELF<span className='dark:text-white text-gray-700 font-bold'>Managed</span>
                    </h1>
                    <div className="hidden lg:flexx mr-10">
                        <Link href='#home' className='mr-5 text-gray-700 dark:text-gray-200 font-semibold hover:text-blue-500 dark:hover:text-blue-600'>Home</Link>
                        <Link href='#pricing' className='text-gray-700 dark:text-gray-200 font-semibold hover:text-blue-500 dark:hover:text-blue-600 mr-5'>Pricing</Link>
                    </div>
                    <div className="flexx space-x-3">
                        <Link href='/signup' className='hidden lg:flex'>
                            <Button type='button' variant='primary-gradient'>Sign up</Button>
                        </Link>
                        <RiMenuFill className='block lg:hidden text-black dark:text-white text-2xl cursor-pointer' onClick={handleSidebar}/>
                        <DarkMode size={25}/>
                    </div>
                </div>
            </motion.header>
            {isSidebar && (
                <div className={`${isSidebar ? 'lg:hidden' : ''} fixed top-0 h-screen w-full bg-white dark:bg-[#111] z-[100] left-0'}`}>
                    <RiCloseLine className='absolute top-2 right-2 text-[40px] text-red-700 dark:text-red-500 cursor-pointer' onClick={handleCloseSidebar}/>
                    <div className='h-full flex-center -mt-10 flex-col space-y-5 px-4'>
                        <LogoTitle classes='text-3xl' delayTime={0.1}/>
                        <motion.div
                            initial={{ opacity: 0,y: 30 }} 
                            animate={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}>
                            <Link href='#home' onClick={handleCloseSidebar} className='text-gray-700 dark:text-gray-200 font-semibold hover:text-blue-500 dark:hover:text-blue-600'>Home</Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0,y: 30 }} 
                            animate={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}>
                            <Link href='#pricing' onClick={handleCloseSidebar} className='text-gray-700 dark:text-gray-200 font-semibold hover:text-blue-500 dark:hover:text-blue-600'>Pricing</Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0,y: 30 }} 
                            animate={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}>
                            <Link href='/signup'>
                                <Button type='button' variant='primary-gradient'>Sign up</Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
export default Navbar