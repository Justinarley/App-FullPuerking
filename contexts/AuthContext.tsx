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
      const publicRoutes = ['/login', '/register'] // Rutas que no requieren autenticación
      if (!publicRoutes.includes(router.pathname)) {
        router.replace('/login')
      }
    }
    setIsLoading(false)
  }, [router, router.pathname]) // Cambio a router.pathname para evitar renderizados innecesarios

  if (isLoading) {
    return <p>Cargando...</p>
  }

  return <>{children}</>
}
