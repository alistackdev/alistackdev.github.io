import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import Avatar from '@/components/ui/components-primitives-avatar';
import ChatGPTInput from '@/components/ui/prompt-input-dynamic-grow';
import { askAliAgent } from '../data/aliKnowledgeBase';
import { playClickSound, playHoverSound } from '../utils/sound';

const WELCOME_TEXT = "Hello. I'm Ali Hassan's AI Assistant. How can I assist you regarding his engineering background, systems, or availability?";

/**
 * Format text without bullet dots, highlighting bold segments cleanly
 * and rendering clickable hyperlinks for case studies and URLs.
 */
function CleanMessageParagraph({ text }) {
  if (!text) return null;

  // Regex captures:
  // 1: [label](url) -> match[1] = label, match[2] = url
  // 2: **bold** -> match[3] = bold text
  // 3: raw link /case-study.html or https://... -> match[4]
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|((?:https?:\/\/|\/case-study\.html)[^\s)]*)/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const url = match[2];
      elements.push(
        <a
          key={`md-link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium transition-colors"
        >
          {label}
        </a>
      );
    } else if (match[3]) {
      elements.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-white">
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      const fullMatch = match[4];
      const cleanUrl = fullMatch.replace(/[.,;:!?]+$/, '');
      const trailingPunct = fullMatch.slice(cleanUrl.length);
      elements.push(
        <a
          key={`raw-link-${match.index}`}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium transition-colors"
        >
          {cleanUrl}
        </a>
      );
      if (trailingPunct) {
        elements.push(trailingPunct);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return (
    <p className="leading-relaxed whitespace-pre-wrap">
      {elements}
    </p>
  );
}

export default function AliPersonalAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});
  const [messages, setMessages] = useState([]);

  const chatEndRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    if (chatEndRef.current && isOpen) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages, isThinking, streamingMsgId, isOpen]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // When user opens the chatbot for the first time, reveal welcome message smoothly
  useEffect(() => {
    if (isOpen && !hasGreetedRef.current) {
      hasGreetedRef.current = true;
      const initialId = 'welcome-msg';
      setMessages([{ id: initialId, role: 'assistant', text: '' }]);
      const timer = setTimeout(() => {
        streamTextIntoMessage(initialId, WELCOME_TEXT);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCopy = (msgId, text) => {
    playClickSound();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleFeedback = (msgId, type) => {
    playClickSound();
    setFeedbackState((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type
    }));
  };

  // Smooth character reveal (steady, fluid cadence without harsh jumps)
  const streamTextIntoMessage = (msgId, fullText) => {
    let charIndex = 0;
    setStreamingMsgId(msgId);

    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }

    streamIntervalRef.current = setInterval(() => {
      charIndex = Math.min(fullText.length, charIndex + 2);
      const partial = fullText.slice(0, charIndex);

      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, text: partial } : m))
      );

      if (charIndex >= fullText.length) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
        setStreamingMsgId(null);
      }
    }, 18);
  };

  const handleAsk = async (questionText) => {
    if (!questionText.trim() || isThinking || streamingMsgId) return;
    playClickSound();

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: questionText
    };

    const historySnapshot = [...messages];
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    const minThinkDelay = new Promise((resolve) => setTimeout(resolve, 600));
    const [result] = await Promise.all([
      askAliAgent(questionText, historySnapshot),
      minThinkDelay
    ]);

    const aiMsgId = `ai-${Date.now()}`;
    setIsThinking(false);
    setMessages((prev) => [
      ...prev,
      {
        id: aiMsgId,
        role: 'assistant',
        text: ''
      }
    ]);

    streamTextIntoMessage(aiMsgId, result.answer);
  };

  const handleReset = () => {
    playClickSound();
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setIsThinking(false);
    setStreamingMsgId(null);
    const resetId = `welcome-${Date.now()}`;
    setMessages([{ id: resetId, role: 'assistant', text: '' }]);
    setTimeout(() => {
      streamTextIntoMessage(resetId, WELCOME_TEXT);
    }, 100);
  };

  const isBusy = isThinking || Boolean(streamingMsgId);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <style>{`
        /* Continuous gentle floating & glowing animation */
        @keyframes badge-float-glow {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 8px 25px rgba(0,0,0,0.65), 0 0 16px rgba(34,211,238,0.25), inset 0 1px 1px rgba(255,255,255,0.35);
          }
          50% {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.75), 0 0 24px rgba(168,85,247,0.45), 0 0 12px rgba(34,211,238,0.4), inset 0 1px 1px rgba(255,255,255,0.5);
          }
        }
        .animate-badge-glow-float {
          animation: badge-float-glow 3.5s ease-in-out infinite;
        }

        /* Periodic friendly hand waving */
        @keyframes wave-hand {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20%, 40% { transform: rotate(-14deg); }
        }
        .animate-waving-hand {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave-hand 2.6s ease-in-out infinite;
        }

        /* Continuous light reflection sweep across the badge */
        @keyframes badge-shimmer-sweep {
          0% { transform: translateX(-120%); }
          25%, 100% { transform: translateX(220%); }
        }
        .animate-badge-shimmer {
          animation: badge-shimmer-sweep 4s ease-in-out infinite;
        }

        /* Initial smooth entrance reveal */
        @keyframes badge-entrance {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.92);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .animate-badge-entrance {
          animation: badge-entrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Constantly reveals from left-to-right (1.2s), stays 3s, then loops */
        @keyframes text-reveal-loop {
          0% {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
            transform: translateX(-6px);
            filter: blur(4px);
          }
          24% {
            clip-path: inset(0 0% 0 0);
            opacity: 1;
            transform: translateX(0);
            filter: blur(0px);
          }
          82% {
            clip-path: inset(0 0% 0 0);
            opacity: 1;
            transform: translateX(0);
            filter: blur(0px);
          }
          93% {
            clip-path: inset(0 0% 0 0);
            opacity: 0;
            transform: translateX(2px);
            filter: blur(2px);
          }
          96%, 100% {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
            transform: translateX(-6px);
            filter: blur(4px);
          }
        }
        .animate-text-reveal-loop {
          display: inline-block;
          animation: text-reveal-loop 5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        /* Pause on hover so user can easily read or click */
        .group\\/badge:hover .animate-text-reveal-loop {
          animation-play-state: paused;
          clip-path: inset(0 0 0 0) !important;
          opacity: 1 !important;
          filter: blur(0px) !important;
        }
      `}</style>

      {/* Animated Blinking AI Orb Launcher + Stylish Floating Badge */}
      {!isOpen && (
        <div className="relative flex flex-col items-end">
          {/* Small Stylish Badge with Constant Left-to-Right Reveal Loop */}
          <div
            onClick={() => {
              playClickSound();
              setIsOpen(true);
            }}
            onMouseEnter={() => playHoverSound()}
            title="Chat with Ali's AI"
            className="mb-2.5 cursor-pointer select-none group/badge transition-transform duration-300 hover:scale-108 active:scale-95 animate-badge-entrance"
          >
            <div className="relative overflow-hidden px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white/[0.14] via-[#0d1429]/90 to-white/[0.08] backdrop-blur-2xl border border-white/25 flex items-center gap-1.5 animate-badge-glow-float">
              {/* Continuous Shimmer Light Ray */}
              <div className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent w-1/2 animate-badge-shimmer" />

              {/* Waving Hand */}
              <span className="text-xs animate-waving-hand shrink-0">👋</span>

              {/* Constantly Revealed Text from Left to Right (loops every 3s) */}
              <span className="animate-text-reveal-loop font-sans font-medium text-[11px] sm:text-xs text-white tracking-wide whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Say hi! I don&apos;t bite
              </span>

              {/* Speech pointer notch */}
              <div className="absolute -bottom-1 right-6 w-2 h-2 rotate-45 bg-[#0d1429] border-r border-b border-white/25" />
            </div>
          </div>

          {/* Launcher Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsOpen(true);
            }}
            onMouseEnter={() => playHoverSound()}
            aria-label="Open Ali's AI Assistant"
            title="Chat with Ali's AI Assistant"
            className="group relative flex items-center justify-center rounded-full p-0.5 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer bg-transparent border-0 outline-none"
          >
            {/* Ambient multi-color glow behind the orb */}
            <span className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 opacity-60 blur-md group-hover:opacity-95 transition-opacity duration-300" />

            {/* Blinking AI Avatar Orb */}
            <Avatar
              blinking
              color="cyan"
              size="lg"
              shape="circle"
              className="ring-2 ring-cyan-300/40 group-hover:ring-cyan-200/80 transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            />

            {/* Online indicator dot */}
            <span className="pointer-events-none absolute top-0.5 right-0.5 z-20 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#050508]" />
            </span>
          </button>
        </div>
      )}

      {/* Open Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] max-h-[82vh] flex flex-col rounded-3xl bg-[#060918]/90 backdrop-blur-2xl border border-white/15 shadow-[0_16px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header Bar */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-white/[0.06] backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <Avatar
                  blinking
                  color={isBusy ? 'violet' : 'cyan'}
                  size="sm"
                  shape="circle"
                />
                <span className="absolute -bottom-0.5 -right-0.5 z-20 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070a16]" />
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-white tracking-wide">
                  Ali&apos;s AI Assistant
                </div>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isThinking ? 'Thinking...' : 'Online'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="New chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            ref={chatEndRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] min-h-[260px] bg-[#040612]/75 backdrop-blur-xl"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* User Liquid Glass Bubble */}
                {msg.role === 'user' ? (
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs px-4 py-2 text-xs sm:text-[13px] leading-relaxed text-cyan-50 bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-indigo-500/30 backdrop-blur-xl border border-cyan-400/40 shadow-[0_8px_24px_rgba(6,182,212,0.22),inset_0_1px_1px_rgba(255,255,255,0.35)]">
                    {msg.text}
                  </div>
                ) : (
                  /* Assistant Clean White Text (No box) + Action Buttons */
                  <div className="max-w-[94%] space-y-2 py-0.5">
                    <div className="text-slate-100 text-xs sm:text-[13px] leading-relaxed font-normal tracking-wide">
                      <CleanMessageParagraph text={msg.text} />
                    </div>

                    {/* Small Feedback & Copy Row under AI response */}
                    {msg.text && streamingMsgId !== msg.id && (
                      <div className="flex items-center gap-1.5 pt-0.5 text-slate-400">
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy response"
                          className="flex items-center gap-1 px-1.5 py-1 rounded-md text-[10px] font-mono hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-white" />
                              <span className="text-white text-[10px]">Copied</span>
                            </>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, 'up')}
                          title="Helpful"
                          className={`p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                            feedbackState[msg.id] === 'up'
                              ? 'text-cyan-400 bg-cyan-500/15'
                              : 'hover:text-white'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, 'down')}
                          title="Not helpful"
                          className={`p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                            feedbackState[msg.id] === 'down'
                              ? 'text-rose-400 bg-rose-500/15'
                              : 'hover:text-white'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Liquid Glass Thinking Indicator */}
            {isThinking && (
              <div className="flex items-start animate-in fade-in duration-200">
                <div className="relative overflow-hidden rounded-2xl rounded-tl-xs bg-white/[0.08] backdrop-blur-2xl border border-white/15 px-4 py-2.5 shadow-[0_4px_20px_rgba(147,51,234,0.18),inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                  <span className="text-xs font-medium bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Liquid Glass Dynamic Grow Multimodal Input */}
          <div className="p-3 bg-[#060918]/90 backdrop-blur-xl border-t border-white/10">
            <ChatGPTInput
              fullWidth
              placeholder="Ask about Ali's engineering, background..."
              onSubmit={handleAsk}
              disabled={isBusy}
              glowIntensity={0.85}
              expandOnFocus={false}
              animationDuration={400}
              textColor="#F8FAFC"
              backgroundOpacity={0.08}
              showEffects={true}
              showMenuButton={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
