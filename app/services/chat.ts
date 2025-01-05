interface ChatResponse {
  text: string;
  error?: string;
}

export async function sendMessage(message: string, question: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, question }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.text();
}
