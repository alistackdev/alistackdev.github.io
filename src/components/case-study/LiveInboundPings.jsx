import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShoppingBag, MessageSquare, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

const INBOUND_ORDERS = [
  { id: 1, type: 'Commercial Volume Quote', amount: 4200, city: 'Calgary, AB', time: 'just now', channel: 'Live Chat' },
  { id: 2, type: 'Enterprise Hardware Spec', amount: 8950, city: 'Edmonton, AB', time: 'just now', channel: 'Contact Form' },
  { id: 3, type: 'Repeat Volume Order', amount: 3400, city: 'Toronto, ON', time: 'just now', channel: 'Direct Email' },
  { id: 4, type: 'Expedited Freight Quote', amount: 12600, city: 'Vancouver, BC', time: 'just now', channel: 'Live Chat' },
  { id: 5, type: 'Institutional Contract Inquiry', amount: 15800, city: 'Ottawa, ON', time: 'just now', channel: 'Web Form' },
  { id: 6, type: 'Custom Component Package', amount: 5100, city: 'Montreal, QC', time: 'just now', channel: 'Direct Email' }
];

export default function LiveInboundPings({ isDark = true }) {
  const [notifications, setNotifications] = useState(INBOUND_ORDERS.slice(0, 3));
  const [totalRevenue, setTotalRevenue] = useState(16550);
  const [totalInquiries, setTotalInquiries] = useState(3);
  const sparklineRef = useRef(null);
  const revenueCounterRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let index = 3;
    const interval = setInterval(() => {
      const nextItem = {
        ...INBOUND_ORDERS[index % INBOUND_ORDERS.length],
        id: Date.now()
      };

      setNotifications((prev) => {
        const updated = [nextItem, ...prev.slice(0, 3)]; // Keep at most 4
        return updated;
      });

      // Increment revenue & inquiry count
      setTotalRevenue((prev) => prev + nextItem.amount);
      setTotalInquiries((prev) => prev + 1);

      // Animate top notification drop-in
      setTimeout(() => {
        const firstEl = document.querySelector('.inbound-ping-item');
        if (firstEl) {
          gsap.fromTo(
            firstEl,
            { y: -30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)' }
          );
        }
      }, 50);

      // Animate SVG sparkline
      if (sparklineRef.current) {
        gsap.fromTo(
          sparklineRef.current,
          { strokeDashoffset: 120 },
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }
        );
      }

      index++;
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-[#0b0e14] rounded-3xl border border-cyan-500/20 p-6 sm:p-10 my-8 shadow-2xl">
      <div className="text-center max-w-[620px] mx-auto mb-10">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          REAL-TIME INBOUND CONVERSION FEED
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Live Lead Arrival &amp; Instant Pipeline Valuation
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Every inquiry is captured immediately, valued, and queued for 1-click human verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-[1000px] mx-auto">
        
        {/* Left: Dark Phone Mockup (5 Cols) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-[300px] sm:w-[320px] rounded-[42px] bg-[#07090e] p-4 shadow-2xl border-4 border-slate-700/80 relative">
            
            {/* Phone Notch & Clock */}
            <div className="flex items-center justify-between px-4 pt-1 pb-3 text-white text-xs font-bold border-b border-slate-800">
              <span>9:41</span>
              <div className="w-16 h-4 bg-black rounded-full" />
              <span>5G · 100%</span>
            </div>

            {/* Notification Stream */}
            <div className="py-4 space-y-2.5 min-h-[300px]">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
                Incoming Leads · Lock Screen
              </div>

              {notifications.map((item, idx) => (
                <div
                  key={item.id}
                  className={`inbound-ping-item p-3 rounded-2xl bg-[#0f141f] border border-slate-700/80 text-white shadow-sm flex items-start gap-2.5 transition-all ${
                    idx === 0 ? 'ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.15)]' : 'opacity-85'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 text-white shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-cyan-300">
                        +${item.amount.toLocaleString()} CAD
                      </span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">{item.type}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{item.city}</span>
                      <span>·</span>
                      <span className="text-cyan-400">{item.channel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
          </div>
        </div>

        {/* Right: Revenue & Inquiry Counter Card (6 Cols) */}
        <div
          className={`lg:col-span-6 rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
            isDark
              ? 'bg-[#0f131d] border-slate-800 text-white shadow-xl'
              : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div>
              <span
                className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'text-cyan-400' : 'text-cyan-700'
                }`}
              >
                TODAY&apos;S INBOUND PIPELINE
              </span>
              <h4 className={`text-lg font-black mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Active Inbound Velocity
              </h4>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                isDark
                  ? 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              }`}
            >
              Live Stream
            </span>
          </div>

          {/* Revenue Big Number */}
          <div className="space-y-1">
            <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Total Pipeline Captured:
            </div>
            <div className="text-[34px] sm:text-[44px] font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
              ${totalRevenue.toLocaleString()}{' '}
              <span className={`text-sm font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>CAD</span>
            </div>
          </div>

          {/* Inquiry Count */}
          <div
            className={`grid grid-cols-2 gap-4 p-4 rounded-2xl border ${
              isDark ? 'bg-[#141926] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Inquiries Captured:
              </div>
              <div className={`text-2xl font-black mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {totalInquiries}
              </div>
            </div>
            <div>
              <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Avg Draft Time:
              </div>
              <div className={`text-2xl font-black mt-0.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                1.4 sec
              </div>
            </div>
          </div>

          {/* Animated SVG Sparkline */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold flex items-center justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Hourly Lead Rate Velocity:</span>
              <span className={`font-mono font-extrabold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                +18.4% vs last week
              </span>
            </div>
            <div
              className={`h-16 w-full rounded-xl p-2 flex items-center border ${
                isDark ? 'bg-[#141926] border-cyan-500/20' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <svg viewBox="0 0 240 50" className="w-full h-full overflow-visible">
                <path
                  ref={sparklineRef}
                  d="M0,40 Q30,35 60,25 T120,28 T180,10 T240,4"
                  fill="none"
                  stroke={isDark ? '#22d3ee' : '#0284c7'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="260"
                  strokeDashoffset="0"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
