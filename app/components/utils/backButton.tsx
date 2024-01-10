import React from 'react'
import Link from 'next/link'
import Button from '@/app/components/ui/button'
import { IoIosReturnLeft } from 'react-icons/io'

const BackButton = ({linkHref}: {linkHref: string}) => {
    return (
        <Button type='button' variant='outline'>
            <IoIosReturnLeft className='text-lg mr-2 text-gray-700 dark:text-gray-300'/>
            <Link href={`/dashboard/${linkHref}`}>
                Back to previous
            </Link>
        </Button>
    )
}
export default BackButton