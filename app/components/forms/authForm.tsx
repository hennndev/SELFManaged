'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import Alert from '@/app/components/utils/alert'
import Button from '@/app/components/utils/button'
import { AnimatePresence, motion } from 'framer-motion'
import LogoTitle from '@/app/components/utils/logoTitle'
import { IoLogoGoogle, IoLogoGithub } from "react-icons/io"
import { signupUser } from '@/app/lib/actions/authActions'



type PropsTypes = {
    pageTitle: string
    isSignin?: boolean
}

type AuthFormTypes = {
    username: string
    email: string
    password: string
    passwordConfirmation: string
}

const AuthForm = ({pageTitle, isSignin}: PropsTypes) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState<null | string>(null)
    const [isError, setIsError] = useState<null | string>(null)
    const {register, formState: {errors},  handleSubmit, control} = useForm<AuthFormTypes>({defaultValues: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }})


    const onSubmit = async (values: AuthFormTypes) => {
        setIsLoading(true)
        setIsSuccess(null)
        setIsError(null)
        if(isSignin) {
            await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            }).then(res => {
                throw res?.error
            }).catch(error => {
                setIsError(error)
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            await signupUser(values.username, values.email, values.password).then(res => {
                if(res?.error) {
                    throw res?.error
                }
            }).catch(error => {
                setIsError(error)
            }).finally(() => {
                setIsLoading(false)
            })
        } 
    }

    const handleClose = () => {
        setIsError(null)
        setIsSuccess(null)
    }

    const signinGoogle = async () => await signIn('google', {callbackUrl: '/'}) 
    const signinGithub = async () => await signIn('github', {callbackUrl: '/'}) 

    return (
        <AnimatePresence>
            <div className='w-[400px]'> 
                {!isSignin ? (
                    <>
                        <LogoTitle/>
                        <motion.p 
                            initial={{ opacity: 0,y: 30 }} 
                            animate={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className='w-[300px] mx-auto text-center mt-2 text-gray-700 dark:text-gray-400 text-sm leading-[1.7]'>
                            Welcome new user, you can fill this form to register new account
                        </motion.p>
                    </>
                ) : null}
                {isError ? (
                    <Alert alertType='danger' handleClose={handleClose}>
                        <span className="font-medium">Failed!</span> {isError}
                    </Alert>
                ) : null}
                {isSuccess ? (
                    <Alert alertType='success' handleClose={handleClose}>
                        <span className="font-medium">Success!</span> {isSuccess}
                    </Alert>
                ) : null}
                <motion.h1 
                    initial={{ opacity: 0,y: 30 }} 
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className='text-center text-2xl text-gray-700 dark:text-gray-300 font-bold mt-3'>{pageTitle}</motion.h1>
                <motion.div
                    initial={{ opacity: 0,y: 30 }} 
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}>
                    <Button type='button' variant='outline' classes='w-full flex-center mt-3' handleClick={signinGoogle}>
                        <IoLogoGoogle className='text-xl mr-2'/>
                        Signin with google
                    </Button>
                    <Button type='button' variant='outline' classes='w-full flex-center mt-3' handleClick={signinGithub}>
                        <IoLogoGithub className='text-xl mr-2'/>
                        Signin with github
                    </Button>
                </motion.div>



                {/* form */}
                <motion.form 
                    initial={{ opacity: 0,y: 30 }} 
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-3 mt-7'>
                    {!isSignin ? (
                        <div className='flex flex-col'>
                            <label htmlFor="username" className='label text-sm'>Username</label>
                            <input 
                                type='text'
                                id='username' 
                                {...register('username', {
                                    required: 'This field is required!',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum length username at least have 3 character or more!'
                                    }
                                })}
                                placeholder='Input username...' 
                                className={`input text-sm ${errors.username?.message ? 'input-error' : ''}`}/>
                            {errors.username ? (
                                <small className='input-msg-error'>{errors.username?.message}</small>
                            ) : null}
                        </div>
                    ) : null}
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
                    <div className='flex flex-col mt-7'>
                        <label htmlFor="username" className='label text-sm'>Password</label>
                        <input 
                            type='password'
                            id='password' 
                            {...register('password', {
                                required: 'This field is required!',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum length username is 3 character or more!'
                                }
                            })}
                            placeholder='Input password...' 
                            className={`input text-sm ${errors.password?.message ? 'input-error' : ''}`}/>
                        {errors.password ? (
                            <small className='input-msg-error'>{errors.password?.message}</small>
                        ) : null}
                    </div>
                    {!isSignin ? (
                        <div className='flex flex-col mt-7'>
                            <label htmlFor="username" className='label text-sm'>Password Confirmation</label>
                            <input 
                                type='password'
                                id='password' 
                                {...register('passwordConfirmation', {
                                    required: 'This field is required!',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum length username is 3 character or more!'
                                    }
                                })}
                                placeholder='Input password confirmation...' 
                                className={`input text-sm ${errors.passwordConfirmation?.message ? 'input-error' : ''}`}/>
                            {errors.passwordConfirmation ? (
                                <small className='input-msg-error'>{errors.passwordConfirmation?.message}</small>
                            ) : null}
                        </div>
                    ) : null}

                    {isSignin ? (
                        <Link href='/reset-password' className='ml-auto w-max text-gray-700 dark:text-gray-400 text-[13.5px] text-right hover:text-blue-500 dark:hover:text-blue-600 hover:underline'>
                            Forgot your password?
                        </Link>
                    ) : null}
                    <Button isLoading={isLoading} type='submit' variant='primary-gradient' classes='flex-center !mt-5'>Submit</Button>
                    <div className="flex-between mt-3">
                        <Link href='/' className='text-sm text-gray-700 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-700 hover:underline'>Get back</Link>
                        <p className='text-center text-gray-700 dark:text-gray-400 text-sm'>
                            {isSignin ? 'Dont have an account' : 'Already have an account'}? 
                            <Link href={`/${isSignin ? 'signup' : 'signin'}`} className='hover:underline text-blue-500 dark:text-blue-600'>
                                {' '} {isSignin ? 'Signup' : 'Signin'}
                            </Link>
                        </p>
                    </div>
                </motion.form>
            </div>
        </AnimatePresence>
    )
}

export default AuthForm