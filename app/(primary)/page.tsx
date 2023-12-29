import React from 'react'
import Hero from '@/app/components/primary/hero'
import Pricing from '@/app/components/primary/pricing'
import PrimaryModalContainer from '@/app/components/primary/primaryModalContainer'

export const metadata = {
    title: 'Homepage | SELFManaged'
}
const Homepage = () => {
    return (
        <main className='sub-container mb-32'>
            <Hero/>
            <Pricing/>
            <PrimaryModalContainer/>
        </main>
    )
}
export default Homepage