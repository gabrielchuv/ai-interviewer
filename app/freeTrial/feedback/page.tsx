"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "../../components/Header";
import { getFeedback } from "../../services/feedback";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FeedbackSection {
  rating: number;
  feedback: string;
}

interface FeedbackData {
  technicalDepth: FeedbackSection;
  problemSolving: FeedbackSection;
  codeQuality: FeedbackSection;
}

export default function FreeTrialFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const interviewData = localStorage.getItem("interview_conversation");
        
        if (!interviewData) {
          // If somehow there's no interview data, redirect to home
          router.push('/');
          return;
        }

        const conversation = JSON.parse(interviewData);
        const code = localStorage.getItem("interview_code") || "";

        if (conversation.length > 0) {
          const feedbackData = await getFeedback(conversation, code);
          setFeedback(feedbackData);

          // Clear localStorage after processing
          localStorage.removeItem("interview_conversation");
          localStorage.removeItem("interview_code");
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [router]);

  const overallScore = feedback && Math.round((feedback.technicalDepth.rating + feedback.problemSolving.rating + feedback.codeQuality.rating) / 3)
  const hireInclination = overallScore && overallScore >= 3 ? "Hire" : "No Hire"

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        ) : feedback && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Interview Feedback
            </h1>
            
            {/* Hire Inclination at the top outside of a Paper */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium text-gray-300 mb-2">Final Decision</h2>
              <div className={`text-5xl font-bold ${hireInclination === "Hire" ? "text-green-400" : "text-red-400"}`}>
                {hireInclination}
              </div>
            </div>

            {/* Stacked feedback sections */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                <h2 className="text-xl font-medium text-gray-300 mb-2">Technical Depth & Optimization</h2>
                <div className="text-3xl font-bold text-blue-400 mb-4">
                  {feedback.technicalDepth.rating}/4
                </div>
                <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                  <ReactMarkdown>{feedback.technicalDepth.feedback}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                <h2 className="text-xl font-medium text-gray-300 mb-2">Problem Solving & Functional Correctness</h2>
                <div className="text-3xl font-bold text-blue-400 mb-4">
                  {feedback.problemSolving.rating}/4
                </div>
                <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                  <ReactMarkdown>{feedback.problemSolving.feedback}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                <h2 className="text-xl font-medium text-gray-300 mb-2">Code Quality & Readability</h2>
                <div className="text-3xl font-bold text-blue-400 mb-4">
                  {feedback.codeQuality.rating}/4
                </div>
                <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                  <ReactMarkdown>{feedback.codeQuality.feedback}</ReactMarkdown>
                </div>
              </div>
              
              {/* Call to action for free trial users */}
              <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-6 flex flex-col items-center text-center">
                <h2 className="text-xl font-bold text-white mb-3">
                  Want to save your feedback and practice more?
                </h2>
                <p className="text-gray-200 mb-4">
                  Create an account to save your interview history and get unlimited practice sessions.
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="/signup" 
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200"
                  >
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 