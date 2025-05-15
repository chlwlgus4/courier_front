'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import OrderHistory from '@/app/mypage/components/OrderHistory'
import ProfileInfo from '@/app/mypage/components/ProfileInfo'
import Settings from '@/app/mypage/components/Settings'
import { useAuthStore } from '@/store/authStore'

const Page = () => {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      {/* 1. 프로필 정보 */}
      <ProfileInfo />
      {/* 2. 주문 내역 */}
      <OrderHistory />
      {/* 3. 설정(로그아웃, 알림 설정 등) */}
      <Settings />
    </div>
  )
}

export default Page
