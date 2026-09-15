import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

export default function Reviews() {
  const reviews = [
    {
      id: 'REC_001',
      name: 'Zain Khalid',
      role: 'E-commerce Founder & Client',
      initials: 'ZK',
      accent: 'cyan',
      rating: 5,
      comment: 'Ali delivered a modern, lightning-fast web platform that actually converts. Clean code architecture, great load times, and an intuitive UI that our users love.',
      glowBorder: 'border-cyan-500/20 hover:border-cyan-400/50',
      avatarBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
    },
    {
      id: 'REC_002',
      name: 'David M.',
      role: 'Operations Lead, Canadian Client',
      initials: 'DM',
      accent: 'purple',
      rating: 5,
      comment: 'Ali engineered an automated Node.js lead capture and RAG pipeline for our store that saved our team hours every day. Extremely sharp, proactive, and a remarkably fast learner.',
      glowBorder: 'border-purple-500/20 hover:border-purple-400/50',
      avatarBg: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
    },
    {
      id: 'REC_003',
      name: 'Hamza Tariq',
      role: 'Agency Lead, Romic Media',
      initials: 'HT',
      accent: 'blue',
      rating: 5,
      comment: 'Worked with Ali on the romicmedia.com platform. He handled the frontend design, EmailJS form integrations, and search indexing independently and delivered right on schedule.',
      glowBorder: 'border-blue-500/20 hover:border-blue-400/50',
      avatarBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
    },
    {
      id: 'REC_004',
      name: 'Usman Baig',
      role: 'Tech Lead & Retailer, Faisalabad',
      initials: 'UB',
      accent: 'pink',
      rating: 5,
      comment: 'Dependable developer and strong communicator. He writes clean, structured code and has a natural knack for bridging frontend aesthetics with solid backend logic.',
      glowBorder: 'border-pink-500/20 hover:border-pink-400/50',
      avatarBg: 'bg-pink-500/20 text-pink-300 border-pink-400/30'
    }
  ];

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>ENDORSEMENTS // 05</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            RECOMMENDATIONS &amp; FEEDBACK
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
        </div>

        {/* Reviews Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              onMouseEnter={() => playHoverSound()}
              className={`glass-panel rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${rev.glowBorder} flex flex-col justify-between hover:-translate-y-1`}
            >
              <div>
                {/* Top: ID & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-slate-500">
                    // {rev.id}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${rev.avatarBg}`}>
                  {rev.initials}
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">
                    {rev.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
