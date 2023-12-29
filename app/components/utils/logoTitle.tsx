'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type PropsTypes = {
    delayTime?: number | string
    classes?: string
}

const LogoTitle = ({delayTime = 0, classes}: PropsTypes) => {
    return (
        <AnimatePresence>
            <motion.h1  
                initial={delayTime === 'hidden' ? 'hidden' : {opacity: 0,y: 30}} 
                animate={delayTime === 'hidden' ? 'visible' : {opacity: 1, y:0}}
                transition={{ duration: 0.3, delay: delayTime as number }}
                className={`text-center bg-gradient-to-r from-fuchsia-600 to-blue-600 dark:from-fuchsia-400 dark:to-blue-400 bg-clip-text text-transparent text-2xl font-extrabold ${classes}`}>
                    SELF<span className='dark:text-white text-gray-700 font-bold'>Managed</span>
                </motion.h1>
        </AnimatePresence>
    )
}
export default LogoTitle