import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/sound';

export default function HeroReveal({ onExploreClick, onContactClick, isDark = true }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const proofCardRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show immediately
      if (headlineRef.current) headlineRef.current.style.opacity = '1';
      if (subtextRef.current) subtextRef.current.style.opacity = '1';
      if (buttonsRef.current) buttonsRef.current.style.opacity = '1';
      if (proofCardRef.current) proofCardRef.current.style.opacity = '1';
      return;
    }

    const words = headlineRef.current.querySelectorAll('.hero-word');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 01. Animate words in with stagger
    tl.fromTo(
      words,
      { opacity: 0, y: 40, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.08 }
    );

    // 02. Fade in subtext and buttons
    tl.fromTo(
      subtextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );

    tl.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // 03. Slide up proof card
    tl.fromTo(
      proofCardRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const headlineText = 'Never Lose a Customer to';
  const highlightWord = 'Slow Replies';
  const headlineEnd = 'Again.';

  return (
    <div ref={containerRef} className="text-center max-w-[1000px] mx-auto pt-8 pb-12 sm:pt-14 sm:pb-16 px-4">
      {/* Eyebrow */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wide mb-6 ${
          isDark
            ? 'bg-cyan-950/50 border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
            : 'bg-cyan-50 border-cyan-200 text-cyan-800 shadow-xs'
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
        <span>CANADIAN E-COMMERCE ENTERPRISE · PRODUCTION CASE STUDY</span>
      </div>

      {/* Animated Headline */}
      <h1
        ref={headlineRef}
        className={`font-black text-[38px] sm:text-[58px] md:text-[68px] leading-[1.06] tracking-[-0.035em] mb-6 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {headlineText.split(' ').map((word, i) => (
          <span key={`start-${i}`} className="hero-word inline-block mr-2.5 sm:mr-3.5">
            {word}
          </span>
        ))}
        <span
          className={`hero-word inline-block mr-2.5 sm:mr-3.5 text-transparent bg-clip-text ${
            isDark
              ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 drop-shadow-[0_0_25px_rgba(0,242,254,0.4)]'
              : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 drop-shadow-xs'
          }`}
        >
          {highlightWord}
        </span>
        <span className="hero-word inline-block">
          {headlineEnd}
        </span>
      </h1>

      {/* Subtext */}
      <p
        ref={subtextRef}
        className={`text-[17px] sm:text-[21px] leading-[1.5] max-w-[50ch] mx-auto mb-8 ${
          isDark ? 'text-slate-300 font-light' : 'text-slate-600 font-normal'
        }`}
      >
        Unify multi-channel customer inquiries — <span className="text-cyan-400 font-medium">live chat, web forms, and direct emails</span> — into one dedicated command dashboard. Get sub-2s verified AI drafts with 100% human sign-off before anything is sent.
      </p>

      {/* CTA Buttons */}
      <div ref={buttonsRef} className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            if (onExploreClick) onExploreClick();
          }}
          onMouseEnter={() => playHoverSound()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-blue-400 text-white font-mono font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.8)] hover:scale-[1.02] transition-all cursor-pointer border border-cyan-300/40"
        >
          <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
          <span>EXPLORE LIVE BLUEPRINT</span>
          <ArrowRight className="w-4 h-4 text-cyan-200" />
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            if (onContactClick) onContactClick();
          }}
          onMouseEnter={() => playHoverSound()}
          className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm tracking-wider transition-all cursor-pointer ${
            isDark
              ? 'bg-[#0c1021]/80 hover:bg-[#121833] border border-cyan-500/30 hover:border-cyan-400/70 text-slate-200 hover:shadow-[0_0_20px_rgba(0,242,254,0.2)]'
              : 'bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-sm hover:border-slate-400'
          }`}
        >
          <span>DISCUSS ARCHITECTURE</span>
        </button>
      </div>

      {/* Real Proof Card */}
      <div
        ref={proofCardRef}
        className={`inline-flex flex-wrap justify-center items-center gap-3 sm:gap-6 px-6 py-3.5 rounded-2xl border text-xs sm:text-sm ${
          isDark
            ? 'bg-[#0e131d]/90 border-cyan-500/25 shadow-[0_0_25px_rgba(0,0,0,0.8)] text-white'
            : 'bg-white border-slate-200 shadow-lg text-slate-800'
        }`}
      >
        <div className={`flex items-center gap-2 font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>1 Dedicated Dashboard</span>
        </div>
        <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'} hidden sm:inline`} />
        <div className={`flex items-center gap-2 font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Human Approval Gate</span>
        </div>
        <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
        <div className={`font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          &lt; 1.4s <span className={`font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Draft Speed</span>
        </div>
        <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'} hidden sm:inline`} />
        <div className={`font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} hidden sm:inline`}>
          0% <span className={`font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Hallucinations</span>
        </div>
      </div>
    </div>
  );
}
