import React from 'react'
import { getServerSession } from 'next-auth'
import AuthForm from '@/app/components/forms/authForm'
import LoggedInMsg from '@/app/components/auth/loggedInMsg'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata = {
    title: 'Signup | SELFManaged'
}
const Signup = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return (
        <section className='flex-center min-h-screen pt-5 pb-7'>
            {user ? (
               <LoggedInMsg/>
            ) : <AuthForm pageTitle='Signup'/>}
        </section>
    )
}
export default Signup