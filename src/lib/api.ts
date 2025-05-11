// lib/api.ts
import axios from 'axios'
import Cookies from 'js-cookie'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // http://localhost:8080
})

// 요청 시 토큰 헤더 자동 추가
API.interceptors.request.use((config) => {
  const token = Cookies.get('jwt')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
