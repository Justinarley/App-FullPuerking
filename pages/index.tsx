import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      router.replace('/principal')
    } else {
      router.replace('/login')
    }
  }, [router])
  
  return <div>Cargando...</div>
}
