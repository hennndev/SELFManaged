import React from 'react'

type PropsTypes = {
    type: 'button' | 'submit' | 'reset'
    children: React.ReactNode
    isLoading?: boolean
    variant?: string
    size?: 'xl' | 'md' | 'lg' | 'sm' | 'xs'
    handleClick?: () => void
    classes?: string
}



const Button = ({type, children, isLoading, size, variant, classes, ...props}: PropsTypes) => {
    let variantTheme = ''
    let fontSize = ''

    switch(variant) {
        case 'primary-gradient':
            variantTheme = 'bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white'
            break
        case 'danger': 
            variantTheme = 'bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white'
            break
        case 'outline':
            variantTheme = 'bg-transparent text-gray-700 border border-gray-200 dark:border-[#222] dark:text-gray-300 hover:border-gray-400 dark:hover:border-[#444] '  
            break
        default:
            variantTheme = 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white'
    }


    switch(size) {
        case'xs':
            fontSize = 'text-[12px]'
            break
        case 'md':
            fontSize = 'text-base'
            break
        case 'lg':
            fontSize = 'text-lg'
            break
        case 'xl':
            fontSize = 'text-xl'
            break
        default:
            fontSize = 'text-sm'
    }

    return (
        <button type={type} onClick={props?.handleClick} disabled={isLoading} className={`flexx font-medium rounded-lg px-5 py-2.5 focus:outline-none ${fontSize} ${classes}
            ${isLoading ? 
                'cursor-not-allowed text-gray-900 bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-[#111] dark:text-gray-400 dark:border-[#222] inline-flex items-center' : 
                variantTheme}
        `}>
            {isLoading ? (
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
            ) : ''}
            {isLoading ? 'Loading...' : children}
        </button>
    )
}

export default Button