import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

export default function UsVsThem({ onCtaClick, isDark = true }) {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);
  const glowRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const comparisons = [
    {
      feature: 'Zero-Hallucination Pricing & Specs',
      others: 'Hallucinates discounts & promises false dates',
      us: '100% Grounded in business information chunks'
    },
    {
      feature: 'Multi-Day Conversation History',
      others: 'Forgets earlier chat parts across sessions',
      us: 'Unified session memory with composite MySQL index'
    },
    {
      feature: 'Human Approval Gate Before Send',
      others: 'Either autonomous bot blunders or manual typing',
      us: '100% Human 1-click verification gate'
    },
    {
      feature: 'Active Learning from Human Edits',
      others: 'Repeats the exact same errors indefinitely',
      us: 'Edits & stars sync to Google Sheets memory'
    },
    {
      feature: 'Monthly Infrastructure Overhead',
      others: '$400–$600/mo in escalating task fees',
      us: '$20–$30/mo flat self-hosted VPS overhead'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);

          // 1. Grow in brand glow behind 'Us' column
          if (glowRef.current) {
            gsap.fromTo(
              glowRef.current,
              { scaleY: 0, opacity: 0 },
              { scaleY: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
          }

          // 2. Slide rows in from left with stagger
          rowsRef.current.forEach((row, i) => {
            if (row) {
              gsap.fromTo(
                row,
                { opacity: 0, x: -40 },
                { opacity: 1, x: 0, duration: 0.6, delay: 0.2 + i * 0.12, ease: 'power3.out' }
              );

              // Pop white check on brand circle with back.out(3)
              const checkIcon = row.querySelector('.us-check-icon');
              if (checkIcon) {
                gsap.fromTo(
                  checkIcon,
                  { scale: 0, rotation: -45 },
                  { scale: 1, rotation: 0, duration: 0.5, delay: 0.4 + i * 0.12, ease: 'back.out(3)' }
                );
              }
            }
          });
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <div
      ref={containerRef}
      className={`py-14 sm:py-20 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl relative overflow-hidden transition-colors border ${
        isDark
          ? 'bg-[#0f1422] text-white border-slate-800'
          : 'bg-white text-slate-900 border-slate-200 shadow-xl'
      }`}
    >
      <div className="text-center max-w-[620px] mx-auto mb-12">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          DIRECT FEATURE-BY-FEATURE BENCHMARK
        </span>
        <h3 className={`text-2xl sm:text-4xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Generic AI Bots vs Ali&apos;s Architecture
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Why enterprise businesses cannot rely on fragile off-the-shelf wrappers.
        </p>
      </div>

      <div className="max-w-[960px] mx-auto relative">
        {/* Us Column Glow Backdrop */}
        <div
          ref={glowRef}
          style={{ transformOrigin: 'top' }}
          className="absolute right-0 top-0 bottom-0 w-[42%] sm:w-[40%] rounded-2xl bg-[#0f766e]/20 border border-[#0f766e]/40 shadow-[0_0_30px_rgba(15,118,110,0.2)] pointer-events-none"
        />

        {/* Table Header */}
        <div className="grid grid-cols-12 pb-4 border-b border-slate-700 text-xs font-black uppercase tracking-wider text-slate-400 relative z-10 px-2 sm:px-4">
          <div className="col-span-5 sm:col-span-5 text-slate-200">System Requirement</div>
          <div className="col-span-3 sm:col-span-3 text-red-400 text-center">Others (Zapier / Bots)</div>
          <div className="col-span-4 sm:col-span-4 text-[#2dd4bf] text-center font-extrabold flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our System</span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-800 relative z-10">
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              ref={(el) => (rowsRef.current[i] = el)}
              className="grid grid-cols-12 py-4 sm:py-5 items-center text-xs sm:text-sm px-2 sm:px-4 transition-all hover:bg-slate-800/40"
            >
              <div className="col-span-5 sm:col-span-5 font-bold text-white pr-2">
                {row.feature}
              </div>

              {/* Others (Grey Cross) */}
              <div className="col-span-3 sm:col-span-3 text-center flex flex-col items-center justify-center px-1">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mb-1">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 hidden sm:inline leading-tight">
                  {row.others}
                </span>
              </div>

              {/* Us (Brand Circle + Check) */}
              <div className="col-span-4 sm:col-span-4 text-center flex flex-col items-center justify-center px-1">
                <div className="us-check-icon w-6 h-6 rounded-full bg-[#0f766e] text-white flex items-center justify-center shadow-md mb-1">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-200 leading-tight">
                  {row.us}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* White Pill CTA Button */}
      <div className="text-center mt-10">
        <a
          href="/#contact"
          onClick={() => {
            playClickSound();
            if (onCtaClick) onCtaClick();
          }}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0f172a] font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>Schedule an Architecture Walkthrough</span>
          <ArrowRight className="w-4 h-4 text-[#0f766e]" />
        </a>
      </div>
    </div>
  );
}
