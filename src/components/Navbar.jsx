import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Cpu, Github, Linkedin, Instagram } from 'lucide-react';
import { playClickSound, playHoverSound, isAudioMuted, toggleAudioMute } from '../utils/sound';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(isAudioMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'experience', 'reviews', 'contact'];
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
    // { name: 'PROJECTS', href: '#projects', id: 'projects' }, // Commented out temporarily
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
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[1.5px] shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.8)] transition-all">
              <div className="w-full h-full bg-[#070913] rounded-[10px] overflow-hidden">
                <img
                  src="avatar.jpg"
                  alt="Ali Stack Dev"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            {/* Blue Tick Verified Badge on Avatar Corner */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1d9bf0] text-white rounded-full flex items-center justify-center border-2 border-[#06070d] shadow-[0_0_8px_rgba(29,155,240,0.9)]">
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-wider text-white">
                ALI STACK <span className="text-cyan-400">DEV</span>
              </span>
              {/* Blue Tick Verified Badge next to Name */}
              <svg
                className="w-4 h-4 text-[#1d9bf0] fill-current drop-shadow-[0_0_6px_rgba(29,155,240,0.8)]"
                viewBox="0 0 24 24"
                aria-label="Verified Developer"
              >
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.138 4 2.138 1.58 0 2.95-.865 3.6-2.138.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.138-2.42 2.138-4zm-12.22 4.3l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-cyan-300/80 -mt-0.5">
              Slashcloud.io // GCUF
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

        {/* Action Controls & Social Nodes */}
        <div className="flex items-center gap-2.5">
          {/* Social Quick Links in Navbar space */}
          <div className="hidden lg:flex items-center gap-1.5 border-r border-slate-800 pr-2.5 mr-1">
            <a
              href="https://github.com/alistackdev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              title="GitHub: alistackdev"
              className="w-8 h-8 rounded-lg bg-[#0d1020] border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/alistackdev1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              title="LinkedIn: alistackdev1"
              className="w-8 h-8 rounded-lg bg-[#0d1020] border border-slate-800 hover:border-blue-400 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/the_romeo_city?igsh=ejRrN3g4em50c3Vr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              title="Instagram: @the_romeo_city"
              className="w-8 h-8 rounded-lg bg-[#0d1020] border border-slate-800 hover:border-pink-400 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

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
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-semibold text-xs tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
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
          {/* Mobile Socials */}
          <div className="flex items-center gap-3 pt-2 px-2">
            <a
              href="https://github.com/alistackdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/alistackdev1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/the_romeo_city?igsh=ejRrN3g4em50c3Vr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-400"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
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
