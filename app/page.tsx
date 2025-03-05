import Link from "next/link"
import { Code2, Brain, ArrowRight, Rocket } from "lucide-react"
import { Button } from "./ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <header className="px-4 lg:px-6 h-16 lg:h-20 flex items-center border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="#">
            <Code2 className="h-6 w-6 mr-2 lg:h-8 lg:w-8 lg:mr-3 text-blue-400" />
            <span className="font-bold text-lg lg:text-xl text-blue-400">AlgoMentor</span>
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
                    Master Technical Interviews with AlgoMentor
                  </h1>
                  <p className="text-gray-300 md:text-xl lg:text-2xl">
                    Simulate real interview scenarios, tackle a wide range of problems, and gain immediate insights to
                    boost your confidence and performance.
                  </p>
                  <div className="flex flex-col sm:flex-row w-full gap-4 pt-4 lg:pt-8 justify-center lg:justify-start">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto max-w-[200px] sm:max-w-none mx-auto lg:mx-0 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg" 
                      asChild
                    >
                      <Link href="/freeTrial">Try for Free</Link>
                    </Button>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto max-w-[200px] sm:max-w-none mx-auto lg:mx-0 bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg"
                      asChild
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto max-w-[200px] sm:max-w-none mx-auto lg:mx-0 text-blue-400 border-blue-400 hover:bg-blue-400/10 text-base sm:text-lg"
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 lg:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Key Features
            </h2>
            <div className="grid gap-8 sm:gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 border border-gray-700 p-6 lg:p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
                <Brain className="h-12 w-12 lg:h-16 lg:w-16 mb-4 text-blue-400" />
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">Interview-Focused Learning</h3>
                <p className="text-center text-gray-300 lg:text-lg">
                  Boost your confidence by tackling problems in a realistic interview environment, mirroring actual
                  interview processes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 border border-gray-700 p-6 lg:p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
                <Code2 className="h-12 w-12 lg:h-16 lg:w-16 mb-4 text-blue-400" />
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">Personalised Feedback</h3>
                <p className="text-center text-gray-300 lg:text-lg">
                  Receive immediate, actionable feedback on key interview areas after every mock session. This includes
                  soft skill areas like problem clarification and approach & planning.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 border border-gray-700 p-6 lg:p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
                <Rocket className="h-12 w-12 lg:h-16 lg:w-16 mb-4 text-blue-400" />
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">Always Available</h3>
                <p className="text-center text-gray-300 lg:text-lg">
                  Access practice sessions 24/7. More affordable than professional interviewers. More reliable than your
                  friends.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 lg:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Why is AlgoMentor better?
            </h2>
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">Interleaved Practice</h3>
                <p className="text-gray-300 lg:text-lg">
                  Enhance your problem-solving versatility by tackling a diverse range of questions. You won&apos;t know
                  the question you&apos;ll get in a real interview.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">Immediate Feedback</h3>
                <p className="text-gray-300 lg:text-lg">
                  Benefit from a fast feedback loop by receiving actionable insights after each session to swiftly
                  improve your strengths and address your weaknesses.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-400">
                  Dynamic difficulty adjusting (coming up)
                </h3>
                <p className="text-gray-300 lg:text-lg">
                  We believe learning should be designed to meet you where you&apos;re at and help you grow from there.
                  We are working to create personalised experiences for interviewers at different levels of experience.
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
                  Ready to Ace Your Next Interview?
                </h2>
                <p className="mx-auto max-w-[800px] text-gray-200 md:text-xl lg:text-2xl">
                  Start practicing with our AI interviewer and improve your chances of landing your dream job.
                </p>
              </div>
              <div className="pt-4 lg:pt-8 flex gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/freeTrial" className="text-base lg:text-lg flex items-center">
                    Try for Free
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/signup" className="text-base lg:text-lg flex items-center">
                    Sign Up
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
          <p className="text-xs lg:text-sm text-gray-400">© 2023 AlgoMentor. All rights reserved.</p>
          {/* <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              className="text-xs lg:text-sm hover:underline underline-offset-4 text-gray-400 hover:text-blue-400"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs lg:text-sm hover:underline underline-offset-4 text-gray-400 hover:text-blue-400"
              href="#"
            >
              Privacy Policy
            </Link>
          </nav> */}
        </div>
      </footer>
    </div>
  )
}

