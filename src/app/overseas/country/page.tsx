'use client'

import { useRouter } from 'next/navigation'
import CountrySelect from '@/app/overseas/components/CountrySelect'
import useRequireAuth from '@/hook/useRequireAuth'
import { overseasStore } from '@/store/overseasStore'

const Page = () => {
  const router = useRouter()

  const { user } = useRequireAuth()
  if (!user) return null

  const { overseas } = overseasStore()

  const handleNext = () => {
    console.log(overseas)
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
