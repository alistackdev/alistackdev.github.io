import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function WordRotator({ isDark = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wordRef = useRef(null);

  const words = ['ACCURATE', 'GROUNDED', 'INSTANT', 'HUMAN-APPROVED'];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (wordRef.current) {
        gsap.to(wordRef.current, {
          y: -24,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
            gsap.fromTo(
              wordRef.current,
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }
            );
          }
        });
      } else {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div
      className={`text-center py-8 sm:py-12 rounded-3xl border max-w-[800px] mx-auto my-6 px-4 transition-colors ${
        isDark
          ? 'bg-[#0d111a] border-cyan-500/20 shadow-[0_0_35px_rgba(0,0,0,0.6)]'
          : 'bg-white border-slate-200 shadow-xl'
      }`}
    >
      {/* Line 1 */}
      <div
        className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-2 ${
          isDark ? 'text-cyan-400' : 'text-cyan-700'
        }`}
      >
        INBOUND FOLLOW-UPS ENGINEERED TO BE
      </div>

      {/* Line 2: The Rotator Pill */}
      <div className="flex justify-center items-center my-2">
        <div className="h-[52px] overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white px-6 sm:px-8 rounded-2xl shadow-[0_0_25px_rgba(0,242,254,0.35)] min-w-[260px] sm:min-w-[340px] flex items-center justify-center border border-cyan-300/30">
          <div
            ref={wordRef}
            className="font-black text-lg sm:text-2xl tracking-wider uppercase text-white font-mono select-none"
          >
            {words[currentIndex]}
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2 mt-3 mb-2">
        {words.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === i
                ? isDark
                  ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
                  : 'w-6 bg-blue-600 shadow-xs'
                : isDark
                ? 'w-2 bg-slate-700'
                : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Line 3 */}
      <div
        className={`text-xs sm:text-sm font-light mt-1 ${
          isDark ? 'text-slate-400' : 'text-slate-600 font-normal'
        }`}
      >
        Across Website Live Chat, Contact Forms, and Inbound Email Threads.
      </div>
    </div>
  );
}
