import React from 'react';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import TerminalContact from './components/TerminalContact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050508] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 3D WebGL Interactive Background */}
      <CanvasBackground />

      {/* Futuristic Custom Cursor */}
      <CustomCursor />

      {/* Cyberpunk Scanlines subtle texture */}
      <div className="fixed inset-0 scanlines-overlay z-10 pointer-events-none opacity-40" />

      {/* Sticky Floating Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-20 space-y-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Reviews />
        <TerminalContact />
      </main>

      {/* High-tech Footer */}
      <Footer />
    </div>
  );
}
