"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { addInterviewCredits } from "../services/firebase";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const pricingPlans = [
  {
    name: "Basic",
    price: 19.99,
    interviews: 5,
    features: [
      "5 AI Interview Sessions",
      "Detailed Performance Feedback",
      "Common Algorithm Questions",
      "Valid for 30 Days"
    ],
  },
  {
    name: "Pro",
    price: 49.99,
    interviews: 15,
    features: [
      "15 AI Interview Sessions",
      "Detailed Performance Feedback",
      "Advanced Algorithm Questions",
      "System Design Questions",
      "Valid for 90 Days"
    ],
    recommended: true
  },
  {
    name: "Ultimate",
    price: 99.99,
    interviews: 35,
    features: [
      "35 AI Interview Sessions",
      "Detailed Performance Feedback",
      "Advanced Algorithm Questions",
      "System Design Questions",
      "FAANG-style Interview Questions",
      "Valid for 180 Days"
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePurchase = async (planName: string, interviewCount: number) => {
    setLoading(planName);
    setError(null);
    setSuccess(null);

    try {
      // In a real app, you would integrate with a payment processor here
      // For now, we'll just simulate a successful payment by adding credits
      const result = await addInterviewCredits(interviewCount);
      
      if (result) {
        setSuccess(`Successfully purchased ${planName} plan with ${interviewCount} interviews!`);
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
                Interview Packages
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Choose the perfect package to practice and master your coding interview skills
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

            <div className="grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`relative flex flex-col rounded-lg ${plan.recommended ? 'bg-blue-900/30 border-blue-500/50' : 'bg-gray-800/50 border-gray-700'} border p-6 transition-all duration-200 hover:transform hover:scale-105`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mt-1 mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    <span className="font-semibold text-blue-400">{plan.interviews}</span> Interview Sessions
                  </p>
                  <ul className="mb-6 space-y-2 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircleIcon fontSize="small" className="text-blue-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePurchase(plan.name, plan.interviews)}
                    disabled={loading === plan.name}
                    className={`mt-auto w-full px-6 py-3 text-white ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'} rounded-md font-medium transition-colors duration-200 flex items-center justify-center`}
                  >
                    {loading === plan.name ? (
                      <span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"></span>
                    ) : (
                      <ShoppingCartIcon className="mr-2" fontSize="small" />
                    )}
                    {loading === plan.name ? "Processing..." : "Purchase Now"}
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-4">Why Choose AlgoMentor?</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Realistic Interviews</h4>
                  <p className="text-gray-300 text-sm">Our AI provides realistic interview experiences similar to top tech companies.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Detailed Feedback</h4>
                  <p className="text-gray-300 text-sm">Get comprehensive feedback on your technical skills, problem-solving approach, and code quality.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Practice Anytime</h4>
                  <p className="text-gray-300 text-sm">Practice at your own pace, whenever you want, from anywhere in the world.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 