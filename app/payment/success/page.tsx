"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(true);
  
  // Get payment info from URL parameters
  const paymentIntent = searchParams.get('payment_intent');
  const interviewCount = searchParams.get('interviews');

  useEffect(() => {
    // Simulate a delay to show the processing state
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-lg">
        {processing ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold">Processing your payment...</h2>
            <p className="text-gray-400 text-center">Please wait while we confirm your purchase.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-green-500/20 p-4 rounded-full">
              <CheckCircleIcon className="text-green-500" style={{ fontSize: 64 }} />
            </div>
            
            <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
            
            <div className="text-center space-y-2">
              <p className="text-xl">
                You have successfully purchased <span className="font-bold text-green-400">{interviewCount}</span> interview credits.
              </p>
              <p className="text-gray-400">
                Payment ID: <span className="font-mono text-sm">{paymentIntent}</span>
              </p>
            </div>
            
            <div className="border-t border-gray-700 w-full my-4 pt-6 flex justify-center">
              <Link href="/home" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md font-medium transition-colors">
                <HomeIcon className="mr-2" />
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <Suspense fallback={
          <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <PaymentSuccessContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
} 