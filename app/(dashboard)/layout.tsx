import React from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/app/components/dashboard/sidebar'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className='flex'>
            <Toaster reverseOrder={false} toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 3000
            }}/>
            <Sidebar/>
            {children}
        </main>
    )
}
export default DashboardLayout