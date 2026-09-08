import WebSocket from 'ws';
globalThis.WebSocket = WebSocket;

import sdk from 'microsoft-cognitiveservices-speech-sdk';

const {
  SpeechConfig,
  AudioConfig,
  AudioInputStream,
  AudioStreamFormat,
  OutputFormat,
  PropertyId,
  ConversationTranscriber,
  ResultReason
} = sdk;

export class AzureSpeechTranscriber {
  constructor(config, bus) {
    this.bus = bus;
    this.config = config;

    const key = config.azureSpeech.key;
    const region = config.azureSpeech.region;
    const language = config.azureSpeech.language || 'en-IN';

    if (!key || key.toLowerCase().includes('put_azure')) {
      throw new Error('Azure Speech Key is not configured. Set AZURE_SPEECH_KEY in .env.');
    }
    if (!region) {
      throw new Error('Azure Speech Region is not configured. Set AZURE_SPEECH_REGION in .env.');
    }

    const speechConfig = SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = language;
    speechConfig.outputFormat = OutputFormat.Detailed;

    // Expose speaker diarization on intermediate results
    speechConfig.setProperty(PropertyId.SpeechServiceResponse_DiarizeIntermediateResults, 'true');

    // 16kHz, 16-bit, 1 channel mono PCM format matching browser audio capture
    const format = AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);
    this.pushStream = AudioInputStream.createPushStream(format);
    const audioConfig = AudioConfig.fromStreamInput(this.pushStream);

    this.transcriber = new ConversationTranscriber(speechConfig, audioConfig);

    this.speakerNumbers = new Map();
    this.intermediateSpeakers = new Map(); // offsetInTicks -> speakerId
    this.nextSpeakerNumber = 0;

    // 750ms in 100ns ticks = 750 * 10,000 = 7,500,000
    this.speakerOffsetToleranceTicks = 7500000;

    // Handle intermediate hypotheses: cache speaker id by recognition offset
    this.transcriber.transcribing = (s, e) => {
      const speakerId = this.normalizeSpeakerId(e.result.speakerId);
      if (!speakerId) return;

      const offset = Number(e.result.offset);
      this.intermediateSpeakers.set(offset, speakerId);
      this.cleanupOldSpeakerHints(offset);
    };

    // Handle finalized transcription
    this.transcriber.transcribed = (s, e) => {
      if (e.result.reason !== ResultReason.RecognizedSpeech || !e.result.text || !e.result.text.trim()) {
        return;
      }

      const finalOffset = Number(e.result.offset);
      let speakerId = this.normalizeSpeakerId(e.result.speakerId);

      if (!speakerId) {
        speakerId = this.takeMatchingIntermediateSpeaker(finalOffset);
      } else {
        this.removeNearbyIntermediateHints(finalOffset);
      }

      const speakerLabel = this.getSpeakerLabel(speakerId);
      const text = e.result.text.trim();

      this.bus.publishFinal(`${speakerLabel}: ${text}`);
    };

    this.transcriber.canceled = (s, e) => {
      // Don't surface transient idle disconnects before audio arrives
      const details = (e.errorDetails || '').toLowerCase();
      if (details.includes('1006') || details.includes('timeout') && this.pushStream) {
        return;
      }
      this.bus.publishSystem(`[Speech Notice: ${e.errorDetails || e.reason || 'Connection reset'}]`);
    };
  }

  normalizeSpeakerId(id) {
    if (!id || typeof id !== 'string') return null;
    const value = id.trim();
    if (value.toLowerCase() === 'unknown' || value.toLowerCase() === 'unidentified') {
      return null;
    }
    return value;
  }

  takeMatchingIntermediateSpeaker(finalOffset) {
    if (this.intermediateSpeakers.has(finalOffset)) {
      const exact = this.intermediateSpeakers.get(finalOffset);
      this.intermediateSpeakers.delete(finalOffset);
      this.removeNearbyIntermediateHints(finalOffset);
      return exact;
    }

    let bestOffset = null;
    let bestDistance = Number.MAX_SAFE_INTEGER;
    let bestSpeaker = null;

    for (const [offset, speaker] of this.intermediateSpeakers.entries()) {
      const distance = Math.abs(offset - finalOffset);
      if (distance <= this.speakerOffsetToleranceTicks && distance < bestDistance) {
        bestDistance = distance;
        bestOffset = offset;
        bestSpeaker = speaker;
      }
    }

    if (bestOffset !== null) {
      this.intermediateSpeakers.delete(bestOffset);
    }

    this.removeNearbyIntermediateHints(finalOffset);
    return bestSpeaker;
  }

  removeNearbyIntermediateHints(finalOffset) {
    for (const offset of this.intermediateSpeakers.keys()) {
      if (Math.abs(offset - finalOffset) <= this.speakerOffsetToleranceTicks) {
        this.intermediateSpeakers.delete(offset);
      }
    }
  }

  cleanupOldSpeakerHints(currentOffset) {
    // 8 seconds in 100ns ticks = 80,000,000
    const cutoff = currentOffset - 80000000;
    for (const offset of this.intermediateSpeakers.keys()) {
      if (offset < cutoff) {
        this.intermediateSpeakers.delete(offset);
      }
    }
  }

  getSpeakerLabel(azureSpeakerId) {
    if (!azureSpeakerId) return 'Speaker ?';
    const key = azureSpeakerId.toLowerCase();
    if (!this.speakerNumbers.has(key)) {
      this.nextSpeakerNumber++;
      this.speakerNumbers.set(key, this.nextSpeakerNumber);
    }
    return `Speaker ${this.speakerNumbers.get(key)}`;
  }

  async start() {
    return new Promise((resolve, reject) => {
      this.transcriber.startTranscribingAsync(
        () => resolve(),
        (err) => reject(new Error(err))
      );
    });
  }

  push(pcm16Buffer) {
    if (pcm16Buffer && pcm16Buffer.length > 0 && this.pushStream) {
      this.pushStream.write(pcm16Buffer);
    }
  }

  async dispose() {
    return new Promise((resolve) => {
      try {
        if (this.transcriber) {
          this.transcriber.stopTranscribingAsync(
            () => {
              this.cleanup();
              resolve();
            },
            () => {
              this.cleanup();
              resolve();
            }
          );
        } else {
          this.cleanup();
          resolve();
        }
      } catch (_) {
        this.cleanup();
        resolve();
      }
    });
  }

  cleanup() {
    try {
      if (this.pushStream) this.pushStream.close();
      if (this.transcriber) this.transcriber.close();
    } catch (_) {}
    this.intermediateSpeakers.clear();
    this.speakerNumbers.clear();
  }
}
