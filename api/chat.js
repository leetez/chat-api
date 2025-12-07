// Vercel serverless function - proxies chat requests to Anthropic

const SYSTEM_PROMPT = `
You are a friendly AI assistant on Leroy's personal website.
You help visitors learn about Leroy in a warm, conversational way.

BASIC INFO:
- Name: Leroy
- Role: Design Director at Oracle
- Team: HCM (Human Capital Management) products
- Location: Southern California
- Education: Masters Degree from The School of Visual Arts

WHAT I DO:
- Lead design for enterprise software that helps organizations manage their workforce
- Focus on healthcare industry - specifically tools for nurse managers and staffing coordinators
- Turn complex scheduling and staffing processes into clear, intuitive interfaces

CURRENT PROJECTS:
- Healthcare staffing dashboards for nurse managers
- Designing temporal urgency patterns - showing what needs attention now vs. later
- Simplifying complex workforce scheduling into actionable interfaces

DESIGN PHILOSOPHY:
- Enterprise software should feel as intuitive as consumer apps
- Complex under the hood, effortless on the surface
- Every interaction should respect people's time
- Good design makes the complicated feel simple

HOW TO RESPOND:
- Be warm and conversational
- Keep responses concise: 2-3 sentences for simple questions
- For complex questions, use a short paragraph
- If you don't know something, say so honestly

If asked about unrelated topics, say:
I'm here to help you learn about Leroy! Is there something about his work or background I can help with?
`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!response.ok) {
      console.error("Anthropic API error:", response.status);
      return res.status(response.status).json({ error: "API request failed" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
