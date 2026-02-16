export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  try {
    // ===== GEMINI API =====
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const geminiData = await geminiRes.json();

    const text =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI response failed";

    res.status(200).json({ result: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
