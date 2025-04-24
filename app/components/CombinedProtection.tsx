'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { isMobileDevice } from '../utils/utils'

interface CombinedProtectionProps {
  children: React.ReactNode
}

export default function CombinedProtection({ children }: CombinedProtectionProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // Check for mobile device on client-side
    setIsMobile(isMobileDevice())
  }, [])

  useEffect(() => {
    // If not loading and no user, redirect to signin
    if (!loading && !user) {
      router.push('/signin')
      return
    }

    // If authenticated and on a mobile device, redirect to mobile-not-supported
    if (!loading && user && isMobile) {
      router.push('/mobile-not-supported')
    }
  }, [user, loading, router, isMobile])

  // Show loading state
  if (loading || isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  // If not authenticated or on mobile, don't render children (prevents flash of content)
  if (!user || isMobile) {
    return null
  }

  // User is authenticated and on desktop, render children
  return <>{children}</>
} 