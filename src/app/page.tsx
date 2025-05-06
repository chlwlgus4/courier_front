'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-screen-2xl mx-auto px-6 sm:px-8 py-10">
        <section>
          <h2 className="text-lg font-semibold mb-6">판매글 목록</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 className="text-base font-bold mb-2">
                    [제목] 판매글 제목 {i + 1}
                  </h3>
                  <p className="text-sm text-gray-600">판매 내용</p>
                </div>
                <button
                  className="mt-4 w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base rounded-md font-semibold transition-colors"
                  onClick={() => router.push('/post/1')}
                >
                  매칭 요청
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="fixed bottom-5 right-5 z-50">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg text-sm transition hover:scale-105"
            onClick={() => router.push('/post')}
          >
            <span className="hidden sm:inline">판매글 등록하기</span>
            <span className="sm:hidden">등록</span>
          </button>
        </div>
      </main>
    </div>
  )
}
