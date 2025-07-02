'use client'

import React, { ReactNode } from 'react'
import Spinner from '@/commons/components/common/Spinner' // 또는 이전에 제안드린 로딩 스토어
import useLoadingStore from '@/store/loadingStore'

export default function ClientAppWrapper({
  children,
}: {
  children: ReactNode
}) {
  // 이제 훅을 안전하게 쓸 수 있습니다!
  const loading = useLoadingStore((s) => s.loading)

  return (
    <>
      {loading && <Spinner />}
      {children}
    </>
  )
}
