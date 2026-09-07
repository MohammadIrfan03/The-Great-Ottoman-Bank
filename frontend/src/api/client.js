import axios from 'axios'

const fallbackBaseUrl =
  typeof window !== 'undefined'
    ? `http://${window.location.hostname}:8080`
    : 'http://localhost:8080'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || fallbackBaseUrl).replace(/\/$/, '')

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ottoman_token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ottoman_token')
      localStorage.removeItem('ottoman_user')
    }

    return Promise.reject(error)
  },
)

export { BASE_URL }
export default client