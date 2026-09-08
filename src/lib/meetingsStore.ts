import fs from "fs";
import path from "path";

export interface StoredSegment {
  id?: string;
  speaker: string;
  text: string;
  time?: string;
  timestamp?: string;
  confidence?: number;
}

export interface StoredMeeting {
  id: string;
  title: string;
  platform: string;
  durationMinutes: number;
  createdAt: string;
  segments: StoredSegment[];
  decisions?: string[];
  actionItems?: Array<{ task: string; owner: string; deadline: string }>;
  summary?: string;
}

function getDataFilePath(): string {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, "conversations.json");
}

export function getAllMeetings(): StoredMeeting[] {
  try {
    const file = getDataFilePath();
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("[MeetingsStore] Failed to read meetings:", err);
    return [];
  }
}

export function getMeetingById(id: string): StoredMeeting | null {
  const meetings = getAllMeetings();
  return meetings.find((m) => m.id === id) || null;
}

export function saveMeeting(meeting: StoredMeeting): StoredMeeting {
  try {
    const file = getDataFilePath();
    const existing = getAllMeetings();
    const filtered = existing.filter((m) => m.id !== meeting.id);
    filtered.unshift(meeting);
    fs.writeFileSync(file, JSON.stringify(filtered.slice(0, 100), null, 2), "utf-8");
    return meeting;
  } catch (err) {
    console.error("[MeetingsStore] Failed to save meeting:", err);
    return meeting;
  }
}
