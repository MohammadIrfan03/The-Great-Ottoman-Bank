import axios from 'axios'

// Build the gateway URL from whatever host the frontend is currently
// being served from - works on localhost, any EC2 IP, or a real domain,
// without ever needing to hardcode an IP.
const BASE_URL = `http://${window.location.hostname}:8080`

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