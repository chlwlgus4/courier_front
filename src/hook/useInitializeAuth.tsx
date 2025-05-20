'use client'

import { useEffect } from 'react'
import { AuthResponse } from '@/commons/types'
import { setTokens } from '@/lib/api' // setTokens 유틸
import { apiPost } from '@/lib/fetcher' // fetcher 가 /api/auth/refresh 를 호출하도록 설정
import { useAuthStore } from '@/store/authStore'

export default function AuthInitializer() {
  const { accessToken, setAccessToken, setInitialized } = useAuthStore()

  useEffect(() => {
    if (accessToken) {
      setInitialized(true)
    } else {
      ;(async () => {
        try {
          const data = await apiPost<AuthResponse>('/auth/refresh')
          if (data?.accessToken) {
            setTokens(data)
          }
        } catch (err) {
          console.warn('토큰 리프레시 실패:', err)
        } finally {
          setInitialized(true)
        }
      })()
    }
  }, [accessToken, setAccessToken, setInitialized])

  return null
}
