import React from 'react'
import UpdatePasswordComp from '@/app/components/auth/updatePassword'

export const metadata = {
    title: 'Change Passowrd | SELFManaged'
}

const ChangePassword = () => {
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            <UpdatePasswordComp/>
        </section>
    )
}

export default ChangePassword