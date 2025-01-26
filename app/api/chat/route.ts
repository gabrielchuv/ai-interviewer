import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userPrompt, context } = await request.json();
    const { questionTitle, questionDescription, conversation } = context;

    if (!questionTitle || !questionDescription) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const developerPrompt = `Pretend you are a technical interviewer asking the ${questionTitle} question: ${questionDescription}
    - Expect clarification questions from me before allowing me to code the solution. Your answers to these should be very concise. 
    - Expect an approach from me before allowing me to code the solution. If it is incorrect feel free to guide me by asking targeted open-ended questions to help me identify the issue. 
    For instance: "How does your approach handle [a particular edge case]?”. Do not provide hints and do not focus on trivialities or small mistakes.
    - After coding the solution, you should terminate the interview if it is correct without further feedback. Do not focus on trivialities like perfect syntax, 
    naming of standard library methods, semicolons etc. If not correct guide me by asking targeted open ended questions to help me identify the issue. 
    For instance: "How does your approach handle [a particular edge case]?” or "Can you walk me through what happens in this step? 

    Here is the conversation history:
    ${conversation.map((msg: { role: string; text: string }) => `${msg.role.toUpperCase()}: ${msg.text}`).join('\n\n')}
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
