'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import AuthInitializer from '@/hook/useInitializeAuth'
import { useAuthStore } from '@/store/authStore'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { accessToken, user, initialized } = useAuthStore()
  const router = useRouter()

  // 페이지 처음 렌더링 시 토큰이 없으면 /login 으로
  useEffect(() => {
    if (initialized && !accessToken) {
      router.replace('/login')
    }
  }, [initialized, accessToken, router])

  // 아직 refresh 초기화가 끝나지 않았으면 아무것도 그리지 않음
  if (!initialized) return <AuthInitializer />

  // 아직 인증 흐름(AuthInitializer)이 돌고 있거나, 토큰이 없는 동안은 아무것도 그리지 않음
  if (!accessToken || !user) {
    return null
  }

  return (
    <>
      {/* 새로고침 시 자동으로 리프레시 토큰으로 엑세스 토큰 재발행 */}
      <AuthInitializer />
      {/* 실제 보호된 페이지 렌더링 */}
      {children}
    </>
  )
}
