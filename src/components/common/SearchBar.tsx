'use client'

import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export function SearchBar() {
  return (
    <div className="px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="검색"
            className="w-full py-2 pl-4 pr-12 rounded-full bg-white border-2 border-teal-400 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <AiOutlineSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-500 text-xl" />
        </div>
      </div>
    </div>
  )
}
