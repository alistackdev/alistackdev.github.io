import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound, isAudioMuted, toggleAudioMute } from '../utils/sound';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(isAudioMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
  };

  const navLinks = [
    { name: 'INIT', href: '#hero', id: 'hero' },
    { name: 'PROFILE', href: '#about', id: 'about' },
    { name: 'CAPABILITIES', href: '#skills', id: 'skills' },
    { name: 'TIMELINE', href: '#experience', id: 'experience' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'REVIEWS', href: '#reviews', id: 'reviews' },
    { name: 'COMMAND', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06070d]/80 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.7)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => playClickSound()}
          onMouseEnter={() => playHoverSound()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.7)] transition-all">
            <div className="w-full h-full bg-[#070913] rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-wider text-white">
              HASSAN<span className="text-cyan-400">.DEV</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-cyan-300/60 -mt-1">
              SYS.V2.5 // GCUF
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0d1020]/70 border border-cyan-500/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverSound()}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/40 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.3)]" />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 bg-[#0d1020]/60 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00ff88]" />
            <span>SYS_READY</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => playHoverSound()}
            title={muted ? 'Enable Cyber SFX' : 'Mute Sound'}
            aria-label="Toggle Sound"
            className="w-9 h-9 rounded-lg bg-[#0d1020] border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] flex items-center justify-center transition-all cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* Quick Terminal Button */}
          <a
            href="#contact"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-semibold text-xs tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CONNECT</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden w-9 h-9 rounded-lg bg-[#0d1020] border border-cyan-500/30 text-cyan-400 flex items-center justify-center cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070913]/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2.5 rounded-lg font-mono text-sm tracking-wider border transition-all ${
                activeSection === link.id
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/40 hover:text-white'
              }`}
            >
              // {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-semibold text-sm tracking-wider"
            >
              <Terminal className="w-4 h-4" />
              <span>ESTABLISH SECURE LINK</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
