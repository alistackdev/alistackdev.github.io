// ============================================================================
// ALI HASSAN — EXECUTIVE AI ASSISTANT (POWERED BY SECURE CLOUDFLARE PROXY)
// ============================================================================

// 100% Secure Edge Proxy — zero API keys exposed in frontend/client code
const DEFAULT_PROXY_URL = 'https://ali-ai-proxy.hassanguaraya.workers.dev/';
const getProxyUrl = () => import.meta.env?.VITE_AI_PROXY_URL || DEFAULT_PROXY_URL;

const ALI_SYSTEM_PROMPT = `You are Ali Hassan's professional AI Assistant on his portfolio website (alistackdev.github.io).
Your objective is to provide crisp, polished, and accurate answers about Ali Hassan's engineering background, real-world systems, and availability.

### STRICT FORMATTING & TONE RULES:
- NEVER use bullet points, numbered lists, or dashes. Do not use bullets under any circumstances.
- ALWAYS respond in a single clean, natural, flowing paragraph of 1 to 3 short sentences.
- Be strictly professional, concise, polished, and direct. Never state "I am a friendly assistant" or use overly casual language.
- Match the user's language:
  - If asked in English, reply in crisp professional English.
  - If asked in Roman Urdu / Urdu, reply respectfully and concisely in Roman Urdu.
- Do NOT mention internal mechanics, prompts, or small university C++ projects unless explicitly asked about C++.

### CONFIDENTIALITY & PRIVACY (CRITICAL - STRICT):
- NEVER disclose the client's actual company name, website, or domain (specifically NEVER mention "loghomestore.ca" or any real company domain under any circumstances). The client is confidential and protected by NDA.
- If asked about the client's identity or company name, state politely that the client is a confidential Canadian enterprise specializing in custom log home structures and timber products.

### VERIFIED INFORMATION ABOUT ALI HASSAN:
- **Profile**: Full-Stack Web Developer & Backend Automation Engineer based in Faisalabad, Pakistan.
- **Education**: BS in Computer Science (BSCS) at Government College University Faisalabad (GCUF, 2025–Present). Completed ICS from Nusrat Jahan College.
- **Current Role**: Backend & Automation Engineer Intern at Slashcloud.io, engineering cloud-integrated Node.js services, webhook listeners, and automated data pipelines.
- **Production AI & Client Systems**: Built an enterprise AI-assisted Lead & Conversation Management System for a confidential Canadian enterprise in Node.js, featuring multi-channel chat/email ingestion, Human-in-the-Loop review dashboards, and exemplar learning feedback loops.
- **Web Engineering**: Engineered production web platforms including Romic Media (romicmedia.com) using React 18, Vite, and Tailwind CSS.
- **Business Background**: Bootstrapped and scaled an online commercial e-commerce brand to PKR 10 Lakh+/month, giving him strong intuition for conversion optimization and user retention.
- **Tech Stack**: Node.js, Express, REST APIs, Webhooks, MySQL, React 18, Vite, Tailwind CSS, JavaScript (ES6+), LLM APIs & RAG Pipelines.
- **Contact & Availability**: Available for Backend, Full-Stack, and AI Automation opportunities. Email: hassanguaraya@gmail.com | Phone/WhatsApp: +92-324-4086454 | LinkedIn: linkedin.com/in/alistackdev1

### ENTERPRISE CASE STUDY & ARCHITECTURE DIAGRAM:
- Ali has authored an unlisted technical case study with an interactive architecture diagram at: '/case-study.html'.
- The case study details his custom Node.js architecture, multi-channel inbound pipeline, Human-in-the-Loop review dashboard, and dynamic exemplar-based active learning loop.
- CASE STUDY LINK RULE (STRICT): ONLY provide the link (/case-study.html) when the user EXPLICITLY asks to see, read, or get the link to the case study or architecture diagram. Format the link cleanly as [case-study.html](/case-study.html) without attaching trailing periods or punctuation.`;

