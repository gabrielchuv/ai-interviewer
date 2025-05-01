import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <header className="px-4 lg:px-6 h-16 lg:h-20 flex items-center border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="/">
            <span className="font-bold text-lg lg:text-xl text-blue-400">AlgoMentor AI</span>
          </Link>
          <Link 
            href="/" 
            className="text-sm text-blue-400 flex items-center hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-blue-400 mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to AlgoMentor AI. These Terms and Conditions govern your use of our website and services. 
              By using AlgoMentor AI, you agree to these terms in full. If you disagree with any part of these terms, 
              please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">2. Definitions</h2>
            <p className="text-gray-300">
            &quot;Service&quot; refers to the AlgoMentor AI website and AI-powered interview practice platform.<br />
            &quot;User&quot;, &quot;You&quot;, and &quot;Your&quot; refers to the individual accessing or using the Service.<br />
            &quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, and &quot;Our&quot; refers to AlgoMentor AI.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">3. Use of the Service</h2>
            <p className="text-gray-300">
              AlgoMentor AI provides an AI-powered technical interview practice platform.
              You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">4. Account Registration</h2>
            <p className="text-gray-300">
              To access certain features of our service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-300">
              The Service and its original content, features, and functionality are and will remain the exclusive property of AlgoMentor AI. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">6. User Content</h2>
            <p className="text-gray-300">
              You retain all rights to any content you submit, post, or display on or through the Service. By submitting, posting, or displaying content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">7. Payments and Subscriptions</h2>
            <p className="text-gray-300">
              Some features of the Service may require payment or subscription. All payments are processed securely through our payment providers. We do not store your full payment information. By subscribing to a paid plan, you agree to pay the specified fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">8. Termination</h2>
            <p className="text-gray-300">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300">
              In no event shall AlgoMentor AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-300">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">11. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at algomentor.ai@gmail.com.
            </p>
          </section>

          <section>
            <p className="text-gray-400 text-sm mt-8">
              Last updated: May 1, 2023
            </p>
          </section>
        </div>
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