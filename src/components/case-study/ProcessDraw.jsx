import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check } from 'lucide-react';

export default function ProcessDraw({ isDark = true }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [activeNodes, setActiveNodes] = useState([false, false, false]);
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setActiveNodes([true, true, true]);
      setShowPill(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const pathEl = pathRef.current;
          if (!pathEl) return;

          const totalLength = pathEl.getTotalLength ? pathEl.getTotalLength() : 600;

          gsap.set(pathEl, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength
          });

          const tl = gsap.timeline();

          // Draw the wavy path over 2 seconds
          tl.to(pathEl, {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: function () {
              const prog = this.progress();
              if (prog >= 0.15 && !activeNodes[0]) {
                setActiveNodes((prev) => [true, prev[1], prev[2]]);
              }
              if (prog >= 0.55 && !activeNodes[1]) {
                setActiveNodes((prev) => [true, true, prev[2]]);
              }
              if (prog >= 0.95 && !activeNodes[2]) {
                setActiveNodes([true, true, true]);
                setShowPill(true);
              }
            }
          });
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: 1,
      title: 'Inbound Intake & Filter',
      desc: 'Zoho chat, contact forms & emails parsed. Actionable leads separated from anonymous bots.'
    },
    {
      num: 2,
      title: '3-Layer Knowledge Grounding',
      desc: 'Business information chunks + Starred responses + Human edit notes assembled to draft in 1.4s.'
    },
    {
      num: 3,
      title: '1-Click Human Sign-Off',
      desc: 'Admin approves or edits. Sent to customer + learning feedback synced to Google Sheets.'
    }
  ];

  return (
    <div
      ref={containerRef}
      className={`py-14 sm:py-20 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl relative overflow-hidden transition-colors border ${
        isDark
          ? 'bg-[#0f1422] text-white border-slate-800'
          : 'bg-white text-slate-900 border-slate-200 shadow-xl'
      }`}
    >
      <div className="text-center max-w-[620px] mx-auto mb-16">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          END-TO-END EXECUTION LIFECYCLE
        </span>
        <h3 className={`text-2xl sm:text-4xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          How Every Lead Moves Through the System
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Connected through an uninterrupted asynchronous pipeline.
        </p>
      </div>

      {/* SVG Connecting Wavy Path (Desktop) */}
      <div className="relative max-w-[860px] mx-auto mb-10">
        <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[40px] pointer-events-none z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 40" fill="none">
            <path
              ref={pathRef}
              d="M0,20 Q175,-10 350,20 T700,20"
              stroke="#0f766e"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* 3 Step Nodes in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((st, i) => (
            <div key={st.num} className="flex flex-col items-center text-center">
              {/* Node Circle */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-base transition-all duration-500 shadow-md ${
                  activeNodes[i]
                    ? 'bg-[#0f766e] text-white ring-4 ring-[#0f766e]/30 scale-110'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {activeNodes[i] ? <Check className="w-6 h-6 text-white stroke-[3]" /> : st.num}
              </div>

              {/* Text */}
              <div className="mt-4 font-extrabold text-base text-white">{st.title}</div>
              <p className="mt-1.5 text-xs text-slate-300 max-w-[26ch] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Outcome Pill */}
      <div className="text-center mt-10">
        <div
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs sm:text-sm shadow-md transition-all duration-700 ${
            showPill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span>Result: &lt; 2s Follow-Up Drafts · 100% Control · Zero Hallucinations</span>
        </div>
      </div>
    </div>
  );
}
