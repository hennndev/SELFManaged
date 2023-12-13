'use client'
import React, { Fragment, useEffect } from 'react'
import { useLayoutStore } from '@/app/store/zustand'
import ModalEditProfile from '../modals/modalEditProfile'

const PrimaryModal = () => {

    const { showModalEditProfile, handleShowmModalEditProfile } = useLayoutStore()

    useEffect(() => {
        if(showModalEditProfile) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
    }, [showModalEditProfile])
    

    return (
        <Fragment>
            {showModalEditProfile ? <ModalEditProfile handleShowModal={handleShowmModalEditProfile}/> : null}
        </Fragment>
    )
}

export default PrimaryModal