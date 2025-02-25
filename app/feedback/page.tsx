"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { getFeedback } from "../services/feedback";
import { storeFeedback } from "../services/firebase";

interface FeedbackSection {
  rating: number;
  feedback: string;
}

interface FeedbackData {
  technicalDepth: FeedbackSection;
  problemSolving: FeedbackSection;
  codeQuality: FeedbackSection;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const feedbackStoredRef = useRef(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const conversation = JSON.parse(
          localStorage.getItem("interview_conversation") || "[]"
        );
        const code = localStorage.getItem("interview_code") || "";

        const feedbackData = await getFeedback(conversation, code);
        setFeedback(feedbackData);

        // Store feedback in Firebase only if not already stored
        if (!feedbackStoredRef.current) {
          try {
            await storeFeedback(feedbackData);
            feedbackStoredRef.current = true;
          } catch (error) {
            console.error("Error storing feedback in Firebase:", error);
          }
        }

        localStorage.removeItem("interview_conversation");
        localStorage.removeItem("interview_code");
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

const overallScore = feedback && Math.round((feedback.technicalDepth.rating + feedback.problemSolving.rating + feedback.codeQuality.rating) / 3)

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : feedback && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Interview Feedback
              </h1>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <h2 className="text-xl font-medium text-gray-300 mb-2">Overall Score</h2>
                <div className="text-4xl font-bold text-blue-400">
                  {overallScore}/4
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
