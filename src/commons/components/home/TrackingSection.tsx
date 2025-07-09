import { useEffect, useState } from 'react'

const TrackingSection = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('')
  const [trackingResult, setTrackingResult] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const handleTrack = () => {
    if (!trackingNumber) return
    const result =
      trackingNumber === '1234567890'
        ? '현재 위치: 인천 물류센터 → 예상 도착: 3일 후'
        : '해당 운송장을 찾을 수 없습니다.'
    setTrackingResult(result)

    const updated = [
      trackingNumber,
      ...history.filter((h) => h !== trackingNumber),
    ].slice(0, 3)
    setHistory(updated)
    localStorage.setItem('trackingHistory', JSON.stringify(updated))
  }

  useEffect(() => {
    const stored = localStorage.getItem('trackingHistory')
    if (stored) setHistory(JSON.parse(stored))
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span>배송 조회</span>
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="운송장 번호 입력"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleTrack}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          조회
        </button>
      </div>
      {trackingResult && <p className="text-gray-700 mt-1">{trackingResult}</p>}
      {history.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-600 mb-1">
            최근 조회 운송장
          </h4>
          <ul className="text-sm text-gray-500 list-disc pl-5">
            {history.map((num, idx) => (
              <li key={idx}>{num}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TrackingSection
