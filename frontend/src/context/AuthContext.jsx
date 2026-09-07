import { createContext, useContext, useState } from 'react'
import client from '../api/client'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const stored = localStorage.getItem('ottoman_user')
    return stored ? JSON.parse(stored) : null
  } catch {
    localStorage.removeItem('ottoman_user')
    return null
  }
}

function persistSession(token, user) {
  localStorage.setItem('ottoman_token', token)
  localStorage.setItem('ottoman_user', JSON.stringify(user))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const login = async (email, password) => {
    const response = await client.post('/api/auth/login', { email, password })
    const { token, fullName, email: userEmail, role } = response.data

    const nextUser = {
      fullName,
      email: userEmail,
      role,
    }

    persistSession(token, nextUser)
    setUser(nextUser)

    return response.data
  }

  const register = async (fullName, email, password) => {
    const response = await client.post('/api/auth/register', {
      fullName,
      email,
      password,
    })

    const {
      token,
      fullName: name,
      email: userEmail,
      role,
    } = response.data

    const nextUser = {
      fullName: name,
      email: userEmail,
      role,
    }

    persistSession(token, nextUser)
    setUser(nextUser)

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
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}