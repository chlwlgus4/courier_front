'use client'

import { useParams } from 'next/navigation'
import CountryContent from '@/app/(protected)/overseas/components/CountryContent'

const Page = () => {
  const { type } = useParams()

  if (type === 'country') return <CountryContent />
}

export default Page
