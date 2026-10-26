import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, Zap, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

export default function CostRoll({ isDark = true }) {
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useRef(null);

  const plans = [
    {
      id: 'zapier',
      name: 'Zapier / No-Code Setup',
      badge: 'Brittle & Fragile',
      badgeColor: 'bg-red-100 text-red-700',
      priceMonthly: 480,
      priceYearly: 384,
      desc: 'Expensive per-task fees that explode as your inquiry volume scales.',
      features: ['Drops webhooks under high traffic', 'Forgets multi-day conversation context', 'Zero active learning from human edits'],
      highlighted: false
    },
    {
      id: 'custom',
      name: 'Ali’s Custom Architecture',
      badge: 'Save 95% · Recommended',
      badgeColor: 'bg-emerald-500 text-white',
      priceMonthly: 24,
      priceYearly: 19,
      desc: 'High-speed, self-hosted Node.js system with zero per-task subscriptions.',
      features: ['Sub-50ms native asynchronous queue', '100% Human approval before dispatch', 'Continuous Google Sheets active learning'],
      highlighted: true
    },
    {
      id: 'staff',
      name: 'Full-Time Support Rep',
      badge: 'High Overhead',
      badgeColor: 'bg-slate-200 text-slate-700',
      priceMonthly: 3200,
      priceYearly: 2800,
      desc: 'Hiring full-time administrative staff to manually draft replies all day.',
      features: ['Slow 24–48hr turnaround on busy days', 'Fatigue and human lookup errors', 'High monthly fixed salary cost'],
      highlighted: false
    }
  ];

  const rollDigit = (el, digit) => {
    if (!el) return;
    const digitHeight = 40; // px
    gsap.to(el, {
      y: -digit * digitHeight,
      duration: 0.9,
      ease: 'power3.inOut'
    });
  };

  useEffect(() => {
    plans.forEach((plan) => {
      const price = isYearly ? plan.priceYearly : plan.priceMonthly;
      const digits = price.toString().split('');
      const cardEl = document.getElementById(`plan-card-${plan.id}`);
      if (cardEl) {
        const columnEls = cardEl.querySelectorAll('.odometer-column');
        columnEls.forEach((col, idx) => {
          const targetDigit = parseInt(digits[idx] || '0', 10);
          rollDigit(col, targetDigit);
        });
      }
    });
  }, [isYearly]);

  return (
    <div ref={containerRef} className="py-12 sm:py-20 my-8">
      <div className="text-center max-w-[640px] mx-auto mb-10">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          INFRASTRUCTURE ROI CALCULATOR
        </span>
        <h3 className={`text-2xl sm:text-4xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Operating Cost Comparison
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Why self-hosted custom architecture delivers higher speed at a fraction of the monthly cost.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div
          className={`inline-flex items-center gap-3 mt-6 p-1.5 rounded-2xl border shadow-md ${
            isDark ? 'bg-[#0f131d] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsYearly(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              !isYearly ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,242,254,0.3)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsYearly(true);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isYearly ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,242,254,0.3)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] bg-emerald-400 text-emerald-950 font-extrabold px-1.5 py-0.5 rounded">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1040px] mx-auto items-stretch">
        {plans.map((p) => {
          const price = isYearly ? p.priceYearly : p.priceMonthly;
          const digits = price.toString().split('');

          return (
            <div
              key={p.id}
              id={`plan-card-${p.id}`}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                p.highlighted
                  ? 'bg-gradient-to-b from-[#111929] to-[#090e1a] text-white shadow-[0_0_35px_rgba(0,242,254,0.25)] scale-[1.03] border-2 border-cyan-400/50'
                  : 'bg-[#0f131d] text-white border border-slate-800 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide ${
                    p.highlighted ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black' : p.badgeColor
                  }`}>
                    {p.badge}
                  </span>
                  {p.highlighted && (
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  )}
                </div>

                <h4 className="text-xl font-black mb-1">{p.name}</h4>
                <p className="text-xs text-slate-400 mb-6">
                  {p.desc}
                </p>

                {/* Rolling Odometer Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold text-cyan-400">$</span>
                  <div className="flex items-center">
                    {digits.map((digit, colIdx) => (
                      <div
                        key={colIdx}
                        className="h-[40px] w-[26px] overflow-hidden relative inline-block text-center font-black text-3xl sm:text-4xl text-white font-mono"
                      >
                        <div className="odometer-column flex flex-col">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                            <span key={n} className="h-[40px] flex items-center justify-center leading-none">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold ml-1.5 text-slate-400">
                    / month
                  </span>
                </div>

                {/* 3 Features */}
                <ul className="space-y-3 text-xs mb-8">
                  {p.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          p.highlighted ? 'text-cyan-400' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-slate-300">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href="/#contact"
                  className={`w-full py-3.5 px-4 rounded-xl font-mono font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center transition-all ${
                    p.highlighted
                      ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-blue-400 text-white shadow-[0_0_20px_rgba(0,242,254,0.4)]'
                      : 'bg-[#141926] hover:bg-[#1a2336] text-slate-300 border border-slate-700'
                  }`}
                >
                  {p.highlighted ? 'DEPLOY CUSTOM ARCHITECTURE' : 'LEARN MORE'}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