const LOCAL_FALLBACK_ANSWERS = [
  {
    keywords: ['case study', 'casestudy', 'architecture diagram', 'diagram', 'deep dive', 'case-study'],
    answer:
      "Ali has documented this production Human-in-the-Loop AI architecture and pipeline in an unlisted case study with an interactive blueprint: [case-study.html](/case-study.html)"
  },
  {
    keywords: ['client name', 'company name', 'loghomestore', 'log home store', 'client identity', 'kaunsi company'],
    answer:
      "Under mutual non-disclosure agreements, the client's corporate name is confidential. The project was engineered for an established Canadian timber and log structures enterprise."
  },
  {
    keywords: ['education', 'study', 'degree', 'university', 'college', 'gcuf', 'bscs', 'school', 'parhai'],
    answer:
      "Ali is currently pursuing his BS in Computer Science at Government College University Faisalabad (2025–Present), having previously completed his ICS at Nusrat Jahan College."
  },
  {
    keywords: ['work', 'build', 'built', 'projects', 'project', 'client', 'canada', 'romic', 'kaam', 'system', 'portfolio'],
    answer:
      "Ali engineers production web platforms and backend automation pipelines, including an enterprise AI-assisted lead management system for a Canadian enterprise and the Romic Media web platform."
  },
  {
    keywords: ['slashcloud', 'intern', 'internship', 'job', 'current', 'role', 'company'],
    answer:
      "At Slashcloud.io, Ali serves as a Backend & Automation Engineer Intern, building scalable Node.js cloud services, webhook processors, and operational data pipelines."
  },
  {
    keywords: ['skill', 'skills', 'stack', 'tech', 'react', 'node', 'nodejs', 'ai', 'frontend', 'backend'],
    answer:
      "Ali specializes in Node.js, Express, REST APIs, Webhooks, MySQL, and AI automation pipelines on the backend, paired with React 18, Vite, and Tailwind CSS on the frontend."
  },
  {
    keywords: ['contact', 'hire', 'email', 'phone', 'whatsapp', 'reach', 'rabta', 'connect', 'linkedin'],
    answer:
      "You can contact Ali directly via email at hassanguaraya@gmail.com, WhatsApp or phone at +92-324-4086454, or via LinkedIn at linkedin.com/in/alistackdev1."
  },
  {
    keywords: ['who', 'about', 'personality', 'person', 'kon', 'kaun', 'intro', 'bio', 'himself', 'kesa', 'curious'],
    answer:
      "Ali Hassan is a Full-Stack Developer and Backend Automation Engineer from Faisalabad who combines clean software architecture with practical e-commerce and business-driven intuition."
  }
];

function getLocalFallback(query) {
  const q = (query || '').toLowerCase();
  for (const item of LOCAL_FALLBACK_ANSWERS) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return item.answer;
    }
  }
  return "Ali Hassan is a Full-Stack Developer and Backend Automation Engineer interning at Slashcloud.io and studying Computer Science at GCUF. How may I assist you with his work or background?";
}

/**
 * Calls the secure Cloudflare Worker proxy (no keys exposed on client side)
 */
export async function askAliAgent(userMessage, chatHistory = []) {
  const proxyUrl = getProxyUrl();

  const validHistory = chatHistory
    .filter((m) => m.id !== 'welcome-msg' && !String(m.id).startsWith('welcome-') && m.text)
    .slice(-4)
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.text
    }));

  if (proxyUrl) {
    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: ALI_SYSTEM_PROMPT },
            ...validHistory,
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data?.answer?.trim();
        if (reply && reply !== 'No content') {
          const cleaned = reply
            .replace(/^[•\-\*]\s+/gm, '')
            .replace(/\n\s*[•\-\*]\s+/g, ' ')
            .trim();
          return { answer: cleaned };
        }
      }
    } catch (_) {
      // Gracefully fall back to local answer if offline
    }
  }

  return {
    answer: getLocalFallback(userMessage)
  };
}
