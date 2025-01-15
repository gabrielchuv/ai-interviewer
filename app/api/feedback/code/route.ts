import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const { code } = await request.json();

  // Get rating
  const ratingResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: "You are a technical interviewer. Evaluate the code quality of the candidate's solution on a scale of 1-5. Respond with only the number."
      },
      {
        role: "user",
        content: JSON.stringify(code)
      }
    ]
  });

  // Get feedback
  const feedbackResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: "You are a technical interviewer. Evaluate the code quality of the candidate's solution. Provide brief feedback."
      },
      {
        role: "user",
        content: JSON.stringify(code)
      }
    ]
  });

  const rating = parseInt(ratingResponse.choices[0].message.content || "3");
  const feedback = feedbackResponse.choices[0].message.content;

  return NextResponse.json({ rating, feedback });
} 