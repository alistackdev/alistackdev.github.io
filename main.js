// main.js - Core interactivity for HASSAN RESUME portfolio

/* ---------------------------------------------------------------
   Utility: Audio cue system (optional, can be muted)
   --------------------------------------------------------------- */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioEnabled = true;
function playTone(frequency, duration = 0.04) {
    if (!audioEnabled) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function handleSound(event) {
    const target = event.currentTarget;
    const type = target.dataset.sound;
    if (!type) return;
    switch (type) {
        case 'hover': playTone(800); break;
        case 'click': playTone(1200); break;
        case 'key':   playTone(600); break;
        default: break;
    }
}

// Attach sound listeners to data-sound elements
document.querySelectorAll('[data-sound]').forEach(el => {
    el.addEventListener('mouseenter', handleSound);
    el.addEventListener('click', handleSound);
    if (el.tagName === 'INPUT') {
        el.addEventListener('keydown', handleSound);
    }
});

/* ---------------------------------------------------------------
   Custom Cursor Implementation
   --------------------------------------------------------------- */
const cursorDot = document.getElementById('cursor-dot');
const cursorCircle = document.getElementById('cursor-circle');
let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;

function updateCursor() {
    // Direct dot follows mouse instantly
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    // Circle lags behind for a smooth effect
    circleX += (mouseX - circleX) * 0.12;
    circleY += (mouseY - circleY) * 0.12;
    cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    requestAnimationFrame(updateCursor);
}

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Toggle hover state for interactive elements
function setHoverState(isHover) {
    document.body.classList.toggle('cursor-hover', isHover);
}

document.querySelectorAll('a, button, .skill-card, .project-3d-wrapper, .nav-link, .btn, .terminal-btn, .comms-channel')
    .forEach(el => {
        el.addEventListener('mouseenter', () => setHoverState(true));
        el.addEventListener('mouseleave', () => setHoverState(false));
    });

// Input focus changes cursor to input state
const inputs = document.querySelectorAll('input');
inputs.forEach(inp => {
    inp.addEventListener('focus', () => document.body.classList.add('cursor-input'));
    inp.addEventListener('blur', () => document.body.classList.remove('cursor-input'));
});

updateCursor();

/* ---------------------------------------------------------------
   Audio Toggle Button
   --------------------------------------------------------------- */
const audioToggle = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');
if (audioToggle) {
    audioToggle.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        audioIcon.className = audioEnabled ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });
}

// Theme toggle button
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
    });
}

/* ---------------------------------------------------------------
   Scroll Progress Bar
   --------------------------------------------------------------- */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrolled = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
    // Update timeline progress line
    const timelineProgress = document.getElementById('timeline-progress');
    if (timelineProgress) {
        timelineProgress.style.height = `${scrolled}%`;
    }
});

/* ---------------------------------------------------------------
   Role Text Typewriter & Cycling
   --------------------------------------------------------------- */
const roles = ['DIGITAL MARKETER', 'AI CONTENT CREATOR', 'E-COMMERCE SPECIALIST'];
let roleIdx = 0;
let charIdx = 0;
const roleEl = document.getElementById('role-text');
function typeRole() {
    if (!roleEl) return;
    const current = roles[roleIdx];
    roleEl.textContent = current.slice(0, charIdx);
    charIdx++;
    if (charIdx > current.length) {
        setTimeout(() => {
            charIdx = 0;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(typeRole, 800);
        }, 1200);
    } else {
        setTimeout(typeRole, 120);
    }
}
setTimeout(typeRole, 800);

/* ---------------------------------------------------------------
   Three.js Interactive 3D Shape (Polyhedron)
   --------------------------------------------------------------- */
let scene, camera, renderer, shape, mouse = { x: 0, y: 0 };
function initThree() {
    const canvas = document.getElementById('webgl-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    // Light setup (soft ambient + point for glow)
    const ambient = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambient);
    const point = new THREE.PointLight(0x00f2fe, 1.5, 150);
    scene.add(point);

    // Geometry: TorusKnot with custom ShaderMaterial for neon glow
    const geometry = new THREE.TorusKnotGeometry(1, 0.35, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        metalness: 0.6,
        roughness: 0.2,
        emissive: 0x00f2fe,
        emissiveIntensity: 0.6,
    });
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Resize handling
    window.addEventListener('resize', onWindowResize);
    // Mouse move tracking for subtle rotation
    window.addEventListener('mousemove', e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    animate();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate);
    // Rotate shape slowly and add mouse influence
    shape.rotation.x += 0.002;
    shape.rotation.y += 0.003;
    shape.rotation.y += mouse.x * 0.02;
    shape.rotation.x += mouse.y * 0.02;
    renderer.render(scene, camera);
}
initThree();
initSkillsThree();

