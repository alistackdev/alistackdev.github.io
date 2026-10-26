import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MousePointer, CheckCircle2, MessageSquare, Sparkles, Send } from 'lucide-react';

export default function CursorTour({ isDark = true }) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);
  const sendBtnRef = useRef(null);
  const newCardRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [cardDispatched, setCardDispatched] = useState(false);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isRunning = true;

    const runTour = () => {
      if (!isRunning) return;

      setCardDispatched(false);
      setModalOpen(false);
      setTypedInput('');

      const tl = gsap.timeline({
        onComplete: () => {
          if (isRunning) {
            setTimeout(runTour, 2200);
          }
        }
      });

      // 1. Position cursor at start
      gsap.set(cursorRef.current, { x: 40, y: 180, opacity: 1 });

      // 2. Move cursor to "Review AI Draft" button (0.8s)
      tl.to(cursorRef.current, {
        x: 320,
        y: 85,
        duration: 0.8,
        ease: 'power2.inOut'
      });

      // 3. Click ripple & open modal
      tl.call(() => {
        setRipple(true);
        setTimeout(() => setRipple(false), 300);
        setModalOpen(true);
      });

      tl.to({}, { duration: 0.3 }); // pause

      // 4. Move cursor into modal input
      tl.to(cursorRef.current, {
        x: 240,
        y: 190,
        duration: 0.7,
        ease: 'power2.inOut'
      });

      // 5. Type text into learning input
      const noteText = 'Add 15% bulk discount';
      tl.call(() => {
        let i = 0;
        const interval = setInterval(() => {
          if (!isRunning) {
            clearInterval(interval);
            return;
          }
          setTypedInput(noteText.slice(0, i));
          i++;
          if (i > noteText.length) clearInterval(interval);
        }, 35);
      });

      tl.to({}, { duration: 1.0 }); // typing duration

      // 6. Move cursor to "Approve & Send"
      tl.to(cursorRef.current, {
        x: 340,
        y: 280,
        duration: 0.7,
        ease: 'power2.inOut'
      });

      // 7. Click Send
      tl.call(() => {
        setRipple(true);
        setTimeout(() => setRipple(false), 300);
        setModalOpen(false);
        setCardDispatched(true);
      });

      tl.to({}, { duration: 0.1 });

      // 8. Pop new card into queue with back.out
      tl.call(() => {
        if (newCardRef.current) {
          gsap.fromTo(
            newCardRef.current,
            { scale: 0.8, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
          );
        }
      });

      // 9. Move cursor away
      tl.to(cursorRef.current, {
        x: 50,
        y: 350,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    };

    const initialTimeout = setTimeout(runTour, 500);

    return () => {
      isRunning = false;
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div
      className={`py-12 sm:py-16 rounded-3xl border p-6 sm:p-10 my-8 shadow-2xl transition-colors ${
        isDark
          ? 'bg-[#0b0e14] border-cyan-500/20 text-white'
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}
    >
      <div className="text-center max-w-[620px] mx-auto mb-10">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-widest ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          LIVE WORKFLOW SIMULATION
        </span>
        <h3 className={`text-2xl sm:text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Automated Admin Review Tour
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Watch how an administrator reviews, edits, and dispatches a customer response in seconds.
        </p>
      </div>

      {/* Screen Frame */}
      <div
        ref={containerRef}
        className="relative max-w-[760px] mx-auto bg-[#0c101a] rounded-3xl border-2 border-slate-700/80 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden min-h-[440px]"
      >
        {/* App Topbar */}
        <div className="p-4 bg-[#0f1422] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="text-xs font-mono font-bold text-white ml-2">Lead Queue · Sales Operations</span>
          </div>

          <button
            ref={buttonRef}
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,242,254,0.3)] flex items-center gap-1.5 border border-cyan-300/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Review AI Draft</span>
          </button>
        </div>

        {/* Existing Leads List */}
        <div className="p-6 space-y-3">
          <div className="p-3.5 rounded-xl bg-[#131929] border border-slate-800 flex items-center justify-between text-xs text-white">
            <div>
              <span className="font-bold text-white">Elena Rostova · Biodyne Lab</span>
              <div className="text-[11px] text-slate-400">220V Dual-Line Tech Spec Inquiry</div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold text-[10px]">
              Ready for Review
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#131929] border border-slate-800 flex items-center justify-between text-xs text-white">
            <div>
              <span className="font-bold text-white">David Miller · Bright Studio</span>
              <div className="text-[11px] text-slate-400">Seat Addition to Quote #9042</div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold text-[10px]">
              Ready for Review
            </span>
          </div>

          {/* New Card Dispatched by Tour */}
          {cardDispatched && (
            <div ref={newCardRef} className="tour-dispatched-card p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-between text-xs shadow-md">
              <div>
                <span className="font-bold text-emerald-300">Alex Vance · Calgary, AB (Dispatched!)</span>
                <div className="text-[11px] text-emerald-400/80">Volume Quote Sent via SMTP Relay</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Delivered</span>
              </span>
            </div>
          )}
        </div>

        {/* Modal Overlay */}
        {modalOpen && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-20">
            <div
              ref={modalRef}
              className="w-full max-w-md bg-[#101524] rounded-2xl border border-cyan-500/30 shadow-2xl p-5 space-y-3 text-white"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-extrabold text-xs text-white">Approve AI Follow-Up</span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">100% Grounded</span>
              </div>

              <div className="text-xs text-slate-300">
                <strong>AI Suggested Reply:</strong> &quot;Hi Alex, yes for 8 units you receive our 15% discount...&quot;
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Learning Rule / Instruction:
                </label>
                <div className="w-full p-2 bg-[#0a0d16] border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 min-h-[34px] flex items-center">
                  {typedInput}
                  <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <span className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-400">Cancel</span>
                <button
                  ref={sendBtnRef}
                  type="button"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-xs"
                >
                  Approve &amp; Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fake Animated SVG Cursor */}
        <div
          ref={cursorRef}
          className="absolute z-50 pointer-events-none transition-transform"
          style={{ top: 0, left: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#00f2fe"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {ripple && (
            <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-cyan-400 animate-ping pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
}
