import React from 'react'
import Sidebar from '@/app/components/dashboard/sidebar'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className='flex'>
            <Sidebar/>
            {children}
        </main>
    )
}
export default DashboardLayout