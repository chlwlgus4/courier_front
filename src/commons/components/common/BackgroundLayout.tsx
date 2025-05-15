'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface BackgroundLayoutProps {
  children: ReactNode
}

const BackgroundLayout = ({ children }: BackgroundLayoutProps) => {
  const path = usePathname()
  let bgClass = 'bg-white'

  if (path === '/') {
    bgClass = 'bg-cyan-950'
  }

  return <div className={clsx(bgClass)}>{children}</div>
}

export default BackgroundLayout
