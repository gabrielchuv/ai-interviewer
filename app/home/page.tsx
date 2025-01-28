"use client";

import { Box, Typography, Paper, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';

export default function HomePage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 container mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8 w-full max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Welcome to AlgoMentor
            </h1>
            
            <div className="w-full grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col items-center space-y-4 border border-gray-700 p-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                <PlayArrowIcon sx={{ fontSize: 60, color: "#60a5fa" }} />
                <h2 className="text-2xl font-bold text-blue-400">
                  Start Mock Interview
                </h2>
                <p className="text-center text-gray-300 mb-4">
                  Practice your coding interview skills with our AI interviewer. Get real-time feedback and improve your performance.
                </p>
                <button
                  onClick={() => router.push('/instructions')}
                  className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200"
                >
                  Start Interview
                </button>
              </div>

              <div className="flex flex-col items-center space-y-4 border border-gray-700 p-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                <HistoryIcon sx={{ fontSize: 60, color: "#60a5fa" }} />
                <h2 className="text-2xl font-bold text-blue-400">
                  View Feedback History
                </h2>
                <p className="text-center text-gray-300 mb-4">
                  Review your past interview performances, track your progress, and identify areas for improvement.
                </p>
                <button
                  onClick={() => router.push('/feedbackHistory')}
                  className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 