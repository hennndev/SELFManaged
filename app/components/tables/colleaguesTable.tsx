'use client'
import React, { useState } from 'react'
import { useColleagueStore } from '@/app/store/zustand'
import toast, { Toaster } from 'react-hot-toast'
import Button from '@/app/components/utils/button'
import { MdModeEdit, MdDelete, MdStar } from "react-icons/md"
import ModalDescriptions from '@/app/components/modals/modalDescriptions'
import ModalConfirmation from '@/app/components/modals/modalConfirmation'


type PropsTypes = {
    dataColleagues?: ColleaguesDataTypes
}

const ColleaguesTable = ({dataColleagues}: PropsTypes) => {

    const [modalConfirmation, setModalConfirmation] = useState<boolean>(false)
    const [modalDescription, setModalDescription] = useState<boolean>(false)
    const { colleagues, deleteColleague } = useColleagueStore()

    return (
        <>
            {modalConfirmation ? <ModalConfirmation 
                title='Are you sure want to delete this colleague?' 
                btnTitle='Delete now' 
                variant='danger'
                handleCancel={() => setModalConfirmation(false)}/> : null
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
            <table className="table-auto min-w-full shadow-md rounded-md">
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
                        <tr className='text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#151515]' key={colleague?.id}>
                            <td className='relative px-3 py-3 text-sm font-normal'>
                                {index + 1}
                                {colleague?.isFavorite === 'favorite' ? <MdStar className="absolute text-lg text-blue-500 top-4 -left-2"/> : ''}
                            </td>
                            <td className='px-3 py-3 text-sm font-normal'>{colleague?.name}</td>
                            <td className='px-3 py-3 text-sm font-normal'>{colleague?.job}</td>
                            <td className='px-3 py-3 text-sm font-normal'>{colleague?.telpNumber}</td>
                            <td className='px-3 py-3 text-sm font-normal'>{colleague?.country}</td>
                            <td className='px-3 py-3 text-sm font-normal'>
                                <Button type='button' variant='outline' size='xs' handleClick={() => setModalDescription(true)}>
                                    Description
                                </Button>
                            </td>
                            <td className='px-3 py-3 flexx'>
                                <div className="icon-button">
                                    <MdModeEdit className='text-xl text-blue-700 dark:text-blue-500 cursor-pointer'/>
                                </div>
                                <div className="icon-button">
                                    <MdDelete className='text-xl text-red-700 dark:text-red-500 cursor-pointer' onClick={()=> setModalConfirmation(true)}/>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr className='text-gray-700'>
                            <td className='px-3 py-3 text-sm font-normal relative'></td>
                            <td className='px-3 py-3 text-sm font-normal'>''</td>
                            <td className='px-3 py-3 text-sm font-normal'>''</td>
                            <td className='px-3 py-3 text-sm font-normal'>''</td>
                            <td className='px-3 py-3 text-sm font-normal'>''</td>
                            <td className='px-3 py-3 text-sm font-normal'>
                                ''
                            </td>
                            <td className='px-3 py-3 flexx'>
                                ''
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default ColleaguesTable

