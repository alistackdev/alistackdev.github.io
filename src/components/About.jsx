import React from 'react';
import { User, Shield, Globe, MapPin, Mail, Sparkles, Cpu, Layers, Server, Phone, Code2 } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

export default function About() {
  const specs = [
    { label: 'OPERATOR', value: 'Ali Hassan', icon: User },
    { label: 'CURRENT ROLE', value: 'Backend & Automation Engineer @ Slashcloud.io', icon: Server },
    { label: 'ARCHITECTURE SPECIALTY', value: 'Custom Node.js, RAG Pipelines & CRM APIs', icon: Cpu },
    { label: 'CLIENT DELIVERY', value: 'International Remote (Canada, US, EU)', icon: Globe },
    { label: 'CORE FOCUS', value: 'Production Web Systems & Cloud Automation', icon: Code2 },
    { label: 'LOCATION', value: 'Faisalabad, Pakistan (Remote Worldwide)', icon: MapPin },
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
                  alt="Ali Hassan - Backend & AI Automation Engineer"
                  className="w-full h-full object-cover brightness-100 contrast-105 group-hover:scale-105 group-hover:contrast-110 transition-all duration-500 ease-out"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {/* Subtle cyber holographic glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              <div className="mt-4 w-full flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                <span>Ali Hassan</span>
                <span className="text-cyan-400">Backend &amp; AI Systems Engineer</span>
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
                I engineer high-reliability digital architectures — bridging intuitive, dynamic web platforms in <strong className="text-cyan-300 font-medium">React</strong> with high-throughput backend services, custom webhook listeners, and zero-hallucination RAG pipelines in <strong className="text-cyan-300 font-medium">Node.js</strong>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Currently engineering cloud infrastructure and automated workflows at <strong className="text-white font-medium">Slashcloud.io</strong>, while independently architecting production AI automation systems for international enterprise clients. What defines my work is deep architectural rigor, atomic queuing, and shipping performant software that scales with real business demands.
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