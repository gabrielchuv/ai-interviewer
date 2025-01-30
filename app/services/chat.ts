import { MessageCategory } from "../interview/page";

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ChatContext {
  questionTitle: string;
  questionDescription: string;
  conversation: { role: "user" | "ai"; text: string; }[];
}

export async function deduceCustomerIntent(message: string): Promise<MessageCategory> {
  const response = await fetch('/api/categorize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to categorize message');
  }

  const data = await response.json();
  return data.category;
}

export async function sendMessage(
  userPrompt: string, 
  context: ChatContext,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userPrompt, context }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  if (!onChunk) {
    return response.text();
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  if (!reader) {
    throw new Error('Failed to get response reader');
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullText += chunk;
      onChunk(chunk);
      
      // Add a delay between chunks (30ms per character to simulate ~200 words per minute)
      await delay(chunk.length * 30);
    }
  } finally {
    reader.releaseLock();
  }

  return fullText;
}
