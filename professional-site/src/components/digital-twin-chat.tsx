"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function DigitalTwinChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Mario's digital twin. Ask me anything about his career journey, skills, and experience.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) {
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = (await response.json()) as { reply?: string };
      if (!data.reply) {
        throw new Error("Empty response");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "" }]);
    } catch {
      setError("The digital twin is unavailable right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">Digital Twin</h2>
      <p className="mt-3 text-slate-300">
        Ask questions about Mario&apos;s career path, core strengths, technologies, and project
        experience.
      </p>

      <div className="mt-6 max-h-96 space-y-3 overflow-y-auto rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === "user"
                ? "ml-auto max-w-[80%] rounded-xl bg-cyan-600/30 px-4 py-3 text-sm text-cyan-100"
                : "max-w-[80%] rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-100"
            }
          >
            {message.content}
          </div>
        ))}
      </div>

      <form className="mt-5 flex flex-col gap-3 md:flex-row" onSubmit={onSubmit}>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none ring-cyan-400 placeholder:text-slate-400 focus:ring-2"
          placeholder="Ask about Mario's career..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="btn-primary md:min-w-32" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Ask Twin"}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </section>
  );
}
