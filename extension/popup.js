document.addEventListener("DOMContentLoaded", () => {
  const openDashboardBtn = document.getElementById("open-dashboard-btn");
  const openConversationsBtn = document.getElementById("open-conversations-btn");
  const statusText = document.getElementById("meet-status-text");

  // Check active meeting in storage
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(["activeMeeting"], (res) => {
      if (res.activeMeeting && (Date.now() - res.activeMeeting.updatedAt < 3600000)) {
        statusText.innerText = `Recording: ${res.activeMeeting.id}`;
      }
    });
  }

  if (openDashboardBtn) {
    openDashboardBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "http://localhost:3000/dashboard" });
    });
  }

  if (openConversationsBtn) {
    openConversationsBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "http://localhost:3000/dashboard/conversations" });
    });
  }
});
