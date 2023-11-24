"use client"
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosSearch } from "react-icons/io";


const SearchInput = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')

    return (
        <div className="w-[400px] flexx px-4 border border-gray-200 rounded-md">
            <IoIosSearch className='mr-2 text-xl text-gray-400'/>
            <div className="flexx flex-1">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    placeholder='Find something..' 
                    className='flex-1 py-2 border-none outline-none text-gray-700 mr-3'/>
                {searchTerm.length > 0 ? <AiOutlineClose className="text-red-400 text-lg cursor-pointer" onClick={() => setSearchTerm('')}/> : null}
            </div>
        </div>
    )
}

export default SearchInput