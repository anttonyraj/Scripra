export const browserAudioCaptureScript = `
(() => {
  if (window.__simpleMeetingBotInstalled) return;
  window.__simpleMeetingBotInstalled = true;

  const OriginalPC = window.RTCPeerConnection;
  let ctx = null, mix = null, processor = null;
  const connectedTracks = new WeakSet();
  const connectedElements = new WeakSet();

  function signal(message) {
    try { if (window.botAudioEvent) window.botAudioEvent(String(message)); } catch (_) {}
  }

  function ensureGraph() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      return;
    }

    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { signal('AudioContext unavailable'); return; }

    ctx = new AC({ sampleRate: 48000 });
    mix = ctx.createGain();
    processor = ctx.createScriptProcessor(4096, 1, 1);
    const silent = ctx.createGain();
    silent.gain.value = 0;

    mix.connect(processor);
    processor.connect(silent);
    silent.connect(ctx.destination);

    processor.onaudioprocess = (ev) => {
      try {
        const input = ev.inputBuffer.getChannelData(0);
        const inRate = ev.inputBuffer.sampleRate || ctx.sampleRate || 48000;
        const targetRate = 16000;
        const ratio = inRate / targetRate;
        const outLen = Math.max(1, Math.floor(input.length / ratio));
        const bytes = new Uint8Array(outLen * 2);
        const view = new DataView(bytes.buffer);

        for (let i = 0; i < outLen; i++) {
          const start = Math.floor(i * ratio);
          const end = Math.min(input.length, Math.floor((i + 1) * ratio));
          let sum = 0, n = 0;
          for (let j = start; j < end; j++) { sum += input[j]; n++; }
          let s = n ? sum / n : 0;
          s = Math.max(-1, Math.min(1, s));
          view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }

        let binary = '';
        const chunk = 0x8000;
        for (let i = 0; i < bytes.length; i += chunk) {
          binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunk, bytes.length)));
        }
        if (window.pushMeetingPcm) window.pushMeetingPcm(btoa(binary));
      } catch (_) {}
    };

    ctx.resume().catch(() => {});
    signal('Audio graph initialized');
  }

  function attachTrack(track, source) {
    if (!track || track.kind !== 'audio' || connectedTracks.has(track)) return;

    connectedTracks.add(track);
    ensureGraph();
    if (!ctx || !mix) return;

    try {
      const stream = new MediaStream([track]);
      const node = ctx.createMediaStreamSource(stream);
      node.connect(mix);
      signal('Attached remote audio track from ' + source);
      track.addEventListener('ended', () => {
        try { node.disconnect(); } catch (_) {}
      });
      ctx.resume().catch(() => {});
    } catch (e) { signal('Track attach failed: ' + e); }
  }

  function watchPc(pc) {
    try {
      pc.addEventListener('track', ev => {
        if (ev.track) attachTrack(ev.track, 'RTCPeerConnection');
        if (ev.streams) {
          for (const s of ev.streams) for (const t of s.getAudioTracks()) attachTrack(t, 'RTC stream');
        }
      });
      for (const r of pc.getReceivers()) if (r.track) attachTrack(r.track, 'existing receiver');
    } catch (_) {}
  }

  if (OriginalPC) {
    const ProxyPC = new Proxy(OriginalPC, {
      construct(target, args, newTarget) {
        const pc = Reflect.construct(target, args, newTarget);
        watchPc(pc);
        return pc;
      }
    });
    ProxyPC.prototype = OriginalPC.prototype;
    try { Object.setPrototypeOf(ProxyPC, OriginalPC); } catch (_) {}
    window.RTCPeerConnection = ProxyPC;
    if (window.webkitRTCPeerConnection) window.webkitRTCPeerConnection = ProxyPC;
  }

  function inspectMedia(el) {
    if (!el) return;
    if (connectedElements.has(el)) return;
    const stream = el.srcObject;
    if (!(stream instanceof MediaStream)) return;
    const tracks = stream.getAudioTracks();
    if (!tracks.length) return;
    connectedElements.add(el);
    for (const t of tracks) attachTrack(t, el.tagName + '.srcObject');
  }

  try {
    const desc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'srcObject');
    if (desc && desc.set && desc.get) {
      Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
        configurable: desc.configurable,
        enumerable: desc.enumerable,
        get: desc.get,
        set(value) {
          desc.set.call(this, value);
          setTimeout(() => inspectMedia(this), 0);
        }
      });
    }
  } catch (_) {}

  const scan = () => {
    try {
      document.querySelectorAll('audio,video').forEach(inspectMedia);
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    } catch (_) {}
  };
  setInterval(scan, 1000);
  document.addEventListener('click', () => { ensureGraph(); scan(); }, true);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) scan(); });
})();
`;
