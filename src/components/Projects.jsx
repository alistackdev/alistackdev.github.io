import React, { useState } from 'react';
import { 
  Code2, 
  ShoppingCart, 
  MapPin, 
  Sparkles, 
  RotateCw, 
  ExternalLink, 
  Layers, 
  Activity,
  ArrowRight
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
      title: 'Modern Web Interfaces & Portfolios',
      tag: 'WEB ARCHITECTURE',
      icon: Code2,
      color: 'cyan',
      badgeClass: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      glowBorder: 'hover:border-cyan-400/50',
      pitch: 'Designing and building high-performance, responsive React web platforms with real-time 3D WebGL scenes, smooth audio feedback, and clean architecture.',
      frontMetrics: [
        { label: 'FRAMEWORK', val: 'React 18 + Vite' },
        { label: 'PERFORMANCE', val: '100% Responsive' }
      ],
      backTitle: 'TECHNICAL ARCHITECTURE',
      backDetails: 'Built using modern React, Tailwind CSS, Lucide Icons, and Three.js. Employs component modularity, Web Audio API sound synthesizers, and automated CI/CD deployment via GitHub Actions.',
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'GitHub Actions']
    },
    {
      title: 'Self-Managed E-Commerce Portal',
      tag: 'COMMERCIAL SCALE',
      icon: ShoppingCart,
      color: 'pink',
      badgeClass: 'text-pink-300 bg-pink-500/10 border-pink-500/30',
      glowBorder: 'hover:border-pink-400/50',
      pitch: 'End-to-end commercial store launch including supplier sourcing, SEO product listing copy, and direct Meta Ad performance campaigns.',
      frontMetrics: [
        { label: 'GROSS REVENUE', val: 'PKR 200K+' },
        { label: 'AD ENGINE', val: 'Meta Ads Manager' }
      ],
      backTitle: 'REVENUE & LOGISTICS',
      backDetails: 'Managed product validation, customer acquisition funnels, shipping logistics, and retargeting campaigns. Optimized conversion rates through compelling product imagery and user engagement.',
      techStack: ['Store Ops', 'Meta Ads', 'Listing SEO', 'Logistics', 'Customer CRM']
    },
    {
      title: 'Furniture Marketplace Ad Engine',
      tag: 'GEO-TARGETED ADS',
      icon: MapPin,
      color: 'blue',
      badgeClass: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
      glowBorder: 'hover:border-blue-400/50',
      pitch: 'Remote lead generation campaign executed for Evergreen Furniture Canada, driving qualified furniture inquiries across the Montreal region.',
      frontMetrics: [
        { label: 'TARGET REGION', val: 'Montreal, QC' },
        { label: 'PRIMARY CHANNEL', val: 'FB Marketplace' }
      ],
      backTitle: 'EXECUTION & SALES',
      backDetails: 'Configured local high-intent listings, resolved buyer inquiries in real time, and tailored ad messaging to competitive market pricing, successfully converting inbound chats into verified sales.',
      techStack: ['FB Marketplace', 'Conversational Sales', 'Geo-Targeting', 'Montreal Market']
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
              ACTIVE INITIATIVES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
          </div>

          <p className="font-mono text-xs text-slate-400 mt-4 md:mt-0 max-w-sm">
            // Tap or click on any initiative card below to inspect execution metrics &amp; stack details.
          </p>
        </div>

        {/* Project Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                          CLICK TO FLIP DETAILS
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
