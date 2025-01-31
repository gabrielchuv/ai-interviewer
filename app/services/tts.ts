// Singleton to manage speech synthesis state
class TTSService {
  private static instance: TTSService;
  private synthesis: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private accumulatedText: string = '';
  private isInitialized: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.initVoice();
    }
  }

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  private async initVoice() {
    if (this.isInitialized || !this.synthesis) return;

    // Wait for voices to be loaded
    if (this.synthesis.getVoices().length === 0) {
      await new Promise<void>((resolve) => {
        this.synthesis?.addEventListener('voiceschanged', () => resolve(), { once: true });
      });
    }

    // Select a natural-sounding English voice
    const voices = this.synthesis.getVoices();
    this.voice = voices.find(
      (voice) => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Natural') || voice.name.includes('Neural'))
    ) || voices.find(
      (voice) => voice.lang.startsWith('en')
    ) || voices[0];

    this.isInitialized = true;
  }

  public async speak(text: string, isChunk: boolean = false) {
    if (typeof window === 'undefined' || !this.synthesis) return;
    
    await this.initVoice();

    if (isChunk) {
      // Accumulate text until we have a complete sentence
      this.accumulatedText += text;
      
      // Check if we have a complete sentence (ends with .!?)
      if (/[.!?]\s*$/.test(this.accumulatedText)) {
        const utterance = new SpeechSynthesisUtterance(this.accumulatedText);
        utterance.voice = this.voice;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        this.synthesis.speak(utterance);
        this.accumulatedText = '';
      }
    } else {
      // For non-chunk text, speak immediately
      if (this.currentUtterance) {
        this.synthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voice;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      this.currentUtterance = utterance;
      this.synthesis.speak(utterance);
    }
  }

  public stop() {
    if (typeof window === 'undefined' || !this.synthesis) return;
    this.synthesis.cancel();
    this.accumulatedText = '';
    this.currentUtterance = null;
  }
}

export const tts = TTSService.getInstance(); 