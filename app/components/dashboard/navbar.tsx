"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import DarkMode from '@/app/components/ui/darkMode'
import { AnimatePresence, motion} from 'framer-motion'
import AccountIcon from '@/app/components/ui/accountIcon'
import SearchInput from '@/app/components/dashboard/searchInput'
import PrimaryModalContainer from '../primary/primaryModalContainer'
import { MdEmail, MdMessage, MdNotifications } from "react-icons/md"

const Navbar = ({title}: {title: string}) => {
    const { data } = useSession()
    const user: any = data?.user 
    return (
        <>
            <PrimaryModalContainer/>
            <AnimatePresence>
                <motion.header 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3}}
                    className='sticky top-0 bg-white dark:bg-[#111] flex-between py-4 z-[50] px-7'>
                    <div className="flexx">
                        <h1 className='text-[18px] text-gray-700 dark:text-gray-300 font-medium mr-5'>{title}</h1>
                        <SearchInput/>
                    </div>
                    <div className="flexx">                
                        <div className='icon-button mt-0.5 mr-2'>
                            <MdMessage className='navbar-icon'/>
                        </div>
                        <div className='icon-button mr-2'>
                            <MdNotifications className='navbar-icon'/>
                        </div>
                        <div className='icon-button mr-2'>
                            <MdEmail className='navbar-icon'/>
                        </div>
                        <div className='icon-button text-left mr-2'>
                            <AccountIcon isDashboard/>
                        </div>
                        <div className='icon-button mr-1'>
                            <DarkMode size={25}/>
                        </div>
                    </div>
                </motion.header>
            </AnimatePresence>
        </>
  )
}

export default Navbar