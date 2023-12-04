import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className='px-5'>
            {children}
        </main>
    )
}
export default AuthLayout