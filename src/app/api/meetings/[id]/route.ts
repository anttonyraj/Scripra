import { NextRequest, NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetingsStore";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const meeting = getMeetingById(id);

    if (!meeting) {
      return NextResponse.json(
        { success: false, error: `Meeting session #${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, meeting });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to retrieve meeting." },
      { status: 500 }
    );
  }
}
