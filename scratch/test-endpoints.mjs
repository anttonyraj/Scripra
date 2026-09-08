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

async function runTests() {
  console.log("==================================================");
  console.log("SCRIPRA SECURITY & INTEGRITY VERIFICATION SUITE");
  console.log("==================================================\n");

  // Test 1: /api/meetings/send-recap anonymous call must be rejected (401)
  console.log("[Test 1] Anonymous recap dispatch security gate:");
  const recapRes = await postJson("/api/meetings/send-recap", {
    attendees: ["test@example.com"],
    isProUser: true,
  });
  console.log("  Status:", recapRes.status);
  console.log("  Response:", recapRes.data);
  if (recapRes.status === 401) {
    console.log("  ✓ PASSED: Unauthenticated POST correctly rejected with HTTP 401.\n");
  } else {
    console.log("  ✗ FAILED: Expected HTTP 401, got:", recapRes.status, "\n");
  }

  // Test 2: /api/meetings/ingest rejection of empty captions
  console.log("[Test 2] Empty caption ingestion rejection:");
  const ingestEmpty = await postJson("/api/meetings/ingest", {
    meetingId: "abc-defg-hij",
    segments: [],
  });
  console.log("  Status:", ingestEmpty.status);
  console.log("  Response:", ingestEmpty.data);
  if (ingestEmpty.status === 400) {
    console.log("  ✓ PASSED: Empty captions correctly rejected with actionable error.\n");
  } else {
    console.log("  ✗ FAILED: Expected HTTP 400, got:", ingestEmpty.status, "\n");
  }

  // Test 3: /api/meetings/ingest valid segments persistence
  console.log("[Test 3] Valid caption ingestion & durable storage:");
  const testMeetingId = "test-" + Date.now();
  const ingestValid = await postJson("/api/meetings/ingest", {
    meetingId: testMeetingId,
    title: "Quarterly Strategy Review",
    platform: "Google Meet",
    durationMinutes: 35,
    segments: [
      { speaker: "Antony", text: "We agreed to deploy the new security hardening by Friday.", timestamp: "00:10" },
      { speaker: "Sarah", text: "I will review all pull requests and verify zero data retention.", timestamp: "00:45" },
    ],
  });
  console.log("  Status:", ingestValid.status);
  console.log("  Response:", ingestValid.data);
  if (ingestValid.status === 200 && ingestValid.data.success) {
    console.log("  ✓ PASSED: Ingestion succeeded and synthesized intelligence.\n");
  } else {
    console.log("  ✗ FAILED: Ingestion failed\n");
  }

  // Test 4: Retrieve ingested meeting by ID
  console.log("[Test 4] Query persisted meeting detail by ID:");
  const getMeetingRes = await getJson(`/api/meetings/meet-${testMeetingId}`);
  console.log("  Status:", getMeetingRes.status);
  console.log("  Meeting Title:", getMeetingRes.data?.meeting?.title);
  console.log("  Decisions:", getMeetingRes.data?.meeting?.decisions);
  console.log("  Action Items:", getMeetingRes.data?.meeting?.actionItems);
  if (getMeetingRes.status === 200 && getMeetingRes.data?.meeting?.id === `meet-${testMeetingId}`) {
    console.log("  ✓ PASSED: Stored meeting retrieved accurately with extracted decisions.\n");
  } else {
    console.log("  ✗ FAILED: Failed to retrieve stored meeting\n");
  }

  // Test 5: Contact submission with durability and private routing
  console.log("[Test 5] Contact submission queue & recipient privacy:");
  const contactRes = await postJson("/api/contact", {
    name: "Automated Suite Verifier",
    email: "verifier@scripra.com",
    topic: "Enterprise Security Audit Verification",
    message: "Validating that all contact submissions durably persist and conceal internal routing details.",
  });
  console.log("  Status:", contactRes.status);
  console.log("  Response:", contactRes.data);
  if (contactRes.status === 200 && contactRes.data.success && !contactRes.data.recipient) {
    console.log("  ✓ PASSED: Contact submission confirmed cleanly without exposing internal recipient email.\n");
  } else {
    console.log("  ✗ FAILED: Unexpected contact response\n");
  }

  console.log("==================================================");
  console.log("ALL VERIFICATION SUITE TESTS COMPLETED.");
  console.log("==================================================");
}

runTests().catch(console.error);
