import React from 'react';
import { User, Shield, GraduationCap, MapPin, Mail, Sparkles, Cpu, Layers, Server, Phone, Code2 } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

export default function About() {
  const specs = [
    { label: 'OPERATOR', value: 'Ali Hassan', icon: User },
    { label: 'CURRENT ROLE', value: 'Backend & Automation Intern @ Slashcloud.io', icon: Server },
    { label: 'CORE FOCUS', value: 'Web Solutions & Backend Automation', icon: Code2 },
    { label: 'INSTITUTION (BSCS)', value: 'GCU Faisalabad (2025 – Present)', icon: GraduationCap },
    { label: 'COLLEGE (ICS)', value: 'Nusrat Jahan College, Chenab Nagar (2023 – 2025)', icon: Layers },
    { label: 'LOCATION', value: 'Faisalabad, Punjab, Pakistan', icon: MapPin },
    { label: 'DIRECT PHONE', value: '+92-324-4086454', icon: Phone, isLink: true, href: 'tel:+923244086454' },
    { label: 'SECURE EMAIL', value: 'hassanguaraya@gmail.com', icon: Mail, isLink: true, href: 'mailto:hassanguaraya@gmail.com' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>ABOUT_DEVELOPER // 01</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            BIOMETRIC &amp; ENGINEERING PROFILE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Photo & Scanner Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div 
              onMouseEnter={() => playHoverSound()}
              className="glass-panel rounded-2xl p-4 border border-cyan-500/25 relative overflow-hidden flex-1 flex flex-col items-center justify-center group"
            >
              <div className="relative w-full aspect-[4/5] max-w-sm rounded-xl overflow-hidden border border-cyan-500/30 bg-[#070913]">
                
                {/* Animated HUD Scanner Line */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f2fe] animate-scanner z-20 pointer-events-none" />

                {/* Profile Image - Vibrant natural color with smooth zoom & cyan aura on hover */}
                <img
                  src="my-photo.jpeg"
                  alt="Ali Hassan - Web & Backend Developer"
                  className="w-full h-full object-cover brightness-100 contrast-105 group-hover:scale-105 group-hover:contrast-110 transition-all duration-500 ease-out"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {/* Subtle cyber holographic glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Overlay Tags */}
                <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black/70 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
                  ID: 0324408
                </div>
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded bg-black/70 border border-emerald-400/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  PASSIONATE_LEARNER
                </div>
                <div className="absolute bottom-3 left-3 z-20 px-2 py-0.5 rounded bg-black/70 border border-purple-400/40 text-[10px] font-mono text-purple-300">
                  GCUF // BSCS
                </div>
              </div>

              <div className="mt-4 w-full flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                <span>STATUS: LEVEL_4 DEV</span>
                <span className="text-cyan-400">STATUS: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Details & Specifications */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Executive Summary written with Senior HR impact */}
            <div 
              onMouseEnter={() => playHoverSound()}
              className="glass-panel rounded-2xl p-6 border border-cyan-500/20 space-y-4"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wider">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-bold text-white uppercase tracking-wider">Executive Developer Overview</h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                I am a passionate Computer Science student at <strong className="text-white font-medium">Government College University Faisalabad (GCUF)</strong> with an insatiable appetite for learning and exploring new technologies. Rather than staying confined to one narrow box, I love building complete digital experiences — from intuitive, dynamic web platforms in <strong className="text-cyan-300 font-medium">React</strong> to high-reliability backend services and API automations in <strong className="text-cyan-300 font-medium">Node.js</strong>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Currently leveling up my craft as a <strong className="text-white font-medium">Backend &amp; Automation Engineer Intern at Slashcloud.io</strong>, while also architecting production-grade AI automation pipelines for international clients. What defines me most is curiosity, a strong work ethic, and an eagerness to ship clean, performant software that solves genuine problems.
              </p>
            </div>

            {/* System Specifications Grid */}
            <div 
              onMouseEnter={() => playHoverSound()}
              className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex-1 flex flex-col justify-center"
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>SYSTEM_SPECIFICATIONS</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {specs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#090b16]/70 border border-slate-800/80 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">
                          {item.label}
                        </div>
                        {item.isLink ? (
                          <a
                            href={item.href}
                            className="text-xs sm:text-sm font-medium text-cyan-300 hover:text-cyan-200 truncate block transition-colors font-mono"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-xs sm:text-sm font-medium text-slate-200 truncate font-mono">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
