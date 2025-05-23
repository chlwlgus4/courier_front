'use client'

import useLoadingStore from '@/store/loadingStore'

const Spinner = () => {
  const loading = useLoadingStore((s) => s.loading)
  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default Spinner
