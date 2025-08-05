import useCountryStore from '@/store/countryStore'

const ResultCard = ({ country, type }: { country: string; type: string }) => {
  const { countries } = useCountryStore()

  if (!country || !type) return null

  const estimate =
    type === 'express' ? '23,000원 / 2~4일 소요' : '12,000원 / 7~10일 소요'

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
        예상 비용 및 소요: {estimate}
      </p>
    </div>
  )
}

export default ResultCard
