import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Edit3,
  RotateCcw,
  Mail,
  MessageSquare,
  FileText,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Send,
  Check,
  ChevronRight,
  Database,
  RefreshCw,
  Clock,
  Inbox,
  UserCheck,
  Smartphone,
  CheckCheck,
  Sliders,
  TrendingUp,
  Cpu,
  Trash2,
  Filter,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';
import AliPersonalAgent from '../components/AliPersonalAgent';

// Import the 12 Modular GSAP Components
import HeroReveal from '../components/case-study/HeroReveal';
import WordRotator from '../components/case-study/WordRotator';
import LiveInboundPings from '../components/case-study/LiveInboundPings';
import ReviewShuffle from '../components/case-study/ReviewShuffle';
import CountUpStats from '../components/case-study/CountUpStats';
import BentoFeatures from '../components/case-study/BentoFeatures';
import CursorTour from '../components/case-study/CursorTour';
import ProcessDraw from '../components/case-study/ProcessDraw';
import BeforeAfterSlider from '../components/case-study/BeforeAfterSlider';
import CostRoll from '../components/case-study/CostRoll';
import UsVsThem from '../components/case-study/UsVsThem';
import ClickSuccessCTA from '../components/case-study/ClickSuccessCTA';

export default function CaseStudyRAG() {
  const [activeTab, setActiveTab] = useState('overview');
  const isDark = true; // Fixed Obsidian Dark Tech Theme

  useEffect(() => {
    try {
      localStorage.removeItem('case_study_theme');
      document.body.style.backgroundColor = '#08090c';
      document.body.style.color = '#f8fafc';
    } catch (_) {}
  }, []);

  // Interactive Hero Dashboard Simulation State
  const [activeChannel, setActiveChannel] = useState('chat'); // 'chat' | 'form' | 'email'
  const [heroDraftTone, setHeroDraftTone] = useState('friendly'); // 'friendly' | 'concise' | 'quote'
  const [heroApprovalState, setHeroApprovalState] = useState('pending'); // 'pending' | 'approved' | 'edited'
  const [heroEditReason, setHeroEditReason] = useState('Always mention free express freight on orders over $500');
  const [heroIsStarred, setHeroIsStarred] = useState(true);

  // Six Problems / Six Fixes Interactive State
  const [fix2Approved, setFix2Approved] = useState(false);
  const [fix5StarCount, setFix5StarCount] = useState(48);
  const [fix6FilterTab, setFix6FilterTab] = useState('actionable');

  // Channel Data for Hero Dashboard
  const channelData = {
    chat: {
      name: 'Website Live Chat',
      badge: 'Live Session · Just Now',
      visitor: 'Alex Vance',
      company: 'High-Volume Purchaser',
      contact: 'alex.vance@company.com · (415) 555-0192',
      query: 'Hi! We need 8 units of the Pro Series for our regional team. What volume discount do you offer, and can this arrive in Calgary within 4 business days?',
      ragSource: 'Commercial Volume Pricing Table (Doc #184)',
      ragFact: 'Tier 2 discount: 15% off on 5–19 units. Expedited freight to Western Canada arrives in 3–4 business days.',
      drafts: {
        friendly:
          'Hi Alex! Great news — for an order of 8 units, you automatically qualify for our 15% commercial volume discount. Standard express delivery to Calgary takes 3–4 business days directly from our main depot. Would you like me to send a formal invoice link?',
        concise:
          'Hi Alex — Yes, 8 units qualify for our 15% volume tier. Expedited delivery to Calgary takes 3–4 business days. Shall I prepare an invoice draft for your review?',
        quote:
          'Hello Alex, thank you for reaching out. An 8-unit order qualifies for our 15% enterprise volume tier discount. Tracked freight to Calgary is estimated at 3–4 business days with priority dispatch. Full formal quote is attached.'
      }
    },
    form: {
      name: 'Website Contact Form',
      badge: 'Web Form · 4m ago',
      visitor: 'Elena Rostova',
      company: 'Biodyne Laboratory',
      contact: 'e.rostova@biodyne.ca',
      query: 'We have 220V dual-line industrial outlets in our test facility. Does the Enterprise Core model support direct 220V single-phase connection without a transformer?',
      ragSource: 'Electrical Specifications Manual (Doc #092)',
      ragFact: 'Hardware auto-switches 100–240V AC (50/60Hz, single phase). Direct 220V connection fully certified.',
      drafts: {
        friendly:
          'Hello Elena! Yes, the Enterprise Core includes an internal auto-switching 100–240V power module, so you can plug directly into your 220V single-phase outlets without any external transformer. All units are UL/CSA certified!',
        concise:
          'Hi Elena — The Enterprise Core supports 100–240V AC auto-switching natively. No transformer is needed for 220V single-phase connections. Safety specs available on request.',
        quote:
          'Hello Elena, thank you for your technical inquiry. The Enterprise Core is factory-certified for 100–240V AC single-phase lines without requiring a step-down converter.'
      }
    },
    email: {
      name: 'Direct Business Email',
      badge: 'Inbound Mail · 12m ago',
      visitor: 'David Miller',
      company: 'Bright Studio Partners',
      contact: 'david@brightstudio.io',
      query: 'Following up on our quote from yesterday — can we add 2 extra seats to our initial rollout while keeping the promotional package pricing?',
      ragSource: 'Customer Account & Quote History (Order #9042)',
      ragFact: 'Existing quote #9042 locked in promotional tier through end of month. Seat additions permitted.',
      drafts: {
        friendly:
          'Hi David, absolutely! I can adjust Quote #9042 to include the 2 additional seats at the same promotional rate. I have updated the file and will send the revised link right over!',
        concise:
          'Hi David — Yes, we have added 2 additional seats to your existing quote at the promotional rate. Updated link ready for sign-off.',
        quote:
          'Hello David, your request has been confirmed. Two additional seats have been added to Quote #9042 preserving your promotional pricing tier.'
      }
    }
  };

  const currentChannel = channelData[activeChannel];

  // Scrollspy to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'interactive-dashboard', 'features-deepdive', 'before-after', 'stats', 'cost-roi', 'blueprint'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    playClickSound();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      className="min-h-screen bg-[#08090c] text-[#f8fafc] selection:bg-cyan-500/30 selection:text-cyan-200 antialiased"
    >
      {/* =====================================================================
          1. STICKY TOP NAVIGATION BAR (GLASSY OBSIDIAN DARK TECH)
         ===================================================================== */}
      <header className="sticky top-0 z-50 py-3 backdrop-blur-xl border-b bg-[#06070d]/85 border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.7)] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Left: Brand Logo & Avatar matching main site */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[1.5px] shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.8)] transition-all">
                  <div className="w-full h-full bg-[#070913] rounded-[9px] overflow-hidden">
                    <img
                      src="avatar.jpg"
                      alt="Ali Stack Dev"
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                {/* Blue Tick Badge */}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#1d9bf0] text-white rounded-full flex items-center justify-center border border-[#06070d]">
                  <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-sm tracking-wider text-white">
                    ALI STACK <span className="text-cyan-500">DEV</span>
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-widest -mt-0.5 text-cyan-300/80">
                  AI &amp; BACKEND SYSTEMS
                </span>
              </div>
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>
            <a
              href="/"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border bg-cyan-950/40 hover:bg-cyan-900/50 border-cyan-500/30 text-cyan-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PORTFOLIO</span>
            </a>
          </div>

          {/* Center: Glassy Section Tabs */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-mono font-bold">
            {[
              { id: 'overview', label: '01 HERO' },
              { id: 'interactive-dashboard', label: '02 CONSOLE' },
              { id: 'before-after', label: '03 BEFORE/AFTER' },
              { id: 'features-deepdive', label: '04 BENTO' },
              { id: 'stats', label: '05 RESULTS' },
              { id: 'cost-roi', label: '06 ROI' },
              { id: 'blueprint', label: '07 BLUEPRINT' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollTo(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,254,0.3)] font-black'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right: Signature Cyber Gradient Button */}
          <div className="flex items-center gap-2.5">
            <a
              href="/#contact"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.8)] hover:scale-[1.02] transition-all cursor-pointer border border-cyan-300/40"
            >
              <span>DISCUSS ARCHITECTURE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>
      {/* =====================================================================
          2. MODULE 01: HERO REVEAL & MODULE 02: WORD ROTATOR
         ===================================================================== */}
      <section
        id="overview"
        className="border-b pt-6 pb-12 bg-[#08090c] border-cyan-500/20"
      >
        <HeroReveal
          onExploreClick={() => scrollTo('interactive-dashboard')}
          onContactClick={() => scrollTo('blueprint')}
        />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <WordRotator />
        </div>
      </section>

      {/* =====================================================================
          3. MODULE 03: LIVE INBOUND PINGS (STREAM & VELOCITY)
         ===================================================================== */}
      <section className="border-b bg-[#08090c] border-cyan-500/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <LiveInboundPings />
        </div>
      </section>

      {/* =====================================================================
          4. THE INTERACTIVE MACOS DASHBOARD COMMAND CENTER
         ===================================================================== */}
      <section
        id="interactive-dashboard"
        className="py-16 sm:py-24 border-b bg-[#08090c] border-cyan-500/20"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-[720px] mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              ALL CHANNELS UNIFIED · 1 DEDICATED COMMAND CONSOLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-1 tracking-tight text-white">
              Every Channel Handled in One Single Dashboard
            </h2>
            <p className="text-xs sm:text-sm mt-1.5 text-slate-400">
              No more switching tabs between live chat, form inboxes, and email threads. All incoming customer inquiries route into this single command screen with instant 3-layer business grounding and 1-click human sign-off.
            </p>
          </div>

          {/* macOS Window Title Bar - Crisp Clean Light SaaS Console */}
          <div className="rounded-3xl border overflow-hidden border-slate-300/80 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
            
            {/* macOS Window Title Bar */}
            <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#ef4444] border border-[#dc2626]/40 inline-block shadow-xs" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] border border-[#d97706]/40 inline-block shadow-xs" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] border border-[#059669]/40 inline-block shadow-xs" />
                <span className="ml-3 font-mono font-bold text-xs hidden sm:inline text-slate-700">
                  Inbound AI Command Center · Production v2.4
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border bg-emerald-50 border-emerald-200 text-emerald-700 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  <span>Real-Time Gateway: Online</span>
                </span>
              </div>
            </div>

            {/* Dashboard Inner Workspace - Clean Light SaaS Theme */}
            <div className="p-4 sm:p-6 bg-[#f8fafc] text-slate-900">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
                
                {/* =========================================================================
                    LEFT COLUMN: MULTI-CHANNEL INBOUND LEADS LIST (5 of 12 cols)
                   ========================================================================= */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  
                  {/* Left Column Header */}
                  <div className="flex items-center justify-between px-1 pb-1">
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-cyan-700" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                        INBOUND QUEUE (3 CHANNELS)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      ● 3 Waiting
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 px-1 mb-1">
                    Click any incoming lead to open its synthesized response:
                  </p>

                  {/* List of 3 Leads from Different Channels */}
                  {[
                    {
                      id: 'chat',
                      icon: MessageSquare,
                      channelLabel: 'Website Live Chat',
                      channelTag: 'LIVE CHAT',
                      tagColor: 'border-cyan-200 text-cyan-800 bg-cyan-50',
                      name: 'Alex Vance',
                      company: 'High-Volume Purchaser',
                      location: 'Calgary, AB',
                      preview: 'Need 8 units Pro Series... volume discount?',
                      time: 'Just Now',
                      status: '⚡ 1.4s Draft Ready'
                    },
                    {
                      id: 'form',
                      icon: FileText,
                      channelLabel: 'Website Contact Form',
                      channelTag: 'WEB FORM',
                      tagColor: 'border-purple-200 text-purple-800 bg-purple-50',
                      name: 'Dr. Elena Rostova',
                      company: 'Biodyne Laboratory',
                      location: 'Vancouver, BC',
                      preview: '220V dual-line outlets... direct connection?',
                      time: '4m ago',
                      status: '⚡ 1.2s Draft Ready'
                    },
                    {
                      id: 'email',
                      icon: Mail,
                      channelLabel: 'Direct Business Email',
                      channelTag: 'EMAIL',
                      tagColor: 'border-blue-200 text-blue-800 bg-blue-50',
                      name: 'David Miller',
                      company: 'Bright Studio Partners',
                      location: 'Toronto, ON',
                      preview: 'Quote #9042... add 2 extra seats?',
                      time: '12m ago',
                      status: '⚡ 1.1s Draft Ready'
                    }
                  ].map((lead) => {
                    const isSelected = activeChannel === lead.id;
                    const IconComponent = lead.icon;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => {
                          playClickSound();
                          setActiveChannel(lead.id);
                          setHeroApprovalState('pending');
                        }}
                        onMouseEnter={() => playHoverSound()}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                          isSelected
                            ? 'bg-white border-cyan-600 shadow-md ring-2 ring-cyan-500/20'
                            : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700'
                        }`}
                      >
                        {/* Top Line: Channel badge & Timestamp */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${lead.tagColor}`}>
                            <IconComponent className="w-3 h-3" />
                            <span>{lead.channelTag}</span>
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {lead.time}
                          </span>
                        </div>

                        {/* Middle Line: Lead Name & Location */}
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                            <span>{lead.name}</span>
                            <span className="text-xs font-normal text-slate-500">· {lead.company}</span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-mono font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                              OPEN
                            </span>
                          )}
                        </div>

                        {/* Customer Message Preview */}
                        <p className="text-xs text-slate-600 line-clamp-1 italic mb-2.5">
                          &quot;{lead.preview}&quot;
                        </p>

                        {/* Bottom Tag */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono">
                          <span className="text-cyan-700 font-bold">{lead.status}</span>
                          <span className="text-slate-500 text-[10px]">Click to inspect →</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Channel Integration Footer */}
                  <div className="mt-auto p-3.5 rounded-xl border border-slate-200 bg-white text-[11px] font-mono text-slate-600 flex items-center justify-between shadow-xs">
                    <span>📡 All Webhooks Online</span>
                    <span className="text-emerald-700 font-bold">Sub-45ms Relay</span>
                  </div>
                </div>

                {/* =========================================================================
                    RIGHT COLUMN: OPENED LEAD & CONNECTED AI RESPONSE (7 of 12 cols)
                   ========================================================================= */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                  
                  {/* Top Bar: Lead Identity & Channel Header */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                          {currentChannel.visitor.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-base text-slate-900">
                              {currentChannel.visitor}
                            </span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-cyan-50 border border-cyan-200 text-cyan-800">
                              {currentChannel.badge}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-500 mt-0.5">
                            {currentChannel.company} · <span className="text-cyan-700 font-semibold">{currentChannel.contact}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Ready in 1.4s</span>
                      </div>
                    </div>

                    {/* Step 1: Customer Incoming Query */}
                    <div className="mb-3.5">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-700" />
                        <span>1. Customer Message (Incoming):</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm leading-relaxed italic text-slate-800 font-sans">
                        &quot;{currentChannel.query}&quot;
                      </div>
                    </div>

                    {/* Step 2: Connected AI Synthesis Engine (Connecting Chunks + Starred Responses) */}
                    <div className="mb-3.5 p-3.5 rounded-xl border border-cyan-200 bg-cyan-50/60">
                      <div className="text-[11px] font-mono font-bold uppercase mb-2 flex items-center justify-between text-cyan-900">
                        <span className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-cyan-700" />
                          <span>2. AI Grounding Engine (Chunks + Starred Tone):</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-cyan-200/60 text-cyan-900 font-bold">
                          100% FACTUAL MATCH
                        </span>
                      </div>

                      {/* Grounding signals stacked cleanly under the message */}
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg bg-white border border-cyan-200/80 text-xs">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                              <span>📚 Business Chunk:</span>
                              <span className="text-cyan-800">{currentChannel.ragSource}</span>
                            </span>
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">98% Match</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {currentChannel.ragFact}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-amber-200/80 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            <span className="text-[11px] text-slate-700">
                              <strong className="text-amber-900">Great Past Response:</strong> Injected starred human enterprise tone for commercial deals.
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-bold">Learned</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Generated AI Response Draft (Awaiting Sign-Off) */}
                    <div className="p-4 rounded-xl border-2 border-cyan-500/40 bg-white mb-4 shadow-xs">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <span className="text-xs font-mono font-bold text-cyan-800 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                          <span>3. Generated AI Response (Ready for Review):</span>
                        </span>

                        {/* Tone Selector */}
                        <div className="flex items-center gap-1 p-0.5 rounded-lg border border-slate-200 bg-slate-100">
                          {[
                            { id: 'friendly', label: 'Warm' },
                            { id: 'concise', label: 'Short' },
                            { id: 'quote', label: 'Formal' }
                          ].map((tone) => (
                            <button
                              key={tone.id}
                              type="button"
                              onClick={() => {
                                playClickSound();
                                setHeroDraftTone(tone.id);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                heroDraftTone === tone.id
                                  ? 'bg-white text-cyan-900 shadow-xs border border-slate-300 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {tone.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed text-slate-900 font-normal">
                        {currentChannel.drafts[heroDraftTone]}
                      </p>
                    </div>

                    {/* Approval Feedback Alerts */}
                    {heroApprovalState === 'approved' && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 font-mono font-bold mb-4 flex items-center gap-2 shadow-xs">
                        <CheckCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>Dispatched to {currentChannel.visitor} via email relay! Customer notified.</span>
                      </div>
                    )}

                    {heroApprovalState === 'edited' && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-mono font-bold mb-4 flex items-center gap-2 shadow-xs">
                        <Edit3 className="w-4 h-4 shrink-0 text-amber-600" />
                        <span>Custom edit dispatched + Starred Response active learning note recorded!</span>
                      </div>
                    )}
                  </div>

                  {/* Step 4: Human Sign-Off Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setHeroApprovalState('approved');
                        }}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-xs sm:text-sm tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-100" />
                        <span>APPROVE &amp; SEND (1-CLICK)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setHeroApprovalState('edited');
                        }}
                        className="py-3 px-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
                      >
                        <Edit3 className="w-4 h-4 text-cyan-700" />
                        <span>EDIT</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono px-1 text-slate-500">
                      <span>🛡️ Zero automated dispatch without your approval</span>
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setHeroIsStarred(!heroIsStarred);
                        }}
                        className="text-amber-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Star className={`w-3.5 h-3.5 ${heroIsStarred ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                        <span>{heroIsStarred ? 'Starred Response (★)' : 'Star Response'}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. MODULE 09: BEFORE / AFTER COMPARISON SLIDER
         ===================================================================== */}
      <section
        id="before-after"
        className="border-b bg-[#08090c] border-cyan-500/20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* =====================================================================
          6. MODULE 07: AUTOMATED CURSOR TOUR & MODULE 08: PROCESS DRAW
         ===================================================================== */}
      <section
        id="features-deepdive"
        className="border-b py-12 bg-[#08090c] border-cyan-500/20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <CursorTour />
          <ProcessDraw />
          <BentoFeatures />
        </div>
      </section>

      {/* =====================================================================
          7. MODULE 05: COUNT-UP STATS & MODULE 04: REVIEW SHUFFLE
         ===================================================================== */}
      <section
        id="stats"
        className="border-b py-12 bg-[#08090c] border-cyan-500/20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <CountUpStats />
          <ReviewShuffle />
        </div>
      </section>

      {/* =====================================================================
          8. MODULE 10: COST ROLL & MODULE 11: US VS THEM
         ===================================================================== */}
      <section
        id="cost-roi"
        className="border-b py-12 bg-[#08090c] border-cyan-500/20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <CostRoll />
          <UsVsThem onCtaClick={() => scrollTo('blueprint')} />
        </div>
      </section>

      {/* =====================================================================
          9. SYSTEM BLUEPRINT (INTERACTIVE GRAPH)
         ===================================================================== */}
      <section
        id="blueprint"
        className="py-16 sm:py-24 border-b bg-[#08090c] border-cyan-500/20"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                SYSTEM ARCHITECTURE
              </span>
              <h2 className="text-[28px] sm:text-[38px] font-black tracking-tight mt-1 text-white">
                Interactive Technical Blueprint
              </h2>
              <p className="text-base mt-1 max-w-[60ch] text-slate-400">
                Visual topological map showing webhooks, Express middleware, RAG knowledge stores, Grok AI synthesis, and the human gate.
              </p>
            </div>

            <a
              href="/architecture/chatbot-enterprise-architecture.html?theme=dark"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 border bg-[#0c1021]/80 hover:bg-[#121833] border-cyan-500/40 hover:border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.2)]"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Open Full-Screen Blueprint</span>
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border shadow-xl border-cyan-500/30 bg-[#0c101a]">
            <div className="w-full h-[540px] sm:h-[680px]">
              <iframe
                src="/architecture/chatbot-enterprise-architecture.html?view=live&theme=dark"
                title="System Architecture Diagram"
                className="w-full h-full border-0 block"
                scrolling="no"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          10. MODULE 12: CLICK → SUCCESS CTA
         ===================================================================== */}
      <section className="border-b bg-[#08090c] border-cyan-500/20">
        <ClickSuccessCTA />
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs border-t bg-[#06070d] text-slate-500 border-slate-900">
        Architected &amp; Engineered by{' '}
        <strong className="text-slate-300">Ali Hassan</strong> · Backend &amp; AI Systems Engineer · Confidential Case Study
      </footer>

      {/* Floating Personal AI Assistant */}
      <AliPersonalAgent />
    </div>
  );
}
