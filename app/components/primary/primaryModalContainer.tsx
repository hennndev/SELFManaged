'use client'
import React, { Fragment, useEffect } from 'react'
import { useLayoutStore } from '@/app/store/zustand'
import ModalProfile from '@/app/components/modals/modalProfile'

const PrimaryModalContainer = () => {
    const { showModalProfile, handleShowModalProfile } = useLayoutStore()
    useEffect(() => {
        if(showModalProfile) {
            // if this modal showing, scrollable will hidden
            document.body.style.overflowY = 'hidden'
        } else {
            // if this modal hidden, scrollable will be auto
            document.body.style.overflowY = 'auto'
        }
    }, [showModalProfile])

    return (
        <Fragment>
            {showModalProfile ? <ModalProfile handleShowModal={handleShowModalProfile}/> : null}
        </Fragment>
    )
}

export default PrimaryModalContainer