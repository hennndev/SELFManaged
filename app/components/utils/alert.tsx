import React from 'react'
import { IoMdClose } from 'react-icons/io'

type PropsTypes = {
    alertType?: string
    children: React.ReactNode
    handleClose: () => void
}

const Alert = ({alertType, children, handleClose}: PropsTypes) => {
    let typeClass = ''
    switch(alertType) {
        case 'success':
            typeClass = 'bg-green-50 dark:bg-gray-800 text-green-800 dark:text-green-400'
            break
        case 'danger':
            typeClass = 'bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400'
            break
        default:
            typeClass = 'bg-blue-50 dark:bg-gray-800 text-blue-800 dark:text-blue-400'
    }
    return (
        <div className={`relative mt-2 p-4 mb-4 text-sm rounded-lg leading-[1.7] ${typeClass}`} role="alert">
            <IoMdClose className='text-lg absolute top-2 right-2 text-red-800 dark:text-red-400 cursor-pointer' onClick={handleClose}/>
            {children}
        </div>
    )
}
export default Alert