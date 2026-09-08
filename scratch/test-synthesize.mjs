import http from "http";

async function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, data: body });
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function getJson(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path,
        method: "GET",
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, data: body });
          }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function run() {
  console.log("=== Testing /api/speech/token ===");
  const tokenRes = await getJson("/api/speech/token");
  console.log("Speech Token Status:", tokenRes.status);
  console.log("Active Provider:", tokenRes.data?.activeProvider);
  console.log("Engine Name:", tokenRes.data?.engineName);
  console.log("WS Endpoint:", tokenRes.data?.wsEndpoint?.slice(0, 45) + "...");

  console.log("\n=== Testing /api/meetings/synthesize with Gemini ===");
  const synthRes = await postJson("/api/meetings/synthesize", {
    meetingTitle: "Enterprise Multi-Platform Release Sync",
    platform: "Cisco Webex",
    organizerName: "Antony",
    translationLang: "es",
    turns: [
      { speaker: "Antony", time: "00:05", text: "Welcome everyone to our Webex and Teams release sync." },
      { speaker: "Sarah", time: "00:20", text: "I have verified the Deepgram Nova-2 streaming bridge. We agreed to deploy it on Friday." },
      { speaker: "Michael", time: "00:45", text: "I will prepare the multi-channel audio testing scripts by Thursday 4 PM." },
      { speaker: "Antony", time: "01:10", text: "Excellent, consensus approved. Let's make sure the client fallback is enabled." }
    ]
  });

  console.log("Synthesize Status:", synthRes.status);
  console.log("Engine:", synthRes.data?.engine);
  console.log("Purpose:", synthRes.data?.data?.purpose);
  console.log("Consensus Score:", synthRes.data?.data?.consensusScore);
  console.log("Decisions:", synthRes.data?.data?.decisions);
  console.log("Action Items:", synthRes.data?.data?.actionItems);
}

run().catch(console.error);
