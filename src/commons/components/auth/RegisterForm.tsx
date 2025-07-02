'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { ReactNode, useState } from 'react'
import { checkUsername } from '@/api/user'

interface RegisterFormProps {
  title: string
  description: string
  onSubmit: (data: {
    username: string
    password: string
    name: string
    email: string
    phone: string
  }) => Promise<void>
  children?: ReactNode
}

export default function RegisterForm({
  title,
  description,
  onSubmit,
  children,
}: Readonly<RegisterFormProps>) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    username?: string
    password?: string
    confirmPassword?: string
    name?: string
    email?: string
    phone?: string
  }>({})

  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null)

  // 아이디 중복 확인 (임시: 실제 API 연동 필요)
  const handleCheckUsername = async () => {
    setIsCheckingUsername(true)
    await checkUsername(username)
      .then(({ data }) => {
        if (data) {
          if (data.isAvailable) errors.username = ''
          setIsUsernameAvailable(data.isAvailable)
        }
      })
      .finally(() => {
        setIsCheckingUsername(false)
      })
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    // 아이디 검증
    if (!username) {
      newErrors.username = '아이디를 입력해주세요'
    } else if (username.length < 4) {
      newErrors.username = '아이디는 4자 이상이어야 합니다'
    }

    // 아이디 중복검사
    if (isUsernameAvailable === false) {
      newErrors.username = '다른 아이디를 입력해주세요'
    } else if (isUsernameAvailable === null) {
      newErrors.username = '아이디 중복검사를 해주세요'
    }

    // 비밀번호 검증
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다'
    }

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }

    // 이름 검증
    if (!name) {
      newErrors.name = '이름을 입력해주세요'
    }

    // 이메일 검증
    if (!email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요'
    }

    // 전화번호 검증
    if (!phone) {
      newErrors.phone = '전화번호를 입력해주세요'
    } else if (phone && !/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/.test(phone)) {
      newErrors.phone = '유효한 전화번호 형식이 아닙니다 (예: 010-1234-5678)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePhoneChange = (phone: string) => {
    const digits = phone.replace(/\D/g, '').slice(0, 11)

    const formatted = digits
      .replace(/^(\d{3})(\d)/, '$1-$2')
      .replace(/-(\d{4})(\d)/, '-$1-$2')

    setPhone(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    await onSubmit({ username, password, name, email, phone })

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen">
      <div className="w-full md:max-w-md mx-auto p-8 bg-white rounded-2xl md:shadow-lg">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">{title}</h1>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* 아이디 필드 */}
                <div>
                  <label htmlFor="username" className="block text-sm mb-2">
                    아이디
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`py-3 px-4 block w-9/12 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleCheckUsername}
                      disabled={isCheckingUsername || !username}
                      className="px-3 py-2 bg-toss-500 hover:bg-toss-700 text-white rounded-lg text-sm w-3/12"
                    >
                      {isCheckingUsername ? '확인 중...' : '중복 확인'}
                    </button>
                  </div>
                  {isUsernameAvailable !== null && (
                    <p
                      className={`text-xs mt-1 ${isUsernameAvailable ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {isUsernameAvailable
                        ? '사용 가능한 아이디입니다'
                        : '이미 사용 중인 아이디입니다'}
                    </p>
                  )}
                  {errors.username && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* 비밀번호 필드 */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className={`py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <button
                      type={'button'}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* 비밀번호 확인 필드 */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-2"
                  >
                    비밀번호 확인
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* 이름 필드 */}
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    이름
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* 이메일 필드 */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* 전화번호 필드 */}
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2">
                    전화번호
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="010-1234-5678"
                      maxLength={13}
                      className={`py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-toss-500 text-white hover:bg-toss-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? '처리 중...' : '회원가입'}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
