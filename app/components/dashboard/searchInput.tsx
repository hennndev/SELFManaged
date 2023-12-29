"use client"
import React, { ChangeEvent, useState } from 'react'
import { IoIosSearch } from "react-icons/io"
import { AiOutlineClose } from 'react-icons/ai'

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isFocus, setIsFocus] = useState<boolean>(false)

    return (
        <div className={`w-[400px] flexx px-4 border border-gray-300 dark:border-gray-700 rounded-md ${isFocus ? 'border-none ring-[1.5px] ring-blue-700' : ''}`}>
            <div className='icon-button mr-2 cursor-pointer'>
                <IoIosSearch className={`text-xl text-gray-500 ${isFocus ? 'text-gray-700 dark:text-gray-200' : ''}`}/>
            </div>
            <div className="flexx flex-1">
                <input type="text" value={searchTerm}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    placeholder='Find something..' 
                    className='text-[15px] flex-1 py-2 border-none outline-none text-gray-700 dark:text-gray-300 mr-3 bg-transparent focus:ring-0 placeholder:text-gray-500'/>
                {searchTerm.length > 0 ? <AiOutlineClose className="text-red-400 text-lg cursor-pointer" onClick={() => setSearchTerm('')}/> : null}
            </div>
        </div>
    )
}
export default SearchInput