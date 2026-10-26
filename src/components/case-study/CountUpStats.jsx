import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CountUpStats({ isDark = true }) {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated values state
  const [progressVal, setProgressVal] = useState(0);
  const [leadVal, setLeadVal] = useState(0);
  const [ratingVal, setRatingVal] = useState(0.0);

  const ringRef = useRef(null);
  const trendLineRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setProgressVal(100);
      setLeadVal(480);
      setRatingVal(5.0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // 1. Count-up 100% and stroke ring
          const obj1 = { val: 0 };
          gsap.to(obj1, {
            val: 100,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => setProgressVal(Math.round(obj1.val))
          });

          if (ringRef.current) {
            gsap.fromTo(
              ringRef.current,
              { strokeDashoffset: 283 },
              { strokeDashoffset: 0, duration: 2, ease: 'power3.out' }
            );
          }

          // 2. Count-up 480 and grow bars
          const obj2 = { val: 0 };
          gsap.to(obj2, {
            val: 480,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => setLeadVal(Math.round(obj2.val))
          });

          barsRef.current.forEach((bar, idx) => {
            if (bar) {
              const targetHeight = 25 + idx * 11;
              gsap.fromTo(
                bar,
                { height: 0 },
                { height: `${targetHeight}%`, duration: 1.5, delay: idx * 0.1, ease: 'power3.out' }
              );
            }
          });

          // 3. Count-up 5.0 and draw trendline
          const obj3 = { val: 0.0 };
          gsap.to(obj3, {
            val: 5.0,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => setRatingVal(Number(obj3.val.toFixed(1)))
          });

          if (trendLineRef.current) {
            gsap.fromTo(
              trendLineRef.current,
              { strokeDashoffset: 240 },
              { strokeDashoffset: 0, duration: 2, ease: 'power3.out' }
            );
          }
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="py-12 sm:py-16 my-8">
      <div className="text-center max-w-[620px] mx-auto mb-10">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-widest ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          MEASURED OPERATIONAL METRICS
        </span>
        <h3 className={`text-2xl sm:text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Production Outcomes in High-Volume Scale
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Verified numbers from live Canadian retail e-commerce deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1040px] mx-auto">
        
        {/* Card 1: Circular Progress Ring (100% Human Approval) */}
        <div
          className={`p-7 rounded-3xl border shadow-xl flex flex-col items-center text-center justify-between transition-colors ${
            isDark
              ? 'bg-[#0f131d] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
            Safety Guarantee
          </div>

          <div className="relative w-36 h-36 my-2 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeWidth="8" />
              {/* Animated Progress circle */}
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDark ? '#00f2fe' : '#0284c7'}
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={hasAnimated ? 0 : 283}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-black leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {progressVal}%
              </span>
              <span className={`text-[10px] font-mono font-bold uppercase mt-0.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                Vetted
              </span>
            </div>
          </div>

          <div>
            <div className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Human Approval Before Dispatch
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Zero automated messages sent without explicit one-click sign-off.
            </div>
          </div>
        </div>

        {/* Card 2: Revenue / Inquiries Bar Chart */}
        <div
          className={`p-7 rounded-3xl border shadow-xl flex flex-col justify-between transition-colors ${
            isDark
              ? 'bg-[#0f131d] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          <div>
            <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
              Weekly Throughput
            </div>
            <div className={`text-3xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {leadVal.toLocaleString()}+ <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Leads / Mo</span>
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Inquiries processed with 0 dropped webhooks.
            </div>
          </div>

          {/* 7 Animated Bars */}
          <div className="h-32 w-full flex items-end justify-between gap-2 pt-4 px-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  ref={(el) => (barsRef.current[i] = el)}
                  style={{ height: hasAnimated ? `${25 + i * 11}%` : '0%' }}
                  className={`w-full rounded-t-lg transition-all ${
                    i === 6
                      ? 'bg-gradient-to-t from-cyan-500 to-blue-500 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                      : isDark
                      ? 'bg-slate-800'
                      : 'bg-slate-200'
                  }`}
                />
                <span className={`text-[9px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>D{i + 1}</span>
              </div>
            ))}
          </div>

          <div className={`pt-2 border-t text-xs font-mono font-bold flex items-center justify-between ${
            isDark ? 'border-slate-800 text-cyan-400' : 'border-slate-200 text-cyan-700'
          }`}>
            <span>Peak Sunday Traffic</span>
            <span>100% Handled</span>
          </div>
        </div>

        {/* Card 3: Rating & SVG Trendline */}
        <div
          className={`p-7 rounded-3xl border shadow-xl flex flex-col justify-between transition-colors ${
            isDark
              ? 'bg-[#0f131d] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          <div>
            <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
              Client Satisfaction
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {ratingVal.toFixed(1)}
              </span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              100% grounded facts extracted directly from business information chunks.
            </div>
          </div>

          {/* Drawing SVG Trendline */}
          <div className={`h-24 w-full rounded-2xl p-3 border flex items-center ${
            isDark ? 'bg-[#131824] border-cyan-500/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
              <path
                ref={trendLineRef}
                d="M0,50 Q40,40 80,30 T140,20 T200,6"
                fill="none"
                stroke={isDark ? '#22d3ee' : '#0284c7'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="240"
                strokeDashoffset={hasAnimated ? 0 : 240}
              />
            </svg>
          </div>

          <div className={`pt-2 border-t text-xs font-mono font-bold flex items-center justify-between ${
            isDark ? 'border-slate-800 text-cyan-400' : 'border-slate-200 text-cyan-700'
          }`}>
            <span>Verified Business Chunks</span>
            <span>Gold Standard</span>
          </div>
        </div>

      </div>
    </div>
  );
}
