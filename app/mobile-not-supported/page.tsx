'use client'

import Link from "next/link"
import { ArrowLeft, Monitor, Smartphone } from "lucide-react"
import { Button } from "../ui/button"

export default function MobileNotSupportedPage() {
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
        
        <div className="max-w-lg mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-red-500/10 p-6 rounded-full">
              <Smartphone className="h-16 w-16 text-red-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600">
              Mobile Access Restricted
            </h1>
            <p className="text-xl text-gray-300">
              AlgoMentor AI is designed for desktop use only.
            </p>
            <p className="text-gray-400">
              Our interview platform requires a desktop environment for the best experience. 
              Please switch to a laptop or desktop computer to use AlgoMentor AI.
            </p>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6 mt-8">
            <div className="flex items-center justify-center mb-4">
              <Monitor className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-blue-300 mb-2">Why Desktop Only?</h3>
            <p className="text-gray-300">
              Technical interviews typically involve writing and explaining code, which is much 
              more effective with a proper keyboard and larger screen. Our platform is optimized 
              for this desktop experience to better simulate real interview conditions.
            </p>
          </div>
          
          <Button 
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            asChild
          >
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 