import React, { useState } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { playRealCatSound } from '../utils/sound';

const CUTE_CAT_QUOTES = [
  "meow! compiling clean code... 🐾",
  "(=^･ω･^=) 0 bugs detected, 100% purr-fection!",
  "crunching backend APIs at 3 AM! 🐱💻",
  "Ali's RAG & AI pipelines are purr-fectly tuned! 🤖✨",
  "purrrrr... shipping features fast! 💖",
  "typing at 450 WPM (Words Per Meow) ⚡",
  "cat /dev/coffee > ali_brain.sys ☕",
  "status: 200 OK — cat approved! 🐾",
  "Slashcloud servers: 100% uptime, 0 hairballs ☁️",
  "Ali wrote the code, but I provided moral support! 🐾💻",
  "(=^･ω･^=) review passed: LGTM (Looks Good To Meow)!",
  "Node.js microservices running with 0 latency! ⚡",
  "purr... caching hot responses in Redis ⚡",
  "you tapped me! purr meter recharged! 💖🐾",
];

const ANGRY_CAT_QUOTES = [
  "(=`OωO´=) HISS!! DO NOT DISTURB MY COMPILATION! 😾🔥",
  "GRRRR!! WHO PUSHED UNTESTED CODE TO PRODUCTION?! 😾💥",
  "ANGRY ROAR!! I AM GOING TO DELETE YOUR NODE_MODULES! ⚡",
  "HISS! MERGE CONFLICT DETECTED IN MY HEAD! 😾💢",
  "GRRR... GIVE ME TUNA RIGHT NOW OR ELSE! 🐟😾",
  "(=`･ω･´=) STOP POKING ME! SYSTEM OVERLOAD! 🔥",
];

const CUTE_EMOJIS = ['💖', '🐾', '🐟', '✨', '⚡', '🐱', '💻', '⭐'];
const ANGRY_EMOJIS = ['🔥', '😾', '💥', '⚡', '💢', '💣'];

