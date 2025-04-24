"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getUserInterviewsRemaining } from "../services/firebase";
import CombinedProtection from "../components/CombinedProtection";

export default function HomePage() {
  const router = useRouter();
  const [interviewsRemaining, setInterviewsRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInterviewsRemaining = async () => {
      try {
        const count = await getUserInterviewsRemaining();
        
        // Check if there was an error getting the count
        if (count === -1) {
          setError(true);
          setInterviewsRemaining(0); // Default to 0 for UI display
        } else {
          setInterviewsRemaining(count);
        }
      } catch (error) {
        console.error("Error fetching interviews remaining:", error);
        setError(true);
        setInterviewsRemaining(0); // Default to 0 for UI display
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewsRemaining();
  }, []);

  return (
    <CombinedProtection>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 container mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8 w-full max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Welcome to AlgoMentor
            </h1>
            
            {/* Interviews Remaining Counter */}
            <div className="py-2 px-4 bg-gray-800/80 border border-gray-700 rounded-lg flex flex-col items-center justify-center">
              {loading ? (
                <div className="animate-pulse">Loading interview credits...</div>
              ) : error ? (
                <div className="flex items-center text-yellow-400">
                  <ErrorOutlineIcon className="mr-2" fontSize="small" />
                  <span>Error determining remaining interviews</span>
                </div>
              ) : (
                <div className="text-center">
                  <span className="font-bold text-lg text-blue-400">{interviewsRemaining}</span>
                  <span className="ml-1 text-gray-300">interview{interviewsRemaining !== 1 ? 's' : ''} remaining</span>
                </div>
              )}
            </div>
            
            <div className="w-full grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 border border-gray-700 p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                <PlayArrowIcon sx={{ fontSize: 50, color: "#60a5fa" }} />
                <h2 className="text-xl font-bold text-blue-400">
                  Start Mock Interview
                </h2>
                <p className="text-center text-gray-300 mb-4 text-sm">
                  Practice your coding interview skills with our AI interviewer.
                </p>
                <button
                  onClick={() => router.push('/setup')}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200 text-sm w-full"
                  disabled={interviewsRemaining === 0}
                >
                  Start Interview
                </button>
                {interviewsRemaining === 0 && (
                  <p className="text-xs text-red-400">Purchase credits to start</p>
                )}
              </div>

              <div className="flex flex-col items-center space-y-4 border border-gray-700 p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                <HistoryIcon sx={{ fontSize: 50, color: "#60a5fa" }} />
                <h2 className="text-xl font-bold text-blue-400">
                  View Feedback
                </h2>
                <p className="text-center text-gray-300 mb-4 text-sm">
                  Review your past interview performances.
                </p>
                <button
                  onClick={() => router.push('/feedbackHistory')}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200 text-sm w-full"
                >
                  View History
                </button>
              </div>

              <div className="flex flex-col items-center space-y-4 border border-gray-700 p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                <ShoppingCartIcon sx={{ fontSize: 50, color: "#60a5fa" }} />
                <h2 className="text-xl font-bold text-blue-400">
                  Buy Interview Credits
                </h2>
                <p className="text-center text-gray-300 mb-4 text-sm">
                  Purchase more interview credits to continue practicing.
                </p>
                <button
                  onClick={() => router.push('/pricing')}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200 text-sm w-full"
                >
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CombinedProtection>
  );
} 