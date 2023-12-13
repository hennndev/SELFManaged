'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLayoutStore } from '@/app/store/zustand'

type PropsTypes = {
    imageUrl: null | string | undefined
    logout: () => void
    isLoading: boolean
    isScrolled: boolean
}

const AccountIcon = ({imageUrl, logout, isLoading, isScrolled}: PropsTypes) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const { handleShowmModalEditProfile } = useLayoutStore()
    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        if(!isScrolled) {
            //if scroll to top automatically dropdown set to false
            setShowDropdown(false)
        }
    }, [isScrolled])
    
    return (
        <div className='relative h-[30px] w-[30px] rounded-full' onClick={handleShowDropdown}>
            <Image 
                fill 
                className='w-full h-full rounded-full cursor-pointer object-contain'  
                src={imageUrl || 'https://fisika.uad.ac.id/wp-content/uploads/blank-profile-picture-973460_1280.png'} 
                alt="image-profile" />
            <div 
                className={`absolute top-10 -left-20 z-10 ${!showDropdown ? 'hidden' : 'block'} overflow-hidden bg-white shadow rounded-lg w-44 dark:bg-[#222]`}>
                <ul className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                    <li onClick={() => handleShowmModalEditProfile(true)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer dark:hover:text-white'>
                        Account
                    </li>
                    <li className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer dark:hover:text-white'>
                        Dashboard
                    </li>
                    <li onClick={logout} className={`text-red-700 dark:text-red-400 px-4 py-2 ${isLoading ? 'cursor-not-allowed hover:bg-white dark:hover:bg-[#222] opacity-70' : 'hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer'}`}>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AccountIcon