import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, Loader2, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

export default function ClickSuccessCTA({ isDark = true }) {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const buttonRef = useRef(null);
  const labelRef = useRef(null);

  const fakeSubmit = () => {
    return new Promise((resolve) => setTimeout(resolve, 1200));
  };

  const handleClick = async () => {
    if (state !== 'idle') return;
    playClickSound();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setState('loading');
      await fakeSubmit();
      setState('success');
      return;
    }

    // GSAP Timeline: fade label & shrink button
    const tl = gsap.timeline();
    setState('loading');

    tl.to(labelRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    }).to(buttonRef.current, {
      width: '130px',
      paddingLeft: '0px',
      paddingRight: '0px',
      duration: 0.45,
      ease: 'power3.inOut'
    });

    try {
      await fakeSubmit();

      setState('success');

      // Turn button brand colour & pop check
      tl.to(buttonRef.current, {
        backgroundColor: '#0f766e',
        duration: 0.3
      });

      // Burst 28 confetti pieces outwards at random angles
      confetti({
        particleCount: 28,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#0f766e', '#2dd4bf', '#10b981', '#f59e0b', '#3b82f6']
      });
    } catch (err) {
      // On error, shake button
      gsap.to(buttonRef.current, {
        x: '+=10',
        yoyo: true,
        repeat: 5,
        duration: 0.08,
        onComplete: () => {
          setState('idle');
          gsap.set(buttonRef.current, { width: 'auto', x: 0 });
          gsap.to(labelRef.current, { opacity: 1 });
        }
      });
    }
  };

  return (
    <div className="py-16 sm:py-24 text-center">
      <div className="max-w-[720px] mx-auto px-4">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 border ${
            isDark
              ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
              : 'bg-cyan-50 border-cyan-200 text-cyan-800'
          }`}
        >
          SCHEDULE A TECHNICAL WALKTHROUGH
        </span>

        <h3
          className={`text-3xl sm:text-5xl font-black mb-4 tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Ready to eliminate slow customer replies?
        </h3>

        <p
          className={`text-base sm:text-lg max-w-[50ch] mx-auto mb-8 font-normal leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Click below to initiate your architecture consultation. We will analyze your inbound channels and show how a custom Node.js system scales with zero hallucination risk.
        </p>

        {/* Centered Large Pill Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            disabled={state === 'loading' || state === 'success'}
            style={{ width: 'auto', minWidth: '220px' }}
            className={`h-[56px] px-8 rounded-full font-mono font-bold text-sm sm:text-base tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/40 ${
              state === 'success'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-blue-400 text-white shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.8)] hover:scale-[1.02]'
            }`}
          >
            {state === 'idle' && (
              <span ref={labelRef} className="flex items-center gap-2">
                <span>Book Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}

            {state === 'loading' && (
              <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
            )}

            {state === 'success' && (
              <span className="flex items-center gap-2 text-white">
                <Check className="w-5 h-5 stroke-[3] text-white" />
                <span>Confirmed!</span>
              </span>
            )}
          </button>

          {/* Success Message */}
          {state === 'success' && (
            <div className="mt-5 p-4 rounded-2xl bg-[#f0fdfa] border border-[#ccfbf1] text-xs sm:text-sm text-[#0f766e] font-extrabold shadow-xs max-w-md animate-fade-in">
              🎉 Thank you! Your request has been logged. Ali Hassan will personally review your inbound channels and email you within 2 hours.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
