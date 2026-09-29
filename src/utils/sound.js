// Web Audio API Sound Synthesizer for high-tech UI feedback

let audioCtx = null;
let isMuted = localStorage.getItem('portfolio_audio_muted') === 'true';

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted() {
  return isMuted;
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  localStorage.setItem('portfolio_audio_muted', isMuted ? 'true' : 'false');
  if (!isMuted) {
    playClickSound();
  }
  return isMuted;
}

export function playHoverSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio failures
  }
}

export function playClickSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Ignore audio failures
  }
}

export function playTerminalKeySound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450 + Math.random() * 200, ctx.currentTime);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Ignore
  }
}

export function playSuccessSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Play two ascending tones
    const notes = [587.33, 880]; // D5, A5
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.06, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  } catch (e) {
    // Ignore
  }
}

let lastMeowTime = 0;

let meowVoiceCounter = 0;

export function playCatMeowSound(requestedVoice = -1) {
  if (isMuted) return;
  const now = Date.now();
  if (now - lastMeowTime < 240) return;
  lastMeowTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Cycle through 4 distinct cat voice personalities:
    // 0: Classic Meow, 1: Tiny Kitten Chirp, 2: Purr Trill, 3: Curious Question Meow
    const voice = requestedVoice >= 0 ? (requestedVoice % 4) : (meowVoiceCounter++ % 4);
    const t0 = ctx.currentTime;

    if (voice === 0) {
      // Voice 0: Classic Feline Meow ("Mee-oww~")
      const duration = 0.52;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, t0);
      master.gain.linearRampToValueAtTime(0.14, t0 + 0.06);
      master.gain.setValueAtTime(0.14, t0 + 0.22);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.6, t0);
      filter.frequency.setValueAtTime(650, t0);
      filter.frequency.exponentialRampToValueAtTime(1900, t0 + 0.14);
      filter.frequency.exponentialRampToValueAtTime(700, t0 + duration);
      filter.connect(master);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, t0);
      osc.frequency.linearRampToValueAtTime(840, t0 + 0.08);
      osc.frequency.exponentialRampToValueAtTime(920, t0 + 0.20);
      osc.frequency.exponentialRampToValueAtTime(390, t0 + duration);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(6.0, t0);
      lfoGain.gain.setValueAtTime(15, t0);
      lfo.connect(osc.frequency);
      osc.connect(filter);

      lfo.start(t0); osc.start(t0);
      lfo.stop(t0 + duration); osc.stop(t0 + duration);
    } else if (voice === 1) {
      // Voice 1: Tiny Kitten Chirp / High Squeak ("Mew!! ✨")
      const duration = 0.28;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, t0);
      master.gain.linearRampToValueAtTime(0.16, t0 + 0.04);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.2, t0);
      filter.frequency.setValueAtTime(1200, t0);
      filter.frequency.linearRampToValueAtTime(2600, t0 + 0.08);
      filter.frequency.exponentialRampToValueAtTime(1100, t0 + duration);
      filter.connect(master);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, t0);
      osc.frequency.linearRampToValueAtTime(1320, t0 + 0.08);
      osc.frequency.exponentialRampToValueAtTime(920, t0 + duration);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1560, t0);
      osc2.frequency.linearRampToValueAtTime(2640, t0 + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(1840, t0 + duration);
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.25, t0);

      osc.connect(filter);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);

      osc.start(t0); osc2.start(t0);
      osc.stop(t0 + duration); osc2.stop(t0 + duration);
    } else if (voice === 2) {
      // Voice 2: Purr Trill ("Mrrrrp! 🐾")
      const duration = 0.38;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, t0);
      master.gain.linearRampToValueAtTime(0.15, t0 + 0.05);
      master.gain.setValueAtTime(0.13, t0 + 0.20);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, t0);
      filter.connect(master);

      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, t0);
      osc.frequency.linearRampToValueAtTime(820, t0 + 0.12);
      osc.frequency.exponentialRampToValueAtTime(620, t0 + duration);

      // Rapid rolling vibrato for the "rrrp" purr effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(18.0, t0);
      lfoGain.gain.setValueAtTime(45, t0);
      lfo.connect(osc.frequency);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.65, t0);
      osc.connect(oscGain);
      oscGain.connect(filter);

      lfo.start(t0); osc.start(t0);
      lfo.stop(t0 + duration); osc.stop(t0 + duration);
    } else {
      // Voice 3: Inquisitive Question Meow ("Mew?? 🐱")
      const duration = 0.35;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, t0);
      master.gain.linearRampToValueAtTime(0.14, t0 + 0.05);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.0, t0);
      filter.frequency.setValueAtTime(800, t0);
      filter.frequency.exponentialRampToValueAtTime(2400, t0 + duration);
      filter.connect(master);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, t0);
      osc.frequency.linearRampToValueAtTime(740, t0 + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1150, t0 + duration);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(7.5, t0);
      lfoGain.gain.setValueAtTime(18, t0);
      lfo.connect(osc.frequency);
      osc.connect(filter);

      lfo.start(t0); osc.start(t0);
      lfo.stop(t0 + duration); osc.stop(t0 + duration);
    }
  } catch (e) {
    // Ignore audio failures
  }
}

let lastRealSoundTime = 0;

export function playRealCatSound(isAngry = false) {
  if (isMuted) return;
  const now = Date.now();
  if (now - lastRealSoundTime < 250) return;
  lastRealSoundTime = now;

  try {
    const filename = isAngry ? 'angry-roar.wav' : 'cute-cat.wav';
    const audio = new Audio(`catsound/${filename}`);
    audio.volume = isAngry ? 0.7 : 0.65;
    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => {
        // Fallback to synthesizer
        playCatMeowSound(isAngry ? 2 : 0);
      });
    }
  } catch (e) {
    playCatMeowSound(isAngry ? 2 : 0);
  }
}


