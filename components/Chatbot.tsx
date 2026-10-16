"use client";

import { useEffect, useRef, useState } from "react";
import { chatbot, chatbotTopics } from "../content/chatbot";

type Message = { role: "bot" | "user"; text: string };

// Looks for a known topic. Replace this with a server API call to add AI later.
function getReply(question: string) {
  const normalizedQuestion = question.toLocaleLowerCase("sq");
  const topic = chatbotTopics.find((topic) =>
    topic.keywords.some((keyword) => normalizedQuestion.includes(keyword)),
  );
  return topic?.answer ?? chatbot.fallback;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: chatbot.greeting },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      endRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, messages]);

  function sendMessage(question: string) {
    if (!question.trim()) return;
    setMessages((previous) => [
      ...previous,
      { role: "user", text: question.trim() },
      { role: "bot", text: getReply(question) },
    ]);
    setDraft("");
  }

  function closeChat() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <div className="camp-chat">
      {isOpen && (
        <section
          className="camp-chat-panel"
          role="dialog"
          aria-label={chatbot.title}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeChat();
          }}
        >
          <div className="camp-chat-header">
            <div>
              <strong>{chatbot.title}</strong>
              <small>{chatbot.subtitle}</small>
            </div>
            <button onClick={closeChat} aria-label={chatbot.closeLabel}>
              ×
            </button>
          </div>

          <div className="camp-chat-messages" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <p key={index} className={"camp-chat-message " + message.role}>
                {message.text}
              </p>
            ))}
            <div ref={endRef} />
          </div>

          <div className="camp-chat-questions">
            {chatbot.quickQuestions.map((question) => (
              <button key={question} onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <form
            className="camp-chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <input
              ref={inputRef}
              aria-label={chatbot.inputLabel}
              placeholder={chatbot.placeholder}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={500}
            />
            <button type="submit" aria-label={chatbot.sendLabel} disabled={!draft.trim()}>
              ↑
            </button>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        className="camp-chat-launcher"
        aria-label={isOpen ? chatbot.closeLabel : chatbot.openLabel}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
      >
        <span aria-hidden="true">{isOpen ? "×" : "✦"}</span>
        <span>{chatbot.openLabel}</span>
      </button>
    </div>
  );
}
