// main.js — HASSAN RESUME — Cleaned & Enhanced

/* ---------------------------------------------------------------
   AUDIO SYSTEM
   --------------------------------------------------------------- */
let audioCtx = null;
let audioEnabled = false; // off by default — user opt-in

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playTone(frequency, duration = 0.04) {
    if (!audioEnabled) return;
    try {
        const ctx  = getAudioCtx();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) { /* silently fail */ }
}

function handleSound(e) {
    const type = e.currentTarget.dataset.sound;
    if (!type) return;
    if (type === 'hover')  playTone(800);
    if (type === 'click')  playTone(1200);
    if (type === 'key')    playTone(600);
}

document.querySelectorAll('[data-sound]').forEach(el => {
    el.addEventListener('mouseenter', handleSound);
    el.addEventListener('click', handleSound);
    if (el.tagName === 'INPUT') el.addEventListener('keydown', handleSound);
});

/* ---------------------------------------------------------------
   AUDIO TOGGLE BUTTON
   --------------------------------------------------------------- */
const audioToggle = document.getElementById('audio-toggle');
const audioIcon   = document.getElementById('audio-icon');
if (audioToggle) {
    audioToggle.addEventListener('click', () => {
        // Resume AudioContext on first click (browser policy)
        if (!audioCtx) getAudioCtx();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        audioEnabled = !audioEnabled;
        audioIcon.className = audioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        audioToggle.title   = audioEnabled ? 'Mute audio' : 'Enable audio';
    });
}

/* ---------------------------------------------------------------
   LIGHT / DARK THEME TOGGLE
   --------------------------------------------------------------- */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const htmlEl      = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
        playTone(1000);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    if (themeToggle) themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

/* ---------------------------------------------------------------
   HAMBURGER MENU (MOBILE)
   --------------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ---------------------------------------------------------------
   CUSTOM CURSOR (desktop only)
   --------------------------------------------------------------- */
const cursorDot    = document.getElementById('cursor-dot');
const cursorCircle = document.getElementById('cursor-circle');

if (cursorDot && cursorCircle && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0, circleX = 0, circleY = 0;

    function updateCursor() {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        circleX += (mouseX - circleX) * 0.12;
        circleY += (mouseY - circleY) * 0.12;
        cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
        requestAnimationFrame(updateCursor);
    }

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    updateCursor();

    document.querySelectorAll('a, button, .skill-card, .project-3d-wrapper, .btn, .terminal-btn, .comms-channel').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('focus', () => document.body.classList.add('cursor-input'));
        inp.addEventListener('blur',  () => document.body.classList.remove('cursor-input'));
    });
}

/* ---------------------------------------------------------------
   SCROLL PROGRESS BAR
   --------------------------------------------------------------- */
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop  = window.scrollY || document.documentElement.scrollTop;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = `${pct}%`;

    updateTimelineProgress(pct);
    activateTimelineItems();
    updateActiveNav();
    toggleBackToTop(scrollTop);
}

/* ---------------------------------------------------------------
   BACK TO TOP BUTTON
   --------------------------------------------------------------- */
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playTone(1100);
    });
}

function toggleBackToTop(scrollY) {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle('visible', scrollY > 400);
}

/* ---------------------------------------------------------------
   ACTIVE NAV ON SCROLL
   --------------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[data-section]');
const mobileLinks = document.querySelectorAll('.mobile-nav-link[data-section]');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
            mobileLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        }
    });
}

/* ---------------------------------------------------------------
   TIMELINE PROGRESS & ACTIVATION
   --------------------------------------------------------------- */
function updateTimelineProgress(pct) {
    const el = document.getElementById('timeline-progress');
    if (el) el.style.height = `${pct}%`;
}

const timelineItems = document.querySelectorAll('.timeline-item');
function activateTimelineItems() {
    const vh = window.innerHeight;
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        item.classList.toggle('active', rect.top < vh * 0.78 && rect.bottom > 0);
    });
}

// Run once on load
onScroll();

/* ---------------------------------------------------------------
   ROLE TEXT TYPEWRITER
   --------------------------------------------------------------- */
const roles  = ['WEBSITE DEVELPOR', 'DIGITAL MARKETER', 'E-COMMERCE SPECIALIST'];
let roleIdx  = 0, charIdx = 0, isDeleting = false;
const roleEl = document.getElementById('role-text');

function typeRole() {
    if (!roleEl) return;
    const current = roles[roleIdx];

    if (!isDeleting) {
        roleEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeRole, 1400);
            return;
        }
    } else {
        roleEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }
    setTimeout(typeRole, isDeleting ? 60 : 110);
}
setTimeout(typeRole, 800);

/* ---------------------------------------------------------------
   THREE.JS BACKGROUND SHAPE
   --------------------------------------------------------------- */
(function initThree() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const point = new THREE.PointLight(0x00f2fe, 1.5, 150);
    scene.add(point);

    const geometry = new THREE.TorusKnotGeometry(1, 0.35, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00f2fe, metalness: 0.6, roughness: 0.2,
        emissive: 0x00f2fe, emissiveIntensity: 0.6,
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    let mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth)  * 2 - 1;
        my = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);
        shape.rotation.x += 0.002 + my * 0.01;
        shape.rotation.y += 0.003 + mx * 0.01;
        renderer.render(scene, camera);
    }
    animate();
})();

/* ---------------------------------------------------------------
   PROJECT CARD FLIP
   --------------------------------------------------------------- */
document.querySelectorAll('.project-3d-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('is-flipped');
        playTone(900);
    });
});

/* ---------------------------------------------------------------
   TERMINAL FORM
   --------------------------------------------------------------- */
const terminalForm  = document.getElementById('terminal-form');
const logsContainer = document.getElementById('terminal-logs');
const successAlert  = document.getElementById('success-alert');

function logMsg(msg, type = 'info') {
    if (!logsContainer) return;
    const div = document.createElement('div');
    div.className = `terminal-log-entry ${type}`;
    div.textContent = `> ${msg}`;
    logsContainer.appendChild(div);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

// Show success if redirected back
if (window.location.search.includes('status=success') && successAlert) {
    successAlert.style.display = 'block';
    // Clean URL without reloading
    window.history.replaceState({}, document.title, window.location.pathname);
}

if (terminalForm) {
    terminalForm.addEventListener('submit', () => {
        // Let Formspree handle actual submission
        logMsg('Transmitting payload...', 'info');
    });
}

const clearBtn = document.getElementById('terminal-clear');
if (clearBtn && logsContainer) {
    clearBtn.addEventListener('click', () => {
        logsContainer.innerHTML = '';
        logMsg('Log cleared.', 'info');
    });
}

/* ---------------------------------------------------------------
   LIVE TERMINAL CLOCK
   --------------------------------------------------------------- */
function updateTerminalTime() {
    const el = document.getElementById('terminal-time');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toISOString().slice(0, 19).replace('T', ' ');
}
setInterval(updateTerminalTime, 1000);
updateTerminalTime();

/* ---------------------------------------------------------------
   MISC
   --------------------------------------------------------------- */
document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));
