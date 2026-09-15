import React from 'react';
import { Briefcase, Calendar, MapPin, TrendingUp, CheckCircle, Server, Globe, Cpu, ShoppingBag } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

export default function Experience() {
  const experiences = [
    {
      period: '2025 – PRESENT // CURRENT',
      role: 'Backend & Automation Engineer Intern',
      company: 'Slashcloud.io',
      location: 'Hybrid / Remote (Past 3 Months)',
      glow: 'border-cyan-500/40 hover:border-cyan-400',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      dotColor: 'bg-cyan-400 shadow-[0_0_14px_#00f2fe]',
      metrics: 'Active Engineering Internship',
      duties: [
        'Developing cloud-integrated backend services, webhook processors, and API automation workflows.',
        'Connecting disparate data sources and automating operational pipelines to streamline team productivity.',
        'Implementing clean asynchronous architecture, modular services, and structured error handling.',
      ],
      tags: ['Slashcloud.io', 'Node.js', 'Cloud Automation', 'REST APIs', 'Webhooks']
    },
    {
      period: '2025 – PRESENT',
      role: 'Backend & AI Automation Developer',
      company: "Canada's Log & Wood Home Store (loghomestore.ca)",
      location: 'Remote // Canadian Client',
      glow: 'border-purple-500/40 hover:border-purple-400',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      dotColor: 'bg-purple-500 shadow-[0_0_14px_#b95ce6]',
      metrics: 'Production RAG AI Pipeline',
      duties: [
        'Engineered a custom Node.js backend unifying three inbound lead channels — live website chat (Zoho SalesIQ), contact forms, and direct business emails — into a single automated pipeline, replacing Zapier/n8n for sub-second execution.',
        'Built a Retrieval-Augmented Generation (RAG) pipeline over a 260-chunk, 33,500+ word knowledge base so Grok AI responses stay grounded in verified pricing, specs, and policies without hallucinations.',
        'Designed a Human-in-the-Loop administrative review interface with real-time lead alerts and a Google Sheets feedback loop that continuously refines output accuracy.',
      ],
      tags: ['Node.js', 'RAG Pipeline', 'Grok AI', 'Zoho SalesIQ API', 'Google Sheets API', 'Nodemailer']
    },
    {
      period: '2024 – PRESENT',
      role: 'Web & Full-Stack Developer',
      company: 'Client & Independent Web Solutions',
      location: 'Remote // Faisalabad',
      glow: 'border-blue-500/40 hover:border-blue-400',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      dotColor: 'bg-blue-400 shadow-[0_0_14px_#4facfe]',
      metrics: 'Production Web Platforms',
      duties: [
        'Designed, developed, and deployed romicmedia.com, a full-service digital agency platform featuring dynamic service listings, blog system, and an automated EmailJS contact relay.',
        'Crafted responsive, high-performance web applications using modern React, JavaScript (ES6+), and Tailwind CSS with smooth micro-interactions and mobile-first layouts.',
        'Handled end-to-end technical delivery including DNS configuration, production build optimization, and search engine console indexing.',
      ],
      tags: ['React', 'romicmedia.com', 'JavaScript ES6+', 'Tailwind CSS', 'EmailJS', 'Deployment']
    },
    {
      period: 'ONGOING',
      role: 'E-Commerce Founder & Operations Lead',
      company: 'Self-Managed Online Commercial Brand',
      location: 'Remote',
      glow: 'border-emerald-500/40 hover:border-emerald-400',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      dotColor: 'bg-emerald-500 shadow-[0_0_14px_#00ff88]',
      metrics: 'PKR 10 Lakh+ / Month Scale',
      duties: [
        'Bootstrapped and scaled an independent online brand generating over PKR 10 Lakh+ per month in sales through data-driven product selection and customer acquisition.',
        'Managed full operational infrastructure: supply chain logistics, inventory replenishment, and customer support.',
        'Brings a strong product-minded intuition to software engineering, understanding how code directly impacts conversions, user retention, and business ROI.',
      ],
      tags: ['Product Intuition', 'Business-Outcome Driven', 'Systems Ops', 'Customer Experience']
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>CAREER_TRACK // 03</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            WORK &amp; ENGINEERING EXPERIENCE
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
