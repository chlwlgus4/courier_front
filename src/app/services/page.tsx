import React from 'react'
import ServiceContent from '@/app/services/components/ServiceContent'
import { Category } from '@/app/services/types/category'
import { ServicesPageProps } from '@/app/services/types/service'

const Page = async ({ searchParams }: ServicesPageProps) => {
  const params = await searchParams
  const category = (params.category as Category) ?? 'overseas'

  /*
      Suspense 사용 이유
      useSearchParams 같은 비동기 작업이 필요한 훅을 사용할 때
      이 데이터가 준비되기 전까지는 렌더링이 차단될 수 있음
      Suspense로 감싸면 데이터가 준비되기 전까지 fallback UI를 보여주고
      데이터가 준비되면 실제 컴포넌트로 대체됨
    */
  // <Suspense fallback={<div>로딩 중...</div>}>
  //   <ServiceContent />
  // </Suspense>
  return (
    <div className="container mx-auto">
      <ServiceContent initialCategory={category} />
    </div>
  )
}

export default Page
