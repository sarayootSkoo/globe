// Web Speech API wrapper with feature detection
// Support: Chrome ✅, Edge ✅, Safari ✅ (partial), Firefox ❌

export interface VoiceEngineOptions {
  lang: 'th-TH' | 'en-US';
  continuous: boolean;
  interimResults: boolean;
}

export class VoiceEngine {
  private recognition: any; // SpeechRecognition (no TS types built-in)
  private _isListening = false;

  // Callbacks — assign before calling start()
  onResult: (transcript: string, isFinal: boolean) => void = () => undefined;
  onError: (error: string) => void = () => undefined;
  onEnd: () => void = () => undefined;

  static isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );
  }

  constructor(options?: Partial<VoiceEngineOptions>) {
    if (!VoiceEngine.isSupported()) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ??
      (window as any).webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = options?.lang ?? 'th-TH';
    this.recognition.continuous = options?.continuous ?? true;
    this.recognition.interimResults = options?.interimResults ?? true;

    this.recognition.onresult = (event: any) => {
      const results: any = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript: string = result[0].transcript;
        const isFinal: boolean = result.isFinal === true;
        this.onResult(transcript, isFinal);
      }
    };

    this.recognition.onerror = (event: any) => {
      this._isListening = false;
      this.onError(event.error ?? 'unknown error');
    };

    this.recognition.onend = () => {
      this._isListening = false;
      this.onEnd();
    };
  }

  setLang(lang: 'th-TH' | 'en-US'): void {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  start(): void {
    if (!this.recognition || this._isListening) return;
    this._isListening = true;
    this.recognition.start();
  }

  stop(): void {
    if (!this.recognition || !this._isListening) return;
    this._isListening = false;
    this.recognition.stop();
  }

  get isListening(): boolean {
    return this._isListening;
  }
}
