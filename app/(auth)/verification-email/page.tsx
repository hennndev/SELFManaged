import React from 'react'
import VerificationEmailComp from '@/app/components/auth/verificationEmail'

export const metadata = {
    title: 'Verification Email | SELFManaged'
}

const VerificationEmail = () => {
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            <VerificationEmailComp/>
        </section>
    )
}

export default VerificationEmail