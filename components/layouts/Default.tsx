import { RootLayoutProps } from '../../types/config'
import { AuthProvider } from '@/contexts/AuthContext'

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <AuthProvider>
        {children}
      </AuthProvider>
  )
}