'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useLayoutStore } from '@/app/store/zustand'

type PropsTypes = {
    isScrolled?: boolean
    isDashboard?: boolean
}

const AccountIcon = ({isScrolled, isDashboard}: PropsTypes) => {
    const { data } = useSession()
    const user: any = data?.user
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const handleShowDropdown = () => setShowDropdown(!showDropdown)
    const { handleShowModalProfile } = useLayoutStore()

    useEffect(() => {
        if(isScrolled) {
            //if scroll to top automatically dropdown set to false
            setShowDropdown(false)
        }
    }, [isScrolled])

    const logout = () => {
        setIsLoading(true)
        signOut().then(() => setIsLoading(false)).catch(() => setIsLoading(false))
    }
    
    return (
        <div className='relative h-[30px] w-[30px] rounded-full' onClick={handleShowDropdown}>
            <Image fill sizes='auto' className='w-full h-full rounded-full cursor-pointer object-contain' src={user?.image || '/images/blank-profile.png'} alt="image-profile" />

            {/* dropdown will showing if parent has been clicked */}
            <div className={`absolute top-10 -left-20 z-10 ${!showDropdown ? 'hidden' : 'block'} overflow-hidden bg-white shadow rounded-lg w-44 dark:bg-[#222]`}>
                <ul className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                    {/* if clicked, modal profile will showing */}
                    <li onClick={() => handleShowModalProfile(true)} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer dark:hover:text-white'>
                        Account
                    </li>
                    {/* if user hasn't be subscribed, this option will not showing */}
                    {user?.isSubscribed && !isDashboard ? (
                        <Link href='/dashboard' className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer dark:hover:text-white'>
                            Dashboard
                        </Link>
                    ) : null}
                    {/* logout button */}
                    <li onClick={logout} className={`text-red-700 dark:text-red-400 px-4 py-2 ${isLoading ? 'cursor-not-allowed hover:bg-white dark:hover:bg-[#222] opacity-70' : 'hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer'}`}>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AccountIcon