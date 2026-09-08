/**
 * Scripra Extension Background Service Worker (Manifest V3)
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Scripra Extension] Installed successfully.");
  chrome.storage.local.set({
    isInstalled: true,
    installedAt: Date.now(),
    autoRecordMeet: true,
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_STATUS") {
    chrome.storage.local.get(["activeMeeting", "autoRecordMeet"], (data) => {
      sendResponse({ status: "active", data });
    });
    return true; // Keep channel open for async
  }

  if (request.type === "OPEN_DASHBOARD") {
    chrome.storage.sync.get(["scripraAppUrl"], (res) => {
      const baseUrl = res?.scripraAppUrl ? res.scripraAppUrl.replace(/\/$/, "") : "http://localhost:3000";
      chrome.tabs.create({ url: `${baseUrl}/dashboard` });
      sendResponse({ success: true });
    });
    return true;
  }
});
