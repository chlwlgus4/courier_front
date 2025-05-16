'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function DutyPage() {
  const params = useSearchParams()
  const country = params.get('country')
  const router = useRouter()
  const onAgree = () => {
    router.push(`/overseas/shipping-form?country=${country}`)
  }

  return (
    <div className="px-4 py-6 space-y-4">
      <h1 className="text-xl font-semibold">관세 및 주의사항</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        {/* 서버에서 불러온 국가별 주의사항 */}
        {/* 예: 관세율, 금지 물품 등 */}
        {country} 안내 문구…
      </div>
      <button
        onClick={onAgree}
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        동의하고 다음
      </button>
    </div>
  )
}
