import { AxiosRequestConfig } from 'axios'
import { Country } from '@/commons/types/country'

export interface SearchBarProps {
  placeholder?: string
  bgColor?: string
  borderColor?: string
  textColor?: string
  focusBorderColor?: string
  iconColor?: string
}

export interface LoadingContextValue {
  loading: boolean
  show: () => void
  hide: () => void
}

export interface LoadingState {
  loading: boolean
  setLoading: (v: boolean) => void
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
  spinner?: boolean
}

export interface ApiResponse<T> {
  data: T | null
  status: number
}

export type ItemType = {
  name: string
  weight: string
  width: string
  height: string
  size: string
}

export interface ResultCardProps {
  country: string
  type: string
  box: ItemType[]
}

export interface DeliveryState {
  items: ItemType[]
  setItems: (items: ItemType[]) => void
  deliveryFee: number
  setDeliveryFee: (fee: number) => void
  country: Country | null
  setCountry: (country: Country) => void
  deliveryType: string
  setDeliveryType: (type: string) => void
}
