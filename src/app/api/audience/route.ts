import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: Request) {
  const { targetAudience, industry, companyName } = await request.json();

  if (!targetAudience) {
    return Response.json({ error: "targetAudience is required" }, { status: 400 });
  }

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Du bist ein LinkedIn-Marketing-Experte. Analysiere die folgende Zielgruppe für ein Unternehmen und schätze deren Präsenz auf LinkedIn ein.

Unternehmen: ${companyName}
Branche: ${industry || "nicht angegeben"}
Zielgruppe: ${targetAudience}

Antworte ausschließlich als valides JSON (kein Markdown, kein Text drumherum) mit exakt dieser Struktur:
{
  "estimatedSize": "~XX.XXX",
  "sizeContext": "kurzer Satz zur Einordnung der Zahl",
  "topJobTitles": [
    { "title": "Job-Titel", "percentage": "XX%" },
    { "title": "Job-Titel", "percentage": "XX%" },
    { "title": "Job-Titel", "percentage": "XX%" },
    { "title": "Job-Titel", "percentage": "XX%" },
    { "title": "Job-Titel", "percentage": "XX%" }
  ],
  "reachability": "hoch" | "mittel" | "niedrig",
  "reachabilityReason": "kurzer Satz warum",
  "recommendation": "1-2 Sätze konkreter Tipp, wie das Unternehmen diese Zielgruppe auf LinkedIn am besten erreicht"
}

Nutze realistische LinkedIn-Nutzungsdaten für den DACH-Raum (ca. 22 Mio. Nutzer in DACH). Schätze konservativ.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return Response.json({ error: "No response from AI" }, { status: 500 });
  }

  try {
    const parsed = JSON.parse(textBlock.text);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Invalid AI response" }, { status: 500 });
  }
}