export default function CatTyping() {
  const [isWiggling, setIsWiggling] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [cuteIndex, setCuteIndex] = useState(0);
  const [angryIndex, setAngryIndex] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [consecutiveCute, setConsecutiveCute] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState([]);
  const [speechVisible, setSpeechVisible] = useState(false);

  const triggerMeowInteraction = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    
    // Pattern: Cute plays most of the time. After a gap of 2 or 3 cute meows, play Angry!
    const triggerAngry = consecutiveCute >= 2 && Math.random() > 0.35;
    
    if (triggerAngry) {
      // ANGRY ROAR
      setIsAngry(true);
      setConsecutiveCute(0);
      playRealCatSound(true);
      setAngryIndex((prev) => (prev + 1) % ANGRY_CAT_QUOTES.length);

      // Angry particles
      const randomAngryEmoji = ANGRY_EMOJIS[Math.floor(Math.random() * ANGRY_EMOJIS.length)];
      const particleId = Date.now() + Math.random();
      setFloatingParticles((prev) => [...prev.slice(-3), { id: particleId, emoji: randomAngryEmoji }]);
      setTimeout(() => {
        setFloatingParticles((prev) => prev.filter((p) => p.id !== particleId));
      }, 1000);
    } else {
      // CUTE MEOW
      setIsAngry(false);
      setConsecutiveCute((prev) => prev + 1);
      playRealCatSound(false);
      setCuteIndex((prev) => (prev + 1) % CUTE_CAT_QUOTES.length);

      // Cute particles
      const randomCuteEmoji = CUTE_EMOJIS[Math.floor(Math.random() * CUTE_EMOJIS.length)];
      const particleId = Date.now() + Math.random();
      setFloatingParticles((prev) => [...prev.slice(-3), { id: particleId, emoji: randomCuteEmoji }]);
      setTimeout(() => {
        setFloatingParticles((prev) => prev.filter((p) => p.id !== particleId));
      }, 1000);
    }

    setTapCount((prev) => prev + 1);
    setIsWiggling(true);
    setSpeechVisible(true);

    setTimeout(() => setIsWiggling(false), 450);
  };

  const handleHover = () => {
    // On hover, play cute voice
    setIsAngry(false);
    playRealCatSound(false);
    setSpeechVisible(true);
  };

  const currentQuote = isAngry 
    ? ANGRY_CAT_QUOTES[angryIndex] 
    : CUTE_CAT_QUOTES[cuteIndex];

  return (
    <div 
      className="relative z-30 inline-flex flex-col items-center select-none cursor-pointer group"
      onClick={triggerMeowInteraction}
      onMouseEnter={handleHover}
      onMouseLeave={() => setSpeechVisible(false)}
      role="button"
      tabIndex={0}
      aria-label="Cute typing cat companion. Tap or hover for meows!"
      title="Click or hover me! (=^･ω･^=)"
    >
      {/* Interactive Cyber Speech Bubble */}
      <div 
        className={`absolute -top-12 right-0 sm:-right-4 transition-all duration-300 z-40 whitespace-nowrap pointer-events-none ${
          speechVisible
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <div 
          className={`relative px-3 py-1.5 rounded-xl backdrop-blur-md font-mono text-[11px] font-semibold flex items-center gap-1.5 border transition-all duration-300 ${
            isAngry 
              ? 'bg-[#1e0707]/95 border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.5)] text-red-300' 
              : 'bg-[#070b1e]/95 border-cyan-400/50 shadow-[0_0_25px_rgba(0,242,254,0.4)] text-cyan-300'
          }`}
        >
          {isAngry ? (
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          )}
          <span>{currentQuote}</span>
          {/* Arrow pointer */}
          <div 
            className={`absolute -bottom-1.5 right-6 w-3 h-3 border-r border-b rotate-45 ${
              isAngry 
                ? 'bg-[#1e0707] border-red-500/80' 
                : 'bg-[#070b1e] border-cyan-400/50'
            }`} 
          />
        </div>
      </div>

      {/* Floating Emojis on Click - Positioned high above the speech bubble */}
      <div className="absolute -top-24 sm:-top-28 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex items-center gap-1.5">
        {floatingParticles.map((particle) => (
          <span
            key={particle.id}
            className="text-base sm:text-lg drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] inline-block animate-bounce transform -translate-y-3 transition-all duration-700"
          >
            {particle.emoji}
          </span>
        ))}
      </div>

      {/* Main Cat Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Neon Pedestal Glow */}
        <div 
          className={`absolute -inset-1 rounded-2xl blur-md group-hover:blur-lg opacity-80 group-hover:opacity-100 transition-all pointer-events-none ${
            isAngry 
              ? 'bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30' 
              : 'bg-gradient-to-r from-cyan-500/25 via-purple-500/25 to-pink-500/25'
          }`} 
        />

        {/* High-tech Framed Badge */}
        <div 
          className={`relative rounded-2xl border p-1.5 shadow-[0_0_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-200 ${
            isAngry 
              ? 'bg-[#160606]/90 border-red-500/60 group-hover:border-red-400' 
              : 'bg-[#060918]/90 border-cyan-500/35 group-hover:border-cyan-400'
          } ${
            isWiggling 
              ? isAngry ? 'scale-115 rotate-6' : 'scale-110 -rotate-3' 
              : 'group-hover:scale-105'
          }`}
        >
          {/* Top Info Bar: Status Dot & Voice Indicator */}
          <div className="flex items-center justify-between px-1 mb-1">
            <div className="flex items-center gap-1">
              <span 
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isAngry ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]' : 'bg-emerald-400'
                }`} 
              />
              <span 
                className={`text-[8px] font-mono font-bold uppercase tracking-wider ${
                  isAngry ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {isAngry ? 'ANGRY 😾' : 'CUTE 🐾'}
              </span>
            </div>
            {tapCount > 0 && (
              <span 
                className={`text-[8px] font-mono font-bold tracking-tight px-1 rounded border ${
                  isAngry 
                    ? 'text-orange-400 bg-orange-500/10 border-orange-500/30' 
                    : 'text-pink-400 bg-pink-500/10 border-pink-500/20'
                }`}
              >
                🐾 {tapCount}
              </span>
            )}
          </div>

          {/* Cat Typing GIF */}
          <div 
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex items-center justify-center relative transition-colors ${
              isAngry ? 'bg-[#280d0d]/80' : 'bg-[#090d26]/80'
            }`}
          >
            <img 
              src="cat-typing.gif" 
              onError={(e) => {
                if (e.currentTarget.src.indexOf('Cat%20typing.gif') === -1) {
                  e.currentTarget.src = "Cat typing.gif";
                }
              }}
              alt="Cat typing furiously" 
              className={`w-full h-full object-contain filter contrast-105 group-hover:brightness-110 transition-transform ${
                isAngry ? 'scale-105 hue-rotate-15' : ''
              }`}
              loading="eager"
            />
          </div>

          {/* Bottom Terminal Footer Label */}
          <div className="mt-1 px-1 flex items-center justify-between gap-1 text-[9px] font-mono text-cyan-400/90 font-bold tracking-tight">
            <span>CO-PILOT</span>
            <span 
              className={`text-[8px] uppercase font-medium tracking-wide ${
                isAngry ? 'text-red-400 font-bold' : 'text-purple-400'
              }`}
            >
              {isAngry ? '// ROAR 🔥' : '// PURR 🐾'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
