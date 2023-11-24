"use client"
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { GoMoon, GoSun } from "react-icons/go"

const DarkMode = () => {

    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)
    const handleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')

    useEffect(() => {
        setMounted(true)
    }, [mounted])

    if(!mounted) {
        return null
    }
    
    return theme === 'dark' ? 
        (<GoSun className='text-xl text-gray-700' onClick={handleTheme}/>) :
        (<GoMoon className='text-xl text-gray-700' onClick={handleTheme}/>)
}

export default DarkMode