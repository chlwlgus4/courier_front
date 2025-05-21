'use client'

import { useState } from 'react'
import FaqList from '@/app/support/faq/components/FaqList'
import FaqTagFilter from '@/app/support/faq/components/FaqTagFilter'

const FaqLayout = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <main className="px-4 mt-4 space-y-4">
      <FaqTagFilter onSelectTag={setSelectedTag} />
      <FaqList slug={selectedTag} />
    </main>
  )
}

export default FaqLayout
