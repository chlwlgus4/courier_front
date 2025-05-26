'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'

/**
 * 로그인 상태가 아니면 즉시 /login 으로 리다이렉트
 * - 서버사이드가 아닌 클라이언트 렌더링 환경에서만 작동.
 */
const useRequireAuth = () => {
  const router = useRouter()
  const user = useUserStore((s) => s.user)

  useEffect(() => {
    if (!user) {
      // replace 로 깜빡임 없이 바로 이동
      router.replace('/login')
    }
  }, [user, router])

  return { user }
}

export default useRequireAuth
