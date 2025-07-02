import React, { ReactNode } from 'react'
import NavigationBar from '@/commons/components/common/NavigationBar'
import ProtectedLayout from '@/hook/ProtectedLayout'

export default function ProtectedGroupLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ProtectedLayout>
      <main className="mb-15">{children}</main>
      <NavigationBar />
    </ProtectedLayout>
  )
}