/* ---------------------------------------------------------------
   Project Card Flip Interaction
   --------------------------------------------------------------- */
const projectWrappers = document.querySelectorAll('.project-3d-wrapper');
projectWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('is-flipped');
        // Optional sound cue
        playTone(900);
    });
});

/* ---------------------------------------------------------------
   Timeline Items Activation on Scroll (SCROLLYTELLING)
   --------------------------------------------------------------- */
const timelineItems = document.querySelectorAll('.timeline-item');
function activateTimeline() {
    const viewportHeight = window.innerHeight;
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', activateTimeline);
activateTimeline(); // Run on load

/* ---------------------------------------------------------------
   Terminal Form Handling (mock submission)
   --------------------------------------------------------------- */
const terminalForm = document.getElementById('terminal-form');
const logsContainer = document.getElementById('terminal-logs');
function logMessage(msg, type = 'info') {
    const line = document.createElement('div');
    line.className = `terminal-line terminal-log-entry ${type}`;
    line.textContent = msg;
    logsContainer.appendChild(line);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}
if (terminalForm) {
    terminalForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();
        if (name && email && message) {
            logMessage(`> SEND payload: name=${name}, email=${email}, msg=${message}`, 'info');
            // Simulate async send
            setTimeout(() => {
                logMessage('✅ Payload delivered. Awaiting response...', 'success');
            }, 800);
        } else {
            logMessage('⚠️ Missing fields. Please fill all inputs.', 'error');
        }
    });
    document.getElementById('terminal-clear').addEventListener('click', () => {
        logsContainer.innerHTML = '';
        logMessage('🔁 Log cleared.', 'info');
    });
}

/* ---------------------------------------------------------------
   Misc UI Enhancements
   --------------------------------------------------------------- */
// Update terminal time every second
function updateTerminalTime() {
    const timeEl = document.getElementById('terminal-time');
    if (!timeEl) return;
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
    timeEl.textContent = formatted;
}
setInterval(updateTerminalTime, 1000);
updateTerminalTime();

// Prevent default drag for images (improve UX)
document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));

// Simple debounced resize for performance (if needed)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Placeholder for heavy resize actions
    }, 250);
});


// --- MATRIX VERTICAL CODE RAIN ---
const matrixCanvas = document.getElementById('matrixCanvas');
if (matrixCanvas) {
    const matrixCtx = matrixCanvas.getContext('2d');

    // Container ki real width aur height auto-detect karna
    matrixCanvas.width = matrixCanvas.parentElement.offsetWidth || 400;
    matrixCanvas.height = matrixCanvas.parentElement.offsetHeight || 450;

    // Hacker codes data arrays
    const matrixChars = ["0", "1", "0001", "SYSTEM_OK", "AX73", "ADDR"];
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;

    // Har column ki starting Y position (Neeche girne ke liye)
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * -100; // Random offset taake saari lines ek sath na giren
    }

    function drawMatrix() {
        // Halka sa black background transparent layer taake trailing fade effect aaye
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.fillStyle = '#00ffcc'; // Neon Cyan color
        matrixCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            // Randomly characters uthana array se
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;

            matrixCtx.fillText(text, x, y);

            // Agar line screen se baahar chali jaye toh wapas top par reset karna
            if (y > matrixCanvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            
            // Speed control (Neeche ki taraf push)
            rainDrops[i]++;
        }
    }

    // Smooth looping interval (33ms = ~30 FPS perfect speed)
    setInterval(drawMatrix, 33);

    // Screen resize hone par handles adjustment
    window.addEventListener('resize', () => {
        matrixCanvas.width = matrixCanvas.parentElement.offsetWidth;
        matrixCanvas.height = matrixCanvas.parentElement.offsetHeight;
    });
}