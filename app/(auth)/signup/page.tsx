import React from 'react'
import AuthForm from '@/app/components/forms/authForm'

export const metadata = {
    title: 'Signup | SELFManaged'
}
const Signup = () => {
    return (
        <section className='flex-center min-h-screen pt-5 pb-7'>
            <AuthForm pageTitle='Signup'/>
        </section>
    )
}
export default Signup