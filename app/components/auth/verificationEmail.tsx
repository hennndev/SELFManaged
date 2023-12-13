'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import Button from '@/app/components/utils/button'
import EmailForm from '@/app/components/forms/emailForm'
import { useSearchParams, notFound } from 'next/navigation'
import { verifiedAccount } from '@/app/lib/actions/authActions'
import { receiveEmailVerification } from '@/app/lib/actions/emailActions'

const VerificationEmail = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<null | string>(null)
    const [isSuccess, setIsSuccess] = useState<null | string>(null)
    const [isVerifiedAccount, setIsVerifiedAccount] = useState<boolean>(false)
    
    const onSubmit = (values: {email: string}) => {
        console.log(values)
        // sendEmail()
    }

    const verify = async () => {
        await verifiedAccount(token as string, 'email-verification').then(() => {
            setIsLoading(false)
            setIsVerifiedAccount(true)
        }).catch(error => {
            setIsError(error.message)
            setIsLoading(false)
        })
    }
    
    useEffect(() => {        
        setIsVerifiedAccount(false)
        setIsError(null)
        if(token) {
            setIsLoading(true)
            verify()
        }
    }, [token])

    useEffect(() => {
        if(isError && isError !== 'jwt expired') {
            return notFound()
        }
    }, [token, isError])
    
    const handleCloseAlert = () => {
        setIsSuccess(null)
        setIsError(null)
    }
    
    if(isLoading) {
        return <p className='text-gray-700 dark:text-gray-300 text-center'>Loading...</p>
    }
    
    return (
        <AnimatePresence>
            {isVerifiedAccount && token && !isError ? (
                <div className='flex flex-col'>
                    <h1 className='text-gray-700 dark:text-gray-300 text-center max-w-[500px]'>
                        <span className='font-bold bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent text-lg'>
                            Successful</span>. Your account has been verified. You can access our app and purhcase our product.
                    </h1>
                    <div className='flex-center mt-5'>
                        <Link href='/signin'>
                            <Button type='button' variant='primary-gradient'>Signin</Button>
                        </Link>
                    </div> 
                </div>
            ) : null}
            {isError === 'jwt expired' && token && !isVerifiedAccount ? (
                <div className='flex flex-col'>
                    <h1 className='text-gray-700 dark:text-gray-300 text-center max-w-[500px]'>
                        Access denied. Your token has been expired!
                    </h1>
                    <div className='flex-center mt-5'>
                        <Link href='/'>
                            <Button type='button' variant='primary-gradient'>Back to home</Button>
                        </Link>
                    </div> 
                </div>
            ) : null}
            {!token && <EmailForm isSuccess={isSuccess} isError={isError} formTitle='Email Verification' onSubmit={onSubmit} isLoading={isLoading} handleClose={handleCloseAlert}/>}
        </AnimatePresence>
    )
}
export default VerificationEmail