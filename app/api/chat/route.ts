import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const developerContext = `You are a technical interviewer conducting a coding interview. You should evaluate their approach and provide guidance when needed. The question you are asking the candidate is:\n\n${question}`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'developer', content: developerContext },
        { role: 'user', content: message }
      ],
      model: 'gpt-4o',
    });

    return new Response(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
