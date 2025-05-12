'use client'

import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../../firebaseConfig'

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Add user email to database with 1 free interview credit
      await addDoc(collection(db, 'userEmails'), {
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
        trialStartDate: new Date().toISOString(),
        uid: userCredential.user.uid,
        interviewsRemaining: 1 // Give one free interview to every new user
      })

      router.push('/home')
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Error processing signup:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError("This email already has an account. Please sign in instead.")
      } else {
        setError('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        
        {/* Left: Hero Text & Visual */}
        <div className="flex flex-col justify-center space-y-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Master your next coding interview</h1>
          <p className="text-lg text-gray-300">1 free mock interview with instant AI feedback — no prep, just practice.</p>
          
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="text-green-400 mr-2">✅</div> Real interview-style questions
            </li>
            <li className="flex items-center">
              <div className="text-green-400 mr-2">✅</div> Smart feedback on code & communication
            </li>
            <li className="flex items-center">
              <div className="text-green-400 mr-2">✅</div> Available whenever you need it
            </li>
          </ul>
        </div>

        {/* Right: Sign Up Form */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 self-center border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          
          <h2 className="text-2xl font-semibold text-white text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Try AlgoMentor</h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 pl-10 rounded-lg bg-gray-800/80 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
              <div className="absolute left-3 top-3.5 text-gray-400">✉️</div>
            </div>
            
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full p-3 pl-10 rounded-lg bg-gray-800/80 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
                minLength={6}
              />
              <div className="absolute left-3 top-3.5 text-gray-400">🔒</div>
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] font-medium">
              Sign Up for Free →
            </Button>
            
            <div className="text-center text-gray-300 text-sm mt-4 flex items-center justify-center space-x-1">
              <span className="inline-block animate-pulse">👨‍💻</span>
              <span>Join 500+ engineers preparing smarter for interviews</span>
            </div>
          </form>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-2">
              <p className="text-sm text-red-400">
                {error}
                {error.includes("already has an account") && (
                  <Link href="/signin" className="ml-2 text-blue-400 hover:text-blue-300 font-medium">
                    Sign in here
                  </Link>
                )}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-300 text-center">
            Already have an account?{" "}
            <Link 
              href="/signin"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 