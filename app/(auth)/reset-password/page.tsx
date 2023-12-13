import React from 'react'
import { getServerSession } from 'next-auth'
import LoggedInMsg from '@/app/components/auth/loggedInMsg'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ResetPasswordComp from '@/app/components/auth/resetPassword'

export const metadata = {
    title: 'Reset Password | SELFManaged'
}

const ResetPassword = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            {user ? (
                <LoggedInMsg/>
            ) : <ResetPasswordComp/>}
        </section>
    )
}

export default ResetPassword