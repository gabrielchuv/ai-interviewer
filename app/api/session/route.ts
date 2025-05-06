import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { questionTitle, questionDescription } = await request.json();
    
    if (!questionTitle || !questionDescription) {
      return NextResponse.json({ error: 'Question details are required' }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "verse",
        modalities: ["text", "audio"],
        input_audio_transcription: {
            model: "whisper-1"
        },
        instructions: `Pretend you are a technical interviewer asking the ${questionTitle} question: ${questionDescription}
        - Expect clarification questions from me before allowing me to code the solution. Your answers to these should be VERY concise. 
        - Expect an approach from me before allowing me to code the solution. If it is incorrect, guide me by asking targeted open-ended questions to help me identify the issue. 
        For instance: "How does your approach handle [a particular edge case]?". If the approach is correct say: "You can start coding now." in your answer.
        - After coding the solution, you should terminate the interview if it is correct without further feedback. If not correct guide me by asking targeted open ended questions to help me identify the issue. 
        For instance: "How does your approach handle [a particular edge case]?" or "Can you walk me through what happens in this step?

        Some things you should never do:
        - Never provide the name of the question.
        - Do not outline the bugs in my solution explicitly. Just ask questions and guide me to the solution.
        - Do not focus on trivialities like perfect syntax, naming of standard library methods, semicolons etc.
        - Do not provide hints or solutions. Always ask questions and guide me to the solution.
        - Do not analyse the time complexity of the solution for me. If it can be improved, guide me to the solution.
        - Do not mention whether my approach is brute force or not. Just ask questions and guide me to the solution.`,
        turn_detection: {
            type: "semantic_vad",
            eagerness: "low"
          }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create ephemeral session' }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating ephemeral session:', error);
    return NextResponse.json(
      { error: 'Failed to create ephemeral session' }, 
      { status: 500 }
    );
  }
} 