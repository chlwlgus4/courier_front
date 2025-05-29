'use client'

import { useRouter } from 'next/navigation'
import { Country } from '@/commons/types'

const DutyContent = ({ country }: { country: Country | null }) => {
  const router = useRouter()

  const onAgree = () => {
    router.push(`/overseas/shipping`)
  }

  return (
    <div className="px-4 py-6 space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        {country?.name} 안내 문구…
      </div>
      <button
        onClick={onAgree}
        className="w-full bg-toss-500 hover:bg-toss-700 text-white py-3 rounded-lg"
      >
        동의하고 다음
      </button>
    </div>
  )
}
export default DutyContent
