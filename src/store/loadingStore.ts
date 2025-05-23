import { create } from 'zustand'
import { LoadingState } from '@/commons/types'

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (v) => set({ loading: v }),
}))

export default useLoadingStore
