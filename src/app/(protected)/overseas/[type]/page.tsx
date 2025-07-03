'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { saveOrders } from '@/api/orders'
import ImageSwiper from '@/app/(protected)/overseas/components/ImageSwiper'
import { overseasStore } from '@/store/overseasStore'

const ShippingPage = () => {
  const router = useRouter()
  const { type } = useParams()
  console.log('type:', type)
  const { overseas, setOverseas } = overseasStore()

  const [weight, setWeight] = useState<string>(
    overseas?.weight ? String(overseas?.weight) : '',
  )

  const [images, setImages] = useState<File[]>(overseas?.images as File[])
  const [insuranceValue, setInsuranceValue] = useState<number | ''>(
    overseas?.insuranceValue || 0,
  )
  const [notes, setNotes] = useState(overseas?.notes)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selected = Array.from(e.target.files)
    const availableSlots = 5 - images.length

    if (availableSlots <= 0) {
      alert('최대 5개까지 업로드할 수 있습니다.')
      return
    }

    const toAdd = selected.slice(0, availableSlots)
    if (selected.length > availableSlots) {
      alert(
        `최대 5개까지 업로드 가능하며, 앞에서부터 ${toAdd.length}개만 추가됩니다.`,
      )
    }

    setImages((prev) => [...prev, ...toAdd])
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!weight) {
      alert('무게를 입력해주세요.')
      return
    }

    const form = new FormData()
    if (insuranceValue !== '') {
      form.append('insuranceValue', insuranceValue.toString())
    }
    form.append('notes', notes as string)
    images.forEach((file) => form.append('images', file, file.name))

    setOverseas({
      ...overseas,
      type: type as string,
      images,
      notes,
      weight: Number(weight),
      insuranceValue: Number(insuranceValue),
    })

    if (!overseas?.originCountry || !overseas?.destCountry) {
      router.push('/overseas/country')
    } else {
      const res = await saveOrders({
        shippingTypeCode: overseas?.type ?? 'OVERSEAS',
        weight: String(overseas?.weight),
        insuranceValue: String(overseas?.insuranceValue),
        originCountryCode: overseas?.originCountry.code,
        originPostalCode: String(overseas?.originPostalCode),
        originAddress: overseas.originAddress,
        originAddressDetail: overseas?.originAddressDetail,
        destinationCountryCode: overseas?.destCountry.code,
        destinationPostalCode: String(overseas?.destinationPostalCode),
        destinationAddress: overseas?.destAddress,
        destinationAddressDetail: overseas?.destAddressDetail,
        notes: 'test',
        images: overseas?.images,
      })

      if (res?.status === 200) {
        router.push(`/overseas/result?id=${res?.data?.id}`)
      }
    }
  }

  return (
    <div className="px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        {/* 1. 무게 입력 */}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            총 무게(kg)
          </label>
          <input
            id="weight"
            type="number"
            step="0.1"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 2.5"
            required
          />
        </div>

        {/* 2. 사진 업로드 */}
        <div>
          <label
            htmlFor={'image-upload'}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            주문 사진 업로드 (최대 5개)
          </label>
          <div className="flex items-center">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="sr-only"
              disabled={images.length >= 5}
            />
            <label
              htmlFor="image-upload"
              className="inline-block py-2 px-4 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 transition mb-4"
            >
              파일 선택
            </label>
          </div>
          {images.length > 0 && (
            <ImageSwiper images={images} removeImage={removeImage} />
          )}
        </div>

        <div>
          <label
            htmlFor="insurance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            보험금액 (원)
          </label>
          <input
            type="number"
            id="insurance"
            min="0"
            value={insuranceValue}
            onChange={(e) =>
              setInsuranceValue(
                e.target.value === '' ? '' : parseInt(e.target.value),
              )
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-toss-500"
            placeholder="예: 10000"
          />
        </div>

        {/* 3. 추가 요청사항 */}
        <div>
          <label
            htmlFor={'notes'}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            추가 요청사항
          </label>
          <textarea
            id={'notes'}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-toss-500 resize-none"
            placeholder="특이사항이 있으시면 입력하세요"
          />
        </div>

        {/* 4. 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-toss-500 text-white py-3 rounded-lg text-lg font-medium shadow-sm hover:bg-toss-700 transition"
          disabled={!images.length}
        >
          신청하기
        </button>
      </form>
    </div>
  )
}

export default ShippingPage
