import React, { ReactNode } from 'react'
import NavigationBar from '@/commons/components/common/NavigationBar'
import ProtectedLayout from '@/hook/ProtectedLayout'

interface ProtectedGroupLayoutProps {
  children: ReactNode
  params?: Promise<any>
}

export default function ProtectedGroupLayout({
  children,
}: ProtectedGroupLayoutProps) {
  return (
    <ProtectedLayout>
      <main className="mb-15">{children}</main>
      <NavigationBar />
    </ProtectedLayout>
  )
}
