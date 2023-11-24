"use client"
import React from 'react'
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";
import { usePathname } from 'next/navigation'

const BreadCrumb = () => {
    
    const pathname = usePathname().split('/').filter(path => path !== '')
    const hrefPath = (index: number) => {
        return pathname.slice(0, index + 1).join('/')
    }

    return (
        <div className='flexx'>
            {pathname.map((path, index) => (
                <Link href={`/${hrefPath(index)}`} key={path} className={`flexx hover:underline ${index == pathname.length - 1 ? 'text-blue-700' : 'text-gray-500'}`}>
                    {path} {index !== pathname.length - 1 ? <IoChevronForward className='mx-2 text-lg text-gray-700'/> : ''}
                </Link>
            ))}
        </div>
    )
}

export default BreadCrumb