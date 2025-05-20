'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DutyContent from '@/app/overseas/components/DutyContent'
import useRequireAuth from '@/hook/useRequireAuth'
import { overseasStore } from '@/store/overseasStore'

const DutyPage = () => {
  const { overseas } = overseasStore()
  const router = useRouter()

  useEffect(() => {
    if (!overseas?.country) router.back()
  }, [overseas, router])

  const { user } = useRequireAuth()
  if (!user) return null

  if (!overseas?.country) return null

  return <DutyContent country={overseas?.country} />
}

export default DutyPage
