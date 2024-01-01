import React from 'react'
import Button from '@/app/components/ui/button'
import ModalWrapper from '@/app/components/wrapper/modalWrapper'

type PropsTypes = {
    title: string
    btnTitle: string
    variant: 'primary' | 'danger'
    isLoading: boolean
    handleClick?: () => void
    handleCancel: () => void
}

const ModalConfirmation = ({title, btnTitle, variant, isLoading, handleClick, handleCancel}: PropsTypes) => {
    return (
        <ModalWrapper classes='!max-w-md'>
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#222] dark:hover:text-white" onClick={handleCancel}>
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className={`mx-auto mb-4 ${variant === 'danger' ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-300'} w-12 h-12`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-300">
                    {title}
                </h3>
                <div className="flex-center space-x-3">
                    <Button isLoading={isLoading} type='button' variant={variant} handleClick={handleClick}>
                        {btnTitle}
                    </Button>
                    {!isLoading ? <Button type='button' variant='outline' handleClick={handleCancel}>No, cancel</Button> : null}
                </div>
            </div>
        </ModalWrapper>
    )
}

export default ModalConfirmation