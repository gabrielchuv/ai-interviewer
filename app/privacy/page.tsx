import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-blue-400 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              At AlgoMentor AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">2. Information We Collect</h2>
            <p className="text-gray-300">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Register for an account</li>
              <li>Use our interactive features and services</li>
              <li>Make a purchase</li>
              <li>Request customer support</li>
              <li>Participate in mock interviews with our AI system</li>
            </ul>
            <p className="text-gray-300 mt-4">
              This information may include your name, email address, password, payment information, and any feedback or content you provide during interview sessions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">3. Usage Data</h2>
            <p className="text-gray-300">
              We may also collect information on how the service is accessed and used. This usage data may include information such as your computer&apos;s Internet Protocol address (IP address), browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">4. How We Use Your Information</h2>
            <p className="text-gray-300">
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">5. Sharing Your Information</h2>
            <p className="text-gray-300">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li><strong>With Service Providers:</strong> We may share your information with service providers to perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
              <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">6. Data Security</h2>
            <p className="text-gray-300">
              We use administrative, technical, and physical security measures to help protect your personal information from unauthorized access and disclosure. However, no website or internet transmission is completely secure. We cannot guarantee that unauthorized access, hacking, data loss, or other breaches will never occur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">8. Your Data Rights</h2>
            <p className="text-gray-300">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction or update of your personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-gray-300 mt-4">
              To exercise these rights, please contact us using the details provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-300">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">10. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at algomentor.ai@gmail.com.
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