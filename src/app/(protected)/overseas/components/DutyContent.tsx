'use client'

import { useRouter } from 'next/navigation'

const DutyContent = ({ country }: { country: string }) => {
  const router = useRouter()
  const onAgree = () => {
    router.push(`/overseas/shipping`)
  }

  return (
    <div className="px-4 py-6 space-y-4">
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
export default DutyContent
