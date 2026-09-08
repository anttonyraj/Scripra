import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function escapeHtml(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Persist submission to durable local JSON file
async function appendToDurableQueue(entry: Record<string, any>) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "inquiries.json");
    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        existing = JSON.parse(raw);
      } catch (e) {
        existing = [];
      }
    }
    existing.unshift(entry);
    fs.writeFileSync(filePath, JSON.stringify(existing.slice(0, 500), null, 2), "utf-8");
  } catch (err) {
    console.error("[Scripra Contact Queue Error] Failed to persist inquiry:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, topic = "General Inquiry", message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please write a message with at least 5 characters." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const messageId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "aiworkxllc@gmail.com";

    // Escape all user-controlled text to prevent HTML/link injection
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeTopic = escapeHtml(topic.trim());
    const safeMessage = escapeHtml(message.trim());

    // 1. Durably persist inquiry into local queue first
    await appendToDurableQueue({
      id: messageId,
      timestamp,
      name: safeName,
      email: safeEmail,
      topic: safeTopic,
      message: safeMessage,
      targetRecipient: recipientEmail,
      status: "queued",
    });

    // 2. Build sanitized executive HTML notification
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Inquiry from ${safeName}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0e14; color: #e2e8f0; margin: 0; padding: 32px 16px;">
        <div style="max-width: 600px; margin: 0 auto; background: #131722; border: 1px solid #2a334a; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 28px; border-bottom: 1px solid #2a334a;">
            <span style="font-size: 18px; font-weight: 900; color: #6366f1;">SCRIPRA<span style="color: #14b8a6;">.AI</span></span>
            <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 12px 0 4px 0;">New Inquiry: ${safeTopic}</h1>
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">Received at: ${new Date().toUTCString()}</p>
          </div>
          <div style="padding: 24px;">
            <div style="background: #181f30; border: 1px solid #253046; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; font-size: 13px;"><strong>Sender Name:</strong> ${safeName}</p>
              <p style="margin: 0 0 8px 0; font-size: 13px;"><strong>Sender Email:</strong> ${safeEmail}</p>
              <p style="margin: 0; font-size: 13px;"><strong>Inquiry Topic:</strong> <span style="background: #4353ff20; color: #818cf8; padding: 2px 8px; border-radius: 4px;">${safeTopic}</span></p>
            </div>
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #14b8a6; margin: 0 0 8px 0;">Message Content:</h2>
              <div style="background: #161c2c; border: 1px solid #253046; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${safeMessage}</div>
            </div>
            <div style="border-top: 1px solid #253046; padding-top: 16px; font-size: 11px; color: #64748b; text-align: center;">
              Dispatched automatically to ${recipientEmail} via Scripra Service · ID: ${messageId}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;

    // 3. Attempt live Resend dispatch if configured with real key
    if (resendApiKey && resendApiKey.startsWith("re_") && !resendApiKey.includes("123456789")) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "Scripra Contact <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: email.trim(),
            subject: `[Scripra Inquiry] ${safeTopic} - ${safeName}`,
            html: emailHtml,
          }),
        });

        const resendData = await resendResponse.json();

        if (resendResponse.ok) {
          return NextResponse.json({
            success: true,
            simulated: false,
            messageId: resendData.id || messageId,
            sentAt: timestamp,
            note: "Your inquiry has been received. Our leadership team will review and follow up within 2 hours.",
          });
        }

        console.warn("[Resend Notice on Contact]", resendData);
      } catch (err) {
        console.error("[Resend API Contact Error]", err);
      }
    }

    // Default response confirming durable queue receipt
    return NextResponse.json({
      success: true,
      simulated: !resendApiKey || resendApiKey.includes("123456789"),
      messageId,
      sentAt: timestamp,
      note: "Your inquiry has been received. Our leadership team will review and follow up within 2 hours.",
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to transmit message. Please try again or reach out to our team directly." },
      { status: 500 }
    );
  }
}
