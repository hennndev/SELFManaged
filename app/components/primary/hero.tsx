'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../utils/button'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
    return (
        <AnimatePresence>
            <section id='home' className='flex-center overflow-x-clip flex-col min-h-[200px] mt-20 md:mt-16'>
                <div className='w-full sm:max-w-[600px] text-center px-3'>
                    <motion.h1
                        initial={{ opacity: 0,y: 30 }} 
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className='text-[40px] md:text-[45px] text-gray-700 dark:text-gray-200 font-bold tracking-tighter leading-[1.3]'>
                        Manage your <span className='bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 dark:from-fuchsia-400 to-blue-600 dark:to-blue-400'>activity</span> and increase your <span className='bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 dark:from-fuchsia-400 to-blue-600 dark:to-blue-400'>productivity</span> with our product
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0,y: 30 }} 
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className='text-gray-500 dark:text-gray-400 mt-5 leading-[1.6] font-medium'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugit temporibus voluptas incidunt qui cupiditate ea iste mollitia beatae soluta!
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0,y: 30 }} 
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex-center mt-5">
                        <Link href='#pricing'>
                            <Button type='button' variant='primary-gradient'>Get started</Button>
                        </Link>
                    </motion.div>

                </div>
                <motion.div 
                    initial={{ opacity: 0,x: 50 }} 
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className='flex-center -mr-[350px] md:mr-0 w-[700px] overflow-visible mt-10'>
                        <Image width={0} height={0} sizes='100vw' priority  className="w-full h-auto mx-auto rounded-lg shadow-xl" src="/images/dashboard-img.png" alt="dashboard-hero-img-1" />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0,x: -50 }} 
                    whileInView={{ opacity: 1, x:0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='flex-center md:hidden -ml-[350px] w-[700px] overflow-visible mt-10'>
                    <Image width={0} height={0} sizes='100vw' priority className=" w-full h-auto mx-auto rounded-lg shadow-xl" src="/images/dashboard-img.png" alt="dashboard-hero-img-2" />
                </motion.div>
            </section>
        </AnimatePresence>
    )
}

export default Hero