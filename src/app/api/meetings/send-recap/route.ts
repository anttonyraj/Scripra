import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function escapeHtml(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeUrl(url: unknown): string {
  if (typeof url !== "string") return "#";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return escapeHtml(trimmed);
  }
  return "#";
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          delivered: false,
          error: "Authentication required. You must be signed in to dispatch meeting recaps.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      meetingTitle = "Meeting Recap",
      meetingUrl = "",
      attendees = [],
      executiveRecap = "",
      minutesOfMeeting = "",
      actionItems = [],
      scripraTranslation = null,
      preview = false,
    } = body;

    // 2. Validate attendees list with strict regex and size limits
    const validAttendees: string[] = Array.isArray(attendees)
      ? attendees
          .filter((email): email is string => typeof email === "string" && EMAIL_REGEX.test(email.trim()))
          .map((e) => e.trim().toLowerCase())
      : [];

    if (validAttendees.length === 0) {
      return NextResponse.json(
        {
          success: false,
          delivered: false,
          error: "Please provide at least one valid attendee email address.",
        },
        { status: 400 }
      );
    }

    if (validAttendees.length > 50) {
      return NextResponse.json(
        {
          success: false,
          delivered: false,
          error: "Recipient list exceeds the maximum policy limit of 50 attendees per meeting recap.",
        },
        { status: 400 }
      );
    }

    // 3. HTML-escape all user-controlled data to prevent markup/script injection
    const safeTitle = escapeHtml(meetingTitle.trim() || "Live Meeting Session");
    const safeUrl = sanitizeUrl(meetingUrl);
    const safeExecutiveRecap = escapeHtml(executiveRecap);
    const safeMinutesOfMeeting = escapeHtml(minutesOfMeeting);
    const safeAttendees = validAttendees.map(escapeHtml);

    const safeActionItems = Array.isArray(actionItems)
      ? actionItems.map((item: any) => ({
          task: escapeHtml(item?.task || ""),
          owner: escapeHtml(item?.owner || "Team"),
          deadline: escapeHtml(item?.deadline || "Upcoming"),
        }))
      : [];

    const safeTranslation = scripraTranslation
      ? {
          lang: escapeHtml(scripraTranslation.lang || "Translated"),
          text: escapeHtml(scripraTranslation.text || ""),
        }
      : null;

    // 4. Construct secured HTML email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Scripra AI Meeting Recap: ${safeTitle}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0e14; color: #e2e8f0; margin: 0; padding: 32px 16px;">
        <div style="max-width: 620px; margin: 0 auto; background: #131722; border: 1px solid #2a334a; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 32px 28px; border-bottom: 1px solid #2a334a;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <span style="font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #6366f1;">
                SCRIPRA<span style="color: #14b8a6;">.AI</span>
              </span>
              <span style="background: rgba(20, 184, 166, 0.15); color: #14b8a6; border: 1px solid rgba(20, 184, 166, 0.3); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase;">
                Executive MoM &amp; Recap
              </span>
            </div>
            <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 8px 0; line-height: 1.25;">
              ${safeTitle}
            </h1>
            ${
              safeUrl !== "#"
                ? `<p style="font-size: 13px; color: #94a3b8; margin: 0;">
                     Meeting Link: <a href="${safeUrl}" style="color: #818cf8; text-decoration: none;">${safeUrl}</a>
                   </p>`
                : ""
            }
          </div>

          <!-- Body Content -->
          <div style="padding: 28px;">

            <!-- Attendees Pill Box -->
            <div style="background: #181f30; border: 1px solid #253046; border-radius: 12px; padding: 14px 16px; margin-bottom: 24px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px;">
                Recipients &amp; Attendees (${safeAttendees.length})
              </div>
              <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                ${safeAttendees.join(", ")}
              </div>
            </div>

            <!-- Executive Purpose -->
            <div style="margin-bottom: 24px;">
              <h2 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #14b8a6; margin: 0 0 10px 0; display: flex; align-items: center;">
                📌 Executive Purpose &amp; Summary
              </h2>
              <p style="font-size: 14px; line-height: 1.6; color: #e2e8f0; background: #161c2c; border-left: 3px solid #14b8a6; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 0;">
                ${safeExecutiveRecap || "Executive meeting session concluded with key discussions and alignment recorded."}
              </p>
            </div>

            <!-- Action Items Table -->
            <div style="margin-bottom: 28px;">
              <h2 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #f59e0b; margin: 0 0 12px 0;">
                ⚡ Action Items &amp; Next Steps
              </h2>
              <table style="width: 100%; border-collapse: collapse; background: #161c2c; border: 1px solid #253046; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background: #1e2638; text-align: left; font-size: 11px; text-transform: uppercase; color: #94a3b8;">
                    <th style="padding: 10px 14px;">Task</th>
                    <th style="padding: 10px 14px;">Owner</th>
                    <th style="padding: 10px 14px;">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    safeActionItems.length > 0
                      ? safeActionItems
                          .map(
                            (item) => `
                        <tr style="border-top: 1px solid #253046; font-size: 13px; color: #cbd5e1;">
                          <td style="padding: 12px 14px; font-weight: 500;">${item.task}</td>
                          <td style="padding: 12px 14px; color: #818cf8; font-weight: 600;">${item.owner}</td>
                          <td style="padding: 12px 14px; color: #94a3b8; font-size: 12px;">${item.deadline}</td>
                        </tr>
                      `
                          )
                          .join("")
                      : `
                        <tr style="border-top: 1px solid #253046; font-size: 13px; color: #94a3b8;">
                          <td colspan="3" style="padding: 14px; text-align: center; font-style: italic;">No specific action items generated for this session.</td>
                        </tr>
                      `
                  }
                </tbody>
              </table>
            </div>

            <!-- Minutes of Meeting (MoM) -->
            <div style="margin-bottom: 28px;">
              <h2 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #818cf8; margin: 0 0 10px 0;">
                📝 Formal Minutes of Meeting (MoM)
              </h2>
              <div style="font-size: 13.5px; line-height: 1.65; color: #cbd5e1; background: #161c2c; border: 1px solid #253046; border-radius: 10px; padding: 16px; white-space: pre-wrap;">
                ${safeMinutesOfMeeting || "No formal minutes generated for this session."}
              </div>
            </div>

            ${
              safeTranslation
                ? `
            <!-- Scripra Multilingual AI Subtitles -->
            <div style="margin-bottom: 24px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 10px; padding: 14px 16px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 12px; font-weight: 700; color: #a5b4fc;">
                  🌐 Scripra Multilingual AI (${safeTranslation.lang})
                </span>
              </div>
              <p style="font-size: 13px; font-style: italic; color: #c7d2fe; margin: 0; line-height: 1.5;">
                "${safeTranslation.text}"
              </p>
            </div>
            `
                : ""
            }

            <!-- Footer / Dispatched Policy -->
            <div style="border-top: 1px solid #253046; padding-top: 20px; font-size: 11.5px; color: #64748b; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 6px 0;">
                ⚡ Dispatched via <strong>Scripra Conversation Intelligence Core</strong>.
              </p>
              <p style="margin: 0;">
                Zero Storage Policy: Transcripts are processed ephemerally and purged immediately post-dispatch.
              </p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Explicit preview mode (does not attempt external email delivery)
    if (preview) {
      return NextResponse.json({
        success: true,
        delivered: false,
        preview: true,
        messageId: `preview_${Date.now()}`,
        recipients: validAttendees,
        sentAt: new Date().toISOString(),
        emailHtmlPreview: emailHtml,
        notice: "Draft preview rendered successfully. No email dispatched.",
      });
    }

    // 6. External Resend API verification and dispatch
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey || !resendApiKey.startsWith("re_") || resendApiKey.includes("123456789")) {
      return NextResponse.json(
        {
          success: false,
          delivered: false,
          error: "Email delivery service unconfigured: Missing or invalid RESEND_API_KEY on the server.",
          emailHtmlPreview: emailHtml,
        },
        { status: 503 }
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Scripra AI <onboarding@resend.dev>",
        to: validAttendees,
        subject: `Scripra AI: Meeting Recap & MoM - ${safeTitle}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("[Resend API Error]", resendData);
      return NextResponse.json(
        {
          success: false,
          delivered: false,
          error: resendData.message || "The email provider rejected message delivery.",
          details: resendData,
          emailHtmlPreview: emailHtml,
        },
        { status: resendResponse.status >= 400 && resendResponse.status < 500 ? 400 : 502 }
      );
    }

    return NextResponse.json({
      success: true,
      delivered: true,
      messageId: resendData.id,
      recipients: validAttendees,
      sentAt: new Date().toISOString(),
      emailHtmlPreview: emailHtml,
    });
  } catch (error: any) {
    console.error("[Scripra Send Recap API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        delivered: false,
        error: error?.message || "Failed to process email dispatch request.",
      },
      { status: 500 }
    );
  }
}
