import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userPrompt, context } = await request.json();
    const { question, customerIntent, previousInteractions } = context;

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const developerPrompt = `You are a technical interviewer conducting a coding interview. 
    ${`${customerIntent}`}
    Follow the following principles:
    - Never give away the solution to the question.

    The question you are asking the candidate is:\n\n${question}

    The candidate's previous interactions are
    ${previousInteractions ? `\n\n${previousInteractions}` : ''}
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'developer', content: developerPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-4o',
    });

    return new Response(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
