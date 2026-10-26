import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star, ShieldCheck } from 'lucide-react';

const REVIEWS = [
  {
    quote:
      'The sub-2s drafts completely changed our daily workflow. Looking up volume pricing and freight rules used to take our staff 15 minutes per customer. Now it takes 1 click to verify and send.',
    name: 'Marcus L.',
    role: 'Operations Director',
    company: 'Canadian Enterprise Client',
    avatarBg: 'bg-emerald-600',
    stars: 5
  },
  {
    quote:
      'Zero hallucinations. We were terrified an AI bot would quote inaccurate delivery times or discount policies to major buyers. The 100% human approval gate gives us absolute confidence.',
    name: 'Sarah K.',
    role: 'E-Commerce GM',
    company: 'Multi-Channel Retail Brand',
    avatarBg: 'bg-teal-600',
    stars: 5
  },
  {
    quote:
      'Replacing our fragile Zapier setup with Ali’s custom Node.js system eliminated all dropped leads during weekend volume spikes, and saved us over $400/month in per-task billing fees.',
    name: 'David R.',
    role: 'VP of Technology',
    company: 'Logistics Partner',
    avatarBg: 'bg-blue-600',
    stars: 5
  }
];

export default function ReviewShuffle({ isDark = true }) {
  const [deck, setDeck] = useState(REVIEWS);
  const isHovered = useRef(false);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (isHovered.current) return;

      const topCard = cardsContainerRef.current?.querySelector('.top-card');
      if (!topCard) return;

      // Animate top card throwing off to the left with -18 deg rotation
      gsap.to(topCard, {
        x: -280,
        y: -30,
        rotation: -18,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.in',
        onComplete: () => {
          // Rotate deck state
          setDeck((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first];
          });

          // Reset position immediately
          gsap.set(topCard, { x: 0, y: 0, rotation: 0, opacity: 1 });
        }
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      className={`py-12 sm:py-16 rounded-3xl p-6 sm:p-10 my-8 shadow-xl transition-colors border ${
        isDark
          ? 'bg-[#0f1422] text-white border-slate-800'
          : 'bg-white text-slate-900 border-slate-200 shadow-xl'
      }`}
    >
      <div className="text-center max-w-[580px] mx-auto mb-12">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          STAKEHOLDER VERIFICATION
        </span>
        <h3 className={`text-2xl sm:text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Client Feedback on the System
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Hover to pause the shuffle and read full feedback.
        </p>
      </div>

      {/* Cards Stack */}
      <div ref={cardsContainerRef} className="relative h-[280px] sm:h-[240px] max-w-[560px] mx-auto">
        {deck.map((rev, index) => {
          const isTop = index === 0;
          const yOffset = index * 26; // 26px lower
          const scale = 1 - index * 0.05; // 5% smaller
          const opacity = 1 - index * 0.22; // fainter

          return (
            <div
              key={rev.name}
              style={{
                transform: `translateY(${yOffset}px) scale(${scale})`,
                opacity: opacity,
                zIndex: 10 - index
              }}
              className={`absolute inset-x-0 top-0 p-6 sm:p-7 rounded-2xl border shadow-xl transition-all duration-500 ease-out ${
                isTop ? 'top-card' : ''
              } ${
                isDark
                  ? 'bg-slate-900/95 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xl'
              }`}
            >
              {/* Stars & Verified Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isDark
                      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Client</span>
                </span>
              </div>

              {/* Quote */}
              <p
                className={`text-sm sm:text-base italic leading-relaxed font-serif mb-4 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                &quot;{rev.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-black text-xs flex items-center justify-center shadow-xs`}
                >
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{rev.name}</div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {rev.role} · {rev.company}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Under Deck Proof Label */}
      <div className={`text-center mt-12 text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <span className="text-amber-500 font-extrabold">★ 5.0</span> average from verified stakeholders across production deployment
      </div>
    </div>
  );
}
