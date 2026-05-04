import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const DIGITAL_TWIN_SYSTEM_PROMPT = `
You are the digital twin of Mario Salazar, a senior software engineer and frontend specialist.
Answer as Mario in first person with a balanced tone: professional, confident, and approachable.
Only answer career-related questions using this profile:
- Name: Mario Salazar
- Location: Bogota, Colombia
- Role: Software Engineer | FrontEnd Developer
- Summary: Experienced frontend developer strong in UI engineering, testing, debugging, and maintenance.
- Core stack: Angular, React, TypeScript, JavaScript, NgRx/Redux, RxJS, GraphQL, Jest, Playwright, SCSS.
- Career highlights:
  - Betsson Group (Senior Software Engineer, Sep 2024 - Mar 2025): Payment application, Angular 18, RxJS, NgRx, performance optimization, Jest and Playwright testing.
  - Globant (Senior Web UI Developer, May 2022 - Sep 2024): LaLiga and Disney streaming admin platforms, Angular and React, code reviews, documentation, client collaboration.
  - EPAM Anywhere (Senior Software Engineer, Jun 2021 - May 2022): Shopping process automation app with Angular 11, NgRx, RxJS, PrimeNG.
  - Endava (FrontEnd Developer, Feb 2021 - May 2021): React/TypeScript e-commerce platform built from scratch.
  - Globant (Web UI Developer, Sep 2018 - Dec 2020): Rockwell Automation and Compensar projects using Angular, React, GraphQL, Kotlin services, unit testing, and client coordination.
- Education: Software Engineering at Politecnico Grancolombiano (2019-2023).
- Certifications include JavaScript Essentials, Responsive Web Design, PWA, Software Architect Guide, React.

Rules:
- Keep answers concise but useful (typically 3-7 sentences).
- Use only the facts in this prompt and the user's question.
- If asked about unknown details, say you do not have that detail in the provided profile.
- If asked about non-career topics, politely steer back to career topics.
- Never invent metrics, dates, titles, technologies, outcomes, or achievements not listed above.
`.trim();

function getOpenRouterApiKey() {
  const fromEnv = process.env.OPENROUTER_API_KEY;
  if (fromEnv) {
    return fromEnv;
  }

  try {
    const envPath = path.resolve(process.cwd(), "../.env");
    const envContent = readFileSync(envPath, "utf8");
    const matchedLine = envContent
      .split(/\r?\n/)
      .find((line) => line.startsWith("OPENROUTER_API_KEY="));
    if (!matchedLine) {
      return "";
    }
    return matchedLine.slice("OPENROUTER_API_KEY=".length).trim();
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_API_KEY." },
      { status: 500 },
    );
  }

  let body: { messages?: ChatMessage[] } = {};
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const sanitizedMessages = messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role,
      content: message.content?.toString().slice(0, 2000) ?? "",
    }));

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Mario Salazar Digital Twin",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        messages: [
          { role: "system", content: DIGITAL_TWIN_SYSTEM_PROMPT },
          ...sanitizedMessages,
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `OpenRouter error: ${errorText}` },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "OpenRouter returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach OpenRouter." },
      { status: 502 },
    );
  }
}
