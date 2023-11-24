"use client"
import React from 'react'
import { IconType } from 'react-icons'
import { PiStudent } from "react-icons/pi"
import { sidebarIcons } from '@/app/utils/sidebarIcons'
import { useRouter, usePathname } from 'next/navigation'
import { AiOutlineHome, AiOutlineFileDone, AiOutlineTeam, AiOutlineBarChart, AiOutlineTrophy, AiOutlineOrderedList, AiOutlineDiff } from "react-icons/ai"


const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const pageTitle = pathname.split('/').reverse()[0]

    const handleRoute = (route: string) => {
        router.push(route)
    }

    return (
        <aside className='h-screen w-[260px] sticky top-0 py-5 px-3 shadow-md'>
            <h1 className='text-xl text-center text-gray-700 font-bold'>LMS Dashboard</h1>
            {/* icons */}
            <div className='text-gray-700 mt-10'>
                {sidebarIcons.map(({Icon, title, route}: {Icon: IconType, title: string, route: string}) => (
                    <div key={title} className={`group link-container ${pageTitle == route ? 'bg-blue-700' : ''}`} onClick={() => handleRoute(`/${route}`)}>
                        <Icon className={`mr-3 text-xl group-hover:text-white ${pageTitle == route ? 'text-white' : ''}`}/>
                        <p className={`font-medium group-hover:text-white ${pageTitle == route ? 'text-white' : ''}`}>
                            {title}
                        </p>
                    </div>
                ))}

            </div>
        </aside>
    )
}

export default Sidebar