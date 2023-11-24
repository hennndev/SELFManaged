"use client"
import React, { useState } from 'react'
import 'react-international-phone/style.css'
import { useForm, Controller } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'
import { CountryDropdown } from 'react-country-region-selector'


interface ColleagueTypes {
    name: string
    address: string
    job: string
    telpNumber: string
    country: string
    isFavorite: string
}
 
const ColleagueForm = ({title}: {title: string}) => {

    const [isLoading, setIsLoading] = useState(false)
    
    const {register, formState: {errors}, reset,  handleSubmit, control} = useForm<ColleagueTypes>({defaultValues: {
        name: "",
        address: "",
        job: "",
        telpNumber: "",
        country: "",
        isFavorite: ""
    }})

    const onSubmit = (values: ColleagueTypes) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-gray-700 text-lg font-medium mb-5 underline'>{title}</h1>
            <div className='flex flex-col mb-5'>
                <label htmlFor="name" className='mb-2 text-gray-700'>Colleague name</label>
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
                    className='border border-gray-200 outline-none rounded-md p-2'/>
                {errors.name ? (
                    <small className='text-red-700 mt-0.5 font-medium'>{errors.name?.message}</small>
                ) : null}
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="job" className='mb-2 text-gray-700'>Colleague job</label>
                <input 
                    type='text' 
                    id='job'
                    {...register('job', {
                        required: 'This field is required! (You can input Unemployed if dont have a job)'
                    })}
                    placeholder='Input colleague job...' 
                    className='border border-gray-200 outline-none rounded-md p-2'/>
                {errors.job ? (
                    <small className='text-red-700 mt-0.5 font-medium'>{errors.job?.message}</small>
                ) : null}
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="address" className='mb-2 text-gray-700'>Colleague address</label>
                <textarea 
                    id="address" 
                    {...register('address', {
                        required: 'This field is required!'
                    })}
                    placeholder='Input colleague address..'
                    rows={5} 
                    className='border border-gray-200 outline-none rounded-md p-2'></textarea>
                {errors.address ? (
                    <small className='text-red-700 mt-0.5 font-medium'>{errors.address?.message}</small>
                ) : null}
            </div>

            <div className="flex flex-col mb-5">
                <label htmlFor="telpNumber" className='mb-2 text-gray-700'>Colleague telp number</label>
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
                            className='mr-3'
                        />
                    )}
                />  
                {errors.telpNumber ? (
                    <small className='text-red-700 mt-0.5 font-medium break-words'>{errors.telpNumber?.message}</small>
                ) : null}  
            </div>

            <div className="flex flex-1 flex-col mb-5">
                <label htmlFor="telpNumber" className='mb-2 text-gray-700'>Colleague telp number</label>
                <Controller
                    name="country"
                    control={control}
                    rules={{required: "This field is required!"}}
                    render={({ field }) => (
                        <CountryDropdown 
                            {...field} 
                            classes='flex-1 border border-gray-200 outline-none rounded-md p-2'/>
                    )}
                />  
                {errors.country ? (
                    <small className='text-red-700 mt-0.5 font-medium'>{errors.country?.message}</small>
                ) : null}  
            </div>

            <div className='flex flex-col mb-5'>
                <label htmlFor="isFavorite" className='mb-2 text-gray-700'>Make him/her as a favorite person 😍</label>
                <select 
                    id="isFavorite" 
                    {...register('isFavorite', {
                        required: 'This field is required!'
                    })}
                    className='border border-gray-200 outline-none rounded-md p-2'>
                    <option value="" selected>Choose option</option>
                    <option value="favorite">Favorite person 😍</option>
                    <option value="ordinary">Just ordinary person 😊</option>
                </select>
                {errors.isFavorite ? (
                    <small className='text-red-700 mt-0.5 font-medium'>{errors.isFavorite?.message}</small>
                ) : null} 
            </div>
            <div className="flexx mt-10">
                <button 
                    type='submit' 
                    className='border-none outline-none px-3 py-2 bg-blue-700 text-white rounded-md mr-3'>Submit new colleague</button>
                <button 
                    type='button'
                    onClick={() => reset()} 
                    className='border-none outline-none px-3 py-2 bg-red-700 text-white rounded-md'>Clear form</button>
            </div>
        </form>
    )
}

export default ColleagueForm