'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import BottomOptions from '@/app/components/ui/bottomOptions'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { AiOutlineCamera, AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai"

type PropsTypes = {
    handleShowModal: (value: boolean) => void
}
const ModalProfile = ({handleShowModal}: PropsTypes) => {
    const router = useRouter()
    const pathname = usePathname()
    const {data} = useSession()
    const user: any = data?.user
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showOptions, setShowOptions] = useState<boolean>(false)
    
    const handleNavigate = (route: string) => {
        handleShowModal(false)
        router.push(route)
    }
    const handleCloseModal = () => handleShowModal(false)
    const handleChoosePlan = () => {
        // if subscribe status not premium, will auto scrolled to prices section
        if(pathname.includes('dashboard')) {
            router.push('/#pricing')
        }
        if(user.isSubscribed !== 'premium') {
            handleShowModal(false)
            const pricing = document.getElementById('pricing') as HTMLElement
            window.scrollTo(pricing?.offsetLeft, pricing?.offsetTop)
        }
    }

    return (
        <ModalWrapper classes='!max-w-md'>
            {/* This element will showing, if user has been subscribed */}
            {user.isSubscribed ? (
                <div className='absolute bg-gradient-to-r from-fuchsia-600 to-blue-600 rounded-md px-16 py-2 transform -rotate-45 
                top-4 -left-[45px] -ml-[12px]'>
                    <p className='text-white'>{user.isSubscribed === 'free' ? 'Free' : 'Pro'} plan</p>
                </div>
            ) : null}
            {/* overlay will showing if isLoading is true */}
            {isLoading ? <div className='overlay-loading'></div> : null}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-[#222]">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-auto">
                    Account
                </h3>
                {/* Close icon modal */}
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" onClick={handleCloseModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <div className="py-4 px-4 sm:px-7 md:py-5 md:px-8">
                <div className="flex-center">
                    <div className='relative w-[120px] h-[120px] rounded-full'>
                        <Image fill sizes='100vw' className='w-full h-full rounded-full cursor-pointer object-contain' src={data?.user?.image ? data?.user?.image : 'https://fisika.uad.ac.id/wp-content/uploads/blank-profile-picture-973460_1280.png'} alt="image-profile" />
                        <div className='absolute bottom-0 right-0 rounded-full p-2 bg-gradient-to-r from-fuchsia-500 to-blue-500 dark:from-fuchsia-600 dark:to-blue-600 hover:from-fuchsia-600 hover:to-blue-600 dark:hover:from-fuchsia-700 dark:hover:to-blue-700  cursor-pointer' onClick={() => setShowOptions(!showOptions)}>
                            <AiOutlineCamera className='text-2xl text-gray-100'/>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col mt-10'>
                    <div className="flexx cursor-default hover:bg-gray-50 dark:hover:bg-[#222] p-3 rounded-md">
                        <AiOutlineUser className='text-2xl text-gray-600 dark:text-gray-400 mr-5'/>
                        <p className='flex-1 text-gray-700 dark:text-gray-300 line-clamp-2'>
                            {data?.user?.name}
                        </p>
                    </div>
                    <div className="flexx cursor-default hover:bg-gray-50 dark:hover:bg-[#222] p-3 rounded-md">
                        <AiOutlineMail className='text-2xl text-gray-600 dark:text-gray-400 mr-5'/>
                        <p className='flex-1 text-gray-700 break-all dark:text-gray-300 line-clamp-2'>
                            {data?.user?.email}
                        </p>
                    </div>
                    <div onClick={() => handleNavigate('/update-password')} className="flexx cursor-pointer hover:bg-gray-50 dark:hover:bg-[#222] p-3 rounded-md">
                        <AiOutlineLock className='text-2xl text-gray-600 dark:text-gray-400 mr-5'/>
                        <p className='text-gray-700 dark:text-gray-300'>Update Password</p>
                    </div>
                </div>
                <div className='flex-between mt-5'>
                    <Button type='button' variant='primary-gradient' handleClick={handleChoosePlan}>
                        {user.isSubscribed !== 'premium' ? 'Become Pro' : 'Customer Support'}
                    </Button>
                    <Button type='button' variant='outline' handleClick={handleCloseModal}>
                        Close
                    </Button>
                </div>
                <BottomOptions 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    showOptions={showOptions}
                    handleCloseOptions={() => setShowOptions(false)}/>
            </div>
        </ModalWrapper>  
    )
}
export default ModalProfile