'use client'

import { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Faq, FaqListProps } from '@/app/support/faq/types/faq'
import { apiGet } from '@/lib/fetcher'

const FaqList = ({ slug }: FaqListProps) => {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [openId, setOpenId] = useState<number | null>(null)

  useEffect(() => {
    apiGet<Faq[]>('/faqs', slug !== null ? { tag: slug } : {}).then(
      (data) => data && setFaqs(data),
    )
  }, [slug])

  return (
    <ul className="space-y-2">
      {faqs?.map((f) => (
        <li key={f.id} className="bg-white rounded-lg shadow-sm">
          <div>
            <button
              className="w-full flex justify-between items-center px-4 py-3"
              onClick={() => setOpenId(openId === f.id ? null : f.id)}
            >
              <span className="text-gray-800">{f.title}</span>
              {openId === f.id ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </button>
            {openId === f.id && (
              <div className="px-4 pb-3 text-gray-600">{f.content}</div>
            )}
          </div>
        </li>
      ))}
      {faqs.length === 0 && (
        <li className="text-center text-gray-500 py-6">
          해당 카테고리의 FAQ가 없습니다.
        </li>
      )}
    </ul>
  )
}

export default FaqList
