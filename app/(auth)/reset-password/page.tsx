import React from 'react'
import ResetPasswordComp from '@/app/components/auth/resetPassword'

export const metadata = {
    title: 'Reset Password | SELFManaged'
}

const ResetPassword = () => {
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            <ResetPasswordComp/>
        </section>
    )
}

export default ResetPassword