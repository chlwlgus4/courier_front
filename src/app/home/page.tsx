// app/home/page.tsx
import React from "react";

export default function Page() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">🛍️ 거래 플랫폼</h1>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#" className="hover:text-blue-600">판매글 등록</a>
                        <a href="#" className="hover:text-blue-600">내 매칭</a>
                        <a href="#" className="hover:text-blue-600">프로필</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                {/* 판매글 리스트 */}
                <section>
                    <h2 className="text-lg font-semibold mb-6">판매글 목록</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full"
                            >
                                <div>
                                    <h3 className="text-base font-bold mb-2">[제목] 판매글 제목 {i + 1}</h3>
                                    <p className="text-sm text-gray-600">
                                        판매 내용 간단 설명 예시입니다.
                                    </p>
                                </div>
                                <button className="mt-5 w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-md font-semibold">
                                    매칭 요청
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 판매글 등록 CTA */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md text-sm">
                        ✍️ 판매글 등록하기
                    </button>
                </div>
            </main>
        </div>
    );
}
