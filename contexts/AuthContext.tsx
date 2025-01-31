import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { AuthProps } from '@/types/config'
import { useState, useEffect } from 'react'

export const AuthProvider = ({ children }: AuthProps) => {
  const [, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      if (router.pathname !== '/login') {
        router.replace('/login')
      }
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <p>Cargando...</p>
  }

  return <>{children}</>
}