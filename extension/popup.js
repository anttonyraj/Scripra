document.addEventListener("DOMContentLoaded", async () => {
  const openDashboardBtn = document.getElementById("open-dashboard-btn");
  const openConversationsBtn = document.getElementById("open-conversations-btn");
  const statusText = document.getElementById("meet-status-text");

  let appBaseUrl = "http://localhost:3000";
  if (chrome && chrome.storage && chrome.storage.sync) {
    try {
      const res = await chrome.storage.sync.get(["scripraAppUrl"]);
      if (res && res.scripraAppUrl) {
        appBaseUrl = res.scripraAppUrl.replace(/\/$/, "");
      }
    } catch (e) {}
  }

  // Check active meeting in storage
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(["activeMeeting"], (res) => {
      if (res.activeMeeting && Date.now() - res.activeMeeting.updatedAt < 3600000) {
        statusText.innerText = `Recording: ${res.activeMeeting.id}`;
      }
    });
  }

  if (openDashboardBtn) {
    openDashboardBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: `${appBaseUrl}/dashboard` });
    });
  }

  if (openConversationsBtn) {
    openConversationsBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: `${appBaseUrl}/dashboard/conversations` });
    });
  }
});
