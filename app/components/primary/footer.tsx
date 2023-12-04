'use client'
import React from 'react'
import { TiSocialLinkedin } from "react-icons/ti"
import { AnimatePresence, motion } from 'framer-motion'
import { AiFillGithub, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai"



const Footer = () => {
    return (
        <AnimatePresence>
            <motion.footer 
                initial={{ opacity: 0, y: -20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='container flex-center sm:flex-between flex-col sm:flex-row space-y-2 pb-5 px-5'>
                <h3 className='text-sm text-gray-500 dark:text-gray-300 font-medium'>&copy; Copyright 2023. Hennndev</h3>
                <div className="flexx space-x-2">
                    <a href='https://www.github.com/hennndev' className='icon-button border border-gray-200 dark:border-[#222]'>
                        <AiOutlineTwitter className='text-gray-700 dark:text-gray-300 text-lg'/>
                    </a>
                    <a href='https://www.github.com/hennndev' className='icon-button border border-gray-200 dark:border-[#222]'>
                        <TiSocialLinkedin className='text-gray-700 dark:text-gray-300 text-lg'/>
                    </a>
                    <a href='https://www.github.com/hennndev' target='_blank' className='icon-button border border-gray-200 dark:border-[#222]'>
                        <AiFillGithub className='text-text-gray-700 dark:text-gray-300-lg'/>
                    </a>
                    <a href='https://www.instagram.com/hennndev' className='icon-button border border-gray-200 dark:border-[#222]'>
                        <AiFillInstagram className='text-gray-700 dark:text-gray-300 text-lg'/>
                    </a>
                </div>
            </motion.footer>
        </AnimatePresence>
    )
}
export default Footer