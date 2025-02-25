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
        content: `You are a technical interviewer. Evaluate the candidate based on the following criteria:
- Creates simple code (e.g., leverages reuse, properly formatted, no improper coding constructs)
- Creates maintainable code (e.g., quickly able to trace impact of changes, clear variable naming conventions)
- Code is organized in a way that is easy to read and understand
- Code is syntactically correct, or would be syntactically correct with minor improvements

Provide a score from 1 to 4 and nothing else.`
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
        content: `You are a technical interviewer. Evaluate the candidate based on the following criteria:
- Creates simple code (e.g., leverages reuse, properly formatted, no improper coding constructs)
- Creates maintainable code (e.g., quickly able to trace impact of changes, clear variable naming conventions)
- Code is organized in a way that is easy to read and understand
- Code is syntactically correct, or would be syntactically correct with minor improvements

1. Provide feedback in less than 100 words.
2. The feedback should be composed of sentences in the following format: assessment + evidence. For example: The candidate demonstrates
a poor understanding of basic syntatctic nuance. For instance, they struggled to write proper indentation.`
      },
      {
        role: "user",
        content: JSON.stringify(code)
      }
    ]
  });

  const rating = parseInt(ratingResponse.choices[0].message.content || "X");
  const feedback = feedbackResponse.choices[0].message.content;

  return NextResponse.json({ rating, feedback });
} 