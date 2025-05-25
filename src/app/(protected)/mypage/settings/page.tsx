'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiLock, FiMail, FiSave, FiUser } from 'react-icons/fi'
import { User } from '@/commons/types'
import { apiPost } from '@/lib/fetcher'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'

const Page = () => {
  const router = useRouter()
  const { clearAuth } = useAuthStore()
  const { user, setUser } = useUserStore()
  const [form, setForm] = useState<User | null>(user ?? null)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    router.replace('/login')
    return null
  }

  // 2) 프로필 수정
  const handleProfileSave = async () => {
    setLoading(true)
    const updated = await apiPost<User>('/users/me', {
      email: form?.email,
    })
    setLoading(false)
    if (updated) {
      setUser(updated)
      alert('프로필이 저장되었습니다.')
    }
  }

  // 3) 비밀번호 변경
  const handleChangePw = async () => {
    if (!currentPw || !newPw) {
      alert('비밀번호를 모두 입력해주세요.')
      return
    }
    if (newPw !== confirmPw) {
      alert('새 비밀번호가 일치하지 않습니다.')
      return
    }
    setLoading(true)
    const res = await apiPost('/auth/change-password', {
      currentPassword: currentPw,
      newPassword: newPw,
    })
    setLoading(false)
    if (res) {
      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
      clearAuth()
      router.replace('/login')
    }
  }

  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-8">
      {/* 사용자명 (수정 불가) */}
      <div className="space-y-2">
        <label className="flex items-center text-gray-700">
          <FiUser className="mr-2" /> 아이디
        </label>
        <input
          type="text"
          value={form?.username}
          disabled
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {/* 이메일 수정 */}
      <div className="space-y-2">
        <label className="flex items-center text-gray-700">
          <FiMail className="mr-2" /> 이메일
        </label>
        <input
          type="email"
          value={form?.email}
          onChange={(e) => setForm((f) => f && { ...f, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <button
        onClick={handleProfileSave}
        disabled={loading}
        className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg transition"
      >
        <FiSave className="mr-2" /> 저장하기
      </button>

      <hr />

      <h2 className="text-xl font-semibold">비밀번호 변경</h2>

      <div className="space-y-2">
        <label htmlFor={'password'} className="text-gray-700">
          현재 비밀번호
        </label>
        <input
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={'newPassword'} className="text-gray-700">
          새 비밀번호
        </label>
        <input
          type="newPassword"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={'newPasswordChk'} className="text-gray-700">
          새 비밀번호 확인
        </label>
        <input
          type="newPasswordChk"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <button
        onClick={handleChangePw}
        disabled={loading}
        className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
      >
        <FiLock className="mr-2" /> 변경하기
      </button>
    </div>
  )
}

export default Page
