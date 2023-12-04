import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Button from '@/app/components/utils/button'

type PropsTypes = {
    formTitle: string
    onSubmit: (values: {email: string}) => void
    isLoading: boolean
}

const EmailForm = ({formTitle, onSubmit, isLoading}: PropsTypes) => {
    const { register, handleSubmit, formState: {errors} } = useForm<{email: string}>({defaultValues: {email: ''}})

    return (
        <div className='w-[400px]'>
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
                            minLength: {
                                value: 3,
                                message: 'Minimum length username is 3 character or more!'
                            }
                        })}
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