'use client'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import UpdatePasswordForm from '@/app/components/forms/updatePasswordForm'

const UpdatePassword = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = (values: {email: string}) => {
        setIsLoading(true)
        console.log(values)
    }

    return (
        <AnimatePresence>
            <UpdatePasswordForm formTitle='Update Password' onSubmit={onSubmit} isLoading={isLoading}/>
        </AnimatePresence>
    )
}
export default UpdatePassword