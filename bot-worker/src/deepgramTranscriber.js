import WebSocket from 'ws';

export class DeepgramTranscriber {
  constructor(apiKey, bus) {
    this.apiKey = apiKey;
    this.bus = bus;
    this.ws = null;
    this.isConnected = false;
    this.isDisposed = false;
    this.bufferQueue = [];
  }

  async start() {
    if (!this.apiKey) {
      throw new Error('Deepgram API Key is not configured.');
    }

    const endpoint = 'wss://api.deepgram.com/v1/listen?model=nova-2&diarize=true&smart_format=true&interim_results=true&punctuate=true&encoding=linear16&sample_rate=16000&channels=1';

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(endpoint, {
          headers: {
            Authorization: `Token ${this.apiKey.trim()}`
          }
        });

        this.ws.on('open', () => {
          this.isConnected = true;
          this.bus.publish('[Bot Engine] Scripra Neural Core (Deepgram Nova-2) connected.');
          
          // Flush any queued audio buffers
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
            if (resp.type === 'Results') {
              const alt = resp.channel?.alternatives?.[0];
              const transcript = alt?.transcript?.trim();
              if (transcript && resp.is_final) {
                // Extract dominant speaker from words
                let speakerNum = 0;
                if (alt.words && alt.words.length > 0) {
                  const speakers = alt.words.map(w => w.speaker).filter(s => s !== undefined);
                  if (speakers.length > 0) {
                    speakerNum = speakers[0];
                  }
                }
                const speakerName = speakerNum === 0 ? 'Speaker 1 (Organizer)' : `Speaker ${speakerNum + 1}`;
                this.bus.publish(`[${speakerName}] ${transcript}`);
              }
            }
          } catch (_) {}
        });

        this.ws.on('error', (err) => {
          console.error('[Deepgram WebSocket Error]', err.message);
          this.bus.publish(`[Bot Error] Deepgram error: ${err.message}`);
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
          this.ws.send(JSON.stringify({ type: 'CloseStream' }));
        }
        this.ws.close();
      } catch (_) {}
      this.ws = null;
    }
  }
}
