const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "https://n8n.clevermation.com";

export async function POST(request: Request) {
  const body = await request.json();

  const { companyName, companyUrl, profileUrl, email, industry, targetAudience } =
    body;

  if (!companyName || (!companyUrl && !profileUrl) || !email) {
    return Response.json(
      { error: "companyName, email, and at least one LinkedIn URL are required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${N8N_WEBHOOK_URL}/webhook/linkedin-audit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          companyUrl: companyUrl || "",
          profileUrl: profileUrl || "",
          email,
          industry: industry || "",
          targetAudience: targetAudience || "",
        }),
        signal: AbortSignal.timeout(180_000),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("n8n webhook error:", res.status, text);
      return Response.json(
        { error: "Analysis failed" },
        { status: 502 }
      );
    }

    const result = await res.json();
    return Response.json(result);
  } catch (err) {
    console.error("Audit API error:", err);
    return Response.json(
      { error: "Analysis timed out or failed" },
      { status: 504 }
    );
  }
}
