'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Image from 'next/image'
import React, { useEffect, useMemo, useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageSwiperType, PreviewImage } from '@/commons/types'

const ImageSwiper = ({
  images,
  removeImage,
  slidesPerView = 3,
}: Readonly<ImageSwiperType>) => {
  const swiperRef = useRef<any>(null)

  const previewImages: PreviewImage[] = useMemo(() => {
    return images?.map((item, index) => {
      // File 객체인 경우
      if (item instanceof File) {
        return {
          file: item,
          preview: URL.createObjectURL(item),
        }
      }
      // base64 문자열인 경우
      else if (typeof item === 'string') {
        return {
          preview: item.startsWith('data:')
            ? item
            : `data:image/jpeg;base64,${item}`,
          id: index,
        }
      }
      // 기본값 (오류 방지)
      else {
        return {
          preview: '',
          id: index,
        }
      }
    })
  }, [images])

  useEffect(() => {
    return () => {
      previewImages?.forEach((img) => {
        if (img.file && img.preview.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview)
        }
      })
    }
  }, [previewImages])

  const imageList = useMemo(
    () =>
      previewImages?.map((img, idx) => (
        <SwiperSlide key={img.preview}>
          <div className="relative group w-full h-60">
            <Image
              src={img.preview}
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
      )),
    [previewImages, removeImage],
  )

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
        {imageList}
      </Swiper>
    </div>
  )
}

export default ImageSwiper
