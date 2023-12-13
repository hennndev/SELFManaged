import React from 'react'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UpdatePasswordComp from '@/app/components/auth/updatePassword'

export const metadata = {
    title: 'Update Passowrd | SELFManaged'
}

const ChangePassword = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if(!user) {
        return notFound()
    }
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            <UpdatePasswordComp/>
        </section>
    )
}

export default ChangePassword