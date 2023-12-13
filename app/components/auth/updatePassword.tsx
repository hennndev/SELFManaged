'use client'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import UpdatePasswordForm from '@/app/components/forms/updatePasswordForm'
import { changePassword } from '@/app/lib/actions/authActions'

const UpdatePassword = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<null | string>(null)
    const [isError, setIsError] = useState<null | string>(null)

    const onSubmit = async (values: {email: string, oldPassword?: string, newPassword: string}) => {
        setIsLoading(true)
        setIsSuccess(null)
        setIsError(null)
        try {
            const res = await changePassword({email: values.email, password: values.newPassword, oldPassword: values.oldPassword})
            if(res?.success) {
                setIsSuccess(res?.success)
            } 
        } catch (error: any) {
            setIsError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCloseAlert = () => {
        setIsSuccess(null)
        setIsError(null)
    }


    return (
        <AnimatePresence>
            <UpdatePasswordForm 
                formTitle='Update Password' 
                onSubmit={onSubmit} 
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                handleClose={handleCloseAlert}/>
        </AnimatePresence>
    )
}
export default UpdatePassword