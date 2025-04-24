"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import CombinedProtection from "../../components/CombinedProtection";
import Header from "../../components/Header";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

interface FeedbackSection {
  rating: number;
  feedback: string;
}

interface FeedbackData {
  date: string;
  overallScore: number;
  clarification: FeedbackSection;
  approach: FeedbackSection;
  codeQuality: FeedbackSection;
  complexity: FeedbackSection;
}

export default function FeedbackDetailsPage() {
  const params = useParams();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      try {
        const feedbackDoc = await getDoc(doc(db, 'feedback', params.id as string));
        if (!feedbackDoc.exists()) {
          setError('Feedback not found');
          return;
        }
        setFeedback(feedbackDoc.data() as FeedbackData);
      } catch (error) {
        console.error('Error fetching feedback details:', error);
        setError('Failed to load feedback details');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackDetails();
  }, [params.id]);

  return (
    <CombinedProtection>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-center max-w-4xl mx-auto">
              {error}
            </div>
          ) : feedback && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Interview Feedback - {feedback.date}
              </h1>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <h2 className="text-xl font-medium text-gray-300 mb-2">Overall Score</h2>
                <div className="text-4xl font-bold text-blue-400">
                  {feedback.overallScore}/5
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                  <h2 className="text-xl font-medium text-gray-300 mb-2">Problem Clarification</h2>
                  <div className="text-3xl font-bold text-blue-400 mb-4">
                    {feedback.clarification.rating}/5
                  </div>
                  <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                    <ReactMarkdown>{feedback.clarification.feedback}</ReactMarkdown>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                  <h2 className="text-xl font-medium text-gray-300 mb-2">Approach & Planning</h2>
                  <div className="text-3xl font-bold text-blue-400 mb-4">
                    {feedback.approach.rating}/5
                  </div>
                  <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                    <ReactMarkdown>{feedback.approach.feedback}</ReactMarkdown>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                  <h2 className="text-xl font-medium text-gray-300 mb-2">Implementation & Code Quality</h2>
                  <div className="text-3xl font-bold text-blue-400 mb-4">
                    {feedback.codeQuality.rating}/5
                  </div>
                  <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                    <ReactMarkdown>{feedback.codeQuality.feedback}</ReactMarkdown>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
                  <h2 className="text-xl font-medium text-gray-300 mb-2">Complexity Analysis</h2>
                  <div className="text-3xl font-bold text-blue-400 mb-4">
                    {feedback.complexity.rating}/5
                  </div>
                  <div className="prose prose-invert max-w-none flex-1 overflow-auto">
                    <ReactMarkdown>{feedback.complexity.feedback}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CombinedProtection>
  );
} 