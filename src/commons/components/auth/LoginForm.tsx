'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'

interface AuthFormProps {
  title: string
  description: string
  onSubmit: (data: { username: string; password: string }) => void
  children?: ReactNode // 추가 버튼(소셜로그인 등)
}

const LoginForm = ({
  title,
  description,
  onSubmit,
  children,
}: Readonly<AuthFormProps>) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  return (
    <div className="min-h-screen">
      <div className="w-full md:max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl md:shadow-lg">
        <Image
          src={'/logos/shoong-logo-color.png'}
          alt={'logo'}
          width={200}
          height={200}
          className={'mx-auto mb-10'}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({ username, password })
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
            >
              {show ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className={clsx(
              'w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-sm',
              !(username && password) && 'opacity-50 cursor-not-allowed',
            )}
            disabled={!(username && password)}
          >
            {title}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">{children}</div>
      </div>
    </div>
  )
}

export default LoginForm
