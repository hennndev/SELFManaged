'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BackButton from '@/app/components/utils/backButton'
import BreadCrumb from '@/app/components/utils/breadCrumb'

const ColleagueFormHeader = () => {
    return (
        <AnimatePresence>
            <motion.div 
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.1}}
                className='mb-7 flex-between'>
                <BreadCrumb/>
                <BackButton linkHref='colleague'/>
            </motion.div>
        </AnimatePresence>
    )
}
export default ColleagueFormHeader