'use client'

import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState, useEffect } from "react"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { isMobileDevice } from '../utils/utils'

export default function SignInPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  // Check for mobile device on client-side
  useEffect(() => {
    setIsMobile(isMobileDevice())
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signInWithEmailAndPassword(auth, email, password)
      
      // After successful login, check if mobile and redirect accordingly
      if (isMobile) {
        router.push('/mobile-not-supported')
      } else {
        router.push('/home')
      }
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Error signing in:', err)
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password')
      } else {
        setError('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to continue your practice
            </p>
          </div>

          {/* Show mobile warning if on a mobile device */}
          {isMobile && (
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <strong>Note:</strong> AlgoMentor AI works best on desktop. Mobile access is limited.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-sm font-medium leading-none text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="text-sm font-medium leading-none text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign In
              </Button>
            </form>

            {error && (
              <div className="space-y-4">
                <p className="text-sm text-red-500">
                  {error}
                </p>
              </div>
            )}

            <div className="text-sm text-center text-gray-400">
              Don&apos;t have an account?{" "}
              <Link 
                href="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Try for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 