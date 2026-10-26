import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeftRight, Clock, AlertTriangle, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function BeforeAfterSlider({ isDark = true }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const isDragging = useRef(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Animate slider from 88% to 15% and then back to 50%
          const obj = { pos: 88 };
          const tl = gsap.timeline({
            onUpdate: () => setSliderPos(obj.pos)
          });

          tl.to(obj, { pos: 15, duration: 1.2, ease: 'power2.inOut', delay: 0.3 })
            .to(obj, { pos: 50, duration: 1.0, ease: 'power2.out' });
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    updatePosition(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updatePosition = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPos(percentage);
  };

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
          THE OPERATIONAL TRANSFORMATION
        </span>
        <h3 className={`text-2xl sm:text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Before vs After Comparison
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Drag the slider to see how operations changed after deploying the custom Node.js system.
        </p>
      </div>

      {/* Comparison Frame */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative max-w-[880px] mx-auto h-[380px] sm:h-[400px] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl select-none cursor-ew-resize bg-[#07090e]"
      >
        {/* =================================================================
            BOTTOM LAYER: BEFORE (THE OLD CHAOS)
           ================================================================= */}
        <div className="absolute inset-0 bg-[#160a0a] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BEFORE: MANUAL DELAYS &amp; LOST LEADS</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-red-200 mb-3">
              48-Hour Reply Delays &amp; Tab-Switching Chaos
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-red-300 max-w-[420px]">
              <div className="p-3 rounded-xl bg-[#241010] border border-red-900/60 flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Customer inquiries sat unanswered for 1–2 days while staff searched through PDFs.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#241010] border border-red-900/60 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Zapier webhooks dropped under peak traffic spikes, losing high-value commercial leads.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#241010] border border-red-900/60 flex items-start gap-2">
                <span className="font-bold text-red-400">✕</span>
                <span>$400–$600/month spent on brittle no-code task subscriptions with zero learning memory.</span>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-red-400">
            Lost Revenue · Customer Frustration · Manual Fatigue
          </div>
        </div>

        {/* =================================================================
            TOP LAYER: AFTER (THE CUSTOM NODE.JS SYSTEM)
           ================================================================= */}
        <div
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          className="absolute inset-0 bg-[#07151e] p-6 sm:p-8 flex flex-col justify-between transition-none pointer-events-none"
        >
          <div className="ml-auto max-w-[440px] text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AFTER: INSTANT &amp; 100% CONTROLLED</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-white mb-3">
              Sub-2s Verified Drafts in 1 Unified Inbox
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-200 text-left">
              <div className="p-3 rounded-xl bg-[#0f2430] border border-cyan-500/30 flex items-start gap-2 shadow-xs">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>AI drafts instant answers using verified business information chunks before you even open your laptop.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0f2430] border border-cyan-500/30 flex items-start gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>100% Human approval gate ensures 0% hallucination risk on volume quotes and freight.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0f2430] border border-cyan-500/30 flex items-start gap-2 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Self-hosted on a flat $20/mo VPS with continuous Google Sheets active learning.</span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs font-mono font-bold text-cyan-400">
            Faster Closings · Zero Blunders · Complete Peace of Mind
          </div>
        </div>

        {/* =================================================================
            VERTICAL DIVIDER & DRAG HANDLE
           ================================================================= */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-30 -ml-0.5 pointer-events-none"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-[#0f766e] border-2 border-white text-white flex items-center justify-center shadow-lg">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
