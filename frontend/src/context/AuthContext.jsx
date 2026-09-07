import { createContext, useContext, useState } from 'react'
import client from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ottoman_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (email, password) => {
    const response = await client.post('/api/auth/login', { email, password })
    const { token, fullName, email: userEmail, role } = response.data
    localStorage.setItem('ottoman_token', token)
    localStorage.setItem('ottoman_user', JSON.stringify({ fullName, email: userEmail, role }))
    setUser({ fullName, email: userEmail, role })
    return response.data
  }

  const register = async (fullName, email, password) => {
    const response = await client.post('/api/auth/register', { fullName, email, password })
    const { token, fullName: name, email: userEmail, role } = response.data
    localStorage.setItem('ottoman_token', token)
    localStorage.setItem('ottoman_user', JSON.stringify({ fullName: name, email: userEmail, role }))
    setUser({ fullName: name, email: userEmail, role })
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('ottoman_token')
    localStorage.removeItem('ottoman_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}