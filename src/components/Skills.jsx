import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Code, 
  Database, 
  Layers, 
  ShoppingCart, 
  Sparkles,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'WEB & FRONTEND', 'BACKEND & APIS', 'AUTOMATION & AI', 'SYSTEMS & LANGUAGES', 'PRODUCT & E-COMMERCE'];

  const skillCards = [
    {
      title: 'Modern React & Frontend Engineering',
      category: 'WEB & FRONTEND',
      icon: Code,
      color: 'cyan',
      desc: 'Building responsive, fast, and accessible user interfaces using React, Vite, Tailwind CSS, Three.js WebGL graphics, and component-driven architecture.',
      tags: ['React 18', 'Vite', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Responsive UI'],
      level: '95%'
    },
    {
      title: 'Node.js & Backend Architecture',
      category: 'BACKEND & APIS',
      icon: Server,
      color: 'purple',
      desc: 'Developing scalable Node.js server architectures, custom REST APIs, webhook listeners, and automated lead capture-and-follow-up pipelines unifying multi-channel traffic.',
      tags: ['Node.js', 'Express', 'REST APIs', 'Webhooks', 'Nodemailer', 'JSON Pipelines'],
      level: '94%'
    },
    {
      title: 'Retrieval-Augmented Generation (RAG) & AI',
      category: 'AUTOMATION & AI',
      icon: Cpu,
      color: 'blue',
      desc: 'Engineering RAG pipelines over a 260-chunk, 33,500+ word knowledge base so Grok AI follow-ups remain strictly grounded in verified pricing and specs without hallucinations.',
      tags: ['RAG Pipeline', 'Grok AI', 'Knowledge Embeddings', 'Hallucination Prevention', 'Prompt Engineering'],
      level: '93%'
    },
    {
      title: 'C++ & Object-Oriented Programming (OOP)',
      category: 'SYSTEMS & LANGUAGES',
      icon: Database,
      color: 'green',
      desc: 'Applying core OOP principles (classes, encapsulation, inheritance, polymorphism) to engineer real-world systems including Cinema Booking & Smart Parking algorithms.',
      tags: ['C++', 'OOP Architecture', 'Data Structures', 'Algorithm Design', 'Python'],
      level: '90%'
    },
    {
      title: 'Cloud Automation & Webhook Services',
      category: 'AUTOMATION & AI',
      icon: Cloud,
      color: 'pink',
      desc: 'Hands-on cloud automation at Slashcloud.io, custom Zoho SalesIQ chat APIs, Google Docs & Sheets bidirectional feedback loops, and human-in-the-loop dashboards.',
      tags: ['Slashcloud.io', 'Zoho SalesIQ API', 'Google Docs/Sheets API', 'Lead Automation', 'Human-in-Loop'],
      level: '92%'
    },
    {
      title: 'Product Sense & E-Commerce Scaling',
      category: 'PRODUCT & E-COMMERCE',
      icon: ShoppingCart,
      color: 'yellow',
      desc: 'Bootstrapped and scaled self-managed online stores generating over PKR 10 Lakh+ in monthly sales through strategic product testing, conversion funnels, and logistics.',
      tags: ['PKR 10L+/Mo Scale', 'Product Thinking', 'Conversion Funnels', 'Business-Driven Engineering'],
      level: '95%'
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
              TECHNICAL CAPABILITIES
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
                      <span>PROFICIENCY_INDEX</span>
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
