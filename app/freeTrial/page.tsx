'use client'

import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FreeTrialPage() {
  const router = useRouter()

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
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Experience Your Free AI Interview
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Try a complete mock interview with our AI interviewer and receive instant feedback - no commitment required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">What You'll Get</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-green-400 mr-3 mt-1">✅</div>
                  <div>
                    <span className="font-medium text-white">Complete mock interview</span>
                    <p className="text-gray-300 text-sm mt-1">Experience a real interview scenario with algorithm challenges</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-400 mr-3 mt-1">✅</div>
                  <div>
                    <span className="font-medium text-white">AI-powered feedback</span>
                    <p className="text-gray-300 text-sm mt-1">Get detailed feedback on your code, communication, and problem-solving approach</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-400 mr-3 mt-1">✅</div>
                  <div>
                    <span className="font-medium text-white">Interview recording</span>
                    <p className="text-gray-300 text-sm mt-1">Review your performance and track improvement areas</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">How It Works</h2>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-purple-500/20 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
                  <p className="text-gray-300">Create a free account (no credit card required)</p>
                </li>
                <li className="flex">
                  <span className="bg-purple-500/20 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
                  <p className="text-gray-300">Select your interview difficulty and topic</p>
                </li>
                <li className="flex">
                  <span className="bg-purple-500/20 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
                  <p className="text-gray-300">Complete your interview with our AI interviewer</p>
                </li>
                <li className="flex">
                  <span className="bg-purple-500/20 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
                  <p className="text-gray-300">Receive instant feedback and performance analysis</p>
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 md:p-8 text-center mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-white">Ready to try AlgoMentor?</h2>
            <p className="text-gray-300 mb-6">Join 500+ engineers preparing smarter for interviews</p>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-8 rounded-lg text-lg font-medium" asChild>
              <Link href="/signup" className="flex items-center">
                Start Your Free Interview
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>No credit card required. AlgoMentor includes 1 free interview with full features.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 