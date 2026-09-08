import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return handleToken(req);
}

export async function POST(req: NextRequest) {
  return handleToken(req);
}

async function handleToken(req: NextRequest) {
  try {
    const deepgramKey = process.env.DEEPGRAM_API_KEY;
    const sonioxKey = process.env.SONIOX_API_KEY;
    const defaultProvider = process.env.ASR_PROVIDER || "deepgram";

    // Tier 1: Deepgram Nova-2 with automatic diarization
    if (deepgramKey && deepgramKey.trim().length > 10) {
      return NextResponse.json({
        success: true,
        activeProvider: "deepgram",
        tier: 1,
        engineName: "Scripra Neural Acoustic Core",
        token: deepgramKey.trim(),
        wsEndpoint: "wss://api.deepgram.com/v1/listen?model=nova-2&diarize=true&smart_format=true&interim_results=true&punctuate=true&utterance_end_ms=1000",
        fallback: sonioxKey ? "soniox" : "google",
      });
    }

    // Tier 2: Soniox ASR
    if (sonioxKey && sonioxKey.trim().length > 10) {
      return NextResponse.json({
        success: true,
        activeProvider: "soniox",
        tier: 2,
        engineName: "Scripra Acoustic Multilingual",
        token: sonioxKey.trim(),
        fallback: "google",
      });
    }

    // Tier 3: Native Web Speech API
    return NextResponse.json({
      success: true,
      activeProvider: "google",
      tier: 3,
      engineName: "Scripra Client Acoustic Bridge",
      token: null,
      fallback: null,
    });
  } catch (error: any) {
    console.error("[Speech Token API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to dispatch speech engine credentials" },
      { status: 500 }
    );
  }
}
