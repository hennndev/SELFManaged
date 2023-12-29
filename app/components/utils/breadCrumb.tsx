"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { IoChevronForward } from "react-icons/io5"

const BreadCrumb = () => {
    const pathname = usePathname()
    const pathnameLength = pathname.split('/').filter(path => path !== '').slice(1).length
    let utilLastPath: string
    const paths = pathname.split('/').filter(path => path !== '').slice(1).filter((path, index)=> {
        if(index === pathnameLength - 1) {
            if(!/[0-9]/.test(path)) {
                return path
            } else {
                utilLastPath = `/${path}`
            }
        } else {
            return path
        }
    }) 
    const hrefPath = (index: number) => {
        return paths.slice(0, index + 1).join('/')
    }
    return (
        <div className='flexx'>
            {paths.map((path, index) => (
                <Link href={`/dashboard/${hrefPath(index)}${utilLastPath && index === paths.length - 1 ? utilLastPath : ''}`} key={path} className={`flexx hover:underline ${index == paths.length - 1 ? 'text-blue-700 dark:text-blue-500' : 'text-gray-500 dark:text-gray-300'}`}>
                    {path} {index !== paths.length - 1 ? <IoChevronForward className='mx-2 text-lg text-gray-700'/> : ''}
                </Link>
            ))}
        </div>
    )
}
export default BreadCrumb