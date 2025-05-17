import Link from "next/link"
import { Brain, ArrowRight, Gift } from "lucide-react"
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
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            asChild
          >
            <Link href="/signin">Sign In</Link>
          </Button>
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
                  Get real interview experience. Simulate it with AI, get feedback, and improve fast.
                  </p>
                  
                  {/* Free Interview Promo */}
                  <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg px-4 py-3 flex items-center my-4">
                    <Gift className="h-6 w-6 mr-3 text-green-400 flex-shrink-0" />
                    <p className="text-green-300 text-sm md:text-base">
                      Try a 5-minute free trial.
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
                      className="w-full sm:w-auto max-w-[200px] sm:max-w-none mx-auto lg:mx-0 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg"
                      asChild
                    >
                      <Link href="/freeTrial">Free Trial</Link>
                    </Button>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm mt-4 text-center lg:text-left font-medium tracking-wide flex items-center justify-center lg:justify-start">
                      <span className="mr-2 text-base">👨‍💻</span> Built by ex-FAANG engineers
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-2xl mx-auto lg:max-w-none">
                <div style={{padding:'54.09% 0 0 0', position:'relative'}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1083694156?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
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
              Why AlgoMentor?
            </h2>
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400 flex items-center">
                  <span className="mr-2">🧠</span> Beyond Leetcode Practice
                </h3>
                <p className="text-gray-300 lg:text-lg">
                  You already know how to code — now train how to explain, strategize, and solve under pressure. AlgoMentor bridges the gap between silent grinding and confident interview delivery.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400 flex items-center">
                  <span className="mr-2">👨‍💻</span> Real-Time AI Feedback
                </h3>
                <p className="text-gray-300 lg:text-lg">
Practice with an AI that listens like a real interviewer — and tells you what worked, what didn&apos;t, and how to improve your presence, logic, and communication.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400 flex items-center">
                  <span className="mr-2">⏰</span> Last-Mile Prep, On Demand
                </h3>
                <p className="text-gray-300 lg:text-lg">
No more scheduling mock interviews with busy friends. Get interview-ready when it matters most — on your terms, right before the real thing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              What Our Users Say
            </h2>
            <div className="flex justify-center mb-12">
              <p className="text-green-300 text-lg font-medium tracking-wide flex items-center">
                <span className="mr-2 text-xl">👥</span> Used by 500+ engineers
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-gray-900 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">
                      &quot;After 6 months of Leetcode grinding, I still froze up in real interviews. AlgoMentor AI&apos;s mock interviews helped me get comfortable explaining my thought process while coding. Just received offers from two FAANG companies!&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-400">Michael K.</p>
                    <p className="text-gray-400 text-sm">CS Student, London</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-gray-900 p-6 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">
                      &quot;The detailed feedback on my communication style was invaluable. AlgoMentor AI pointed out that I wasn&apos;t structuring my responses quite right and I was not explaining my algorithm choices clearly enough. After a few sessions, I improved and landed one of my top-choice companies.&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-400">Sarah J.</p>
                    <p className="text-gray-400 text-sm">CS Student, London</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-gray-900 p-6 rounded-xl border border-green-500/20 shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">
                      &quot;As a self-taught developer, I struggled with imposter syndrome during interviews. The flexibility to practice anytime with AlgoMentor AI meant I could do multiple sessions a week.&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-400">David L.</p>
                    <p className="text-gray-400 text-sm">Junior Software Engineer, Chicago</p>
                  </div>
                </div>
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
                Don&apos;t Just Hope You&apos;re Ready. Know You Are
                </h2>
                <p className="mx-auto max-w-[800px] text-gray-200 md:text-xl lg:text-2xl">
                  Your algorithm skills deserve to shine in the interview.<br></br>
Don&apos;t let nerves or poor delivery cost you the offer.<br></br>
AlgoMentor gives you real interview practice, powered by AI.


                </p>
              </div>
              <div className="pt-4 lg:pt-8 flex gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/signup" className="text-base lg:text-lg flex items-center">
                    Start Interview Prep
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/freeTrial" className="text-base lg:text-lg flex items-center">
                    Try Free Interview
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
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="text-xs lg:text-sm text-gray-400 hover:text-blue-400">Terms</Link>
            <Link href="/privacy" className="text-xs lg:text-sm text-gray-400 hover:text-blue-400">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

