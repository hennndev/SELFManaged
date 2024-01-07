'use client'
import React, { useState, useEffect, Fragment } from 'react'
import toast from 'react-hot-toast'
import 'react-international-phone/style.css'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import { jobOptions } from '@/app/utils/jobOptions'
import { useForm, Controller } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'
import { useParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CountryDropdown } from 'react-country-region-selector'
import { addNewColleague, getColleague, editColleague } from '@/app/lib/actions/colleague.actions'

type PropsTypes = {
    title: string,
    isEdit?: boolean
}
type FormTypes = ColleagueTypes & { jobOthers: string}
 
const ColleagueForm = ({title, isEdit}: PropsTypes) => {
    const params = useParams()
    const router = useRouter()
    const { data } = useSession()
    const user = data?.user as UserLoginTypes
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {register, formState: {errors}, setValue, clearErrors, reset,  handleSubmit, control, watch} = useForm<FormTypes>({defaultValues: {
        email: "",
        name: "",
        address: "",
        job: "",
        jobOthers: "",
        phoneNumber: "",
        country: "",
        isFavorite: ""
    }})
    
    const onReset = () => {
        clearErrors()
        reset()
    }
    const handleAdd = (formValues: ColleagueTypes, jobOthers: string) => {
        return addNewColleague(user?.userId, {
            ...formValues,
            job: formValues.job === 'Others' ? jobOthers : formValues.job
        })
    }
    const handleEdit = (formValues: ColleagueTypes, jobOthers: string) => {
        return editColleague(params.colleagueId as string, {
            ...formValues,
            job: formValues.job === 'Others' ? jobOthers : formValues.job
        })
    }

    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
        try {
            const {jobOthers, ...formValues} = values
            let promise
            if(!isEdit) {
                // if not from edit page, will run this function
                promise = await handleAdd(formValues, jobOthers)
            } else {
                // if from edit page, will run this function
                promise = await handleEdit(formValues, jobOthers)
            }
            if(promise) {
                toast.success(`${isEdit ? 'Success edit colleague' : 'Success add new colleague'}`)
                onReset()
                setTimeout(() => {
                    toast.dismiss()
                    router.push('/dashboard/colleague')
                }, 2000);
            }
        } catch (error: any) {
            toast.error(error.message)   
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if(params.colleagueId && user?.userId) {
            const handleGetColleague = async () => {
                const colleague = await getColleague(params.colleagueId as string)
                if(colleague) {
                    setValue('name', colleague.name)
                    setValue('email', colleague.email)
                    if(jobOptions.includes(colleague.job)) {
                        setValue('job', colleague.job)
                    } else {
                        setValue('job', 'Others')
                        setValue('jobOthers', colleague.job)
                    }
                    setValue('address', colleague.address)
                    setValue('phoneNumber', colleague.phone_number)
                    setValue('country', colleague.country)
                    setValue('isFavorite', colleague.is_favorite)
                } else {
                    // if colleague undefined, will redirect to coleague page. (This scenario to avoid if user typing random params in url address)
                    router.push('/dashboard/colleague')
                }
            }
            handleGetColleague()
        }
    }, [params.colleagueId, user?.userId])

    return (
        <Fragment>
            <AnimatePresence>
                <motion.div 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.2}}
                    className='w-full border border-gray-200 p-5 dark:border-gray-700 dark:bg-[#181818] rounded-md'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-gray-700 dark:text-gray-300 text-lg font-medium mb-5 underline'>{title}</h1>

                        {/* colleague name control */}
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="name" className='label'>Colleague name</label>
                            <input type='text' id='name' placeholder='Input colleague name...' disabled={isLoading}
                                {...register('name', {
                                    required: 'This field is required!',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum length colleague name is 3 character or more!'
                                    }
                                })}        
                                className={`input ${errors.name?.message ? 'input-error' : ''}`}/>
                            {errors.name ? (
                                <small className='input-msg-error'>{errors.name?.message}</small>
                            ) : null}
                        </div>
                        
                        {/* colleague email control */}
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="name" className='label'>Colleague email</label>
                            <input type='email' id='email' placeholder='Input colleague email...' disabled={isLoading}
                                {...register('email', {
                                    required: 'This field is required!',
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email not valid!"
                                    }
                                })}       
                                className={`input ${errors.email?.message ? 'input-error' : ''}`}/>
                            {errors.email ? (
                                <small className='input-msg-error'>{errors.email?.message}</small>
                            ) : null}
                        </div>
                        
                        {/* colleague job control */}
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="job" className='label'>Colleague job</label>
                            <select id='job'  className={`input [&>option]:dark:!bg-[#222] ${errors.job?.message ? 'input-error' : ''}`}
                                disabled={isLoading}
                                {...register('job', {
                                    required: 'This field is required!'
                                })}>
                                <option value="" selected>Choose colleague job</option>
                                {jobOptions.map(opt => (
                                    <option value={opt} key={opt}>{opt}</option>
                                ))}
                            </select>
                            {errors.job ? (
                                <small className='input-msg-error'>{errors.job?.message}</small>
                            ) : null}
                            {/* if value of job is = others, then this element will be showing */}
                            {watch('job') === 'Others' && (
                                <input type='text' placeholder='Input colleague speficic job...' disabled={isLoading} 
                                    {...register('jobOthers', {
                                        required: 'This field is required!',
                                    })}
                                    className={`input mt-4 ${errors.jobOthers?.message ? 'input-error' : ''}`}/>
                            )}
                            {watch('job') === 'Others' && errors.jobOthers ? (
                                <small className='input-msg-error'>{errors.jobOthers?.message}</small>
                            ) : null}
                        </div>
                        
                        {/* colleague address control */}
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="address" className='label'>Colleague address</label>
                            <textarea id="address" placeholder='Input colleague address..' rows={5} disabled={isLoading}
                                {...register('address', {
                                    required: 'This field is required!',
                                    setValueAs: v => v.replaceAll('\n', '')
                                })}
                                className={`input ${errors.address?.message ? 'input-error' : ''}`}></textarea>
                            {errors.address ? (
                                <small className='input-msg-error'>{errors.address?.message}</small>
                            ) : null}
                        </div>
                                
                        {/* colleague phone number control */}
                        <div className="flex flex-col mb-5">
                            <label htmlFor="phoneNumber" className='label'>Colleague phone number</label>
                            <Controller name="phoneNumber" control={control} disabled={isLoading}
                                rules={{
                                    required: "This field is required!",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum length telp number is 8 number or more!'
                                    }
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        defaultCountry='id'
                                        {...field}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        className={`[&>.react-international-phone-input]:ring-0 [&>.react-international-phone-input]:!bg-transparent [&>.react-international-phone-input]:dark:!border-gray-700 [&>.react-international-phone-input]:dark:!text-gray-300 mr-3 outline-none w-full !bg-transparent ${isFocus && !errors.phoneNumber?.message ? '[&>.react-international-phone-country-selector]:rounded [&>.react-international-phone-country-selector]:ring-[1.5px] [&>.react-international-phone-country-selector]:ring-blue-500 [&>.react-international-phone-input]:!ring-[1.5px] [&>.react-international-phone-input]:!ring-blue-500' : ''} 
                                        ${errors.phoneNumber?.message ? '[&>.react-international-phone-country-selector]:rounded [&>.react-international-phone-country-selector]:ring-[1.5px] [&>.react-international-phone-country-selector]:ring-red-500 [&>.react-international-phone-input]:!ring-[1.5px] [&>.react-international-phone-input]:!ring-red-500' : ''}`}
                                    />
                                )}
                            />  
                            {errors.phoneNumber ? (
                                <small className='input-msg-error'>{errors.phoneNumber?.message}</small>
                            ) : null}  
                        </div>
                        
                        {/* colleague country control */}
                        <div className="flex flex-1 flex-col mb-5">
                            <label htmlFor="country" className='label'>Colleague country</label>
                            <Controller name="country" control={control} rules={{required: "This field is required!"}} disabled={isLoading}
                                render={({ field }) => (
                                    <CountryDropdown 
                                        {...field} 
                                        classes={`flex-1 input [&>option]:dark:!bg-[#222] ${errors.country?.message ? 'input-error' : ''}`}/>
                                )}
                            />  
                            {errors.country ? (
                                <small className='input-msg-error'>{errors.country?.message}</small>
                            ) : null}  
                        </div>
                        
                        {/* colleague isFavorite control (jst for fun 😁) */}
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="isFavorite" className='label'>Make him/her as a favorite person 😍</label>
                            <select id="isFavorite" disabled={isLoading} 
                                {...register('isFavorite', {
                                    required: 'This field is required!'
                                })}
                                className={`input dark:!bg-transparent [&>option]:dark:bg-[#222] ${errors.isFavorite?.message ? 'input-error' : ''}`}>
                                <option value="" selected>Choose option</option>
                                <option value="favorite">Favorite person 😍</option>
                                <option value="ordinary">Just ordinary person 😊</option>
                            </select>
                            {errors.isFavorite ? (
                                <small className='input-msg-error'>{errors.isFavorite?.message}</small>
                            ) : null} 
                        </div>

                        <div className="flexx mt-10 space-x-3">
                            <Button type='submit' isLoading={isLoading} variant='primary'>Submit</Button>
                            {!isLoading ? <Button type='button' variant='danger' handleClick={onReset}>Clear form</Button> : null}
                        </div>
                    </form>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}

export default ColleagueForm