"use client"
import React from 'react'

const Pagination = () => {
  return (
    <div className="flex flex-col items-center mt-10">
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-700 dark:text-white">1</span> to <span className="font-semibold text-gray-700 dark:text-white">10</span> of <span className="font-semibold text-gray-700 dark:text-white">100</span> Entries
        </span>
        <div className="inline-flex mt-4 xs:mt-0 border border-gray-200 dark:border-[#222] rounded-md">
            <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-700 bg-gray-50 rounded-s hover:bg-gray-200 dark:bg-[#111] dark:text-gray-400 dark:hover:bg-[#222] dark:hover:text-white">
                Prev
            </button>
            <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-700 bg-gray-50 rounded-e hover:bg-gray-200 dark:bg-[#111] dark:text-gray-400 dark:hover:bg-[#222] dark:hover:text-white">
                Next
            </button>
        </div>
    </div>
  )
}

export default Pagination