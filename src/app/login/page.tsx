// src/app/login/page.tsx
'use client'

import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { AuthForm } from '@/components/AuthForm'
import API from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      const res = await API.post('/api/user/login', { username, password })
      Cookies.set('jwt', res.data, { expires: 1 })
      router.replace('/')
    } catch {
      alert('로그인 실패: 아이디/비밀번호를 확인해주세요.')
    }
  }

  return (
    <AuthForm
      title="로그인"
      description="로그인 정보를 입력해주세요"
      onSubmit={handleLogin}
    >
      <p>
        계정이 없으신가요?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </p>
      <div className="mt-4 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-400">소셜 계정으로 로그인</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <button
        onClick={() => (window.location.href = '/oauth2/authorize/google')}
        className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
      >
        <FcGoogle className="h-5 w-5" />
        구글 계정으로 로그인
      </button>
    </AuthForm>
  )
}
