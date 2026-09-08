import { NextRequest, NextResponse } from "next/server";

// Handle OPTIONS preflight for Chrome Extension CORS
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
    const { meetingId, title, platform, durationMinutes, segments } = body;

    console.log("[Scripra Ingest API] Received meeting:", {
      meetingId,
      title,
      platform: platform || "Google Meet",
      segmentsCount: segments?.length || 0,
    });

    const conversationId = meetingId ? `meet-${meetingId}` : `meet-${Date.now()}`;

    // Here we can store in database or memory store
    // For now, return formatted conversation payload with success: true
    return NextResponse.json(
      {
        success: true,
        conversationId: conversationId,
        message: "Google Meet session successfully ingested by Scripra.",
        stats: {
          segmentsCount: segments?.length || 0,
          durationMinutes: durationMinutes || 1,
          platform: platform || "Google Meet",
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
  } catch (error) {
    console.error("[Scripra Ingest API] Error processing meeting:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process meeting payload" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
