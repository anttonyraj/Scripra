import speech from '@google-cloud/speech';
import fs from 'node:fs';

export class GoogleCloudSpeechTranscriber {
  constructor(config, bus) {
    this.config = config;
    this.bus = bus;
    this.client = null;
    this.recognizeStream = null;
    this.isConnected = false;
    this.isDisposed = false;
    this.bufferQueue = [];
    this.streamRotationTimer = null;
    this.streamStartTime = 0;
  }

  async start() {
    const credPath = this.config.googleSpeech?.credentialsPath || process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const clientOptions = {};

    if (credPath && fs.existsSync(credPath)) {
      clientOptions.keyFilename = credPath;
    } else if (process.env.GOOGLE_CLOUD_CREDENTIALS_JSON) {
      try {
        clientOptions.credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS_JSON);
      } catch (err) {
        throw new Error('Invalid GOOGLE_CLOUD_CREDENTIALS_JSON: ' + err.message);
      }
    } else if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error('Google Cloud Speech requires GOOGLE_APPLICATION_CREDENTIALS path or service account key.');
    }

    if (this.config.googleSpeech?.projectId) {
      clientOptions.projectId = this.config.googleSpeech.projectId;
    }

    try {
      this.client = new speech.SpeechClient(clientOptions);
      await this.initRecognizeStream();
      this.isConnected = true;
      this.bus.publish('[Bot Engine] Google Cloud Speech-to-Text Streaming API connected.');
    } catch (err) {
      console.error('[Google Cloud Speech Init Error]', err.message);
      throw err;
    }
  }

  async initRecognizeStream() {
    if (this.isDisposed || !this.client) return;

    if (this.recognizeStream) {
      try {
        this.recognizeStream.end();
        this.recognizeStream.removeAllListeners();
      } catch (_) {}
      this.recognizeStream = null;
    }

    const requestConfig = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: this.config.googleSpeech?.languageCode || 'en-US',
        enableSpeakerDiarization: true,
        diarizationConfig: {
          enableSpeakerDiarization: true,
          minSpeakerCount: 1,
          maxSpeakerCount: 8,
        },
        enableAutomaticPunctuation: true,
        model: this.config.googleSpeech?.model || 'latest_long',
        useEnhanced: true,
      },
      interimResults: false,
    };

    this.recognizeStream = this.client
      .streamingRecognize(requestConfig)
      .on('error', (err) => {
        // Handle 305-second streaming timeout or transient errors
        if (err.code === 11 || (err.message && err.message.includes('exceeded maximum allowed stream duration'))) {
          console.log('[Google Cloud Speech] 305s stream limit reached. Auto-rotating stream.');
          this.initRecognizeStream().catch(() => {});
          return;
        }
        console.error('[Google Cloud Speech Stream Error]', err.message);
        this.bus.publish(`[Bot Error] Google Cloud Speech error: ${err.message}`);
      })
      .on('data', (data) => {
        try {
          const result = data.results && data.results[0];
          if (result && result.alternatives && result.alternatives[0]) {
            const alt = result.alternatives[0];
            const text = (alt.transcript || '').trim();
            if (text) {
              let speakerNum = 0;
              if (alt.words && alt.words.length > 0) {
                const tagged = alt.words.find((w) => w.speakerTag);
                if (tagged && tagged.speakerTag) {
                  speakerNum = tagged.speakerTag;
                }
              }
              const speakerLabel = speakerNum === 0 ? 'Speaker 1 (Organizer)' : `Speaker ${speakerNum}`;
              this.bus.publish(`[${speakerLabel}] ${text}`);
            }
          }
        } catch (_) {}
      });

    this.streamStartTime = Date.now();

    // Rotate stream every 4 minutes and 30 seconds (before Google's 305s hard cutoff)
    clearTimeout(this.streamRotationTimer);
    this.streamRotationTimer = setTimeout(() => {
      if (this.isConnected && !this.isDisposed) {
        this.initRecognizeStream().catch(() => {});
      }
    }, 270000);
  }

  push(pcmBuffer) {
    if (this.isDisposed) return;
    if (this.recognizeStream && this.recognizeStream.writable) {
      try {
        this.recognizeStream.write(pcmBuffer);
      } catch (err) {
        if (this.bufferQueue.length < 50) {
          this.bufferQueue.push(pcmBuffer);
        }
      }
    } else {
      if (this.bufferQueue.length < 50) {
        this.bufferQueue.push(pcmBuffer);
      }
    }
  }

  async dispose() {
    this.isDisposed = true;
    this.isConnected = false;
    clearTimeout(this.streamRotationTimer);
    this.bufferQueue = [];
    if (this.recognizeStream) {
      try {
        this.recognizeStream.end();
        this.recognizeStream.removeAllListeners();
      } catch (_) {}
      this.recognizeStream = null;
    }
    if (this.client) {
      try {
        await this.client.close?.();
      } catch (_) {}
      this.client = null;
    }
  }
}
