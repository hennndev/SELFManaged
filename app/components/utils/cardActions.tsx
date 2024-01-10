import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'

type PropsTypes = {
    handleOpenModalEdit: () => void
    handleOpenModalDelete: () => void
}
const CardActions = ({handleOpenModalEdit, handleOpenModalDelete}: PropsTypes) => {
    return (
        <div className="flexx">
            <div className="icon-button" onClick={handleOpenModalEdit}>
                <MdEdit className='text-blue-500 text-xl'/>
            </div>
            <div className="icon-button" onClick={handleOpenModalDelete}>
                <MdDelete className='text-red-500 text-xl'/>
            </div>
        </div>
    )
}
export default CardActions