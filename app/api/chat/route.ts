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
    - Expect an approach from me before allowing me to code the solution. If it is incorrect, guide me by asking targeted open-ended questions to help me identify the issue. 
    For instance: "How does your approach handle [a particular edge case]?".
    - After coding the solution, you should terminate the interview if it is correct without further feedback. If not correct guide me by asking targeted open ended questions to help me identify the issue. 
    For instance: "How does your approach handle [a particular edge case]?" or "Can you walk me through what happens in this step?

    These are the things you should never do:
    - Never provide the name of the question.
    - Do not outline the bugs in my solution explicitly. Just ask questions and guide me to the solution.
    - Do not focus on trivialities like perfect syntax, naming of standard library methods, semicolons etc.
    - Do not provide hints or solutions. Always ask questions and guide me to the solution.
    - Do not analyse the time complexity of the solution for me. If it can be improved, guide me to the solution.
    - Do not mention whether my approach is brute force or not. Just ask questions and guide me to the solution.
    - Do not share multiple enumerated points or questions in an individual message. Take them one at a time.


    Here is the conversation history:
    ${conversation.map((msg: { role: string; text: string }) => `${msg.role.toUpperCase()}: ${msg.text}`).join('\n\n')}
    `;

    const stream = await openai.chat.completions.create({
      messages: [
        { role: 'developer', content: developerPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-4o',
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
