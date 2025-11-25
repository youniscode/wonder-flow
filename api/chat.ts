// api/chat.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

// Let TypeScript know `process` exists without needing full Node typings
declare const process: any;

const systemPrompt = `
You are WanderFlow, a calm and capable AI trip concierge.

Your job is to:
- Help users design trips, weekends and nights out.
- Ask for missing essentials only when needed (city, dates, group, budget, vibe).
- Suggest realistic options: stays, food, activities, walks, viewpoints, experiences.
- Keep answers structured, clear, and easy to act on.
- Always stay friendly, human and reassuring.

Tone:
- Warm, concise, practical.
- No hype, no emojis overload.
- You can use short lists and mini-sections.

When a user is vague:
- Gently suggest what extra info would help (e.g. "If you tell me your budget and dates, I can refine this further.").

Do NOT:
- Invent fake prices with too much fake precision.
- Overload with 50 options. 3–6 well-chosen options is enough.
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
