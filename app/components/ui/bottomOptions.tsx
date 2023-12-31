'use client'
import React, { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { changeUserImage } from '@/app/lib/actions/userActions'
import { cloudinaryFetch } from '@/app/lib/utils/cloudinaryFetch'
import { AiOutlineDelete, AiOutlineCamera } from "react-icons/ai"

type PropsTypes = {
    showOptions: boolean
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    handleCloseOptions: () => void
}

const BottomOptions = ({showOptions, isLoading, setIsLoading, handleCloseOptions}: PropsTypes) => {
    const { data, update } = useSession()
    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const image = e.target.files as FileList
        try {
            const imageData = await cloudinaryFetch(image[0])
            if(imageData) {
                await changeUserImage(data?.user?.email as string, imageData, true).then(() => update({image: imageData.url}))
                toast.success('Success upload new image')
            }
        } catch (error) {
            toast.error('Failed upload new image')
        } finally {
            setIsLoading(false)
            handleCloseOptions()
        }
    }
    const handleRemoveImage = async () => {
        setIsLoading(true)
        try {
            await changeUserImage(data?.user?.email as string).then(() => update({image: null}))
            toast.success('Success delete image profile')
        } catch (error) {
            toast.error('Failed delete image')
        } finally {
            setIsLoading(false)
            handleCloseOptions()
        }
    }

    return (
        // if showOptions true, this component will showing
        <div className={`absolute right-0 z-10 ${!showOptions ? '-bottom-[100px]' : 'bottom-0'} bg-gray-50 shadow w-full py-5 dark:bg-[#222] duration-300 rounded-b-lg`}>
            <Toaster toastOptions={{
                className: 'dark:bg-[#222] dark:!text-[#fff]',
                duration: 5000
            }}/>
            <ul className="flex-center text-[15px] text-gray-700 dark:text-gray-300">
                {/* if isLoading true, will showing loading element. Then the options will be hidden */}
                {isLoading ? (
                    <Fragment>
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/></svg>
                        <p>Loading...</p>
                    </Fragment>
                ): (
                    <Fragment>
                        <li className='px-4 py-2 hover:underline cursor-pointer dark:hover:text-white'>
                            <label htmlFor="changePict" className='flexx'>
                                <AiOutlineCamera className='text-xl mr-2'/>
                                Change Picture
                            </label>
                            <input type="file" id="changePict" accept='image/*' className='hidden' onChange={handleImage}/>
                        </li>
                        {/* only showing when user have a image profile */}
                        {data?.user?.image ? (
                            <li className='flexx px-4 py-2 hover:underline cursor-pointer text-red-700 dark:text-red-400' onClick={handleRemoveImage}>
                                <AiOutlineDelete className='text-xl mr-2'/>
                                Remove Picture
                            </li>
                        ) : null}
                    </Fragment>
                )}
            </ul>
        </div>
    )
}

export default BottomOptions