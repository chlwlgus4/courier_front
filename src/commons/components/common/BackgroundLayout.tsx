'use client'

import { ReactNode } from 'react'

interface BackgroundLayoutProps {
  children: ReactNode
}

const BackgroundLayout = ({ children }: BackgroundLayoutProps) => {
  return <div className={'bg-cyan-950'}>{children}</div>
}

export default BackgroundLayout
