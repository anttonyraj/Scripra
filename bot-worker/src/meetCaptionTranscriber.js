export class MeetCaptionTranscriber {
  constructor(page, bus) {
    this.page = page;
    this.bus = bus;
    this.isActive = false;
    this.interval = null;
    this.lastCaptionAttempt = 0;
    this.seenEntries = new Map(); // id -> text
  }

  async start() {
    this.isActive = true;
    this.bus.publish('[Bot Engine] Google Meet Native Live Captions (Zero-Cost Fail-Safe) activated.');

    // Enable captions immediately
    await this.ensureCaptionsEnabled();

    // Poll caption DOM every 800ms
    this.interval = setInterval(async () => {
      if (!this.isActive || !this.page || this.page.isClosed()) return;
      try {
        await this.pollCaptions();
      } catch (_) {}
    }, 800);
  }

  async ensureCaptionsEnabled() {
    if (!this.page || this.page.isClosed()) return;
    try {
      if (Date.now() - this.lastCaptionAttempt > 5000) {
        this.lastCaptionAttempt = Date.now();
        const cc = this.page.getByRole('button', { name: /turn on (live )?captions/i }).first();
        if (await cc.isVisible().catch(() => false)) {
          await cc.click({ timeout: 1500 }).catch(() => {});
        }
      }
    } catch (_) {}
  }

  async pollCaptions() {
    if (!this.page || this.page.isClosed()) return;

    await this.ensureCaptionsEnabled();

    const captions = await this.page.evaluate(() => {
      window.__guestCaptionIds ||= new WeakMap();
      window.__guestCaptionSequence ||= 0;
      const results = [];
      for (const node of document.querySelectorAll("div[jsname='YSgAZb'], .iTTPOb, .yg7Twc")) {
        if (!node.getClientRects().length) continue;
        const text = (node.innerText || '').trim();
        if (!text) continue;
        const block = node.closest('.nM6dKd, .a4bIc, .T34D0b, .bh44bd') || node.parentElement;
        const speakerNode = block?.querySelector('.zs75Ib, .adEocd, .YTbIjf, img[alt]');
        const speaker = (speakerNode?.innerText || speakerNode?.getAttribute('alt') || '').trim() || 'Speaker';
        if (!window.__guestCaptionIds.has(node)) {
          window.__guestCaptionIds.set(node, ++window.__guestCaptionSequence);
        }
        results.push({ id: window.__guestCaptionIds.get(node), speaker, text });
      }
      return results;
    }).catch(() => []);

    for (const caption of captions) {
      const prevText = this.seenEntries.get(caption.id);
      if (prevText !== caption.text) {
        this.seenEntries.set(caption.id, caption.text);
        // If this is an updated or new finalized segment, publish
        if (!prevText || caption.text.length > prevText.length + 8) {
          this.bus.publish(`[${caption.speaker}] ${caption.text}`);
        }
      }
    }
  }

  push(_pcmBuffer) {
    // DOM caption reader does not need raw audio bytes
  }

  async dispose() {
    this.isActive = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
