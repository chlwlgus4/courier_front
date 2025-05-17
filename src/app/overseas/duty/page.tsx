import DutyContent from '@/app/overseas/components/DutyContent'
import { DutyPageProps } from '@/commons/types'

const DutyPage = async ({ searchParams }: DutyPageProps) => {
  const params = await searchParams
  const country = (params.country as string) ?? ''

  return <DutyContent country={country} />
}

export default DutyPage
