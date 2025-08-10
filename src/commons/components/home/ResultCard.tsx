import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { ResultCardProps } from '@/commons/types'
import useCountryStore from '@/store/countryStore'
import price from 'public/data/price.json'

export interface ResultCardRef {
  getDeliveryFee: () => number
  getDeliveryInfo: () => string
}

const ResultCard = forwardRef<ResultCardRef, ResultCardProps>(
  ({ country, type, box }, ref) => {
    const { countries } = useCountryStore()

    // 부피 무게 = 박스 가로 x 세로 x 높이 / 5000
    const deliveryFee = useMemo(() => {
      return box
        .map((a) => {
          if (!a.width) return 0
          const width = Number(a.width)
          const height = Number(a.height)
          const size = Number(a.size)
          const volumeWeight =
            Math.round(((width * height * size) / 5000) * 2) / 2
          const kg =
            Number(a.weight) > volumeWeight ? Number(a.weight) : volumeWeight
          const res = price.find((p) => p.kg === kg)
          const isExpress = type === 'express'
          if (!res) return 0
          return res[isExpress ? 'courier' : 'ems']
        })
        .reduce((acc, curr) => acc + curr, 0)
    }, [box, type])

    const deliveryInfo = useMemo(() => {
      const estimate =
        type === 'express' ? '원 / 2~4일 소요' : '원 / 7~10일 소요'
      return deliveryFee.toLocaleString() + estimate
    }, [deliveryFee, type])

    useImperativeHandle(
      ref,
      () => ({
        getDeliveryFee: () => deliveryFee,
        getDeliveryInfo: () => deliveryInfo,
      }),
      [deliveryFee, deliveryInfo],
    )

    if (!country || !type) return null

    const typeNames: Record<string, string> = {
      express: '특급배송',
      standard: '일반배송',
    }

    const getCountryName = (id: string) => {
      return countries.find((c) => c.id === Number(id))?.nameKo
    }

    return (
      <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-2">📦 배송 정보 요약</h3>
        <p className="text-gray-800">국가: {getCountryName(country)}</p>
        <p className="text-gray-800">배송 방식: {typeNames[type]}</p>
        <p className="text-blue-600 font-semibold mt-2">
          예상 비용 및 소요: {deliveryInfo}
        </p>
      </div>
    )
  },
)

ResultCard.displayName = 'ResultCard'

export default ResultCard
