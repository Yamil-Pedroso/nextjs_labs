import openai from "./openai";
import type { Insight } from "../types/insight";

interface MetricsSnapshot {
  current_period: {
    revenue: number;
    transactions: number;
    failed_payments: number;
  };
  previous_period: {
    revenue: number;
    transactions: number;
    failed_payments: number;
  };
}

export async function generateInsights(
  metrics: MetricsSnapshot,
): Promise<Insight[]> {
  const systemPrompt = `
You are a SaaS analytics assistant for a dashboard called Pulseboard.

Rules:
- You MUST return valid JSON only
- Do NOT wrap the response in markdown
- Do NOT include backticks
- Do NOT include explanations or text outside JSON

Your task:
- Analyze transaction metrics
- Detect anomalies, trends, or risks
- Be concise, professional, and actionable

Output format:
Return a JSON array of insights.

Each insight must include:
- id (short, kebab-case)
- title (short)
- description (1 sentence)
- type ("info" | "warning" | "success")
`;

  const userPrompt = `
Metrics snapshot:
${JSON.stringify(metrics, null, 2)}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error("OpenAI returned empty response");
  }

  try {
    return JSON.parse(content) as Insight[];
  } catch (error) {
    console.error("Failed to parse OpenAI response:", content);
    throw new Error("Invalid OpenAI response format");
  }
}
