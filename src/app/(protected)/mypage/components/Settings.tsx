'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { apiPost } from '@/lib/fetcher'
import { useAuthStore } from '@/store/authStore'

export default function Settings() {
  const { clearAuth } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    clearAuth()
    await apiPost('/auth/logout')
    router.push('/')
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FiSettings className="w-5 h-5 mr-2 text-cyan-700" />
        설정
      </h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        <FiLogOut className="inline w-5 h-5 mr-1 align-text-bottom" /> 로그아웃
      </button>
    </div>
  )
}
