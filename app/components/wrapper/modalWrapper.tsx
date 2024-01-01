import React from 'react'

const ModalWrapper = ({children, classes}: {children: React.ReactNode, classes?: string}) => {
    return (
        <div tabIndex={-1} className="overflow-y-auto fixed z-[99] top-0 left-0 right-0 bottom-0 flex-center bg-[rgba(0,0,0,0.5)]">
            <div className={`relative p-4 w-full max-w-xl max-h-full ${classes}`}>
                <div className="relative bg-white rounded-lg shadow overflow-hidden dark:bg-[#181818]">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper