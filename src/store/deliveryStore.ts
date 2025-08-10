import { create } from 'zustand'
import { DeliveryState } from '@/commons/types'

export const deliveryStore = create<DeliveryState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  deliveryFee: 0,
  setDeliveryFee: (fee) => set({ deliveryFee: fee }),
  country: null,
  setCountry: (ct) => set({ country: ct }),
  deliveryType: '',
  setDeliveryType: (type) => set({ deliveryType: type }),
}))
