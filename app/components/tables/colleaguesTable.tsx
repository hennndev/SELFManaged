'use client'
import React, { useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/app/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { MdModeEdit, MdDelete, MdStar } from "react-icons/md"
import { deleteColleague } from '@/app/lib/actions/colleague.actions'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'
import ModalDescriptions from '@/app/components/modals/modalDescriptions'

type PropsTypes = {
    colleagues: ColleaguesDataTypes[]
}
const ColleaguesTable = ({colleagues}: PropsTypes) => {
    const router = useRouter()
    const { data } = useSession()
    const user = data?.user as UserLoginTypes 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalConfirmation, setModalConfirmation] = useState<null | string>(null)
    const [dataModalDescription, setDataModalDescription] = useState<null | ColleaguesDataTypes>(null)

    const handleDeleteColleague = async () => {
        setIsLoading(true)
        try {
            const promise = await deleteColleague(user?.userId, modalConfirmation as string)
            if(promise) {
                setModalConfirmation(null)
                toast.success('Success delete this colleague')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }
   
    return (
        <Fragment>
            {/* if delete button clicked, this modal will showing. This modal for give confirmation to user want to delete or not */}
            {modalConfirmation ? (<ModalConfirmation 
                variant='danger'
                btnTitle='Delete now' 
                isLoading={isLoading}
                title='Are you sure want to delete this colleague?'
                handleClick={handleDeleteColleague} 
                handleCancel={() => setModalConfirmation(null)}/> 
            ): null}
            {/* if description button clicked, description about colleague will showing */}
            {dataModalDescription ? (
                <ModalDescriptions handleClose={() => setDataModalDescription(null)}>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Name: {dataModalDescription.name}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Email: {dataModalDescription.email}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Job: {dataModalDescription.job}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Phone Number: {dataModalDescription.phone_number}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Address: {dataModalDescription.address}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Country: {dataModalDescription.country}
                    </p>
                </ModalDescriptions>
            ) : null}
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
                            <tr className='text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]' key={colleague._id}>
                                <td className='relative px-3 py-3 text-sm font-normal'>
                                    {index + 1}
                                    {colleague.is_favorite === 'favorite' ? <MdStar className="absolute text-lg text-blue-500 top-4 -left-2"/> : ''}
                                </td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague.name}</td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague.job}</td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague.phone_number}</td>
                                <td className='px-3 py-3 text-sm font-normal'>{colleague.country}</td>
                                <td className='px-3 py-3 text-sm font-normal'>
                                    <Button type='button' variant='outline' size='xs' handleClick={() => setDataModalDescription(colleague)}>
                                        Description
                                    </Button>
                                </td>
                                <td className='px-3 py-3 flexx'>
                                    <div className="icon-button" onClick={() => router.push(`/dashboard/colleague/edit-colleague/${colleague._id}`)}>
                                        <MdModeEdit className='text-xl text-blue-700 dark:text-blue-500 cursor-pointer'/>
                                    </div>
                                    <div className="icon-button" onClick={()=> setModalConfirmation(colleague._id)}>
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
        </Fragment>
    )
}

export default ColleaguesTable

