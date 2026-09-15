import React, { useState } from 'react';
import { 
  Server, 
  Globe, 
  Code2, 
  Database, 
  RotateCw, 
  ArrowRight,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

export default function Projects() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    playClickSound();
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const projects = [
    {
      title: "Canada's Log Home Store RAG Pipeline",
      tag: 'BACKEND & AI AUTOMATION',
      icon: Cpu,
      color: 'purple',
      badgeClass: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
      glowBorder: 'hover:border-purple-400/50',
      pitch: 'Engineered a custom Node.js backend unifying Zoho SalesIQ live chat, web forms, and direct email with a 260-chunk RAG pipeline powered by Grok AI for loghomestore.ca.',
      frontMetrics: [
        { label: 'KNOWLEDGE BASE', val: '260 Chunks (33.5K Words)' },
        { label: 'AI ENGINE', val: 'Grok AI Grounded RAG' }
      ],
      backTitle: 'RAG ARCHITECTURE & BACKEND',
      backDetails: 'Replaced Zapier/n8n after webhook latency proved insufficient. Built a Human-in-the-Loop admin dashboard with smart lead segmentation, rich-text draft editor, and Google Sheets feedback loop eliminating AI hallucinations.',
      techStack: ['Node.js', 'Grok AI', 'RAG Pipeline', 'Zoho SalesIQ API', 'Google Sheets API', 'Nodemailer']
    },
    {
      title: 'Romic Media Agency Platform',
      tag: 'PRODUCTION WEB APPLICATION',
      icon: Globe,
      color: 'cyan',
      badgeClass: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      glowBorder: 'hover:border-cyan-400/50',
      pitch: 'Designed and deployed romicmedia.com, a full-service digital agency website with dynamic service listings, blog architecture, and an EmailJS automated contact relay.',
      frontMetrics: [
        { label: 'LIVE DOMAIN', val: 'romicmedia.com' },
        { label: 'SYSTEM RELAY', val: 'EmailJS + SEO Indexing' }
      ],
      backTitle: 'END-TO-END WEB DELIVERY',
      backDetails: 'Independently architected the user interface, resolved search-engine indexing bottlenecks, configured custom domain routing, and established automated client communication channels.',
      techStack: ['JavaScript', 'HTML5 / CSS3', 'EmailJS', 'Technical SEO', 'DNS & Deployment']
    },
    {
      title: 'Interactive Cyber Portfolio & Engine',
      tag: 'REACT & 3D WEBGL',
      icon: Code2,
      color: 'blue',
      badgeClass: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
      glowBorder: 'hover:border-blue-400/50',
      pitch: 'Modern digital engineering headquarters built with React 18, Vite, Tailwind CSS, Three.js 3D WebGL background, Web Audio API synthesizer, and GitHub Actions CI/CD.',
      frontMetrics: [
        { label: 'FRAMEWORK', val: 'React 18 + Vite 6' },
        { label: 'GRAPHICS CORE', val: 'Three.js WebGL' }
      ],
      backTitle: 'MODERN COMPONENT SYSTEM',
      backDetails: 'Features interactive CLI bash terminal, 3D flip card execution analytics, Formspree API payload transmission, and automated cloud builds upon push to main branch.',
      techStack: ['React 18', 'Vite', 'Tailwind CSS', 'Three.js', 'Web Audio API', 'GitHub Actions']
    },
    {
      title: 'Cinema & Smart Parking Systems',
      tag: 'C++ OBJECT-ORIENTED SOFTWARE',
      icon: Database,
      color: 'green',
      badgeClass: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
      glowBorder: 'hover:border-emerald-400/50',
      pitch: 'Engineered command-line management systems applying core OOP principles (classes, inheritance, encapsulation) to model real-world ticketing and slot allocation logic.',
      frontMetrics: [
        { label: 'PROGRAMMING', val: 'C++ OOP Core' },
        { label: 'MODULES', val: 'Cinema & Parking' }
      ],
      backTitle: 'OOP SOFTWARE ARCHITECTURE',
      backDetails: 'Implemented vehicle entry/exit tracking, seat availability matrices, automated tariff calculations, and structured data handling modeled around real-world commercial billing.',
      techStack: ['C++', 'OOP Principles', 'Data Structures', 'Invoicing Logic', 'Terminal CLI']
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>CASE_STUDIES // 04</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              FEATURED ENGINEERING PROJECTS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
          </div>

          <p className="font-mono text-xs text-slate-400 mt-4 md:mt-0 max-w-sm">
            // Click on any project card below to inspect backend architecture, RAG pipelines &amp; code execution.
          </p>
        </div>

        {/* Project Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            const isFlipped = !!flippedCards[idx];

            return (
              <div
                key={idx}
                onClick={() => toggleFlip(idx)}
                onMouseEnter={() => playHoverSound()}
                className="perspective cursor-pointer h-[420px] group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className={`absolute inset-0 backface-hidden glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/80 flex flex-col justify-between transition-all duration-300 ${proj.glowBorder} shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                    <div>
                      {/* Top Badge & Logo */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-semibold border ${proj.badgeClass}`}>
                          {proj.tag}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#090d1f] border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {proj.title}
                      </h3>

                      {/* Pitch */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                        {proj.pitch}
                      </p>
                    </div>

                    {/* Front Metrics Box */}
                    <div>
                      <div className="grid grid-cols-2 gap-2 mb-4 bg-[#080b19] p-3 rounded-xl border border-slate-800">
                        {proj.frontMetrics.map((m, mIdx) => (
                          <div key={mIdx} className="text-center">
                            <div className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</div>
                            <div className="font-mono font-bold text-xs sm:text-sm text-cyan-400 truncate">{m.val}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400/80 group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5" />
                          CLICK TO FLIP TECHNICAL SPECS
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel rounded-2xl p-6 sm:p-7 border border-cyan-500/40 bg-[#080a18] flex flex-col justify-between shadow-[0_0_30px_rgba(0,242,254,0.15)]">
                    <div>
                      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
                        <h4 className="font-mono text-xs font-bold tracking-wider text-cyan-400">
                          // {proj.backTitle}
                        </h4>
                        <RotateCw className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                        {proj.backDetails}
                      </p>
                    </div>

                    <div>
                      <div className="font-mono text-[11px] text-slate-400 mb-2">DEPLOYED STACK:</div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-1 rounded bg-[#0d1226] border border-cyan-500/20 text-cyan-300 text-[10px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="text-center font-mono text-xs text-slate-400 hover:text-white">
                        ← CLICK TO RETURN
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
