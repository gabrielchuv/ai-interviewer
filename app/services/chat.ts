import { MessageCategory } from "../interview/page";
import { tts } from "./tts";

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

// Helper function to stream text character by character
async function streamText(text: string, onChunk: (chunk: string) => void) {
  for (let i = 0; i < text.length; i++) {
    onChunk(text[i]);
    await delay(50); // 30ms delay per character
  }
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
  let bufferedText = '';

  if (!reader) {
    throw new Error('Failed to get response reader');
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullText += chunk;
      bufferedText += chunk;
      
      // Check if we have a complete sentence
      if (/[.!?]\s*$/.test(bufferedText)) {
        // Start speaking the sentence
        await tts.speak(bufferedText, true);
        // Stream the text character by character
        await streamText(bufferedText, onChunk);
        bufferedText = '';
      }
    }
    
    // Handle any remaining buffered text
    if (bufferedText) {
      await tts.speak(bufferedText, true);
      await streamText(bufferedText, onChunk);
    }
  } finally {
    reader.releaseLock();
  }

  return fullText;
}
