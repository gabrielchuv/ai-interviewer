"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { addInterviewCredits } from "../services/firebase";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// New pricing structure - £5 per interview for smaller packages, £4 for larger packages
const interviewPackages = [
  { count: 2, price: 10, pricePerInterview: 5 },
  { count: 4, price: 20, pricePerInterview: 5 },
  { count: 6, price: 24, pricePerInterview: 4, recommended: true, discount: true },
  { count: 8, price: 32, pricePerInterview: 4, discount: true },
  { count: 10, price: 40, pricePerInterview: 4, discount: true },
];

const features = [
  "Realistic AI Interviewer Experience",
  "Detailed Performance Feedback",
  "Algorithm & Data Structure Problems",
  "Save Feedback History",
  "24/7 Practice Availability"
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePurchase = async (interviewCount: number) => {
    setLoading(interviewCount);
    setError(null);
    setSuccess(null);

    try {
      // In a real app, you would integrate with a payment processor here
      // For now, we'll just simulate a successful payment by adding credits
      const result = await addInterviewCredits(interviewCount);
      
      if (result) {
        setSuccess(`Successfully purchased ${interviewCount} interview credits!`);
        // Redirect to home after 2 seconds
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        setError("Failed to add interview credits. Please try again.");
      }
    } catch (err) {
      console.error("Error processing purchase:", err);
      setError("An error occurred while processing your purchase. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Interview Credits
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Choose your package - <span className="font-bold text-blue-400">£5</span> per interview for small packages, 
                <span className="font-bold text-green-400"> £4</span> for 6+ interviews
              </p>
            </div>

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400 text-center flex items-center justify-center">
                <CheckCircleIcon className="mr-2" />
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
                {error}
              </div>
            )}

            {/* Interview packages */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {interviewPackages.map((pkg) => (
                <div 
                  key={pkg.count}
                  className={`relative flex flex-col rounded-lg ${pkg.recommended ? 'bg-blue-900/30 border-blue-500/50' : pkg.discount ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-800/50 border-gray-700'} border p-4 transition-all duration-200 hover:transform hover:scale-105`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                      Best Value
                    </div>
                  )}
                  {pkg.discount && !pkg.recommended && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-0.5 bg-green-600 text-white text-xs font-medium rounded-full">
                      Discounted
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-white">{pkg.count}</span>
                    <span className="block text-sm text-gray-300 mt-1">interviews</span>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold">{pkg.discount ? <span className="text-green-400">£{pkg.price}</span> : `£${pkg.price}`}</span>
                    <span className="block text-sm text-gray-400">
                      {pkg.discount ? (
                        <>
                          <span className="text-green-400">£{pkg.pricePerInterview}</span> per interview
                          <span className="block text-xs text-green-400 mt-1">Save £{pkg.count} compared to standard rate</span>
                        </>
                      ) : (
                        <>£{pkg.pricePerInterview} per interview</>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePurchase(pkg.count)}
                    disabled={loading === pkg.count}
                    className={`mt-auto w-full px-3 py-2 text-white ${
                      pkg.recommended ? 'bg-blue-600 hover:bg-blue-700' : 
                      pkg.discount ? 'bg-green-600 hover:bg-green-700' : 
                      'bg-gray-700 hover:bg-gray-600'
                    } rounded-md font-medium transition-colors duration-200 flex items-center justify-center text-sm`}
                  >
                    {loading === pkg.count ? (
                      <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                    ) : (
                      <ShoppingCartIcon className="mr-1" fontSize="small" />
                    )}
                    {loading === pkg.count ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>

            {/* Features section */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-4 text-center">Every Purchase Includes</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-3">
                    <CheckCircleIcon fontSize="medium" className="text-blue-400 mb-2" />
                    <p className="text-gray-300 text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ section */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">How does the pricing work?</h4>
                  <p className="text-gray-300 text-sm">Smaller packages (2-4 interviews) cost £5 per interview. Larger packages (6+ interviews) are discounted to £4 per interview, saving you money as you practice more.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">How long do my credits last?</h4>
                  <p className="text-gray-300 text-sm">Your interview credits never expire - use them whenever you're ready to practice.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">What types of questions will I face?</h4>
                  <p className="text-gray-300 text-sm">Our AI interviewer covers a wide range of algorithm and data structure problems similar to those asked by top tech companies.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Are there any additional costs?</h4>
                  <p className="text-gray-300 text-sm">No hidden fees - the price you see is the price you pay. All features are included with every package.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 