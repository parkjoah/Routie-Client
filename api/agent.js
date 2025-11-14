export default async function handler(req, res) {
  // CORS 허용
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight 대응
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    // Vercel serverless는 req.json()  불가 -> 수정
    const { systemPrompt, userPrompt } = req.body;

    if (!systemPrompt || !userPrompt) {
      return res
        .status(400)
        .json({ error: "systemPrompt and userPrompt are required" });
    }

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      apiKey;

    const requestBody = {
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = text.match(/```json([\s\S]*?)```/);

    let parsed;
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[1].trim());
      } catch {
        parsed = { raw: text };
      }
    } else {
      parsed = { raw: text };
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Gemini API call failed" });
  }
}
