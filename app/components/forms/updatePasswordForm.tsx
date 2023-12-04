import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Button from '@/app/components/utils/button'

type PropsTypes = {
    formTitle: string
    isChange?: boolean
    onSubmit: (values: {email: string}) => void
    isLoading: boolean
}

type FormTypes = {
    email: string
    oldPassword: string
    newPassword: string
    newPasswordConfirmation: string
}

const UpdatePasswordForm = ({formTitle, isChange, onSubmit, isLoading}: PropsTypes) => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormTypes>({defaultValues: {
        email: '',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
    }})

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
                {/* OLD PASSWORD */}
                {!isChange ? (
                    <div className='flex flex-col'>
                        <label htmlFor="oldPassword" className='label text-sm'>Current Password</label>
                        <input 
                            type='password'
                            id='oldPassword' 
                            {...register('oldPassword', {
                                required: 'This field is required!',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum length username is 3 character or more!'
                                }
                            })} 
                            className={`input text-sm ${errors.oldPassword?.message ? 'input-error' : ''}`}/>
                        {errors.oldPassword ? (
                            <small className='input-msg-error'>{errors.oldPassword?.message}</small>
                        ) : null}
                    </div>
                ) : null}
                {/* NEW PASSWORD */}
                <div className='flex flex-col'>
                    <label htmlFor="newPassword" className='label text-sm'>New Password</label>
                    <input 
                        type='password'
                        id='newPassword' 
                        {...register('newPassword', {
                            required: 'This field is required!',
                            minLength: {
                                value: 3,
                                message: 'Minimum length username is 3 character or more!'
                            }
                        })}
                        className={`input text-sm ${errors.newPassword?.message ? 'input-error' : ''}`}/>
                    {errors.newPassword ? (
                        <small className='input-msg-error'>{errors.newPassword?.message}</small>
                    ) : null}
                </div>
                {/* NEW PASSWORD CONFIRMATION */}
                <div className='flex flex-col'>
                    <label htmlFor="newPasswordConfirmation" className='label text-sm'>New Password Confirmation</label>
                    <input 
                        type='password'
                        id='newPasswordConfirmation' 
                        {...register('newPasswordConfirmation', {
                            required: 'This field is required!',
                            minLength: {
                                value: 3,
                                message: 'Minimum length username is 3 character or more!'
                            }
                        })}
                        className={`input text-sm ${errors.newPasswordConfirmation?.message ? 'input-error' : ''}`}/>
                    {errors.newPasswordConfirmation ? (
                        <small className='input-msg-error'>{errors.newPasswordConfirmation?.message}</small>
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

export default UpdatePasswordForm