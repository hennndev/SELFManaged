import React from 'react'
import { getServerSession } from 'next-auth'
import AuthForm from '@/app/components/forms/authForm'
import LoggedInMsg from '@/app/components/auth/loggedInMsg'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata = {
    title: 'Signin | SELFManaged'
}
const Signin = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            {user ? (
                <LoggedInMsg/>
            ) : <AuthForm pageTitle='Signin' isSignin/>}
        </section>
    )
}
export default Signin