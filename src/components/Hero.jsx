import React, { useState, useEffect } from 'react';
import { ChevronRight, Download, Terminal, Sparkles, Activity, ShieldCheck, Code2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

export default function Hero() {
  const roles = [
    'FULL-STACK DEVELOPER',
    'DIGITAL STRATEGIST',
    'E-COMMERCE SPECIALIST',
    'AI WORKFLOW AUTOMATOR'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Introduction & Call-to-Action */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Cyber Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1020]/90 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>CORE NODE // READY TO EXECUTE</span>
          </div>

          {/* Name Header */}
          <div className="space-y-2">
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
              ALI <span className="cyber-gradient-text">HASSAN</span>
            </h1>
            
            {/* Typewriter Role */}
            <div className="flex items-center gap-2 font-mono text-lg sm:text-2xl text-cyan-400">
              <span className="text-slate-400 text-sm sm:text-base font-sans font-semibold">ROLE_TYPE //</span>
              <span className="font-bold border-b-2 border-cyan-400/80 pb-0.5 tracking-wide">
                {displayText}
              </span>
              <span className="animate-pulse text-cyan-400 font-bold">_</span>
            </div>
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
            Computer Science student at <strong className="text-white font-medium">Government College University, Faisalabad (GCUF)</strong>. 
            Merging modern full-stack development with data-driven e-commerce growth, hyper-targeted ad campaigns, and AI-accelerated digital solutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#about"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-black font-mono font-bold text-sm tracking-wider hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>INITIALIZE SYSTEM</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0c1021]/80 hover:bg-[#121833] border border-cyan-500/30 hover:border-cyan-400/70 text-slate-200 font-mono text-sm tracking-wider hover:shadow-[0_0_20px_rgba(0,242,254,0.2)] transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>COMMAND PORT</span>
            </a>

            <a
              href="Ali-Hassan-CV.pdf"
              download="Ali-Hassan-CV.pdf"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#120d20]/80 hover:bg-[#1c1433] border border-purple-500/30 hover:border-purple-400 text-purple-300 font-mono text-sm tracking-wider hover:shadow-[0_0_20px_rgba(185,92,230,0.3)] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>CV.PDF</span>
            </a>
          </div>

          {/* Micro Stats Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
            <div className="p-3 rounded-lg bg-[#0a0d1a]/60 border border-slate-800">
              <div className="font-mono font-bold text-cyan-400 text-lg sm:text-xl">PKR 200K+</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Revenue Scaled</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0a0d1a]/60 border border-slate-800">
              <div className="font-mono font-bold text-emerald-400 text-lg sm:text-xl">100%</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Client Reviews</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0a0d1a]/60 border border-slate-800">
              <div className="font-mono font-bold text-purple-400 text-lg sm:text-xl">GCUF CS</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Bachelors Degree</div>
            </div>
          </div>

        </div>

        {/* Right Column: Cyber HUD Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            
            {/* Glowing Corner Accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

            {/* Futuristic Matrix Card */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.8)] border border-cyan-500/25">
              
              {/* Scanline element */}
              <div className="absolute inset-0 scanlines-overlay" />

              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs text-cyan-300 tracking-wider">SYS.METRICS_v2</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">ID_0324408</span>
              </div>

              {/* Matrix Code Stream Visual */}
              <div className="bg-[#050711]/90 rounded-xl p-4 border border-cyan-500/10 font-mono text-xs space-y-2 mb-4">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>// ACTIVE PROCESSES</span>
                  <span className="text-emerald-400">STATUS: OPTIMAL</span>
                </div>
                <div className="space-y-1 text-slate-300 font-mono text-xs">
                  <p><span className="text-cyan-400">&gt;</span> React.js &amp; Modern UI Frameworks</p>
                  <p><span className="text-cyan-400">&gt;</span> Meta Ads Manager &amp; Conversion APIs</p>
                  <p><span className="text-cyan-400">&gt;</span> E-Commerce Supply Chain &amp; Scalability</p>
                  <p><span className="text-cyan-400">&gt;</span> AI Content Production &amp; Video SFX</p>
                </div>
              </div>

              {/* Realtime Live Specs */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>WEB ARCHITECTURE</span>
                    <span className="text-cyan-400">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>DIGITAL MARKETING FUNNELS</span>
                    <span className="text-purple-400">95%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>E-COMMERCE OPERATIONS</span>
                    <span className="text-emerald-400">89%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[89%]" />
                  </div>
                </div>
              </div>

              {/* Bottom Security verified banner */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED SPECIALIST
                </span>
                <span>PAKISTAN // REMOTE</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Down indicator */}
      <a
        href="#about"
        onClick={() => playClickSound()}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 font-mono text-[10px] tracking-widest transition-colors cursor-pointer"
      >
        <span>SCROLL TO INITIALIZE</span>
        <ChevronRight className="w-4 h-4 rotate-90 animate-bounce text-cyan-400" />
      </a>
    </section>
  );
}
