'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HeroPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mt-10 text-blue-600">슈웅 🚀</h1>
        <p className="text-xl mt-6 font-semibold text-gray-800">
          복잡하고 귀찮은 해외배송?
        </p>
        <p className="text-lg mt-2 text-gray-600">손만 까딱하면 끝!</p>
        <p className="mt-4 text-sm text-gray-500">
          픽업부터 배송까지, 문앞에서 문앞까지.
          <br />
          Big3보다 저렴한 국제특송 서비스
        </p>
      </div>

      <Image
        src="/images/hero-shipping.png" // 지도 또는 배송 아이콘
        alt="국제배송"
        width={250}
        height={250}
        className="my-10"
      />

      <button
        onClick={() => router.push('/')}
        className="w-full bg-blue-500 text-white py-3 rounded-xl text-base font-semibold hover:bg-blue-600"
      >
        지금 바로 시작하기
      </button>
    </div>
  )
}
