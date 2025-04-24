"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFeedback } from "../services/firebase";
import CombinedProtection from "../components/CombinedProtection";
import Header from "../components/Header";

interface FeedbackHistoryEntry {
  id: string;
  date: string;
  overallScore: number;
  userId: string;
  userEmail: string;
  timestamp: Date;
}

export default function FeedbackHistoryPage() {
  const router = useRouter();
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        setError(null);
        const history = await getUserFeedback();
        setFeedbackHistory(history as FeedbackHistoryEntry[]);
      } catch (error) {
        console.error("Error fetching feedback history:", error);
        setError("Failed to load feedback history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackHistory();
  }, []);

  const handleViewDetails = (id: string) => {
    router.push(`/feedbackHistory/${id}`);
  };

  return (
    <CombinedProtection>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Feedback History
            </h1>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-center">
                {error}
              </div>
            ) : feedbackHistory.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl font-medium">No feedback history available</p>
                <p className="mt-2">Complete an interview to see your feedback here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbackHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                      <div className="text-lg font-medium text-gray-300">
                        {entry.date}
                      </div>
                      <div className="text-xl font-bold text-blue-400">
                        Overall Score: {entry.overallScore}/5
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(entry.id)}
                      className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200 w-full sm:w-auto"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CombinedProtection>
  );
} 