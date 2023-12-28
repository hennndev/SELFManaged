"use client"
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

type PropsTypes = {
  size: number
}

const defaultProperties = {
    dark: {
        circle: {
            r: 9,
        },
        mask: {
            cx: '50%',
            cy: '23%',
        },
        svg: {
            transform: 'rotate(40deg)',
        },
        lines: {
            opacity: 0,
        },
    },
    light: {
        circle: {
            r: 5,
        },
        mask: {
            cx: '100%',
            cy: '0%',
        },
        svg: {
            transform: 'rotate(90deg)',
        },
        lines: {
            opacity: 1,
        },
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

const DarkMode = ({size}: PropsTypes) => {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const handleTheme = () => {
        setChecked(theme === 'dark' ? false : true)
        return theme === 'dark' ? setTheme('light') : setTheme('dark')
    }
    useEffect(() => {
        setMounted(true)
    }, [mounted])

    useEffect(() => {
        if(theme === 'dark') {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }, [theme])
    
    if(!mounted) {
        return null
    }
    
    return (
        <DarkModeSwitch
            checked={checked}
            onChange={handleTheme}
            size={size}
            animationProperties={defaultProperties}
            moonColor='black'
            sunColor='white'
        />
    )
}
export default DarkMode