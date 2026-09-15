import React from 'react';
import { Briefcase, Calendar, MapPin, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

export default function Experience() {
  const experiences = [
    {
      period: 'ONGOING // CURRENT',
      role: 'E-Commerce Store Owner & Growth Lead',
      company: 'Independent Commercial Store',
      location: 'Pakistan // Remote',
      glow: 'border-pink-500/30 hover:border-pink-500/60',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
      dotColor: 'bg-pink-500 shadow-[0_0_12px_#ff007f]',
      metrics: 'PKR 200,000+ Revenue',
      duties: [
        'Bootstrapped and scaled an independent e-commerce brand, generating over PKR 200,000+ in online gross sales.',
        'Created high-conversion product listings optimized for organic search intent and customer acquisition.',
        'Designed, monitored, and scaled targeted Meta Ad campaigns (Facebook & Instagram) with precision retargeting.',
        'Managed supply chain logistics, supplier relations, inventory tracking, and post-purchase customer success.',
      ],
      tags: ['Meta Ads', 'Store Operations', 'Funnels', 'Customer Fulfillment', 'Logistics']
    },
    {
      period: 'JAN 2024 – MAR 2024',
      role: 'Marketplace Ads Specialist',
      company: 'Evergreen Furniture Canada',
      location: 'Montreal, Canada // Remote',
      glow: 'border-blue-500/30 hover:border-blue-500/60',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      dotColor: 'bg-blue-500 shadow-[0_0_12px_#4facfe]',
      metrics: 'Geo-Targeted ROI',
      duties: [
        'Engineered geo-targeted social advertising campaigns focused specifically on driving qualified furniture buyers in Montreal.',
        'Crafted persuasive, benefit-oriented ad copywriting and high-intent listings on Facebook Marketplace.',
        'Directly managed inbound inquiries and resolved buyer concerns to successfully convert leads into paying customers.',
        'Monitored ad performance metrics and optimized creative variations to reduce acquisition costs.',
      ],
      tags: ['Facebook Marketplace', 'Geo-Targeting', 'Montreal Region', 'Sales Closing', 'Copywriting']
    },
    {
      period: 'AUG 2023 – DEC 2023',
      role: 'Digital Marketer & Content Creator',
      company: 'Global Homeo Hub',
      location: 'On-Site',
      glow: 'border-emerald-500/30 hover:border-emerald-500/60',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      dotColor: 'bg-emerald-500 shadow-[0_0_12px_#00ff88]',
      metrics: 'Multi-Channel Scale',
      duties: [
        'Produced and scheduled high-retention video content across YouTube, Facebook, and Instagram.',
        'Integrated AI workflows (ChatGPT, InVideo AI, ElevenLabs) with Adobe Premiere Pro to rapidly produce polished video assets.',
        'Engineered viral-oriented YouTube thumbnails resulting in substantial CTR (Click-Through Rate) uplifts.',
        'Maintained structured editorial calendars, customer messaging, and community audience engagement.',
      ],
      tags: ['Adobe Premiere Pro', 'ElevenLabs', 'AI Workflows', 'YouTube CTR', 'Community Ops']
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>LOG_HISTORY // 03</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            CHRONOLOGICAL TIMELINE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {experiences.map((item, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => playHoverSound()}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-[#050508] ${item.dotColor} group-hover:scale-125 transition-transform duration-300`} />

              {/* Card */}
              <div className={`glass-panel rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${item.glow} hover:-translate-y-1`}>
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold border ${item.badgeColor}`}>
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>

                  {item.metrics && (
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{item.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Role and Company */}
                <div className="mb-4">
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h3>
                  <div className="font-mono text-sm text-cyan-400/90 font-medium">
                    {item.company}
                  </div>
                </div>

                {/* Duties */}
                <ul className="space-y-2 mb-6 text-slate-300 text-sm font-light">
                  {item.duties.map((duty, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{duty}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#0a0d1d] text-slate-300 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
