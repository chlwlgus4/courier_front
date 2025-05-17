export interface DutyPageProps {
  // searchParams가 Next.js 15에서 Promise로 관리됨
  searchParams: Promise<{ country?: string }>
}
