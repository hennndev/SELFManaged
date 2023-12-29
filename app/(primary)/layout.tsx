import React, { Fragment } from 'react'
import Navbar from '@/app/components/primary/navbar'
import Footer from '@/app/components/primary/footer'

const PrimaryLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <Fragment>
            <Navbar/>
            {children}
            <Footer/>
        </Fragment>
    )
}
export default PrimaryLayout