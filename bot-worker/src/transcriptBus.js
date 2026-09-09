import { EventEmitter } from 'events';

export class TranscriptBus {
  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);
    this.finalTranscript = [];
  }

  publishFinal(text) {
    if (!text || !text.trim()) return;
    const clean = text.trim();
    this.finalTranscript.push(clean);
    this.emitter.emit('message', clean);
  }

  publishSystem(text) {
    if (!text || !text.trim()) return;
    this.emitter.emit('message', text.trim());
  }

  publish(text) {
    if (!text || !text.trim()) return;
    if (text.startsWith('[Bot') || text.startsWith('~ ')) {
      this.publishSystem(text);
    } else {
      this.publishFinal(text);
    }
  }

  clearTranscript() {
    this.finalTranscript = [];
  }

  getTranscript() {
    return this.finalTranscript.join('\n');
  }

  getTranscriptBytes() {
    return Buffer.from(this.getTranscript(), 'utf8');
  }

  subscribe(onMessage) {
    this.emitter.on('message', onMessage);
    return () => {
      this.emitter.off('message', onMessage);
    };
  }
}
