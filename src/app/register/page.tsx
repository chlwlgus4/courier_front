'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '@/api/auth'
import RegisterForm from '@/commons/components/auth/RegisterForm'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = async ({
    username,
    password,
    name,
    email,
    phone,
  }: {
    username: string
    password: string
    name: string
    email: string
    phone: string
  }) => {
    try {
      const data = await register(username, password, name, email, phone)

      if (data) router.replace('/')
    } catch (error) {
      alert('회원가입 실패: 다시 시도해주세요.')
      console.error('회원가입 오류:', error)
    }
  }

  return (
    <RegisterForm
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
    </RegisterForm>
  )
}
