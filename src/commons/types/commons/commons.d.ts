import { AxiosRequestConfig } from 'axios'

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
