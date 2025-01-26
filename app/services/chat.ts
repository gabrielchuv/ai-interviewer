import { MessageCategory } from "../interview/page";

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

export async function sendMessage(userPrompt: string, context: ChatContext) {
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

  return response.text();
}
