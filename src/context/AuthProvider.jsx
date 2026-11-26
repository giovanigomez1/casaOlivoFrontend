import { useState, useEffect, useCallback } from "react"
import { AuthContext } from "./authContext"
import * as authApi from '../api/auth'

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

  const expireSession = useCallback(() => {
    setUser(null)
    setStatus('guest')
  }, [])

  const value = { user, status, login, logout, expireSession }

  return (
    <AuthContext
      value={value}
    >
      {children}
    </AuthContext>
  )
}