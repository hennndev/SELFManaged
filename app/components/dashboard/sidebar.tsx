"use client"
import React from 'react'
import { IconType } from 'react-icons'
import { TbLogout2 } from "react-icons/tb"
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast' 
import { AnimatePresence, motion } from 'framer-motion'
import { sidebarIcons } from '@/app/utils/sidebarIcons'
import LogoTitle from '@/app/components/utils/logoTitle'
import { useRouter, usePathname } from 'next/navigation'


const Sidebar = () => {
    const router = useRouter()
    const { data } = useSession()
    const user: any = data?.user
    const pathname = usePathname()
    const pageTitle = pathname.slice(1)

    const handleRoute = (plan: string, route: string) => {
        if(user?.isSubscribed !== 'premium' && plan === 'premium') {
            toast.error('Subscribed your account to premium plan to access this feature 🔥')
        } else {
            router.push(route)
        }
    }
    
    return (
        <>
            <Toaster toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 2000
            }}/>
            <AnimatePresence>
                <motion.aside 
                    initial={{opacity: 0, x: '-300px'}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3}}
                    className='flex flex-col h-screen w-[280px] sticky top-0 py-5 px-3 shadow-md'>
                    <LogoTitle classes='text-2xl' delayTime='hidden'/>
                    {/* icons */}
                    <div className='text-gray-700 dark:text-gray-300 mt-5'>
                        {sidebarIcons.map(({Icon, title, route, plan}: {Icon: IconType, title: string, route: string, plan?: string}) => (
                            <div key={title} className={`group link-container ${pageTitle == route ? 'bg-blue-700' : ''} ${plan === 'premium' && user?.isSubscribed !== 'premium' ? 'line-through text-gray-300 dark:text-gray-700 hover:bg-transparent cursor-not-allowed' : ''}`} onClick={() => handleRoute(plan || 'free', `/${route}`)}>
                                <Icon className={`mr-3 text-xl group-hover:text-white ${pageTitle == route ? 'text-white' : ''} ${plan === 'premium' && user?.isSubscribed !== 'premium' ? 'group-hover:!text-gray-300 dark:group-hover:!text-gray-700' : ''}`}/>
                                <p className={`font-medium group-hover:text-white ${pageTitle == route ? 'text-white' : ''} ${plan === 'premium' && user?.isSubscribed !== 'premium' ? 'group-hover:!text-gray-300 dark:group-hover:!text-gray-700' : ''}`}>
                                    {title}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='group link-container mt-auto text-red-700 dark:text-red-300 hover:bg-red-700' onClick={() => router.push('/')}>
                        <TbLogout2 className="mr-3 text-xl group-hover:text-white"/>
                        <p className={`font-medium group-hover:text-white`}>
                            Out from dashboard
                        </p>
                    </div>
                </motion.aside>
            </AnimatePresence>
        </>
    )
}

export default Sidebar