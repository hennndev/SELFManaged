'use client'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EmailForm from '@/app/components/forms/emailForm'
import { resetPassword } from '@/app/lib/actions/authActions'

const ResetPassword = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<null | string>(null)
    const [isSuccess, setIsSuccess] = useState<null | string>(null)

    const onSubmit = async ({email}: {email: string}) => {
        setIsLoading(true)
        setIsError(null)
        setIsSuccess(null)
        await resetPassword(email).then((res: any) => {
            if(res?.error) {
                throw new Error(res?.error)
            } else {
                setIsSuccess(res?.success)
                setIsLoading(false)
            }
        }).catch(error => {
            setIsLoading(false)
            setIsError(error.message)
        })
    }
    const handleClose = () => {
        setIsError(null)
        setIsSuccess(null)
    }
    return (
        <AnimatePresence>
            <EmailForm 
                formTitle='Reset Password' 
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                isError={isError}
                isSuccess={isSuccess}
                handleClose={handleClose}/>
        </AnimatePresence>
    )
}
export default ResetPassword