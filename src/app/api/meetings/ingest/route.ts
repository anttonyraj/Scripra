import { NextRequest, NextResponse } from "next/server";
import { saveMeeting, StoredMeeting, StoredSegment } from "@/lib/meetingsStore";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meetingId, title, platform, durationMinutes, segments = [] } = body;

    if (!segments || !Array.isArray(segments) || segments.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Ingestion rejected: No transcript segments captured. Turn on Google Meet Closed Captions ('c') before saving.",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const conversationId = meetingId ? `meet-${meetingId}` : `meet-${Date.now()}`;

    // Normalize segments
    const normalizedSegments: StoredSegment[] = segments.map((s: any, idx: number) => ({
      id: s.id || `seg-${idx + 1}`,
      speaker: (s.speaker || "Speaker").trim(),
      text: (s.text || "").trim(),
      time: s.timestamp || s.time || "00:00",
      confidence: s.confidence || 0.95,
    }));

    // Evidence-based extraction of decisions and actions
    const fullText = normalizedSegments.map((s) => s.text).join(" ");
    const decisions: string[] = [];
    const actionItems: Array<{ task: string; owner: string; deadline: string }> = [];

    normalizedSegments.forEach((seg) => {
      if (/\b(decid(e|ed)|agreed|approved|consensus|concluded|ratified)\b/i.test(seg.text)) {
        decisions.push(seg.text);
      }
      if (/\b(will|should|need to|action|todo|task|send|review|prepare|ship)\b/i.test(seg.text)) {
        actionItems.push({
          task: seg.text,
          owner: seg.speaker || "Team",
          deadline: "Upcoming",
        });
      }
    });

    const stored: StoredMeeting = {
      id: conversationId,
      title: title?.trim() || `Google Meet · ${meetingId || "Session"}`,
      platform: platform || "Google Meet",
      durationMinutes: durationMinutes || 1,
      createdAt: new Date().toISOString(),
      segments: normalizedSegments,
      decisions: decisions.slice(0, 5),
      actionItems: actionItems.slice(0, 5),
      summary: normalizedSegments[0]?.text
        ? `Meeting commenced with discussion on: "${normalizedSegments[0].text.slice(0, 160)}..."`
        : "Google Meet session captured.",
    };

    saveMeeting(stored);

    return NextResponse.json(
      {
        success: true,
        conversationId: conversationId,
        message: "Google Meet session successfully ingested and stored by Scripra.",
        stats: {
          segmentsCount: normalizedSegments.length,
          durationMinutes: durationMinutes || 1,
          platform: platform || "Google Meet",
          decisionsCount: decisions.length,
          actionsCount: actionItems.length,
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error: any) {
    console.error("[Scripra Ingest API] Error processing meeting:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process meeting payload" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
