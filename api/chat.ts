// api/chat.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

// Let TypeScript know `process` exists without needing full Node typings
declare const process: any;

const systemPrompt = `
You are “WanderFlow Concierge”, a calm, human travel planner.

Your job:
- Turn the user’s message into a concrete, realistic plan.
- Sound like a thoughtful human concierge, not a chatbot.

Writing rules (very important):
- Do NOT mention AI, models, or that you are a bot.
- Avoid generic openings like “Great!” or “Sure, here’s…”.
- Write in a warm, direct tone like a hotel concierge talking to a guest.
- Use short paragraphs and plain headings, no markdown syntax.
- Headings should be simple, for example:
  Stay:
  Food:
  Activities:
  Tips:
- Use bullet points with a simple dash “- ” when it helps, but keep it compact.
- Prefer very concrete, practical suggestions: neighborhoods, typical prices, how long things take, when to book ahead.
- If the user mentions budget, respect it. If it’s low, prioritise free/cheap options and say so clearly.
- If you need to ask a follow-up question, keep it to one clear question at the end.

Output format:
- Plain text only, no **, no ###, no markdown.
- 2–4 short sections with clear headings.
- One short, friendly question at the end asking if they’d like a more detailed day-by-day plan or adjustments.
`;

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const body = await parseJson(req);
        const { messages } = body || {};

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: "Request body must include a non-empty 'messages' array.",
            });
        }

        const apiKey = process.env.OPENAI_API_KEY as string | undefined;
        if (!apiKey) {
            return res.status(500).json({
                error: "OPENAI_API_KEY is not set on the server.",
            });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                temperature: 0.5,
                messages: [
                    { role: "system", content: systemPrompt },
                    // Spread the conversation from the client
                    ...messages,
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI error:", data);
            return res.status(500).json({
                error: "OpenAI API error while generating concierge reply.",
            });
        }

        const reply =
            data.choices?.[0]?.message?.content ||
            "Sorry, I couldn’t generate a reply. Please try again.";

        return res.status(200).json({ reply });
    } catch (err: unknown) {
        console.error("API /chat error:", err);
        return res.status(500).json({
            error: "Unexpected error while generating concierge reply.",
        });
    }
}

/**
 * Small helper because in Vercel Node functions req.body may already be parsed
 * or be a stream depending on config.
 */
async function parseJson(req: any) {
    if (req.body && typeof req.body === "object") {
        return req.body;
    }

    return new Promise<any>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: any) => {
            data += chunk;
        });
        req.on("end", () => {
            try {
                resolve(JSON.parse(data || "{}"));
            } catch (e) {
                reject(e);
            }
        });
        req.on("error", reject);
    });
}
