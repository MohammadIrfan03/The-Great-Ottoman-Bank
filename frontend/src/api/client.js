import axios from 'axios'

// All requests go through the API gateway (single entry point, port 8080).
const BASE_URL = 'http://localhost:8080'

const client = axios.create({
  baseURL: BASE_URL,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('ottoman_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client