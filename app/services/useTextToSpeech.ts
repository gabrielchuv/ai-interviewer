import { tts } from "./tts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to stream text character by character
async function streamText(text: string, onChunk: (chunk: string) => void) {
  for (let i = 0; i < text.length; i++) {
    onChunk(text[i]);
    await delay(60); // 50ms delay per character
  }
  return text; // Return the complete text
}

export const useTextToSpeech = () => {
  const readAndStreamText = async (
    text: string,
    onChunk: (chunk: string) => void
  ) => {
    let fullText = "";
    try {
      // Split text into sentences
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

      for (const sentence of sentences) {
        // Start speaking the sentence
        await tts.speak(sentence.trim(), true);
        // Stream the text character by character
        const streamedText = await streamText(sentence, onChunk);
        fullText += streamedText;
      }
      return fullText;
    } catch (error) {
      console.error("Error in text-to-speech:", error);
      return text;
    }
  };
  const stop = async () => {
    tts?.stop();
  };

  return { readAndStreamText, stop };
};
