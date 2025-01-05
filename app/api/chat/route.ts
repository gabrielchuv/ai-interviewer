import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "developer", 
          content: `You are an AI technical interviewer. You will have a conversation with the candidate about a question.
          `
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o",
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ text: response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}
