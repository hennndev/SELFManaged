'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form' 
import Button from '@/app/components/utils/button'
import { motion, AnimatePresence } from 'framer-motion'
import EmailForm from '@/app/components/forms/emailForm'

const VerificationEmail = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVerifiedAccount, setIsVerifiedAccount] = useState<boolean>(false)
    const { register, handleSubmit, formState: {errors} } = useForm<{email: string}>({defaultValues: {email: ''}})

    const onSubmit = (values: {email: string}) => {
        console.log(values)
    }

    return (
        <AnimatePresence>
            {/* <h1 className='text-gray-700 dark:text-gray-300 text-center max-w-[500px]'>
                <span className='font-bold bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent text-lg'>
                    Successful</span>. Your account has been verified. You can purhcase now.
            </h1>
            <div className='flex-center mt-5'>
                <Link href='/signin'>
                    <Button type='button' variant='primary-gradient'>Signin</Button>
                </Link>
            </div>  */}

            <EmailForm formTitle='Email Verification' onSubmit={onSubmit} isLoading={isLoading}/>
        </AnimatePresence>
    )
}
export default VerificationEmail