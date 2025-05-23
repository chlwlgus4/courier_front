'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { LoadingContextValue } from '@/commons/types/commons/commons'

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function LoadingProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(false)

  const show = useCallback(() => setLoading(true), [])
  const hide = useCallback(() => setLoading(false), [])

  const value = useMemo(() => ({ loading, show, hide }), [loading, show, hide])

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}

export function useLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider')
  return ctx
}
