"use client"
import React from 'react'
import DarkMode from '@/app/components/darkMode'
import SearchInput from '@/app/components/utils/searchInput'
import { AiOutlineBell, AiOutlineUser , AiOutlineMessage, AiOutlineQuestionCircle, AiOutlineMail } from 'react-icons/ai'

const Navbar = ({title}: {title: string}) => {
    return (
        <header className='sticky top-0 bg-white flex-between py-4'>
            <div className="flexx">
                <h1 className='text-[17px] text-gray-700 font-medium mr-5'>{title}</h1>
                <SearchInput/>
            </div>
            <div className="flexx">
                <AiOutlineQuestionCircle className='text-xl text-gray-700 mr-4'/>
                <AiOutlineBell className='text-xl text-gray-700 mr-4'/>
                <AiOutlineMessage className='text-xl text-gray-700 mr-4'/>
                <AiOutlineMail className='text-xl text-gray-700 mr-4'/>
                <AiOutlineUser className='text-xl text-gray-700 mr-3'/>
                <DarkMode/>
            </div>
        </header>
  )
}

export default Navbar