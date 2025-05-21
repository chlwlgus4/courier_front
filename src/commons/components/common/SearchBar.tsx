'use client'

import clsx from 'clsx'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchBarProps } from '@/commons/types/commons/commons'

export function SearchBar({
  placeholder,
  borderColor = 'border-teal-400',
  bgColor = 'bg-white',
  textColor = 'text-gray-700',
  focusBorderColor = 'focus:ring-teal-300',
  iconColor = 'text-teal-500',
}: Readonly<SearchBarProps>) {
  return (
    <div className="px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            className={clsx(
              bgColor,
              borderColor,
              textColor,
              focusBorderColor,
              'w-full',
              'py-2',
              'pl-4',
              'pr-12',
              'rounded-xl',
              'border-2',
              'placeholder-gray-400',
              'focus:outline-none',
              'focus:ring-2',
            )}
          />
          <AiOutlineSearch
            className={clsx(
              iconColor,
              'absolute',
              'right-4',
              'top-1/2',
              'transform -translate-y-1/2',
              'text-xl',
            )}
          />
        </div>
      </div>
    </div>
  )
}
