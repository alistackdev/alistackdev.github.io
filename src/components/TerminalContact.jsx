import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Send, 
  Trash2, 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin, 
  Lock, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { playClickSound, playHoverSound, playTerminalKeySound, playSuccessSound } from '../utils/sound';

export default function TerminalContact() {
  const [logs, setLogs] = useState([
    { type: 'info', text: 'Initializing secure transmission port [PROTOCOL_V2.5]...' },
    { type: 'success', text: 'STATUS: ACCESS_GRANTED // Slashcloud Node Online.' },
    { type: 'hint', text: 'Type a message below or use CLI commands: help, skills, projects, internship, clear' }
  ]);
  
  const [commandInput, setCommandInput] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    playTerminalKeySound();
    const cmd = commandInput.trim().toLowerCase();
    const newLogs = [...logs, { type: 'prompt', text: `guest@hassan:~# ${commandInput}` }];

    if (cmd === 'help') {
      newLogs.push({
        type: 'info',
        text: 'AVAILABLE SYSTEM COMMANDS: \n- skills      : View engineering abilities \n- projects    : View active production systems \n- internship  : Inspect Slashcloud.io role \n- contact     : Dump phone & comms ports \n- sudo hire   : Immediate developer booking \n- clear       : Flush terminal screen'
      });
    } else if (cmd === 'skills') {
      newLogs.push({
        type: 'success',
        text: 'CORE_STACK: Node.js, Express, RAG Pipelines, Grok AI, React 18, Vite, Tailwind, C++ (OOP), Python, REST APIs, Webhooks, Meta Ads'
      });
    } else if (cmd === 'projects') {
      newLogs.push({
        type: 'info',
        text: 'PROJECTS: \n1. Canada Log Home Store RAG Pipeline (loghomestore.ca)\n2. Romic Media Platform (romicmedia.com)\n3. Modern React Cyber Hub (alistackdev.github.io)\n4. C++ OOP Cinema & Parking Systems'
      });
    } else if (cmd === 'internship') {
      newLogs.push({
        type: 'success',
        text: 'ROLE: Backend & Automation Engineer Intern @ Slashcloud.io (Past 3 Months). Building production backend automation, webhook infrastructure, and cloud data workflows.'
      });
    } else if (cmd === 'contact') {
      newLogs.push({
        type: 'info',
        text: 'PHONE: +92-324-4086454 | EMAIL: hassanguaraya@gmail.com | LINKEDIN: https://www.linkedin.com/in/alistackdev1'
      });
    } else if (cmd === 'sudo hire') {
      newLogs.push({
        type: 'success',
        text: 'ROOT PRIVILEGES GRANTED: Ali Hassan is ready for Backend, Node.js, RAG Automation, and Full-Stack roles. Dispatch payload below!'
      });
      playSuccessSound();
    } else if (cmd === 'clear') {
      setLogs([]);
      setCommandInput('');
      return;
    } else {
      newLogs.push({
        type: 'error',
        text: `Command not recognized: "${commandInput}". Type "help" for valid commands.`
      });
    }

    setLogs(newLogs);
    setCommandInput('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    setSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xaqkbekv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        playSuccessSound();
        setLogs(prev => [
          ...prev, 
          { type: 'success', text: `>> PAYLOAD DELIVERED to Ali Hassan! Awaiting confirmation.` }
        ]);
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error('Transmission failed');
      }
    } catch (err) {
      setSubmissionStatus('error');
      setLogs(prev => [
        ...prev, 
        { type: 'error', text: `>> ERROR: Transmission failed. Direct relay: hassanguaraya@gmail.com.` }
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  const commsPorts = [
    {
      label: 'AUDIO_COMM_PORT (PHONE)',
      val: '+92-324-4086454',
      href: 'tel:+923244086454',
      icon: Phone,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      label: 'SECURE_MAIL_RELAY (EMAIL)',
      val: 'hassanguaraya@gmail.com',
      href: 'mailto:hassanguaraya@gmail.com',
      icon: Mail,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      label: 'PROFESSIONAL_NODE (LINKEDIN)',
      val: 'linkedin.com/in/alistackdev1',
      href: 'https://www.linkedin.com/in/alistackdev1',
      icon: Linkedin,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      label: 'SOCIAL_NODE (INSTAGRAM)',
      val: '@the_romeo_city',
      href: 'https://www.instagram.com/the_romeo_city?igsh=ejRrN3g4em50c3Vr',
      icon: Instagram,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/30'
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>SECURE_LINK // 06</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            COMMAND &amp; TRANSMISSION PORT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
        </div>

        {/* Dual Layout: Interactive CLI + Form & Connectivity Ports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Terminal Box */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            
            {/* Terminal Window Bar */}
            <div className="bg-[#090c19] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  guest@hassan-node:~ (bash)
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400/70">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentTime || 'SYNCING...'}</span>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div 
              ref={terminalEndRef}
              className="p-4 sm:p-6 bg-[#04060f]/90 font-mono text-xs max-h-56 overflow-y-auto space-y-2 border-b border-slate-800"
            >
              {logs.map((item, idx) => (
                <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                  {item.type === 'prompt' && (
                    <span className="text-cyan-400 font-bold">{item.text}</span>
                  )}
                  {item.type === 'info' && (
                    <span className="text-slate-300">{item.text}</span>
                  )}
                  {item.type === 'success' && (
                    <span className="text-emerald-400 font-semibold">{item.text}</span>
                  )}
                  {item.type === 'error' && (
                    <span className="text-rose-400 font-semibold">{item.text}</span>
                  )}
                  {item.type === 'hint' && (
                    <span className="text-slate-500 italic">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick CLI Input */}
            <form onSubmit={handleCommandSubmit} className="bg-[#070a16] px-4 py-2 flex items-center gap-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-cyan-400">cmd &gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type 'help', 'skills', 'internship'..."
                className="bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-slate-600 w-full"
              />
              <button 
                type="submit" 
                className="font-mono text-[10px] text-cyan-400 hover:text-white px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20"
              >
                EXEC
              </button>
            </form>

            {/* Contact Form Submission */}
            <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-5 bg-[#070914]/80">
              <div className="font-mono text-xs text-slate-400 mb-2">
                // TRANSMIT DIRECT PAYLOAD TO ALI HASSAN:
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="block font-mono text-xs text-cyan-400">
                  guest input_name &gt;
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => {
                    playTerminalKeySound();
                    setFormState({ ...formState, name: e.target.value });
                  }}
                  placeholder="Enter your identifier..."
                  className="w-full bg-[#0a0d1d] border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block font-mono text-xs text-cyan-400">
                  guest input_email &gt;
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => {
                    playTerminalKeySound();
                    setFormState({ ...formState, email: e.target.value });
                  }}
                  placeholder="your.email@network.com..."
                  className="w-full bg-[#0a0d1d] border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block font-mono text-xs text-cyan-400">
                  guest input_message &gt;
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => {
                    playTerminalKeySound();
                    setFormState({ ...formState, message: e.target.value });
                  }}
                  placeholder="Inquiries, backend specifications, or collaboration parameters..."
                  className="w-full bg-[#0a0d1d] border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submission feedback */}
              {submissionStatus === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TRANSMISSION DELIVERED! Ali will review and respond shortly.</span>
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>ERROR: Payload failed. Please email hassanguaraya@gmail.com directly.</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={() => playClickSound()}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-black font-mono font-bold text-sm tracking-wider hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'TRANSMITTING...' : 'EXECUTE send_payload.sh'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-3 rounded-xl bg-[#0e1222] border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                  title="Clear inputs"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>

          {/* Comms Port Mapping (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 space-y-6">
              
              <div className="border-b border-cyan-500/20 pb-4">
                <h3 className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  CONNECTIVITY_PORT_MAPPING
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-1">
                  Verified communication nodes for engineering &amp; collaboration.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-4">
                {commsPorts.map((channel, idx) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={idx}
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      onMouseEnter={() => playHoverSound()}
                      className="p-4 rounded-xl bg-[#090d1e]/80 border border-slate-800/80 hover:border-cyan-500/40 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                    >
                      <div className={`p-3 rounded-xl border ${channel.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] text-slate-500 tracking-wider">
                          {channel.label}
                        </div>
                        <div className="font-mono text-sm text-cyan-300 font-medium truncate group-hover:text-white transition-colors">
                          {channel.val}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Security Badge */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SSL_SECURE_CHANNEL // TARGET: ALI_HASSAN</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
