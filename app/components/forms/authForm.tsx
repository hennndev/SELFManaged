'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Alert from '@/app/components/utils/alert'
import Button from '@/app/components/utils/button'
import { AnimatePresence, motion } from 'framer-motion'
import LogoTitle from '@/app/components/utils/logoTitle'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx"
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

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isFocus, setIsFocus] = useState<null | string>(null)
    const [isSuccess, setIsSuccess] = useState<null | string>(null)
    const [isError, setIsError] = useState<null | string>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)
    const {register, formState: {errors},  handleSubmit, watch} = useForm<AuthFormTypes>({defaultValues: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }})

    const onSubmit = async (values: AuthFormTypes) => {
        setIsLoading(true)
        setIsError(null)
        setIsSuccess(null)
        if(isSignin) {
            //if signin page will call this function
            await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            }).then(res => {
                if(res?.error) {
                    throw res?.error
                } else {
                    router.push('/')
                }
            }).catch(error => {
                setIsError(error)
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            //if signup page will call this function
            await signupUser(values.username, values.email, values.password).then(res => {
                if(res?.error) {
                    throw res?.error
                }
                if(res?.success) {
                    setIsSuccess(res.success)
                }
            }).catch(error => {
                setIsError(error)
            }).finally(() => {
                setIsLoading(false)
            })
        } 
    }
    const signinGoogle = async () => await signIn('google', {callbackUrl: '/'}) 
    const signinGithub = async () => await signIn('github', {callbackUrl: '/'}) 
    const handleCloseAlert = () => {
        setIsError(null)
        setIsSuccess(null)
    }


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
                {/* showing alert error while submitting failed */}
                {isError ? (
                    <Alert alertType={isError.includes('verified') ? 'primary' : 'danger'} handleClose={handleCloseAlert}>
                        <span className="font-bold">{isError.includes('verified') ? 'Email not verified' : 'Failed'}!</span> {isError}
                        {isError.includes('verified') ? (
                            <span><br /> Click <Link href='/verification-email' className='mt-1 underline'> this</Link> link for email verification</span>
                        ) : ''}
                    </Alert>
                ) : null}
                {/* showing success alert while submitting success. Only in signup page */}
                {isSuccess ? (
                    <Alert alertType='success' handleClose={handleCloseAlert}>
                        <span className="font-bold">Success!</span> {isSuccess}
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
                        <IoLogoGoogle className='text-xl mr-2 text-red-500'/>
                        Signin with google
                    </Button>
                </motion.div>

                {/* form */}
                <motion.form 
                    initial={{ opacity: 0,y: 30 }} 
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-3 mt-7'>
                    
                    {/* signup only | username field */}
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
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Maximum username length is 30 charcter'
                                    }
                                })}
                                autoComplete='off'
                                placeholder='Input username...' 
                                className={`input text-sm ${errors.username?.message ? 'input-error' : ''}`}/>
                            {errors.username ? (
                                <small className='input-msg-error'>{errors.username?.message}</small>
                            ) : null}
                        </div>
                    ) : null}

                    {/* email field */}
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

                    {/* password field */}
                    <div className='flex flex-col mt-7'>
                        <label htmlFor="password" className='label text-sm'>Password</label>
                        <div className={`flex items-center border border-gray-200 dark:border-[#222] rounded-md p-2 ${isFocus === 'password' && !errors.password?.message ? 'ring-[1.5px] ring-blue-500 border-transparent' : ''} ${errors.password?.message ? 'border-2 border-red-500 dark:border-red-500 ring-0' : ''}`}>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                onFocus={() => setIsFocus('password')} 
                                {...register('password', {
                                    required: 'This field is required!',
                                    minLength: {
                                        value: 7,
                                        message: 'Minimum password length is 7 character or more!'
                                    },
                                    onBlur: () => setIsFocus(null),
                                })}
                                className={`bg-transparent border-none outline-none flex-1 ring-0 focus:ring-0 p-0 text-sm mr-3`}/>
                                {showPassword ? (
                                    <RxEyeOpen className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
                                ) : (
                                    <RxEyeClosed className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
                                )}
                        </div>
                        {errors.password ? (
                            <small className='input-msg-error'>{errors.password?.message}</small>
                        ) : null}
                    </div>

                    {/* signup only | password confirmation */}
                    {!isSignin ? (
                        <div className='flex flex-col mt-7'>
                            <label htmlFor="passwordConfirmation" className='label text-sm'>Password Confirmation</label>
                            <div className={`flex items-center border border-gray-200 dark:border-[#222] rounded-md p-2 ${isFocus === 'passwordConfirmation' && !errors.passwordConfirmation?.message ? 'ring-[1.5px] ring-blue-500 border-transparent' : ''} ${errors.passwordConfirmation?.message ? 'border-2 border-red-500 dark:border-red-500 ring-0' : ''}`}>
                                <input 
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    id='passwordConfirmation' 
                                    onFocus={() => setIsFocus('passwordConfirmation')}
                                    {...register('passwordConfirmation', {
                                        required: 'This field is required!',
                                        minLength: {
                                            value: 7,
                                            message: 'Minimum password length is 7 character or more!'
                                        },
                                        validate: (value: string) => {
                                            return watch('password') === value || 'Password confirmation not match with password'
                                        },
                                        onBlur: () => setIsFocus(null)
                                    })}
                                    className={`bg-transparent border-none outline-none flex-1 ring-0 focus:ring-0 p-0 text-sm mr-3`}/>
                                {showPasswordConfirmation ? (
                                    <RxEyeOpen className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}/>
                                ) : (
                                    <RxEyeClosed className='text-gray-700 dark:text-gray-300 text-lg cursor-pointer' onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}/>
                                )}

                            </div>
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