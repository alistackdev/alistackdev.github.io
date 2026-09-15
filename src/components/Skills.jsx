import React, { useState } from 'react';
import { 
  Code, 
  Target, 
  Search, 
  Video, 
  ShoppingCart, 
  Share2, 
  Flame, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'DEVELOPMENT', 'MARKETING & ADS', 'E-COMMERCE', 'MEDIA'];

  const skillCards = [
    {
      title: 'Full-Stack Web Engineering',
      category: 'DEVELOPMENT',
      icon: Code,
      color: 'cyan',
      desc: 'Developing modern, lightning-fast web applications with clean component architecture, smooth animations, and responsive layouts.',
      tags: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite', 'HTML5 / CSS3', 'Python', 'C++'],
      level: '95%'
    },
    {
      title: 'Meta & Performance Ads',
      category: 'MARKETING & ADS',
      icon: Target,
      color: 'purple',
      desc: 'Architecting hyper-targeted Meta advertising campaigns with custom lookalike audiences, split testing, and conversion funnel optimization.',
      tags: ['Meta Ads Manager', 'Custom Audiences', 'A/B Testing', 'Pixel Integration', 'Retargeting'],
      level: '92%'
    },
    {
      title: 'SEO & Search Intelligence',
      category: 'MARKETING & ADS',
      icon: Search,
      color: 'blue',
      desc: 'Leveraging search analytics and trending keyword data to rank e-commerce product listings and web applications high on SERP algorithms.',
      tags: ['Google Trends', 'Keyword Research', 'Technical SEO', 'Search Console', 'Competitor Analysis'],
      level: '88%'
    },
    {
      title: 'Video & AI Audiovisual Production',
      category: 'MEDIA',
      icon: Video,
      color: 'pink',
      desc: 'Producing high-retention short-form reels and long-form video campaigns using Premiere Pro, AI voice generation, and cinematic audio design.',
      tags: ['Adobe Premiere Pro', 'ElevenLabs', 'InVideo AI', 'Sound Design', 'Color Grading'],
      level: '90%'
    },
    {
      title: 'E-Commerce Operations & Scaling',
      category: 'E-COMMERCE',
      icon: ShoppingCart,
      color: 'green',
      desc: 'End-to-end management of online stores: product testing, listing copy, inventory management, logistics coordination, and customer fulfillment.',
      tags: ['Store Operations', 'Listing Optimization', 'Supplier Relations', 'Lead Funnels', 'PKR 200K+ Sales'],
      level: '94%'
    },
    {
      title: 'Branding & Social Growth Architecture',
      category: 'MARKETING & ADS',
      icon: Share2,
      color: 'yellow',
      desc: 'Designing high-CTR YouTube thumbnails, visual assets, structured publishing schedules, and organic engagement funnels across Instagram and Facebook.',
      tags: ['CTR Optimization', 'Brand Identity', 'Graphic Assets', 'Content Calendars', 'Community Growth'],
      level: '89%'
    },
  ];

  const filteredSkills = selectedCategory === 'ALL' 
    ? skillCards 
    : skillCards.filter(s => s.category === selectedCategory);

  const getColorClasses = (color) => {
    switch(color) {
      case 'purple':
        return {
          icon: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          border: 'hover:border-purple-500/40',
          bar: 'from-purple-500 to-pink-500',
          tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
        };
      case 'green':
        return {
          icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          border: 'hover:border-emerald-500/40',
          bar: 'from-emerald-500 to-teal-400',
          tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        };
      case 'pink':
        return {
          icon: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
          border: 'hover:border-pink-500/40',
          bar: 'from-pink-500 to-rose-400',
          tag: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
        };
      case 'blue':
        return {
          icon: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
          border: 'hover:border-blue-500/40',
          bar: 'from-blue-500 to-cyan-400',
          tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
        };
      case 'yellow':
        return {
          icon: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          border: 'hover:border-amber-500/40',
          bar: 'from-amber-400 to-orange-500',
          tag: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        };
      default:
        return {
          icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
          border: 'hover:border-cyan-500/40',
          bar: 'from-cyan-500 to-blue-500',
          tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
        };
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>CORE_ABILITIES // 02</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              FUNCTIONAL CAPABILITIES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => playHoverSound()}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs tracking-wider border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                    : 'bg-[#0a0d1d]/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const theme = getColorClasses(skill.color);

            return (
              <div
                key={index}
                onMouseEnter={() => playHoverSound()}
                className={`glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between transition-all duration-300 ${theme.border} hover:-translate-y-1 group`}
              >
                <div>
                  {/* Top Row: Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${theme.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-slate-500">
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
                    {skill.desc}
                  </p>
                </div>

                {/* Bottom Row: Tags & Efficiency Bar */}
                <div className="space-y-4 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${theme.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Proficiency Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>EXECUTION_METRIC</span>
                      <span className="text-white font-bold">{skill.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${theme.bar} rounded-full`}
                        style={{ width: skill.level }}
                      />
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
