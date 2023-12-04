import React from 'react'
import ChangePasswordComp from '@/app/components/auth/changePassword'

export const metadata = {
    title: 'Change Passowrd | SELFManaged'
}

const ChangePassword = () => {
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            <ChangePasswordComp/>
        </section>
    )
}

export default ChangePassword