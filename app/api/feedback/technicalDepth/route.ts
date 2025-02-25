import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const { conversation } = await request.json();

  // Get both rating and feedback in a single call
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: `You are a technical interviewer. Evaluate the candidate based on the following criteria:
- Uses optimal data structures and algorithms to solve the problem
- Identifies potential shortcomings and discusses tradeoffs with different data structures and algorithms
- Justifies why the selected data structures and algorithm were used
- Demonstrates solid grasp of runtime and space complexity tradeoffs even if not perfectly accurate in O(n) syntax
- Provides justification for decisions with regard to technical requirements; shows an understanding of why a solution addresses the requirement

Provide your evaluation in JSON format with the following structure:
{
  "rating": number, // A score from 1 to 4
  "feedback": string // Feedback in less than 150 words, composed of sentences in the format: assessment + evidence
}

The feedback should be composed of sentences in the following format: assessment + evidence. For example: "The candidate demonstrates a poor understanding of basic syntactic nuance. For instance, they struggled to write proper indentation."`
      },
      {
        role: "user",
        content: JSON.stringify(conversation)
      }
    ],
    response_format: { type: "json_object" }
  });

  try {
    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content || "{}");
    const rating = result.rating || 0;
    const feedback = result.feedback || "No feedback provided";

    return NextResponse.json({ rating, feedback });
  } catch (error) {
    console.error("Error parsing OpenAI response:", error);
    return NextResponse.json(
      { error: "Failed to parse evaluation response" },
      { status: 500 }
    );
  }
} 