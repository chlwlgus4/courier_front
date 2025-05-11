'use client'

import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthForm } from '@/components/AuthForm'
import API from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      const res = await API.post('/api/user/register', { username, password })
      // 서버가 { user, token } 형태로 돌려준다면:
      const { token } = res.data
      Cookies.set('jwt', token, { expires: 1 })
      router.replace('/')
    } catch {
      alert('회원가입 실패: 다시 시도해주세요.')
    }
  }

  return (
    <AuthForm
      title="회원가입"
      description="계정 정보를 등록해주세요"
      onSubmit={handleRegister}
    >
      <p>
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </AuthForm>
  )
}
