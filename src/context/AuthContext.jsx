import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from '../api/auth'


const AuthContext = createContext(null)


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let ignore = false

    async function checkSession() {
      try {
        const me = await authApi.getMe()
        if (!ignore) {
          setUser(me)
          setStatus(me ? 'authenticated' : 'guest')
        }
      } catch {
        if (!ignore) setStatus('guest')
      }
    }
    checkSession()
    return () => {
      ignore = true
    }
  }, [])

  async function login(identifier, password) {
    const user = await authApi.login(identifier, password)
    setUser(user)
    setStatus('authenticated')
  }

  async function logout() {
    try {
      await authApi.logout()
    }
    finally {
      setStatus('guest')
      setUser(null)
    }
  }


  const value = { user, status, login, logout }

  return (
    <AuthContext
      value={value}
    >
      {children}
    </AuthContext>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}