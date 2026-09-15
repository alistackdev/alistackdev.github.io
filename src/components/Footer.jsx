import React from 'react';
import { ArrowUp, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04050a] border-t border-cyan-500/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="font-heading font-extrabold text-lg text-white tracking-wider">
            ALI HASSAN <span className="text-cyan-400">// BACKEND &amp; AUTOMATION</span>
          </div>
          <p className="font-mono text-xs text-slate-400">
            Backend &amp; Automation Intern @ Slashcloud.io • BS Computer Science @ GCUF
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[10px] text-emerald-400">
              CORE SYSTEM ACTIVE // PRODUCTION VERIFIED
            </span>
          </div>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alistackdev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-xl bg-[#090d1f] border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/alistackdev1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-xl bg-[#090d1f] border border-slate-800 hover:border-blue-400 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/the_romeo_city?igsh=ejRrN3g4em50c3Vr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            aria-label="Instagram Profile"
            className="w-10 h-10 rounded-xl bg-[#090d1f] border border-slate-800 hover:border-pink-400 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="mailto:hassanguaraya@gmail.com"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            aria-label="Send Email"
            className="w-10 h-10 rounded-xl bg-[#090d1f] border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <div className="flex flex-col items-center md:items-end">
          <button
            onClick={scrollToTop}
            onMouseEnter={() => playHoverSound()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d1020] border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-wider hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className="font-mono text-[10px] text-slate-600 mt-2">
            &copy; {new Date().getFullYear()} Ali Hassan • alistackdev
          </span>
        </div>

      </div>
    </footer>
  );
}
