'use client'

import { useRouter } from 'next/navigation'
import CountrySelect from '@/app/(protected)/overseas/components/CountrySelect'
import { overseasStore } from '@/store/overseasStore'

const Page = () => {
  const router = useRouter()

  const { overseas } = overseasStore()

  const handleNext = () => {
    if (overseas?.country) router.push(`/overseas/duty`)
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">배송 국가를 선택하세요</h1>
      <CountrySelect />
      <button
        onClick={handleNext}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
        disabled={!overseas?.country}
      >
        다음
      </button>
    </div>
  )
}

export default Page
