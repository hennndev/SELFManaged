import React, { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/app/components/primary/navbar'
import Footer from '@/app/components/primary/footer'

const PrimaryLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <Fragment>
            <Toaster reverseOrder={false} toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 3000
            }}/>
            <Navbar/>
            {children}
            <Footer/>
        </Fragment>
    )
}
export default PrimaryLayout