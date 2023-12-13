import React from 'react' 
import { getServerSession } from 'next-auth'
import LoggedInMsg from '@/app/components/auth/loggedInMsg'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ChangePasswordComp from '@/app/components/auth/changePassword'

export const metadata = {
    title: 'Change Passowrd | SELFManaged'
}

const ChangePassword = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return (
        <section className='flex-center min-h-screen pt-5 pb-5'>
            {user ? (
                <LoggedInMsg/>
            ): <ChangePasswordComp/>}
        </section>
    )
}
export default ChangePassword