import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Cpu, 
  Database, 
  Mail, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Terminal,
  FileText,
  UserCheck,
  MessageSquare,
  Repeat
} from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';
import AliPersonalAgent from '../components/AliPersonalAgent';

export default function CaseStudyRAG() {
  const [activeTab, setActiveTab] = useState('conversation');

  const challenges = [
    {
      num: '01',
      title: 'Rapid Conversation Turnaround',
      desc: 'Customer conversations needed to be reviewed and responded to quickly before potential buyers bounced to competitors.'
    },
    {
      num: '02',
      title: 'Human-in-the-Loop AI Guardrails',
      desc: 'The client wanted high-velocity AI assistance without giving any autonomous LLM unrestricted control over live customer communication.'
    },
    {
      num: '03',
      title: 'Full Conversation Context Awareness',
      desc: 'Responses needed to understand multi-turn conversational history and nuances, rather than treating incoming messages as isolated, one-off questions.'
    },
    {
      num: '04',
      title: 'Centralized Review & Follow-Up Hub',
      desc: 'Operators needed a single unified pane of glass to review inquiries, audit conversation logs, and trigger follow-up communications.'
    },
    {
      num: '05',
      title: 'Passive Inbox Alerts vs Dashboard Fatigue',
      desc: 'Staff should never have to stay glued to a dashboard tab all day just to discover when a fresh high-priority inquiry arrived.'
    },
    {
      num: '06',
      title: 'Exemplar-Based Active Learning Loop',
      desc: 'The system needed to continuously improve from approved human edits and real positive feedback, evolving with the client’s domain knowledge.'
    },
    {
      num: '07',
      title: 'Reliable Enterprise Lead Logging',
      desc: 'Lead contacts, conversation transcripts, and customer details had to be persisted reliably into a synchronized database without dropped events.'
    }
  ];

  const zapierComparisons = [
    {
      feature: 'Webhook Latency & Burst Traffic',
      offTheShelf: '3rd-party queue delays (up to 5-15 mins), dropped payloads during traffic spikes',
      customEngine: 'Sub-50ms event ingest via dedicated Express API Gateway with atomic queuing'
    },
    {
      feature: 'Multi-Turn Conversational State',
      offTheShelf: 'Stateless execution; cannot reconstruct previous session context or chat continuity',
      customEngine: 'Stateful conversation tracker with composite tenant indexing and session memory'
    },
    {
      feature: 'Payload Sanitization & Edge Defense',
      offTheShelf: 'Generic catch-all webhooks with zero payload armor, open to malformed schemas',
      customEngine: 'Schema repair, strict parameter sanitization, and IP brute-force lockouts'
    },
    {
      feature: 'Long-Term Cost & Scalability',
      offTheShelf: 'Aggressive per-task metering; expenses snowball with multi-step cognitive flows',
      customEngine: 'Self-hosted Node.js microservice architecture with unlimited operational runs'
    }
  ];

  const dashboardModules = [
    {
      id: 'conversation',
      icon: MessageSquare,
      title: 'Conversation Management',
      color: 'cyan',
      badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description: 'Granular thread auditing, intent classification, and schema repair across all incoming customer touchpoints.',
      features: [
        'Full conversation transcript inspection with speaker attribution',
        'Multi-session conversation history and cross-channel message linking',
        'Actionable lead identification flagging high-intent purchase queries',
        'Incomplete lead triage extracting actionable notes even from phone-only inquiries',
        'Automated transcript extraction and malformed JSON schema repair'
      ]
    },
    {
      id: 'ai_response',
      icon: Sparkles,
      title: 'AI Response Management',
      color: 'emerald',
      badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Cognitive drafting engine powered by Grok (xAI) and in-database knowledge chunks, governed by human sign-off.',
      features: [
        'Instant AI-generated follow-up drafts prepared before operator opens the lead',
        'On-demand draft regeneration with dynamic tone and temperature controls',
        'Inline human editing allowing operators to refine or customize drafts in seconds',
        'Positive response feedback button marking top-tier replies as future model anchors',
        'Domain-specific knowledge base grounding drafts in verified pricing and service specs',
        'Dynamic exemplar-based few-shot learning that evolves with human operator corrections'
      ]
    },
    {
      id: 'outreach',
      icon: Mail,
      title: 'Customer Outreach',
      color: 'purple',
      badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: 'One-click dispatch engine transforming approved drafts into formatted, branded communications.',
      features: [
        'One-click email outreach dispatching approved messages in under 2 seconds',
        'Bulk lead management allowing staged approval for batches of customer queries',
        'WYSIWYG rich-text email editing with real-time rendering and syntax highlighting',
        'Automated HTML email generation compliant with all major email clients',
        'Cryptographically signed outbound relay ensuring 100% inbox delivery'
      ]
    },
    {
      id: 'lead_mgmt',
      icon: Database,
      title: 'Lead Management & Persistence',
      color: 'pink',
      badgeClass: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
      description: 'High-performance MySQL persistence layer with soft-delete recycling and sub-5ms indexed queries.',
      features: [
        'Soft-delete recycle bin protecting customer records against accidental deletion',
        'Bulk lead deletion with comprehensive audit trails and permanent purge control',
        'High-performance pagination powered by composite tenant indices (sub-5ms queries)',
        'Bi-directional MySQL database synchronization maintaining ledger consistency',
        'Granular lead lifecycle status pipeline (New, In-Review, Approved, Dispatched, Archived)'
      ]
    }
  ];

  const results = [
    'Captures incoming customer inquiries across 5 distinct inbound channels simultaneously',
    'Maintains full conversation history and multi-turn context across days or weeks',
    'Pre-drafts high-accuracy, hallucination-free AI responses using domain knowledge',
    'Dispatches structured email notifications directly to staff with suggested draft included',
    'Centralizes inquiries, transcripts, and lead details into a single administrative portal',
    'Guarantees 100% human sign-off before any message ever reaches a customer',
    'Allows one-click inline editing and tone adjustments on every generated draft',
    'Captures approved human edits to continuously train the system’s exemplar memory',
    'Learns from real business feedback rather than relying on generic, ungrounded LLMs',
    'Logs lead profiles, contact details, and transcripts centrally with audit trails',
    'Supports one-click approved email dispatch and bulk queue operations',
    'Completely eliminates dropped webhooks, third-party middleware latency, and duplicate events'
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Subtle Background Ambience */}
      <div className="fixed inset-0 scanlines-overlay pointer-events-none opacity-25 z-10" />
      <div className="absolute top-0 left-1/3 w-[650px] h-[650px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Engineering Header Bar */}
      <header className="sticky top-0 z-40 bg-[#06070e]/90 backdrop-blur-md border-b border-cyan-500/20 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b0e22] hover:bg-[#121738] border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold tracking-wider transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>EXIT TO PORTFOLIO</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">UNLISTED PRIVATE LINK</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-semibold">CONFIDENTIAL BRIEF</span>
            </div>
          </div>

          <a
            href="#architecture-section"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-xs tracking-wider hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>JUMP TO DIAGRAM</span>
          </a>

        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 relative z-20 space-y-20">

        {/* Hero Section */}
        <section className="space-y-6 pt-4 text-left">
          
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              ENTERPRISE CLIENT CASE STUDY
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">FREELANCE REMOTE DELIVERY</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">HUMAN-IN-THE-LOOP ARCHITECTURE</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Multi-Channel Inbound Automation &amp; <span className="cyber-gradient-text">Human-in-the-Loop AI</span> Orchestration
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-4xl">
            How I engineered a centralized, client-controlled AI assistant unifying incoming customer conversations across web forms, live chat, CRM scripts, mailboxes, and SMS messaging — preparing intelligent response drafts while keeping 100% human approval over what reaches the customer.
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-xl bg-[#090d1f]/80 border border-cyan-500/20 backdrop-blur-md">
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-cyan-400">10x</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Faster Review SLA</div>
            </div>
            <div className="p-4 rounded-xl bg-[#090d1f]/80 border border-emerald-500/20 backdrop-blur-md">
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-emerald-400">0%</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Rogue AI Messages</div>
            </div>
            <div className="p-4 rounded-xl bg-[#090d1f]/80 border border-purple-500/20 backdrop-blur-md">
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-purple-400">5</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Unified Channels</div>
            </div>
            <div className="p-4 rounded-xl bg-[#090d1f]/80 border border-pink-500/20 backdrop-blur-md">
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-pink-400">100%</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Human In Control</div>
            </div>
          </div>

          {/* Core Tech Stack */}
          <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs">
            {['Node.js', 'Express.js', 'Grok xAI', 'Human-in-the-Loop', 'Exemplar Memory', 'Native RAG', 'Zoho CRM API', 'Zoho SalesIQ', 'cPanel IMAP', 'MySQL Soft-Delete', 'SSE Real-Time', 'Cloud SMS Service'].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-md bg-[#0a0e24] border border-slate-800 text-slate-300">
                {tech}
              </span>
            ))}
          </div>

        </section>

        {/* Section 1: The Bigger Idea (Human in Control) */}
        <section className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#080d22]/90 via-[#070a1a]/90 to-[#040610]/90 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.1)]">
          
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-12 h-12 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-2 w-12 h-12 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>THE CORE PHILOSOPHY &amp; SYSTEM VISION</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              "AI handles the heavy lifting. Humans remain in control."
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              The system was not built simply to replace human communication with autonomous AI. In specialized, high-ticket commerce, an inaccurate quote, hallucinated warranty promise, or incorrect material specification can cause irreparable client damage.
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Instead, this architecture was designed to give the client an <strong className="text-cyan-400 font-semibold">AI-powered executive assistant</strong> that does the heavy lifting — it ingests complex inquiries across 5 platforms, reconstructs the full multi-turn conversation context, searches verified business knowledge, and synthesizes a polished suggested response. The client retains the <strong className="text-emerald-400 font-semibold">final say and approval</strong> before a single word is dispatched to the customer.
            </p>
          </div>

        </section>

        {/* Section 2: The Client's Challenge (7 Points) */}
        <section className="space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-purple-400 uppercase tracking-widest">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <span>THE OPERATIONAL HURDLES</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              The Challenge: Why Manual Workflows Were Breaking Down
            </h2>
            <p className="text-slate-400 text-base font-light max-w-3xl">
              The client needed a smarter way to manage incoming customer conversations and follow up with potential leads. Their previous dispersed workflow generated seven major operational bottlenecks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((c) => (
              <div 
                key={c.num}
                className="p-5 rounded-xl bg-[#070a1a]/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
                    [{c.num}]
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-white">
                    {c.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm font-light leading-relaxed pl-8">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* Section 3: Why Custom Solution vs Zapier / n8n */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#070b1c]/70 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>ENGINEERING DECISION MATRIX</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Why Off-The-Shelf Tools (Zapier &amp; n8n) Were Not A Fit
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-3xl">
              The client initially considered standard automation platforms such as Zapier and n8n. However, critical limitations around webhook latency, stateful multi-turn conversations, payload handling, and operational scale made a dedicated custom solution necessary.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-cyan-500/30 text-slate-300">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-cyan-400">Architectural Metric</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-rose-400">Zapier / n8n Limitations</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-emerald-400">Custom Node.js Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {zapierComparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cyan-500/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">{row.feature}</td>
                    <td className="py-3.5 px-4 text-slate-400">{row.offTheShelf}</td>
                    <td className="py-3.5 px-4 text-emerald-300 font-medium">{row.customEngine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Live Interactive Architecture Diagram */}
        <section id="architecture-section" className="space-y-6 scroll-mt-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>COMPLETE INTERACTIVE SYSTEM ARCHITECTURE</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                Live Interactive Architecture Blueprint
              </h2>
              <p className="text-slate-400 text-sm font-light max-w-2xl">
                Interact directly with the live system architecture below: grab and drag any node to rearrange the diagram, click nodes to inspect feature overviews, and use the built-in toolbar to switch visual styles.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="architecture/chatbot-enterprise-architecture.html?theme=dark"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverSound()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e142e] hover:bg-[#151f45] border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all cursor-pointer shrink-0"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>OPEN FULL DIAGRAM &amp; NOTES</span>
              </a>
            </div>
          </div>

          {/* Live Interactive Diagram Frame (Zero Empty Space) */}
          <div className="relative -mx-2 sm:-mx-6 lg:-mx-12 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-[#0d1117] shadow-[0_0_60px_rgba(0,0,0,0.95)]">
            
            {/* Top Frame Status Bar */}
            <div className="px-4 py-2.5 bg-[#0a0d20] border-b border-cyan-500/20 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-cyan-400 font-bold">// ARCHITECTURE_EXPLORER.SYS</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
                <span className="text-emerald-400">● Live Interactive Canvas</span>
                <span>•</span>
                <span>Drag Any Node to Reposition</span>
              </div>
            </div>

            {/* Clean Live Diagram Container (Hides bottom helping cards so zero blank space) */}
            <div className="w-full h-[580px] sm:h-[740px] lg:h-[820px] bg-[#0d1117]">
              <iframe
                src="architecture/chatbot-enterprise-architecture.html?view=live&theme=dark"
                title="AQ Tech Multi-Tenant Chatbot Platform — Enterprise Architecture Diagram"
                className="w-full h-full border-0 block"
                scrolling="no"
              />
            </div>

          </div>

        </section>

        {/* Section 5: The Exemplar Learning Loop */}
        <section className="relative p-6 sm:p-10 rounded-2xl bg-[#070c20]/80 border border-emerald-500/30 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest">
              <Repeat className="w-4 h-4 text-emerald-400" />
              <span>ADAPTIVE REINFORCEMENT LEARNING</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              The Feedback Loop: How The System Learns From Human Edits
            </h2>
            <p className="text-slate-300 text-base font-light leading-relaxed">
              Rather than relying solely on a generic AI model, the response-generation layer incorporates business-specific knowledge and real examples from the client’s daily workflow. This creates a compounding intelligence flywheel:
            </p>
          </div>

          {/* Step Sequence Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[
              { step: '1', title: 'AI Suggestion', desc: 'LLM generates contextual draft using verified RAG knowledge.' },
              { step: '2', title: 'Human Review', desc: 'Client reviews draft inside dashboard or incoming alert email.' },
              { step: '3', title: 'Correction & Sign-off', desc: 'Operator approves as-is or tweaks tone, pricing, or details.' },
              { step: '4', title: 'Exemplar Memory', desc: 'Approved edit is committed into exemplars store as ground truth.' },
              { step: '5', title: 'Compounded Accuracy', desc: 'Subsequent inquiries retrieve approved exemplar as few-shot guidance.' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#09102c]/70 border border-emerald-500/20 relative space-y-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div className="font-heading font-bold text-sm text-white">{item.title}</div>
                <div className="text-slate-400 text-xs font-light leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#05091a] border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            <strong className="text-emerald-400 font-semibold">Continuous Improvement:</strong> When the client identifies a particularly good response, it can be marked as an exemplar with one click. When an AI draft requires correction, the human operator’s edited version is captured. Over time, the model sounds identically to the business founder.
          </div>
        </section>

        {/* Section 6: Email Notifications Without Constant Dashboard Monitoring */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>PASSIVE TELEMETRY &amp; REAL-TIME ALERTS</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Email Notifications Without Constant Dashboard Monitoring
            </h2>
            <p className="text-slate-300 text-base font-light max-w-3xl leading-relaxed">
              Staff shouldn't have to stay glued to an admin tab all day just to find out whether someone has submitted an inquiry. Whenever a new chat enquiry or lead arrives, the system dispatches an intelligent email directly to the client's inbox:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#080d24]/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-semibold">
                <UserCheck className="w-4 h-4" />
                <span>Customer Dossier</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Parsed contact details, telephone numbers, geographic location, and verified email address with CRM sync state.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080d24]/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-sm font-semibold">
                <FileText className="w-4 h-4" />
                <span>Full Conversation Thread</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Complete, unabridged conversation transcript and customer's exact inquiry — allowing full comprehension without opening a portal.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080d24]/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Pre-Drafted AI Response</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Ready-to-send draft prepared by Grok xAI and domain knowledge chunks, with a direct 1-click link to approve and dispatch.
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-sm font-light leading-relaxed">
            If the enquiry is straightforward, the client can review it right from their inbox at their convenience. If an inquiry flags high purchase urgency, a direct deep-link brings the operator directly into the review queue to sign off in seconds.
          </p>
        </section>

        {/* Section 7: The Centralised Administration Dashboard */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>COMMAND CENTER CAPABILITIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              The Centralised Administration Dashboard
            </h2>
            <p className="text-slate-400 text-base font-light max-w-3xl">
              An enterprise dashboard designed around speed, audit safety, and zero-distraction operator flow. Explore the 4 specialized control modules:
            </p>
          </div>

          {/* Module Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {dashboardModules.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(m.id);
                  }}
                  onMouseEnter={() => playHoverSound()}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                      : 'bg-[#080d22] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          {dashboardModules.filter((m) => m.id === activeTab).map((m) => (
            <div 
              key={m.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#070b1c]/90 border border-cyan-500/30 space-y-5 animate-in fade-in duration-300"
            >
              <div className="space-y-1">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase font-bold border ${m.badgeClass}`}>
                  ACTIVE MODULE
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  {m.title}
                </h3>
                <p className="text-slate-400 text-sm font-light">
                  {m.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {m.features.map((feat, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#09102c]/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Section 8: The Result (12-Point Transformation) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>THE QUANTIFIABLE OUTCOME</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              The Result: A Centralised, Scalable AI Operation
            </h2>
            <p className="text-slate-400 text-base font-light max-w-3xl">
              The project transformed a fragmented, chaotic customer-enquiry workflow into an enterprise-grade AI-assisted lead management operation. Instead of requiring the client to manually read every conversation, write every response, and constantly monitor disparate platforms, the new architecture:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {results.map((r, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-[#070b1a]/80 border border-slate-800 flex items-start gap-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="text-slate-300 text-sm font-light leading-relaxed">
                  {r}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Architecture Manifesto */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#080d24] via-[#050818] to-[#040612] border-2 border-cyan-500/40 text-center space-y-6 shadow-[0_0_60px_rgba(0,242,254,0.15)]">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              ARCHITECTURAL PRINCIPLE
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              AI Handles The Heavy Lifting. Humans Remain In Control.
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              This case study represents how modern businesses can safely adopt AI without gambling their reputation. By pairing custom event ingestion with grounded RAG inference and an ironclad human-in-the-loop review gate, the client scaled their lead operations tenfold while keeping absolute sovereignty over customer communication.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-xs tracking-wider hover:shadow-[0_0_30px_rgba(0,242,254,0.8)] transition-all cursor-pointer"
            >
              DISCUSS YOUR CUSTOM ARCHITECTURE
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#030408] py-8 text-center text-xs font-mono text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} ALI HASSAN (ALISTACKDEV). ALL RIGHTS RESERVED.</span>
          <span className="text-cyan-400/80">CONFIDENTIAL UNLISTED ENGINEERING BRIEF</span>
        </div>
      </footer>

      {/* Floating Personal AI RAG Assistant */}
      <AliPersonalAgent />

    </div>
  );
}
