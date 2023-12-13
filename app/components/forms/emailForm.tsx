'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Alert from '@/app/components/utils/alert'
import Button from '@/app/components/utils/button'


type PropsTypes = {
    formTitle: string
    onSubmit: (values: {email: string}) => void
    isLoading: boolean
    isError: null | string
    isSuccess: null | string
    handleClose: () => void
}

const EmailForm = ({formTitle, onSubmit, isLoading, isError, isSuccess, handleClose}: PropsTypes) => {
    const { register, handleSubmit, formState: {errors} } = useForm<{email: string}>({defaultValues: {email: ''}})

    return (
        <div className='w-[400px]'>
            {isError ? (
                <Alert alertType={isError.includes('verified') ? 'primary' : 'danger'} handleClose={handleClose}>
                    <span className="font-bold">{isError.includes('verified') ? 'Not verified email' : 'Failed'}!</span> {isError}
                    {isError.includes('verified') ? (
                        <span><br /> Click <Link href='/verification-email' className='mt-1 underline'> this</Link> link for email verification</span>
                    ) : ''}
                </Alert>
            ) : null}
            {isSuccess ? (
                <Alert alertType='success' handleClose={handleClose}>
                    <span className="font-bold">Success!</span> {isSuccess}
                </Alert>
            ) : null}
            <motion.h1 
                initial={{ opacity: 0,y: 30 }} 
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='text-center text-2xl text-gray-700 dark:text-gray-300 font-bold mb-3'>{formTitle}</motion.h1>
            <motion.form 
                initial={{ opacity: 0,y: 30 }} 
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3 mt-7'>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='label text-sm'>Email</label>
                    <input 
                        type='email'
                        id='email' 
                        {...register('email', {
                            required: 'This field is required!',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email not valid!"
                            }
                        })}
                        autoComplete='off'
                        placeholder='Input email...' 
                        className={`input text-sm ${errors.email?.message ? 'input-error' : ''}`}/>
                    {errors.email ? (
                        <small className='input-msg-error'>{errors.email?.message}</small>
                    ) : null}
                </div>
                <Button isLoading={isLoading} type='submit' variant='primary-gradient' classes='flex-center !mt-5 w-full'>Submit</Button>
                <div className="flex-between mt-3">
                    <Link href='/' className='text-sm text-gray-700 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-700 hover:underline'>Get back</Link>
                    <p className='text-center text-gray-700 dark:text-gray-400 text-sm'>
                        Already have an account? 
                        <Link href='/signin' className='hover:underline text-blue-500 dark:text-blue-600'>
                            {' '} Signin
                        </Link>
                    </p>
                </div>
            </motion.form>
        </div>
    )
}

export default EmailForm