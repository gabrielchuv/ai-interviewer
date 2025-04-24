import Link from "next/link"
import { Code2, Brain, ArrowRight, Rocket, Gift, Zap, Users, MessageSquare } from "lucide-react"
import { Button } from "./ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <header className="px-4 lg:px-6 h-16 lg:h-20 flex items-center border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="#">
            <Brain className="h-6 w-6 mr-2 lg:h-8 lg:w-8 lg:mr-3 text-blue-400" />
            <span className="font-bold text-lg lg:text-xl text-blue-400">AlgoMentor AI</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Master the Interview, Not Just the Code
                  </h1>
                  <p className="text-gray-300 md:text-xl lg:text-2xl">
                    You've solved dozens of problems. Your algorithms are solid. Now bridge the gap between technical knowledge and interview success with AI-powered realistic mock interviews.
                  </p>
                  
                  {/* Free Interview Promo */}
                  <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg px-4 py-3 flex items-center my-4">
                    <Gift className="h-6 w-6 mr-3 text-green-400 flex-shrink-0" />
                    <p className="text-green-300 text-sm md:text-base">
                      Get your first AI-powered mock interview <span className="font-bold">free</span> when you sign up!
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row w-full gap-4 pt-4 lg:pt-8 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto max-w-[200px] sm:max-w-none mx-auto lg:mx-0 bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg"
                      asChild
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto max-w-[200px] sm:max-w-none mx-auto lg:mx-0 bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg"
                      asChild
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-2xl mx-auto lg:max-w-none">
                <div style={{padding:'54.09% 0 0 0', position:'relative'}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1062587907?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
                    title="algoMentor_demo_2">
                  </iframe>
                </div>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="https://player.vimeo.com/api/player.js"></script>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 lg:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              For Engineers Who Know Their Algorithms
            </h2>
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">Beyond Leetcode Practice</h3>
                <p className="text-gray-300 lg:text-lg">
                  You've mastered the algorithms. Now master the delivery. AlgoMentor AI bridges the gap between solving problems alone and performing under interview conditions.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">AI-Powered Interview Feedback</h3>
                <p className="text-gray-300 lg:text-lg">
                  Receive detailed feedback on your interview presence, communication style, and problem-solving approach—the exact skills that differentiate good from great candidates.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">
                  Last-Mile Interview Preparation
                </h3>
                <p className="text-gray-300 lg:text-lg">
                  For engineers in the final stages of interview prep who need realistic practice without scheduling conflicts or relying on busy friends. Available exactly when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-900 to-purple-900 text-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  You've Done the Hard Work. Now Close the Deal.
                </h2>
                <p className="mx-auto max-w-[800px] text-gray-200 md:text-xl lg:text-2xl">
                  Your algorithm skills deserve to shine in the interview. Don't let interview nerves or communication gaps cost you your dream job. Our AI-powered platform helps you perform at your best.
                </p>
                <p className="mx-auto max-w-[600px] text-green-300 md:text-lg mt-2">
                  Sign up now for interview-specific training and receive a free mock interview session!
                </p>
              </div>
              <div className="pt-4 lg:pt-8 flex gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/signup" className="text-base lg:text-lg flex items-center">
                    Start Interview Prep
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 lg:py-8 border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs lg:text-sm text-gray-400">© 2023 AlgoMentor AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

