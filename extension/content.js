/**
 * Scripra Google Meet Content Script
 * 100% Bot-Free Conversation Intelligence & Caption Harvester
 */

(function () {
  console.log("[Scripra] Google Meet Extension content script loaded.");

  // Check if we are inside a call room (e.g., meet.google.com/abc-defg-hij)
  const isMeetingRoom = () => {
    const path = window.location.pathname.replace(/^\//, "");
    return /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(path);
  };

  if (!isMeetingRoom()) {
    console.log("[Scripra] Not in a meeting room yet, waiting for navigation...");
    return;
  }

  const meetingId = window.location.pathname.replace(/^\//, "");
  let capturedSegments = [];
  let isRecording = true;
  let startTime = Date.now();
  const seenUtterances = new Set();

  async function getAppBaseUrl() {
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
        const stored = await chrome.storage.sync.get(["scripraAppUrl"]);
        if (stored && stored.scripraAppUrl) {
          return stored.scripraAppUrl.replace(/\/$/, "");
        }
      }
    } catch (e) {}
    return "http://localhost:3000";
  }

  // Helper to toggle Google Meet native Closed Captions (CC)
  function toggleGoogleMeetCC() {
    const ccBtn = document.querySelector(
      'button[aria-label*="caption" i], button[data-tooltip*="caption" i], button[jsname="r8qRAd"], button[jscontroller="s370zc"]'
    );
    if (ccBtn) {
      ccBtn.click();
      showToast("Toggled Closed Captions in Google Meet! Speak into your mic.");
      return;
    }

    // Keyboard shortcut 'c' toggles CC in Google Meet
    const eventDown = new KeyboardEvent("keydown", {
      key: "c",
      code: "KeyC",
      keyCode: 67,
      which: 67,
      bubbles: true,
      cancelable: true,
    });
    document.body.dispatchEvent(eventDown);

    showToast("Sent 'c' shortcut to toggle Google Meet Captions.");
  }

  // Helper to add an explicitly marked test dialogue turn for solo verification
  function addTestTurn() {
    const demoPhrases = [
      { speaker: "You (Host)", text: "[Test] Reviewing product milestones and verifying audio pipeline." },
      { speaker: "Sarah (Engineering)", text: "[Test] Captions harvested without bot dependencies." },
      { speaker: "Michael (Product)", text: "[Test] Approved rollout schedule for production." },
    ];

    const pick = demoPhrases[capturedSegments.length % demoPhrases.length];
    const segment = {
      id: "test-seg-" + Date.now(),
      speaker: pick.speaker,
      text: pick.text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      elapsedMs: Date.now() - startTime,
    };

    capturedSegments.push(segment);

    const counterEl = document.getElementById("scripra-pill-count");
    if (counterEl) {
      counterEl.innerText = `${capturedSegments.length} dialogue turn${capturedSegments.length === 1 ? "" : "s"}`;
    }

    showToast(`Test turn added: "${pick.speaker}: ${pick.text.slice(0, 30)}..."`);
  }

  // Create & Inject Floating Scripra In-Meeting Pill
  function injectScripraOverlay() {
    if (document.getElementById("scripra-meet-pill")) return;

    const pill = document.createElement("div");
    pill.id = "scripra-meet-pill";
    pill.innerHTML = `
      <div class="scripra-brand">
        <span class="scripra-brand-dot"></span>
        <span>Scripra</span>
      </div>
      <div class="scripra-divider"></div>
      <div class="scripra-status">
        <span class="scripra-badge-botfree">Bot-Free</span>
        <span id="scripra-pill-count" class="scripra-counter">0 dialogue turns</span>
      </div>
      <div class="scripra-actions">
        <button id="scripra-cc-btn" class="scripra-btn-ghost" title="Turn on Google Meet live captions [Press 'c']">
          <span>[CC] Captions</span>
        </button>
        <button id="scripra-test-btn" class="scripra-btn-ghost" title="Simulate a speech turn to test without waiting">
          <span>+ Test Turn</span>
        </button>
        <button id="scripra-save-btn" class="scripra-btn-primary">
          <span>Save MoM</span>
          <span>↗</span>
        </button>
      </div>
    `;

    document.body.appendChild(pill);

    // Event listeners
    document.getElementById("scripra-cc-btn")?.addEventListener("click", toggleGoogleMeetCC);
    document.getElementById("scripra-test-btn")?.addEventListener("click", addTestTurn);
    document.getElementById("scripra-save-btn")?.addEventListener("click", saveAndGenerateMoM);
  }

  function showToast(msg) {
    let toast = document.getElementById("scripra-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "scripra-toast";
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add("scripra-toast-show");
    setTimeout(() => {
      toast.classList.remove("scripra-toast-show");
    }, 3500);
  }

  // Observe Google Meet Native Captions without observing Scripra overlay
  function initCaptionObserver() {
    const observer = new MutationObserver((mutations) => {
      if (!isRecording) return;

      // Ensure mutation is NOT originating from our own overlay
      for (const mutation of mutations) {
        if (
          mutation.target &&
          typeof mutation.target.closest === "function" &&
          mutation.target.closest("#scripra-meet-pill")
        ) {
          return;
        }
      }

      // Google Meet caption selector containers
      const captionNodes = document.querySelectorAll(
        '[jsname="YSxPfc"], .VbkSUe, [aria-live="polite"] span, .nM7E5, .a4cQT, div[jsname="r4nke"], div[jsname="dsLRXb"]'
      );

      captionNodes.forEach((node) => {
        const text = node.innerText ? node.innerText.trim() : "";
        if (!text || text.length < 3) return;

        // Try to identify speaker container
        const parentContainer = node.closest('[jsname="tgaKEf"]') || node.parentElement;
        let speakerName = "Speaker";

        if (parentContainer) {
          const speakerEl = parentContainer.querySelector('.NWpI1b, [data-sender-name], .bh44bd, [jsname="bN97Pc"]');
          if (speakerEl && speakerEl.innerText) {
            speakerName = speakerEl.innerText.trim();
          }
        }

        const utteranceKey = `${speakerName}:::${text}`;
        if (seenUtterances.has(utteranceKey)) return;
        seenUtterances.add(utteranceKey);

        const segment = {
          id: "seg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
          speaker: speakerName,
          text: text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          elapsedMs: Date.now() - startTime,
        };

        capturedSegments.push(segment);

        // Update counter in overlay
        const counterEl = document.getElementById("scripra-pill-count");
        if (counterEl) {
          counterEl.innerText = `${capturedSegments.length} dialogue turn${capturedSegments.length === 1 ? "" : "s"}`;
        }

        // Persist active meeting metadata in extension storage
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({
            activeMeeting: {
              id: meetingId,
              title: document.title || `Google Meet · ${meetingId}`,
              count: capturedSegments.length,
              updatedAt: Date.now(),
            },
          });
        }
      });
    });

    // Observe body subtree for caption additions
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    console.log("[Scripra] Caption mutation observer initialized with self-update exclusion.");
  }

  // Save and send meeting payload to Scripra Ingest API
  async function saveAndGenerateMoM() {
    const saveBtn = document.getElementById("scripra-save-btn");

    if (capturedSegments.length === 0) {
      showToast("⚠️ No captions recorded yet. Turn on Meet CC ('c') or click '+ Test Turn' first.");
      return;
    }

    if (saveBtn) {
      saveBtn.innerText = "Processing...";
      saveBtn.disabled = true;
    }

    const baseUrl = await getAppBaseUrl();
    const meetingTitle = document.title ? document.title.replace(" - Google Meet", "").trim() : `Google Meet · ${meetingId}`;
    const durationMinutes = Math.max(1, Math.round((Date.now() - startTime) / 60000));

    const payload = {
      meetingId: meetingId,
      title: meetingTitle,
      platform: "Google Meet",
      durationMinutes: durationMinutes,
      segments: capturedSegments,
    };

    try {
      showToast("Saving captured meeting to Scripra...");

      const response = await fetch(`${baseUrl}/api/meetings/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.conversationId) {
        showToast("✓ Meeting saved! Opening Scripra MoM...");
        window.open(`${baseUrl}/dashboard/conversations/${data.conversationId}`, "_blank");
      } else {
        showToast(`Save failed: ${data.error || "Server could not ingest meeting."}`);
      }
    } catch (err) {
      console.warn("[Scripra] Ingestion network error, saving segments to local extension storage:", err);
      // Retain full segments in extension local storage for zero data loss
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({
          [`offline_${meetingId}`]: {
            id: meetingId,
            title: meetingTitle,
            segments: capturedSegments,
            savedAt: Date.now(),
          },
        });
      }
      showToast(`⚠️ Server offline. Retained ${capturedSegments.length} segments in local storage.`);
    } finally {
      if (saveBtn) {
        saveBtn.innerHTML = `<span>Save MoM</span><span>↗</span>`;
        saveBtn.disabled = false;
      }
    }
  }

  // Periodic check to inject overlay once Google Meet DOM is ready
  const initInterval = setInterval(() => {
    if (document.body) {
      injectScripraOverlay();
      initCaptionObserver();
      clearInterval(initInterval);
    }
  }, 1000);
})();
