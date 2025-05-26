'use client'

import { ReactNode } from 'react'

interface BackgroundLayoutProps {
  children: ReactNode
}

const BackgroundLayout = ({ children }: BackgroundLayoutProps) => {
  return <div>{children}</div>
}

export default BackgroundLayout
