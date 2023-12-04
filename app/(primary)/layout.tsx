import React from 'react'
import Navbar from '@/app/components/primary/navbar'
import Footer from '@/app/components/primary/footer'

const PrimaryLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main>
            <Navbar/>
            {children}
            <Footer/>
        </main>
    )
}
export default PrimaryLayout