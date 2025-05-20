'use client'

import { ReactNode } from 'react'
import AuthInitializer from '@/hook/useInitializeAuth'

export default function AuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  )
}
