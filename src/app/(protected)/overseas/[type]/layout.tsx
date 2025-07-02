import React from 'react'

export default function TypeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ type: string }>
}) {
  return <>{children}</>
}
