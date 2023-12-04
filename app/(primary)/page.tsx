import React from 'react'
import Hero from '@/app/components/primary/hero'
import Pricing from '@/app/components/primary/pricing'

export const metadata = {
    title: 'Homepage | SELFManaged'
}
const Homepage = () => {
    return (
        <section className='sub-container mb-32'>
            <Hero/>
            <Pricing/>
        </section>
    )
}
export default Homepage