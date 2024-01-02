import React from 'react'
import Button from '@/app/components/ui/button'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'

type PropsTypes = {
    children: React.ReactNode
    handleClose: () => void
}

const ModalDescriptions = ({children, handleClose}: PropsTypes) => {
    return (
       <ModalWrapper>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Description
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" onClick={handleClose}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-3">
                {children}
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button type='button' variant='outline' handleClick={handleClose}>Cancel</Button>
            </div>
        </ModalWrapper>
    )
}

export default ModalDescriptions