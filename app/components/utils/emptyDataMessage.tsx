'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EmptyDataMessage = ({children}: {children: React.ReactNode}) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.3}}>
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
export default EmptyDataMessage