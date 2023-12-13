import React from 'react'
import { getServerSession } from 'next-auth'
import LoggedInMsg from '@/app/components/auth/loggedInMsg'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import VerificationEmailComp from '@/app/components/auth/verificationEmail'

export const metadata = {
    title: 'Verification Email | SELFManaged'
}
const VerificationEmail = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user
    
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            {user ? (
                <LoggedInMsg/>
            ): <VerificationEmailComp/>}
        </section>
    )
}
export default VerificationEmail