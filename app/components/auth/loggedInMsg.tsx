import React from 'react'
import Link from 'next/link'
import Button from '@/app/components/ui/button'

const LoggedInMsg = () => {
    return (
        <div className='flex-center flex-col'>
            <h2 className="dark:text-gray-300 text-gray-700 text-2xl font-bold mb-2">You are logged in now</h2>
            <p className="dark:text-gray-300 text-gray-700 font-medium mb-7">You can back to homepage again.</p>
            <Link href="/">
                <Button type='button' variant='outline'>Back to home</Button>
            </Link>
        </div>
    )
}
export default LoggedInMsg