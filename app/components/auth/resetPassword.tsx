'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form' 
import { AnimatePresence } from 'framer-motion'
import EmailForm from '@/app/components/forms/emailForm'

const ResetPassword = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = (values: {email: string}) => {
        setIsLoading(true)
        console.log(values)
    }

    return (
        <AnimatePresence>
            <EmailForm formTitle='Reset Password' onSubmit={onSubmit} isLoading={isLoading}/>
        </AnimatePresence>
    )
}
export default ResetPassword