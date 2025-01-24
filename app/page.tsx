import Link from 'next/link'
import { Button } from "./ui/button"
import { Code2, Zap, Users, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 lg:h-20 flex items-center border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="#">
            <Code2 className="h-6 w-6 mr-2 lg:h-8 lg:w-8 lg:mr-3" />
            <span className="font-bold text-lg lg:text-xl">AlgoMentor</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Master Technical Interviews with AlgoMentor
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl lg:text-2xl dark:text-zinc-400">
                Simulate real interview scenarios, tackle a wide range of problems, and gain immediate insights to boost your confidence and performance.
                </p>
              </div>
              <div className="pt-4 lg:pt-8 flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup" className="text-base lg:text-lg">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/signin" className="text-base lg:text-lg">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 lg:mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 sm:gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 border border-zinc-200 dark:border-zinc-700 p-6 lg:p-8 rounded-lg">
                <Zap className="h-12 w-12 lg:h-16 lg:w-16 mb-4 text-primary" />
                <h3 className="text-xl lg:text-2xl font-bold">Interview-Focused Learning</h3>
                <p className="text-center text-zinc-500 dark:text-zinc-400 lg:text-lg">
                Boost your confidence by tackling problems in a realistic interview environment, mirroring actual interview processes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 border border-zinc-200 dark:border-zinc-700 p-6 lg:p-8 rounded-lg">
                <Code2 className="h-12 w-12 lg:h-16 lg:w-16 mb-4 text-primary" />
                <h3 className="text-xl lg:text-2xl font-bold">Personalised Feedback</h3>
                <p className="text-center text-zinc-500 dark:text-zinc-400 lg:text-lg">
                Receive immediate, actionable feedback on key interview areas after every mock session. This includes soft skill areas like problem clarification and approach & planning.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 border border-zinc-200 dark:border-zinc-700 p-6 lg:p-8 rounded-lg">
                <Users className="h-12 w-12 lg:h-16 lg:w-16 mb-4 text-primary" />
                <h3 className="text-xl lg:text-2xl font-bold">Always Available</h3>
                <p className="text-center text-zinc-500 dark:text-zinc-400 lg:text-lg">
                Access practice sessions 24/7. More affordable than a professional interviewers. More reliable than your friends.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 lg:mb-12">
                Why is AlgoMentor better?
            </h2>
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold">Interleaved Practice</h3>
                <p className="text-zinc-500 dark:text-zinc-400 lg:text-lg">
                Enhance your problem-solving versatility by tackling a diverse range of questions. You won&apos;t know the question you&apos;ll get in a real interview.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold">Immediate Feedback</h3>
                <p className="text-zinc-500 dark:text-zinc-400 lg:text-lg">
                Benefit from a fast feedback loop by receiving actionable insights after each session to swiftly improve your strengths and address your weaknesses.
                </p>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold">Dynamic difficulty adjusting (coming up)</h3>
                <p className="text-zinc-500 dark:text-zinc-400 lg:text-lg">
                We believe learning should be designed to meet you where you&apos;re at and help you grow from there. We are working to create personalised experiences for interviewers at different levels of experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Ready to Ace Your Next Interview?
                </h2>
                <p className="mx-auto max-w-[800px] text-primary-foreground/80 md:text-xl lg:text-2xl">
                  Start practicing with our AI interviewer and improve your chances of landing your dream job.
                </p>
              </div>
              <div className="pt-4 lg:pt-8 flex gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup" className="text-base lg:text-lg flex items-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
                  <Link href="/signin" className="text-base lg:text-lg">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 lg:py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-400">
            © 2023 AlgoMentor. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs lg:text-sm hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs lg:text-sm hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

