import React from 'react'
import AuthForm from '@/app/components/forms/authForm'

export const metadata = {
    title: 'Signin | SELFManaged'
}
const Signin = () => {
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            <AuthForm pageTitle='Signin' isSignin/>
        </section>
    )
}
export default Signin