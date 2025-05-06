'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [applicantName, setApplicantName] = useState('')
  const [applicantCompany, setApplicantCompany] = useState('')
  const [applicantContact, setApplicantContact] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const swiperRef = useRef<any>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const mockPost = {
          id,
          title: '판매글 제목',
          description: '이것은 상품 설명입니다.',
          price: 10000,
          category: '디지털',
          imageUrls: [
            'https://picsum.photos/id/1011/600/400',
            'https://picsum.photos/id/1015/600/400',
            'https://picsum.photos/id/1016/600/400',
          ],
          seller: {
            name: '홍길동',
            email: 'seller@example.com',
          },
        }
        setPost(mockPost)
      } catch (e) {
        console.error('판매글 로딩 실패', e)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  if (loading) return <div className="p-6">로딩 중...</div>
  if (!post) return <div className="p-6">글을 찾을 수 없습니다.</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className="relative mb-4">
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="rounded overflow-hidden"
            modules={[Navigation, Pagination]}
          >
            {post.imageUrls.map((url: string, index: number) => (
              <SwiperSlide key={url}>
                <Image
                  src={url}
                  alt={`이미지 ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex space-x-2 overflow-x-auto mt-3">
            {post.imageUrls.map((url: string, index: number) => (
              <Image
                key={url}
                src={url}
                alt={`썸네일 ${index + 1}`}
                onClick={() => {
                  setActiveIndex(index)
                  swiperRef.current?.swiper.slideTo(index)
                }}
                width={96}
                height={64}
                className={`rounded cursor-pointer border ${index === activeIndex ? 'border-blue-500' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>
      )}

      <p className="text-gray-700 mb-2">{post.description}</p>
      <p className="text-lg font-semibold text-blue-600 mb-2">
        ₩{post.price.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 mb-2">카테고리: {post.category}</p>
      <div className="text-sm text-gray-600 mb-6">
        <p>판매자: {post.seller.name}</p>
        <p>이메일: {post.seller.email}</p>
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
        onClick={() => setShowModal(true)}
      >
        매칭 요청하기
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">매칭 요청</h2>
            <p className="mb-2 text-sm text-gray-700">
              판매자: {post.seller.name}
            </p>

            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="이름"
              className="w-full border rounded-md p-2 mb-2"
              required
            />
            <input
              type="text"
              value={applicantCompany}
              onChange={(e) => setApplicantCompany(e.target.value)}
              placeholder="업체명"
              className="w-full border rounded-md p-2 mb-2"
              required
            />
            <input
              type="text"
              value={applicantContact}
              onChange={(e) => setApplicantContact(e.target.value)}
              placeholder="연락처 (이메일 또는 전화번호)"
              className="w-full border rounded-md p-2 mb-4"
              required
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
              placeholder="요청 메시지를 입력하세요"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  alert(
                    `매칭 요청 정보:\n이름: ${applicantName}\n업체명: ${applicantCompany}\n연락처: ${applicantContact}\n메시지: ${message}`,
                  )
                  setShowModal(false)
                }}
              >
                요청 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
