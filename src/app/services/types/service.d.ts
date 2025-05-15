import { Category } from '@/app/services/types/category'

export interface ServicesPageProps {
  // searchParams가 Next.js 15에서 Promise로 관리됨
  searchParams: Promise<{ category?: string }>
}

export interface ServiceContentProps {
  initialCategory: Category
}
