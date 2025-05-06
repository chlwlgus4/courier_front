"use client";
import React, {useState} from "react";
import Link from "next/link";

export default function Page() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <header className="sticky top-0 z-20 bg-white border-b shadow-sm">
                <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold">쿠리어</h1>

                    {/* 데스크톱 네비게이션 */}
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/post" className="hover:text-blue-600 transition-colors">판매글 등록</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">내 매칭</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">프로필</Link>
                    </nav>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        className="md:hidden text-gray-500"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="메뉴 열기"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t px-6 py-4 fixed top-[64px] left-0 w-full shadow-md z-30">
                        <nav className="flex flex-col space-y-4 text-sm font-medium">
                            <Link href="#" className="hover:text-blue-600">판매글 등록</Link>
                            <Link href="#" className="hover:text-blue-600">내 매칭</Link>
                            <Link href="#" className="hover:text-blue-600">프로필</Link>
                        </nav>
                    </div>
                )}
            </header>

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
                                    <h3 className="text-base font-bold mb-2">[제목] 판매글 제목 {i + 1}</h3>
                                    <p className="text-sm text-gray-600">판매 내용</p>
                                </div>
                                <button className="mt-4 w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base rounded-md font-semibold transition-colors">
                                    매칭 요청
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="fixed bottom-5 right-5 z-50">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg text-sm transition hover:scale-105">
                        <span className="hidden sm:inline">✍️ 판매글 등록하기</span>
                        <span className="sm:hidden">✍️ 등록</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
