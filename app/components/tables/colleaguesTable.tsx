'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Button from '@/app/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { MdModeEdit, MdDelete, MdStar } from "react-icons/md"
import ModalDescriptions from '@/app/components/modals/modalDescriptions'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'
import { deleteColleague } from '@/app/lib/actions/colleague.actions'
import { useSession } from 'next-auth/react'


type PropsTypes = {
    colleagues: ColleaguesDataTypes[]
}

const ColleaguesTable = ({colleagues}: PropsTypes) => {

    const router = useRouter()
    const { data } = useSession()
    const user:any = data?.user 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalConfirmation, setModalConfirmation] = useState<null | string>(null)
    const [modalDescription, setModalDescription] = useState<boolean>(false)

    const handleDeleteColleague = async () => {
        setIsLoading(true)
        try {
            const promise = await deleteColleague(user?.userId, modalConfirmation as string)
            if(promise) {
                setModalConfirmation(null)
            }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {modalConfirmation ? <ModalConfirmation 
                variant='danger'
                btnTitle='Delete now' 
                isLoading={isLoading}
                title='Are you sure want to delete this colleague?'
                handleClick={handleDeleteColleague} 
                handleCancel={() => setModalConfirmation(null)}/> : null
            }
            {modalDescription ? (
                <ModalDescriptions handleCancel={() => setModalDescription(false)}>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Unions General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                    </p>
                </ModalDescriptions>
            ) : null}
            <Toaster toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 5000
            }}/>
            <AnimatePresence>
                <motion.table 
                    initial={{opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.2}}
                    className="table-auto min-w-full shadow-md rounded-md dark:bg-[#181818]">
                    <thead>
                        <tr className='bg-gray-50 dark:bg-[#222]'>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tl-md'>No</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 max-w-[300px]'>Name</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Job</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Telp Number</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Address</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300'>Description</th>
                            <th scope='col' className='text-start text-sm p-3 font-semibold text-gray-700 dark:text-gray-300 rounded-tr-md'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colleagues.length > 0 ? colleagues?.map((colleague: ColleaguesDataTypes, index: number) => (
                            <tr className='text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#151515]' key={colleague?._id}>
                                <td className='relative px-3 py-3 text-sm font-normal'>
                                    {index + 1}
                                    {colleague?.is_favorite === 'favorite' ? <MdStar className="absolute text-lg text-blue-500 top-4 -left-2"/> : ''}
                                </td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague?.name}</td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague?.job}</td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague?.phone_number}</td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague?.country}</td>
                                <td className='px-3 py-3 text-sm font-normal'>
                                    <Button type='button' variant='outline' size='xs' handleClick={() => setModalDescription(true)}>
                                        Description
                                    </Button>
                                </td>
                                <td className='px-3 py-3 flexx'>
                                    <div className="icon-button" onClick={() => router.push(`/dashboard/colleague/edit-colleague/${colleague._id}`)}>
                                        <MdModeEdit className='text-xl text-blue-700 dark:text-blue-500 cursor-pointer'/>
                                    </div>
                                    <div className="icon-button" onClick={()=> setModalConfirmation(colleague?._id)}>
                                        <MdDelete className='text-xl text-red-700 dark:text-red-500 cursor-pointer'/>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr className='text-gray-700'>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500 relative'>no data</td>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500'>no data</td>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500'>
                                    no data
                                </td>
                                <td className='px-3 py-3 text-sm font-normal text-gray-400 dark:text-gray-500'>
                                    no data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </motion.table>
            </AnimatePresence>
        </>
    )
}

export default ColleaguesTable

