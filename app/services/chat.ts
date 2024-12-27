interface ChatResponse {
  text: string;
  error?: string;
}

export async function sendMessage(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Network response was not ok');
    }

    const data: ChatResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.text;
  } catch (error) {
    // Could add retry logic here
    // Could add error logging here
    // Could add analytics here
    throw error;
  }
}
