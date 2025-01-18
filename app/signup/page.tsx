'use client'

import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function SignUpPage() {
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the email submission to your backend
    // For now, we'll just redirect to the instructions page
    router.push('/instructions')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Start Your Free Trial
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Get 30 days of unlimited access to AI Interviewer
            </p>
          </div>

          <div className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:ring-primary"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Start Free Trial
              </Button>
            </form>

            <div className="text-sm text-zinc-500 dark:text-zinc-400 space-y-4">
              {/* <p>
                By signing up, you agree to our{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300">
                  Privacy Policy
                </Link>
              </p> */}
              <p>
                After your 30-day free trial ends, you'll receive an email to set up your full account. 
                Continue using AI Interviewer for just £10/month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 