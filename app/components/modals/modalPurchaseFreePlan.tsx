'use client'
import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'
import { changeUserSubscribed } from '@/app/lib/actions/userActions'

type PropsTypes = {
    handleCloseModal: () => void
}
const ModalPurchaseFreePlan = ({handleCloseModal}: PropsTypes) => {
    const router = useRouter()
    const { data, update } = useSession()
    const user: any = data?.user
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePurchaseFreePlan = async () => {
        setIsLoading(true)
        try {
            await changeUserSubscribed(user.userId as string, user.email as string, 'free').then(() => {
                update({isSubscribed: 'free'})
            })
        } catch (error) {
            toast.error('You must be signin before subscribe')
        } 
    }
    useEffect(() => {
        if(user.isSubscribed) {
            setIsLoading(false)
            router.push('/purchase-success')
        }
    }, [user.isSubscribed])

    return (
        <Fragment>
            <Toaster toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 2000
            }}/>
            <ModalWrapper classes='!max-w-md'>
                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" data-modal-hide="popup-modal" onClick={handleCloseModal}>
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-4 pb-4 pt-14 text-center">
                    <h1 className='text-center  text-xl text-gray-700 dark:text-gray-300 font-semibold'>Do you want to purchase free plan?</h1>
                    <div className="flex-center mt-5 space-x-3">
                        <Button isLoading={isLoading} type='button' variant="primary" handleClick={handlePurchaseFreePlan}>
                            Purchase now
                        </Button>
                        {!isLoading ? <Button type='button' variant='outline' handleClick={handleCloseModal}>No, cancel</Button> : null}
                    </div>
                </div>
            </ModalWrapper>
        </Fragment>
    )
}

export default ModalPurchaseFreePlan