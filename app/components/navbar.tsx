"use client"
import React from 'react'
import DarkMode from '@/app/components/ui/darkMode'
import SearchInput from '@/app/components/utils/searchInput'
import { AiOutlineBell, AiOutlineUser , AiOutlineMessage, AiOutlineQuestionCircle, AiOutlineMail } from 'react-icons/ai'

const Navbar = ({title}: {title: string}) => {
    return (
        <header className='sticky top-0 bg-white dark:bg-[#111] flex-between py-4'>
            <div className="flexx">
                <h1 className='text-[17px] text-gray-700 dark:text-gray-300 font-medium mr-5'>{title}</h1>
                <SearchInput/>
            </div>
            <div className="flexx">
                <div className='icon-button mr-1'>
                    <AiOutlineQuestionCircle className='navbar-icon'/>
                </div>
                <div className='icon-button mr-1'>
                    <AiOutlineBell className='navbar-icon'/>
                </div>
                <div className='icon-button mr-1'>
                    <AiOutlineMessage className='navbar-icon'/>
                </div>
                <div className='icon-button mr-1'>
                    <AiOutlineMail className='navbar-icon'/>
                </div>
                <div className='icon-button'>
                    <AiOutlineUser className='navbar-icon'/>
                </div>
                <div className='icon-button mr-1'>
                    <DarkMode size={20}/>
                </div>
            </div>
        </header>
  )
}

export default Navbar