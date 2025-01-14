import { Message } from '../interview/page';

export async function getFeedback(conversation: Message[], code: string) {
  const responses = await Promise.all([
    // Problem clarification
    fetch('/api/feedback/clarification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation })
    }),
    // Approach & planning
    fetch('/api/feedback/approach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation })
    }),
    // Code quality
    fetch('/api/feedback/code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    }),
    // Complexity analysis
    fetch('/api/feedback/complexity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation })
    })
  ]);

  const [clarification, approach, codeQuality, complexity] = await Promise.all(
    responses.map(r => r.json())
  );

  return {
    clarification,
    approach,
    codeQuality,
    complexity
  };
} 