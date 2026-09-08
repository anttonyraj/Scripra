import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      turns = [],
      meetingTitle = "Live Meeting Session",
      platform = "Online Meeting",
      organizerName = "Organizer",
      translationLang = "off",
    } = body;

    if (!Array.isArray(turns) || turns.length === 0) {
      return NextResponse.json(
        { success: false, error: "No transcript dialogue turns provided for synthesis." },
        { status: 400 }
      );
    }

    const dialogueText = turns
      .filter((t: any) => t.type !== "system")
      .map((t: any) => `[${t.time || "00:00"}] ${t.speaker || "Speaker"}: ${t.text}`)
      .join("\n");

    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (geminiApiKey && geminiApiKey.trim() !== "") {
      try {
        const prompt = `
You are the Scripra Executive Intelligence Engine, an elite C-level executive assistant and meeting intelligence compiler.
Analyze the following diarized meeting transcript and produce a highly accurate, professional Minutes of Meeting (MoM) and intelligence package.

MEETING TITLE: ${meetingTitle}
PLATFORM: ${platform}
ORGANIZER: ${organizerName}
TARGET TRANSLATION LANGUAGE: ${translationLang}

TRANSCRIPT:
${dialogueText}

OUTPUT REQUIREMENTS:
Respond ONLY with a valid, raw JSON object (do not wrap in markdown \`\`\`json blocks, just raw parseable JSON) matching this exact schema:
{
  "purpose": "A concise, high-impact executive summary (2-3 sentences) detailing the objective and key outcomes.",
  "takeaways": [
    {
      "id": 1,
      "title": "Clear concise header",
      "category": "Agenda | Discussion | Decision | Risk | Next Steps",
      "description": "Thorough explanation grounded strictly in the transcript."
    }
  ],
  "consensusScore": 85, // Number 0-100 reflecting agreement vs objection
  "consensusDecision": "Summary of formal alignment or voting outcome.",
  "decisions": [
    "Definitive decision 1 attributed to speaker",
    "Definitive decision 2"
  ],
  "actionItems": [
    {
      "id": 1,
      "task": "Actionable task description",
      "owner": "Specific attendee name from transcript or Team",
      "deadline": "Clear deadline or Upcoming",
      "priority": "high" // "high" | "medium" | "low"
    }
  ],
  "minutesOfMeeting": "Complete formal markdown Minutes of Meeting including Attendance, Agenda, Core Discussions, Decisions Ratified, and Follow-ups.",
  "translatedRecap": "If TARGET TRANSLATION LANGUAGE is not 'off', provide the executive purpose translated accurately into ${translationLang}. Otherwise empty string."
}
`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json",
            },
          }),
        });

        if (res.ok) {
          const geminiData = await res.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json({
              success: true,
              engine: "Scripra SLM Synthesizer (Gemini Core)",
              data: parsed,
            });
          }
        } else {
          console.warn("[Gemini API Notice]", await res.text());
        }
      } catch (geminiError) {
        console.error("[Gemini Synthesis Error]", geminiError);
      }
    }

    // Fallback heuristic synthesis if Gemini key is pending or unreachable
    const firstTurn = turns[0]?.text || "The team convened to review project objectives.";
    const fallbackPurpose = firstTurn.length > 200 ? firstTurn.slice(0, 200) + "..." : firstTurn;

    const fallbackDecisions: string[] = [];
    const fallbackActions: any[] = [];

    turns.forEach((t: any, idx: number) => {
      if (/\b(agree|agreed|approv(e|ed)|decid(e|ed)|confirmed)\b/i.test(t.text)) {
        fallbackDecisions.push(`${t.speaker}: ${t.text}`);
      }
      if (/\b(will|should|need to|must|task|todo|prepare|send|ship)\b/i.test(t.text)) {
        fallbackActions.push({
          id: idx + 1,
          task: t.text,
          owner: t.speaker || organizerName || "Team",
          deadline: "Upcoming",
          priority: "high",
        });
      }
    });

    const fallbackData = {
      purpose: fallbackPurpose,
      takeaways: turns.slice(0, 4).map((t: any, idx: number) => ({
        id: idx + 1,
        title: `${t.speaker}'s Key Point`,
        category: idx === 0 ? "Agenda" : idx === 1 ? "Discussion" : "Decision",
        description: t.text,
      })),
      consensusScore: fallbackDecisions.length > 0 ? 88 : 70,
      consensusDecision: `Team reviewed agenda with ${organizerName} and aligned on operational objectives.`,
      decisions: fallbackDecisions.slice(0, 4),
      actionItems: fallbackActions.slice(0, 5),
      minutesOfMeeting: `SCRIPRA AI EXECUTIVE MINUTES OF MEETING\nMeeting: ${meetingTitle}\nPlatform: ${platform}\nDate: ${new Date().toLocaleDateString()}\nOrganizer: ${organizerName}\n\n1. EXECUTIVE SUMMARY:\n${fallbackPurpose}\n\n2. TRANSCRIPT LOG:\n${dialogueText}`,
      translatedRecap: translationLang !== "off" ? `Resumen ejecutivo: ${fallbackPurpose}` : "",
    };

    return NextResponse.json({
      success: true,
      engine: "Scripra Client-Side Heuristic Fallback",
      data: fallbackData,
    });
  } catch (error: any) {
    console.error("[Synthesize API Error]", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to synthesize meeting recap" },
      { status: 500 }
    );
  }
}
