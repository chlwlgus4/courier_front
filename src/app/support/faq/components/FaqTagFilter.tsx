'use client'

import { useEffect, useState } from 'react'
import { FaqTagFilterProps, Tag } from '@/commons/types'
import { apiRequest } from '@/lib/fetcher'

const FaqTagFilter = ({ onSelectTag }: FaqTagFilterProps) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    apiRequest<Tag[]>({
      method: 'get',
      url: '/faqs/tags',
      spinner: false,
    }).then(({ data }) => data && setTags(data))
  }, [])

  const handleClick = (slug: string | null) => {
    setSelected(slug)
    onSelectTag(slug)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick(null)}
        className={`px-3 py-1 rounded-full text-sm border ${
          selected === null
            ? 'bg-indigo-600 text-white border-transparent'
            : 'bg-white text-gray-600 border-gray-300'
        }`}
      >
        전체
      </button>
      {tags?.map((t) => (
        <button
          key={t.id}
          onClick={() => handleClick(t.slug)}
          className={`px-3 py-1 rounded-full text-sm border ${
            selected === t.slug
              ? 'bg-indigo-600 text-white border-transparent'
              : 'bg-white text-gray-600 border-gray-300'
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}

export default FaqTagFilter
