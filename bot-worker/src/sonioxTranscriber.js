import WebSocket from 'ws';

export class SonioxTranscriber {
  constructor(apiKey, bus) {
    this.apiKey = apiKey;
    this.bus = bus;
    this.ws = null;
    this.isConnected = false;
    this.isDisposed = false;
    this.bufferQueue = [];
  }

  async start() {
    if (!this.apiKey || this.apiKey.trim().length < 5) {
      throw new Error('Soniox API Key is not configured.');
    }

    const endpoint = 'wss://api.soniox.com/transcribe-websocket';

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(endpoint);

        this.ws.on('open', () => {
          this.isConnected = true;
          this.bus.publish('[Bot Engine] Soniox Real-Time Speech Core connected.');

          // Send Soniox initialization parameters
          const initPayload = {
            api_key: this.apiKey.trim(),
            app_name: 'Scripra',
            sample_rate_hertz: 16000,
            num_audio_channels: 1,
            include_nonfinal: false,
            enable_endpoint_detection: true,
            enable_speaker_identification: true
          };
          this.ws.send(JSON.stringify(initPayload));

          // Flush queued audio buffers
          while (this.bufferQueue.length > 0) {
            const buf = this.bufferQueue.shift();
            if (this.ws.readyState === WebSocket.OPEN) {
              this.ws.send(buf);
            }
          }
          resolve();
        });

        this.ws.on('message', (data) => {
          try {
            const resp = JSON.parse(data.toString());
            if (resp.error_code) {
              console.error('[Soniox Error]', resp.error_message);
              this.bus.publish(`[Bot Error] Soniox error: ${resp.error_message}`);
              return;
            }

            // Parse words and speaker tags
            const words = resp.words || resp.tokens || [];
            if (words.length > 0) {
              const text = words.map(w => w.text || w.word || '').join(' ').trim();
              if (text) {
                const speakerId = words[0]?.speaker || words[0]?.speaker_id || 0;
                const speakerLabel = speakerId === 0 ? 'Speaker 1 (Organizer)' : `Speaker ${speakerId + 1}`;
                this.bus.publish(`[${speakerLabel}] ${text}`);
              }
            }
          } catch (_) {}
        });

        this.ws.on('error', (err) => {
          console.error('[Soniox WebSocket Error]', err.message);
          this.bus.publish(`[Bot Error] Soniox connection error: ${err.message}`);
          if (!this.isConnected) {
            reject(err);
          }
        });

        this.ws.on('close', () => {
          this.isConnected = false;
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  push(pcmBuffer) {
    if (this.isDisposed) return;
    if (this.isConnected && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(pcmBuffer);
    } else {
      if (this.bufferQueue.length < 50) {
        this.bufferQueue.push(pcmBuffer);
      }
    }
  }

  async dispose() {
    this.isDisposed = true;
    this.isConnected = false;
    this.bufferQueue = [];
    if (this.ws) {
      try {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(''); // Empty message indicates EOS in Soniox protocol
        }
        this.ws.close();
      } catch (_) {}
      this.ws = null;
    }
  }
}
