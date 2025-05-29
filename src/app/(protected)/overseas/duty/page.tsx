'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DutyContent from '@/app/(protected)/overseas/components/DutyContent'
import { overseasStore } from '@/store/overseasStore'

const DutyPage = () => {
  const { overseas } = overseasStore()
  const router = useRouter()

  useEffect(() => {
    if (!overseas?.originCountry || !overseas?.destCountry) router.back()
  }, [overseas, router])

  if (!overseas?.originCountry || !overseas?.destCountry) return null

  return <DutyContent country={overseas.destCountry} />
}

export default DutyPage
