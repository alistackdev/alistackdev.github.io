import React from 'react';
import { User, Shield, GraduationCap, MapPin, Mail, Sparkles, Cpu, Layers } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

export default function About() {
  const specs = [
    { label: 'OPERATOR', value: 'Ali Hassan', icon: User },
    { label: 'LOCATION', value: 'Faisalabad, Punjab, Pakistan', icon: MapPin },
    { label: 'INSTITUTION', value: 'Government College University Faisalabad (GCUF)', icon: GraduationCap },
    { label: 'DEGREE PROGRAM', value: 'BS Computer Science (2025 – Present)', icon: Cpu },
    { label: 'PREVIOUS DEGREE', value: 'ICS (Computer Science, 2023 – 2025)', icon: Layers },
    { label: 'PRIMARY CONTACT', value: 'hassanguaraya@gmail.com', icon: Mail, isLink: true, href: 'mailto:hassanguaraya@gmail.com' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>CORE_DATA // 01</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            BIOMETRIC PROFILE
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

                {/* Profile Image */}
                <img
                  src="my-photo.jpeg"
                  alt="Ali Hassan - Computer Science Student & Digital Developer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Overlay Tags */}
                <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black/70 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
                  ID: 0324408
                </div>
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded bg-black/70 border border-emerald-400/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  SEC_VERIFIED
                </div>
                <div className="absolute bottom-3 left-3 z-20 px-2 py-0.5 rounded bg-black/70 border border-purple-400/40 text-[10px] font-mono text-purple-300">
                  GCUF // CS DEPT
                </div>
              </div>

              <div className="mt-4 w-full flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                <span>CLEARANCE: LEVEL_4</span>
                <span className="text-cyan-400">NODE: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Details & Specifications */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Executive Summary */}
            <div 
              onMouseEnter={() => playHoverSound()}
              className="glass-panel rounded-2xl p-6 border border-cyan-500/20 space-y-4"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wider">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-bold text-white uppercase tracking-wider">Executive Overview</h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                I am a dedicated Computer Science undergraduate at <strong className="text-white">Government College University, Faisalabad (GCUF)</strong>. 
                My focus lies at the intersection of modern frontend engineering, scalable architecture, and commercial conversion funnels.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Beyond traditional coding, I specialize in full-cycle digital growth: from deploying responsive React interfaces and custom software to managing Meta ad budgets, driving e-commerce conversions, and engineering high-retention AI content workflows.
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#090b16]/70 border border-slate-800/80 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[10px] text-slate-500 tracking-wider">
                          {item.label}
                        </div>
                        {item.isLink ? (
                          <a
                            href={item.href}
                            className="text-xs sm:text-sm font-medium text-cyan-300 hover:text-cyan-200 truncate block transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-xs sm:text-sm font-medium text-slate-200 truncate">
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
