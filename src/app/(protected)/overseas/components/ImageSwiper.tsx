'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageSwiperType } from '@/app/(protected)/overseas/[type]/types/shipping'

export default function ImageSwiper({
  images,
  removeImage,
  slidesPerView = 3,
}: Readonly<ImageSwiperType>) {
  const swiperRef = useRef<any>(null)

  return (
    <div className="mb-4">
      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="rounded overflow-hidden"
      >
        {images.map((file, idx) => (
          <SwiperSlide key={file.name + idx}>
            <div className="relative group w-full h-60">
              <Image
                src={URL.createObjectURL(file)}
                alt={`업로드 이미지 ${idx + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage?.(idx)}
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                삭제
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
