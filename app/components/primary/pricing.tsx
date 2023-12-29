'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { getStripe } from '@/app/lib/utils/stripe'
import { featureList } from '@/app/utils/featuresList'
import { motion, AnimatePresence } from 'framer-motion'
import ModalPurchaseFreePlan from '@/app/components/modals/modalPurchaseFreePlan'

const Pricing = () => {
    const { data } = useSession()
    const user: any = data?.user
    const [isModal, setIsModal] = useState<boolean>(false)

    //only for checkout premium plan
    const handleCheckoutPremiumPlan = async () => {
        try {
            const stripe = await getStripe();
            const checkoutResponse = await fetch('/api/stripe/checkout_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: data?.user?.email
                })
            }).then(res => res.json())
            const { sessionId } = await checkoutResponse
            const stripeError = await stripe!.redirectToCheckout({sessionId})

            if (stripeError) {
                toast.error('Stripe configuration is error. Call the developer if this is happen')
            }
        } catch (error) {
            toast.error('Something went wrong with stripe payment')
        }
    }

    const handleClick = (plan: string) => {
        if(!data?.user) {
            toast.error('You must be signin before subscribe')
        } else {
            if(plan === 'premium') {
                handleCheckoutPremiumPlan()
            } else {
                setIsModal(true)
            }
        }
    }

    useEffect(() => {
        if(isModal) {
            // if this modal showing, scrollable will hidden
            document.body.style.overflowY = 'hidden'
        } else {
            // if this modal hidden, scrollable will be auto
            document.body.style.overflowY = 'auto'
        }
    }, [isModal])
    


    // NOTES: ❗❗
    // Premium Plan can't be solved, bcs I still not yet trying stripe cli in the windows. You know what I mean. Windows detect stripe cli as a virus. HEUUU 

    return (
        <>
            {/* Modal purchase free plan will showing if modal is true */}
            {isModal ? <ModalPurchaseFreePlan handleCloseModal={() => setIsModal(false)}/> : null}
            <Toaster toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 2000
            }}/>
            <AnimatePresence>
                <section id='pricing' className='mt-20 px-3'>
                    <motion.h1 
                        initial={{ opacity: 0,y: 30 }} 
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className='text-center text-[35px] sm:text-[40px] font-bold text-gray-700 dark:text-gray-200 tracking-tighter'>
                        Pricing and Plans
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0,y: 30 }} 
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-center max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400 font-medium">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.
                    </motion.p>

                    <div className='flex-center flex-col lg:flex-row mt-16 space-y-20 lg:space-y-0 lg:space-x-10'>
                        {/* free plan */}
                        <motion.div 
                            initial={{ opacity: 0,y: 30 }} 
                            whileInView={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="overflow-hidden bg-transparent dark:bg-white shadow-md rounded-md">
                            <div className="p-6 md:py-8 md:px-9">
                                <h3 className="text-xl font-semibold text-gray-700">Free</h3>
                                <p className="mt-2.5 text-sm text-gray-600">All the basic features to boost your productivity</p>
                                <div className="flex items-end mt-5">
                                    <div className="flex items-start">
                                        <span className="text-xl font-medium text-gray-700"> $ </span>
                                        <p className="text-6xl text-gray-700 font-medium tracking-tight">0</p>
                                    </div>
                                    <span className="ml-0.5 text-gray-500"> / unlimitted </span>
                                </div>

                                <Button type='button' variant={user?.isSubscribed === 'free' || user?.isSubscribed === 'premium' ? 'disabled' : 'primary-gradient'} size='md' classes='px-4 py-3 font-semibold !rounded-full w-full mt-6 flex-center' handleClick={() => !user?.isSubscribed && handleClick('free')}>
                                    Choose free plan
                                </Button>
                                <ul className="flex flex-col mt-8 space-y-4">
                                    {featureList.map(feature => (
                                        <li className="inline-flex items-center space-x-2" key={feature.title}>
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className={`text-base font-medium ${feature.access !== 'basic' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                                {feature.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                        {/* premium plan */}
                        <motion.div 
                            initial={{ opacity: 0,y: 30 }} 
                            whileInView={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="rounded-md  transform lg:scale-105">
                            <div className='w-full h-full bg-gradient-to-r from-fuchsia-600 to-blue-600 p-1 rounded-md'>
                                <div className="p-6 md:py-8 md:px-9 bg-white rounded-md relative">
                                    <h3 className='text-center absolute top-4 right-7 text-sm font-medium bg-gradient-to-r from-red-500 to-blue-500 rounded-full text-white px-5 py-2'>Best choice</h3>
                                    <h3 className="text-xl font-semibold text-gray-700">Premium</h3>
                                    <p className="mt-2.5 text-sm text-gray-600">All the premium features to boost your productivity</p>

                                    <div className="flex items-end mt-5">
                                        <div className="flex items-start">
                                            <span className="text-xl font-medium text-gray-700"> $ </span>
                                            <p className="text-6xl text-gray-700 font-medium tracking-tight">20</p>
                                        </div>
                                        <span className="ml-0.5 text-gray-500"> / unlimitted </span>
                                    </div>

                                    <Button type='button' variant={user?.isSubscribed === 'premium' ? 'disabled' : 'primary-gradient'} size='md' classes='px-4 py-3 font-semibold !rounded-full w-full mt-6 flex-center' handleClick={() => user?.isSubscribed !== 'premium' && handleClick('premium')}>
                                        Choose premium plan
                                    </Button>

                                    <ul className="flex flex-col mt-8 space-y-4">
                                        {featureList.map(feature => (
                                            <li className="inline-flex items-center space-x-2" key={feature.title}>
                                                <svg className="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className={`text-base font-medium text-gray-700`}>
                                                    {feature.title}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>      
                    </div>
                </section>
            </AnimatePresence>
        </>
    )
}

export default Pricing