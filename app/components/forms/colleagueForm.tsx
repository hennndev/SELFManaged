"use client"
import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import 'react-international-phone/style.css'
import toast, { Toaster } from 'react-hot-toast'
import Button from '@/app/components/ui/button'
import { useForm, Controller } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'
import { useColleagueStore } from '@/app/store/zustand'
import { CountryDropdown } from 'react-country-region-selector'


 
const ColleagueForm = ({title}: {title: string}) => {
    
    const { colleagues, addColleague } = useColleagueStore()
    const [isFocus, setIsFocus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {register, formState: {errors}, clearErrors, reset,  handleSubmit, control} = useForm<ColleagueTypes>({defaultValues: {
        name: "",
        address: "",
        job: "",
        telpNumber: "",
        country: "",
        isFavorite: ""
    }})
    
    const onReset = () => {
        clearErrors()
        reset()
    }
    const onSubmit = (values: ColleagueTypes) => {
        setIsLoading(true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setIsLoading(false)
                addColleague({
                    id: uuid(),
                    name: values.name,
                    address: values.address,
                    job: values.job,
                    telpNumber: values.telpNumber,
                    country: values.country,
                    isFavorite: values.isFavorite
                })
                toast.success('Success add new colleague')
                onReset()
                resolve(true)
            }, 3000)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Toaster toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 5000
            }}/>
            <h1 className='text-gray-700 dark:text-gray-300 text-lg font-medium mb-5 underline'>{title}</h1>
            <div className='flex flex-col mb-5'>
                <label htmlFor="name" className='label'>Colleague name</label>
                <input 
                    type='text'
                    id='name' 
                    {...register('name', {
                        required: 'This field is required!',
                        minLength: {
                            value: 3,
                            message: 'Minimum length colleague name is 3 character or more!'
                        }
                    })}
                    placeholder='Input colleague name...' 
                    className={`input ${errors.name?.message ? 'input-error' : ''}`}/>
                {errors.name ? (
                    <small className='input-msg-error'>{errors.name?.message}</small>
                ) : null}
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="job" className='label'>Colleague job</label>
                <input 
                    type='text' 
                    id='job'
                    {...register('job', {
                        required: 'This field is required! (You can input Unemployed if dont have a job)'
                    })}
                    placeholder='Input colleague job...' 
                    className={`input ${errors.job?.message ? 'input-error' : ''}`}/>
                {errors.job ? (
                    <small className='input-msg-error'>{errors.job?.message}</small>
                ) : null}
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="address" className='label'>Colleague address</label>
                <textarea 
                    id="address" 
                    {...register('address', {
                        required: 'This field is required!'
                    })}
                    placeholder='Input colleague address..'
                    rows={5} 
                    className={`input ${errors.address?.message ? 'input-error' : ''}`}></textarea>
                {errors.address ? (
                    <small className='input-msg-error'>{errors.address?.message}</small>
                ) : null}
            </div>

            <div className="flex flex-col mb-5">
                <label htmlFor="telpNumber" className='label'>Colleague telp number</label>
                <Controller
                    name="telpNumber"
                    control={control}
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
                            className={`[&>.react-international-phone-input]:ring-0 [&>.react-international-phone-input]:!bg-transparent [&>.react-international-phone-input]:dark:!border-[#222] [&>.react-international-phone-input]:dark:!text-gray-300 mr-3 outline-none w-full !bg-transparent ${isFocus && !errors.telpNumber?.message ? '[&>.react-international-phone-country-selector]:rounded [&>.react-international-phone-country-selector]:ring-[1.5px] [&>.react-international-phone-country-selector]:ring-blue-500 [&>.react-international-phone-input]:!ring-[1.5px] [&>.react-international-phone-input]:!ring-blue-500' : ''} 
                            ${errors.telpNumber?.message ? '[&>.react-international-phone-country-selector]:rounded [&>.react-international-phone-country-selector]:ring-[1.5px] [&>.react-international-phone-country-selector]:ring-red-500 [&>.react-international-phone-input]:!ring-[1.5px] [&>.react-international-phone-input]:!ring-red-500' : ''}`}
                        />
                    )}
                />  
                {errors.telpNumber ? (
                    <small className='input-msg-error'>{errors.telpNumber?.message}</small>
                ) : null}  
            </div>

            <div className="flex flex-1 flex-col mb-5">
                <label htmlFor="telpNumber" className='label'>Colleague telp number</label>
                <Controller
                    name="country"
                    control={control}
                    rules={{required: "This field is required!"}}
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

            <div className='flex flex-col mb-5'>
                <label htmlFor="isFavorite" className='label'>Make him/her as a favorite person 😍</label>
                <select 
                    id="isFavorite" 
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


            <div className="flexx mt-10">
                <Button type='submit' isLoading={isLoading} variant='primary'>Submit</Button>
                <Button type='button' isLoading={isLoading} variant='danger' handleClick={onReset}>Clear form</Button>
            </div>
        </form>
    )
}

export default ColleagueForm