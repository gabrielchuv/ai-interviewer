import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const prompt = `Consider the user's prompt and categorize their intent. Respond with the most appropriate category:
- Clarification question
- Outlining approach
- Intent to start coding
- Intent to finish coding

User input:
${message}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const category = response.choices[0].message.content;
    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error in categorize route:', error);
    return NextResponse.json(
      { error: 'Failed to categorize message' },
      { status: 500 }
    );
  }
} 