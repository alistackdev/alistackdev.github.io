import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Cpu, Database, Layers, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BentoFeatures({ isDark = true }) {
  const containerRef = useRef(null);
  const tilesRef = useRef([]);
  const [typedText, setTypedText] = useState('');
  const fullPromptText = 'Injecting: (1) Business Chunk #184 + (2) Starred Response #42 + (3) Edit Rule: "Free express shipping over $500"';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTypedText(fullPromptText);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Fly in each tile from different directions with rotation & back.out
          const directions = [
            { x: -50, y: -40, rotation: -8 },
            { x: 50, y: -40, rotation: 8 },
            { x: -50, y: 30, rotation: 6 },
            { x: 50, y: 30, rotation: -6 },
            { x: 0, y: 60, rotation: 0 }
          ];

          tilesRef.current.forEach((tile, i) => {
            if (tile) {
              const dir = directions[i] || { x: 0, y: 30, rotation: 0 };
              gsap.fromTo(
                tile,
                {
                  opacity: 0,
                  x: dir.x,
                  y: dir.y,
                  rotation: dir.rotation,
                  scale: 0.85
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 0.8,
                  delay: i * 0.14,
                  ease: 'back.out(1.5)',
                  onComplete: () => {
                    // Start inner typing after first tile lands
                    if (i === 0) {
                      let charIdx = 0;
                      const typeInterval = setInterval(() => {
                        setTypedText(fullPromptText.slice(0, charIdx));
                        charIdx++;
                        if (charIdx > fullPromptText.length) clearInterval(typeInterval);
                      }, 25);
                    }
                  }
                }
              );
            }
          });
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`py-12 sm:py-20 rounded-3xl p-6 sm:p-10 my-8 shadow-2xl transition-colors border ${
        isDark
          ? 'bg-[#0f1422] text-white border-slate-800'
          : 'bg-white text-slate-900 border-slate-200 shadow-xl'
      }`}
    >
      <div className="text-center max-w-[640px] mx-auto mb-12">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}
        >
          FULL-STACK ARCHITECTURAL ANATOMY
        </span>
        <h3 className={`text-2xl sm:text-4xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          High-Performance Bento Grid
        </h3>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Engineered for sub-50ms execution, zero hallucination defense, and enterprise scale.
        </p>
      </div>

      {/* Bento Grid: 2 Columns, 3 Rows, last tile spans both columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1040px] mx-auto">
        
        {/* Tile 1: Self-Typing Prompt (Row 1, Col 1) */}
        <div
          ref={(el) => (tilesRef.current[0] = el)}
          className={`rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-colors border ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                <Terminal className="w-4 h-4" />
                <span>3-Layer Context Synthesis</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isDark ? 'text-emerald-400 bg-emerald-950 border-emerald-800' : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-bold'
              }`}>
                ACTIVE STREAM
              </span>
            </div>
            <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Self-Assembling RAG Prompt</h4>
            <div className={`p-3.5 rounded-xl border font-mono text-xs leading-relaxed min-h-[72px] ${
              isDark ? 'bg-[#070a12] border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
            }`}>
              <span className="text-emerald-500 font-bold">&gt; </span>
              {typedText}
              <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse" />
            </div>
          </div>
          <div className={`pt-3 border-t text-xs flex items-center justify-between mt-4 ${
            isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Dynamic Grounding</span>
            <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>100% Deterministic</span>
          </div>
        </div>

        {/* Tile 2: Sub-50ms Response Mini Bar Chart (Row 1, Col 2) */}
        <div
          ref={(el) => (tilesRef.current[1] = el)}
          className={`rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-colors border ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                <Cpu className="w-4 h-4" />
                <span>Asynchronous Pipeline</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isDark ? 'text-cyan-400 bg-cyan-950 border-cyan-800' : 'text-cyan-800 bg-cyan-50 border-cyan-200 font-bold'
              }`}>
                SUB-50MS
              </span>
            </div>
            <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Webhook Latency Benchmarks</h4>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Native Express &amp; Redis queue processing speed:</p>
            
            {/* Robust High-Visibility Bar Chart */}
            <div className={`h-28 flex items-end gap-3 px-4 py-2.5 rounded-xl border ${
              isDark ? 'bg-[#070a12] border-slate-700/60' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              {/* Zapier Bar */}
              <div className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-red-500">1,250ms</span>
                <div className="w-full bg-red-500/70 hover:bg-red-500 rounded-t-md transition-all h-[64px]" />
                <span className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Zapier</span>
              </div>

              {/* n8n Bar */}
              <div className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>420ms</span>
                <div className={`w-full rounded-t-md transition-all h-[40px] ${isDark ? 'bg-slate-600' : 'bg-slate-400'}`} />
                <span className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>n8n</span>
              </div>

              {/* Custom Bar */}
              <div className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                <span className="text-[10px] font-mono font-black text-cyan-500">42ms</span>
                <div className="w-full bg-gradient-to-t from-cyan-500 to-teal-400 rounded-t-md shadow-[0_0_15px_rgba(0,242,254,0.4)] h-[20px]" />
                <span className="text-[10px] font-black text-cyan-500">Custom</span>
              </div>
            </div>
          </div>
          <div className={`pt-3 border-t text-xs flex items-center justify-between mt-4 ${
            isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>92% Faster than Zapier</span>
            <span className="text-emerald-500 font-bold font-mono">42ms Total</span>
          </div>
        </div>

        {/* Tile 3: Integration Dots (Row 2, Col 1) */}
        <div
          ref={(el) => (tilesRef.current[2] = el)}
          className={`rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-colors border ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                <Layers className="w-4 h-4" />
                <span>Multi-Channel Mesh</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isDark ? 'text-purple-400 bg-purple-950 border-purple-800' : 'text-purple-700 bg-purple-50 border-purple-200 font-bold'
              }`}>
                5+ CONNECTORS
              </span>
            </div>
            <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Native Webhook Integrations</h4>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Direct API sync across all commercial touchpoints:
            </p>

            {/* Glowing Integration Dots */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Zoho SalesIQ', color: 'bg-emerald-400' },
                { name: 'IMAP / SMTP Relay', color: 'bg-blue-400' },
                { name: 'Web Forms API', color: 'bg-cyan-400' },
                { name: 'Google Sheets', color: 'bg-emerald-400' },
                { name: 'MySQL DB', color: 'bg-purple-400' }
              ].map((dot) => (
                <div
                  key={dot.name}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs ${
                    isDark ? 'bg-[#070a12] border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${dot.color} animate-pulse`} />
                  <span>{dot.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`pt-3 border-t text-xs flex items-center justify-between mt-4 ${
            isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Unified Queue</span>
            <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Zero Dropped Leads</span>
          </div>
        </div>

        {/* Tile 4: Identity Resolution & Overlapping Avatars (Row 2, Col 2) */}
        <div
          ref={(el) => (tilesRef.current[3] = el)}
          className={`rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-colors border ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                <Database className="w-4 h-4" />
                <span>Session Memory</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isDark ? 'text-amber-400 bg-amber-950 border-amber-800' : 'text-amber-700 bg-amber-50 border-amber-200 font-bold'
              }`}>
                MULTI-DAY
              </span>
            </div>
            <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Lead Identity Resolution</h4>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Re-identifies returning buyers across days and multiple touchpoints:
            </p>

            {/* Overlapping Avatars */}
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDark ? 'bg-[#070a12] border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">A</span>
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-teal-600 text-white font-bold text-xs flex items-center justify-center">E</span>
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-blue-600 text-white font-bold text-xs flex items-center justify-center">D</span>
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-purple-600 text-white font-bold text-xs flex items-center justify-center">+48</span>
              </div>
              <div className="text-xs">
                <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Full History Preserved</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Composite MySQL Indexing</div>
              </div>
            </div>
          </div>
          <div className={`pt-3 border-t text-xs flex items-center justify-between mt-4 ${
            isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Multi-Touch Tracking</span>
            <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>100% Persisted</span>
          </div>
        </div>

        {/* Tile 5: Big Full-Width Tile (Row 3, Spans 2 Columns) */}
        <div
          ref={(el) => (tilesRef.current[4] = el)}
          className={`md:col-span-2 rounded-[28px] border p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-slate-700/80 text-white'
              : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
                  ENTERPRISE DEFENSE LAYER
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isDark ? 'text-emerald-400 bg-emerald-950 border-emerald-800' : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-bold'
                }`}>
                  ZERO HALLUCINATIONS
                </span>
              </div>
              <h4 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                100% Human Approval Gate + Closed-Loop Memory
              </h4>
              <p className={`text-xs sm:text-sm max-w-[60ch] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                The AI is restricted to drafting. Nothing reaches buyers without a 1-click human confirmation. Every human edit is logged to Google Sheets, dynamically teaching the model your business rules.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">Status: Protected</div>
              <div className="text-[10px] text-slate-400">Active Production Run</div>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

      </div>
    </div>
  );
}
