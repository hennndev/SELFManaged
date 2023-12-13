'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import Button from '@/app/components/utils/button'
import { useSearchParams, notFound } from 'next/navigation'
import UpdatePasswordForm from '@/app/components/forms/updatePasswordForm'
import { verifiedAccount, changePassword } from '@/app/lib/actions/authActions'

const ResetPassword = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [currentEmail, setCurrentEmail] = useState<null | string>(null)
    const [isVerifiedToken, setIsVerifiedToken] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false)
    const [isError, setIsError] = useState<null | string>(null)
    const [isSuccess, setIsSuccess] = useState<null | string>(null)

    const onSubmit = async (values: {email: string, newPassword: string}) => {
        setIsLoading(true)
        setIsSuccess(null)
        setIsError(null)
        try {
            const res = await changePassword({email: values.email, password: values.newPassword, token: token as string})
            if(res?.success) {
                setIsSuccess(res?.success)
            } 
        } catch (error: any) {
            setIsError(error.message)
            if(error.message === 'jwt expired') {
                setIsVerifiedToken(false)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const verify = async () => {
        await verifiedAccount(token as string).then((res) => {
            setIsLoadingToken(false)
            setIsVerifiedToken(true)
            if(res?.email) {
                setCurrentEmail(res?.email)
            }
        }).catch(error => {
            setIsError(error.message)
            setIsLoadingToken(false)
        })
    }

    useEffect(() => {        
        setIsVerifiedToken(false)
        setIsError(null)
        if(token) {
            setIsLoadingToken(true)
            verify()
        }
    }, [token])

    useEffect(() => {
        if(isError && !isVerifiedToken && isError !== 'jwt expired') {
            return notFound()
        }
    }, [token, isError])
    
    const handleCloseAlert = () => {
        setIsSuccess(null)
        setIsError(null)
    }

    if(isLoadingToken) {
        return <p className='text-gray-700 dark:text-gray-300'>Loading...</p>
    }

    return (
        <AnimatePresence>
            {isError === 'jwt expired' && token && !isVerifiedToken ? (
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
            {isVerifiedToken && isError !== 'jwt expired' ? (
                <UpdatePasswordForm 
                    isChange={currentEmail} 
                    formTitle='Change Password' 
                    onSubmit={onSubmit} 
                    isSuccess={isSuccess}
                    isLoading={isLoading}
                    isError={isError}
                    handleClose={handleCloseAlert}/>
            ): null}
        </AnimatePresence>
    )
}
export default ResetPassword