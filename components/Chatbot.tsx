"use client";

import { useEffect, useRef, useState } from "react";
import { chatbot, getReply, type ChatContext } from "../content/chatbot";

type Message = { role: "bot" | "user"; text: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: chatbot.greeting },
  ]);
  const contextRef = useRef<ChatContext>({ awaitingAge: true });
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      endRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, messages, isTyping]);

  useEffect(
    () => () => {
      if (replyTimerRef.current !== null) clearTimeout(replyTimerRef.current);
    },
    [],
  );

  function sendMessage(question: string) {
    if (!question.trim() || replyTimerRef.current !== null) return;
    const reply = getReply(question, contextRef.current);
    contextRef.current = reply.context;
    setMessages((previous) => [...previous, { role: "user", text: question.trim() }]);
    setDraft("");
    setIsTyping(true);
    const delay = Math.min(1600, Math.max(700, reply.text.length * 8));
    replyTimerRef.current = setTimeout(() => {
      setMessages((previous) => [...previous, { role: "bot", text: reply.text }]);
      setIsTyping(false);
      replyTimerRef.current = null;
    }, delay);
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
            {isTyping && (
              <p
                className="camp-chat-message bot camp-chat-typing"
                role="status"
                aria-label="Duke shkruar"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </p>
            )}
            <div ref={endRef} />
          </div>

          <div className="camp-chat-questions">
            {chatbot.quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
                disabled={isTyping}
              >
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
            <button
              type="submit"
              aria-label={chatbot.sendLabel}
              disabled={!draft.trim() || isTyping}
            >
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
