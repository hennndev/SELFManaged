'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Alert from '@/app/components/utils/alert'
import Button from '@/app/components/ui/button'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"

type PropsTypes = {
    formTitle: string
    isChange?: null | string
    onSubmit: (values: {email: string, oldPassword?: string, newPassword: string}) => void
    isLoading: boolean
    isSuccess: null | string
    isError: null | string
    handleClose: () => void
}

type FormTypes = {
    email: string
    oldPassword: string
    newPassword: string
    newPasswordConfirmation: string
}

const UpdatePasswordForm = ({formTitle, isChange, onSubmit, isLoading, isSuccess, isError, handleClose}: PropsTypes) => {

    const [isFocus, setIsFocus] = useState<null | string>(null)
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState<boolean>(false)

    const { register, handleSubmit, formState: {errors}, watch } = useForm<FormTypes>({defaultValues: {
        email: isChange ? isChange : '',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
    }})

    return (
        <div className='w-[400px]'>
            {isError ? (
                <Alert alertType={isError.includes('verified') ? 'primary' : 'danger'} handleClose={handleClose}>
                    <span className="font-bold">Failed!</span> {isError}
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
                {/* OLD PASSWORD */}
                {!isChange ? (
                    <div className='flex flex-col mt-7'>
                        <label htmlFor="oldPassword" className='label text-sm'>Password</label>
                        <div className={`flex items-center border border-gray-200 dark:border-[#222] rounded-md p-2 ${isFocus === 'oldPassword' && !errors.oldPassword?.message ? 'ring-[1.5px] ring-blue-500 border-transparent' : ''} ${errors.oldPassword?.message ? 'border-2 border-red-500 dark:border-red-500 ring-0' : ''}`}>
                            <input 
                                type={showOldPassword ? 'text' : 'password'}
                                id='oldPassword'
                                onFocus={() => setIsFocus('oldPassword')} 
                                {...register('oldPassword', {
                                    required: 'This field is required!',
                                    minLength: {
                                        value: 7,
                                        message: 'Minimum password length is 7 character or more!'
                                    },
                                    onBlur: () => setIsFocus(null),
                                })}
                                className={`bg-transparent border-none outline-none flex-1 ring-0 focus:ring-0 p-0 text-sm mr-3`}/>
                                {showOldPassword ? (
                                    <RxEyeOpen className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowOldPassword(!showOldPassword)}/>
                                ) : (
                                    <RxEyeClosed className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowOldPassword(!showOldPassword)}/>
                                )}
                        </div>
                        {errors.oldPassword ? (
                            <small className='input-msg-error'>{errors.oldPassword?.message}</small>
                        ) : null}
                    </div>
                ) : null}

                {/* new password */}
                <div className='flex flex-col mt-7'>
                    <label htmlFor="newPassword" className='label text-sm'>New Password</label>
                    <div className={`flex items-center border border-gray-200 dark:border-[#222] rounded-md p-2 ${isFocus === 'newPassword' && !errors.newPassword?.message ? 'ring-[1.5px] ring-blue-500 border-transparent' : ''} ${errors.newPassword?.message ? 'border-2 border-red-500 dark:border-red-500 ring-0' : ''}`}>
                        <input 
                            type={showNewPassword ? 'text' : 'password'}
                            id='newPassword'
                            onFocus={() => setIsFocus('newPassword')} 
                            {...register('newPassword', {
                                required: 'This field is required!',
                                minLength: {
                                    value: 7,
                                    message: 'Minimum password length is 7 character or more!'
                                },
                                onBlur: () => setIsFocus(null),
                            })}
                            className={`bg-transparent border-none outline-none flex-1 ring-0 focus:ring-0 p-0 text-sm mr-3`}/>
                            {showNewPassword ? (
                                <RxEyeOpen className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)}/>
                            ) : (
                                <RxEyeClosed className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)}/>
                            )}
                    </div>
                    {errors.newPassword ? (
                        <small className='input-msg-error'>{errors.newPassword?.message}</small>
                    ) : null}
                </div>

                {/* new password confirmation */}
                <div className='flex flex-col mt-7'>
                    <label htmlFor="newPasswordConfirmation" className='label text-sm'>New Password Confirmation</label>
                    <div className={`flex items-center border border-gray-200 dark:border-[#222] rounded-md p-2 ${isFocus === 'newPasswordConfirmation' && !errors.newPasswordConfirmation?.message ? 'ring-[1.5px] ring-blue-500 border-transparent' : ''} ${errors.newPasswordConfirmation?.message ? 'border-2 border-red-500 dark:border-red-500 ring-0' : ''}`}>
                        <input 
                            type={showNewPasswordConfirmation ? 'text' : 'password'}
                            id='newPasswordConfirmation'
                            onFocus={() => setIsFocus('newPasswordConfirmation')} 
                            {...register('newPasswordConfirmation', {
                                required: 'This field is required!',
                                minLength: {
                                    value: 7,
                                    message: 'Minimum password length is 7 character or more!'
                                },
                                validate: (value) => {
                                    return watch('newPassword') === value || 'New password confirmation not match with new password'
                                },
                                onBlur: () => setIsFocus(null),
                            })}
                            className={`bg-transparent border-none outline-none flex-1 ring-0 focus:ring-0 p-0 text-sm mr-3`}/>
                            {showNewPasswordConfirmation ? (
                                <RxEyeOpen className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowNewPasswordConfirmation(!showNewPasswordConfirmation)}/>
                            ) : (
                                <RxEyeClosed className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowNewPasswordConfirmation(!showNewPasswordConfirmation)}/>
                            )}
                    </div>
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