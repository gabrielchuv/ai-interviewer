interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

// Singleton to manage speech recognition state
class STTService {
  private static instance: STTService;
  private recognition: any = null;
  private isListening: boolean = false;
  private onInterimResult: ((text: string) => void) | null = null;
  private accumulatedText: string = '';

  private constructor() {
    if (typeof window !== 'undefined') {
      // Initialize Web Speech API
      const SpeechRecognition = ((window as unknown) as IWindow).SpeechRecognition || ((window as unknown) as IWindow).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.setupRecognition();
      }
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          this.accumulatedText += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Send interim results for display
      if (this.onInterimResult) {
        this.onInterimResult(this.accumulatedText + interimTranscript);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition?.start();
      }
    };
  }

  public static getInstance(): STTService {
    if (!STTService.instance) {
      STTService.instance = new STTService();
    }
    return STTService.instance;
  }

  public startListening(onInterimResult: (text: string) => void): boolean {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return false;
    }

    if (this.isListening) return true;

    try {
      this.onInterimResult = onInterimResult;
      this.isListening = true;
      this.accumulatedText = '';
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      return false;
    }
  }

  public stopListening(): string {
    if (!this.recognition || !this.isListening) {
      return this.accumulatedText;
    }

    this.isListening = false;
    this.recognition.stop();
    this.onInterimResult = null;
    const finalText = this.accumulatedText.trim();
    this.accumulatedText = '';
    return finalText;
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }
}

export const stt = STTService.getInstance(); 