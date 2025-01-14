import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const { conversation } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: "Based on the candidate's interactions, rate how well they analyzed the problem complexity on a scale of 1-5. Provide brief feedback explaining the rating."
      },
      {
        role: "user",
        content: JSON.stringify(conversation)
      }
    ]
  });

  const result = response.choices[0].message.content;
  // Parse the result to extract rating and feedback
  // You might want to structure the prompt to get a more structured response

  return NextResponse.json({ rating: 4, feedback: result });
} 