
import React from 'react';
import { NavLink as NavLinkType } from '../types';
// FIX: Import MobileIcon from assets/icons and remove local definition.
import { 
    CodeIcon, Share2Icon, MessageCircleIcon, PencilRulerIcon, DatabaseIcon, ZapIcon, 
    CheckCircleIcon, FlaskConicalIcon, RocketIcon, ClockIcon, DollarSignIcon, TrendingUpIcon, 
    UserCheckIcon, BarChartIcon, WhatsAppIcon, BotIcon, CrmIcon, ShoppingCartIcon, GlobeIcon, 
    BrainCircuitIcon,
    MobileIcon
} from '../assets/icons';

export const NAV_LINKS: NavLinkType[] = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/process", label: "Process" },
    { href: "/projects", label: "Projects" },
    { href: "/tech-stack", label: "Tech Stack" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export const HOME_CORE_SERVICES = [
    { icon: React.createElement(CodeIcon), title: "AI Web Development", description: "From prompt to production-ready websites in record time." },
    { icon: React.createElement(MobileIcon), title: "AI App Development", description: "Intelligent, scalable mobile applications that learn and adapt." },
    { icon: React.createElement(Share2Icon), title: "Social Media Automation", description: "Automated content creation, scheduling, and engagement." },
    { icon: React.createElement(MessageCircleIcon), title: "WhatsApp AI Assistant", description: "24/7 customer support and sales on the world's most popular messaging app." }
];

export const HOME_PROCESS_STEPS = [
    { title: "Design Sprint", description: "Collaborative sessions to define goals, user flows, and architecture." },
    { title: "Rapid Build", description: "AI-assisted development for accelerated frontend and backend creation." },
    { title: "Integration & Testing", description: "Connecting APIs, databases, and third-party services with rigorous QA." },
    { title: "Launch & Scale", description: "Deploying to Vercel with ongoing monitoring and performance optimization." }
];

export const HOME_RESULT_METRICS = [
    { value: "<2", unit: "min", label: "Response Time" },
    { value: "<5", unit: "%", label: "Missed Leads" },
    { value: "+216", unit: "%", label: "Conversion" },
    { value: "9.4", unit: "/10", label: "Satisfaction" }
];

export const INVESTMENT_LEVELS = [
    { name: "MVP", price: "$10k - $25k", features: ["1 Core Feature", "Basic UI/UX", "3-Week Delivery", "Community Support"], recommended: false },
    { name: "Production Ready", price: "$25k - $75k", features: ["Up to 3 Core Features", "Custom UI/UX Design", "8-Week Delivery", "Dedicated Support"], recommended: true },
    { name: "Enterprise", price: "$75k+", features: ["Unlimited Features", "Advanced AI Models", "Continuous Delivery", "24/7 Enterprise Support"], recommended: false }
];

// Process Page Data
export const PROCESS_TIMELINE_STEPS = [
    { phase: "01", title: "Discovery", summary: "Define goals", icon: React.createElement(PencilRulerIcon, { className: "w-6 h-6" }) },
    { phase: "02", title: "Design Sprint", summary: "Wireframe & prototype", icon: React.createElement(PencilRulerIcon, { className: "w-6 h-6" }) },
    { phase: "03", title: "Frontend Build", summary: "UI development", icon: React.createElement(CodeIcon, { className: "w-6 h-6" }) },
    { phase: "04", title: "Backend Build", summary: "API & database", icon: React.createElement(DatabaseIcon, { className: "w-6 h-6" }) },
    { phase: "05", title: "Integration", summary: "Connect systems", icon: React.createElement(ZapIcon, { className: "w-6 h-6" }) },
    { phase: "06", title: "Testing", summary: "QA & feedback", icon: React.createElement(FlaskConicalIcon, { className: "w-6 h-6" }) },
    { phase: "07", title: "Pre-Launch", summary: "Final review", icon: React.createElement(CheckCircleIcon, { className: "w-6 h-6" }) },
    { phase: "08", title: "Launch", summary: "Deploy & monitor", icon: React.createElement(RocketIcon, { className: "w-6 h-6" }) }
];

export const PROCESS_PHASES = [
    { title: "Design Sprint", weeks: "Week 1-2", points: ["Goal definition & strategy workshops", "User flow & architecture mapping", "Interactive wireframing", "High-fidelity UI prototyping"] },
    { title: "Rapid Build", weeks: "Week 3-4", points: ["AI-assisted frontend development", "Headless CMS & API setup", "Backend logic and database schema", "Initial component library creation"] },
    { title: "Testing & Integration", weeks: "Week 5-6", points: ["Third-party API integrations", "End-to-end testing cycles", "User acceptance testing (UAT)", "Performance & security audits"] },
    { title: "Launch & Scale", weeks: "Week 7-8", points: ["Vercel/Supabase deployment", "CDN & caching configuration", "Live monitoring and analytics setup", "Post-launch support & handover"] }
];

export const PROCESS_COMPARISON = {
    sixMonths: ["Lengthy discovery phases", "Slow, manual coding", "Siloed teams, delayed feedback", "Risk of scope creep"],
    eightWeeks: ["Agile, focused sprints", "AI-accelerated development", "Transparent, weekly check-ins", "Fixed scope, predictable delivery"]
};

export const PROCESS_METRICS = [
    { value: "47", label: "Projects Completed" },
    { value: "8.2", label: "Avg. Weeks to Launch", decimals: 1 },
    { value: "9.4", label: "Avg. Satisfaction", unit: "/ 10", decimals: 1 },
    { value: "293", label: "Avg. Client ROI", unit: "%" }
];

export const PROCESS_CALCULATOR_OPTIONS = [
    { name: "Website", time: "8 Weeks" },
    { name: "Automation", time: "6 Weeks" },
    { name: "App", time: "10 Weeks" },
];

// Projects Page Data
export const PROJECTS_DATA = [
  {
    name: 'FashionOS',
    subtitle: 'From 3 Days to 3 Minutes',
    industry: 'Fashion & Events',
    duration: '8 weeks',
    challenge: 'Fashion Week Global struggled with a complex 3-day event setup process requiring 190+ staff members with a 1.2% error rate.',
    solution: 'Built FashionOS, a comprehensive AI-powered event management platform automating 90% of coordination between designers, models, venues, and sponsors.',
    metrics: [
      { value: '97%', label: 'Time Reduction', icon: React.createElement(ClockIcon, { className: "w-5 h-5" }) },
      { value: '$406K', label: 'Cost Savings', icon: React.createElement(DollarSignIcon, { className: "w-5 h-5" }) },
      { value: '300%', label: 'ROI', icon: React.createElement(TrendingUpIcon, { className: "w-5 h-5" }) },
    ],
    technologies: ['React', 'Next.js', 'Supabase', 'CrewAI', 'WhatsApp API', 'Stripe'],
    testimonial: {
      quote: "AMO AI transformed our entire operation. What used to take us 3 days and 190 people now happens in 3 minutes with complete accuracy.",
      author: 'David Kim',
      title: 'Operations Director'
    },
    image: 'FashionOS screenshot',
    roiBadge: '300% ROI'
  },
  {
    name: 'AutoMax AI',
    subtitle: '$4.3M Monthly GMV Marketplace',
    industry: 'Automotive',
    duration: '12 weeks',
    challenge: 'Needed to connect 500 dealers with a unified platform handling 50,000+ vehicle listings while providing intelligent search capabilities.',
    solution: 'Developed a comprehensive AI marketplace with advanced search algorithms, real-time inventory sync, and ML-powered recommendations.',
     metrics: [
      { value: '$4.3M', label: 'Monthly GMV', icon: React.createElement(DollarSignIcon, { className: "w-5 h-5" }) },
      { value: '500+', label: 'Dealers Connected', icon: React.createElement(Share2Icon, { className: "w-5 h-5" }) },
      { value: '95%', label: 'Search Accuracy', icon: React.createElement(CheckCircleIcon, { className: "w-5 h-5" }) },
    ],
    technologies: ['React', 'Next.js', 'Supabase', 'OpenAI', 'Elasticsearch', 'Stripe Connect'],
    testimonial: {
      quote: "The AI-powered search and recommendations completely transformed how our customers find vehicles. Conversion rates increased 60%.",
      author: 'Robert Wilson',
      title: 'VP of Technology'
    },
    image: 'AutoMax AI screenshot',
    roiBadge: '95% ROI'
  },
];

export const TECH_STACK_CATEGORIES = [
    {
        title: "Frontend & Development",
        technologies: ["Vite", "React", "Tailwind", "Mantine"],
    },
    {
        title: "AI & Orchestration",
        technologies: ["CopilotKit", "CrewAI", "LangGraph", "Tavily"],
    },
    {
        title: "Integration & Automation",
        technologies: ["Supabase Functions", "n8n", "WhatsApp API"],
    },
    {
        title: "Infrastructure",
        technologies: ["Supabase", "Stripe", "GitHub", "Cloudinary"],
    },
];

export const PROJECTS_METRICS = [
    { value: "47+", label: "Projects Delivered" },
    { value: "8.2", label: "Weeks Average Delivery Time" },
    { value: "94%", label: "On-Time Delivery" },
    { value: "293%", label: "ROI Average" }
];

// Services Page Data
export const SERVICES_SUMMARY_FEATURES = [
    { icon: React.createElement(MessageCircleIcon, { className: "w-6 h-6" }), title: 'AI Chat Interfaces', description: 'Conversational copilots in dashboards' },
    { icon: React.createElement(ZapIcon, { className: "w-6 h-6" }), title: 'Predictive Automation', description: 'Data-driven next-best-action triggers' },
    { icon: React.createElement(UserCheckIcon, { className: "w-6 h-6" }), title: 'Personalized Journeys', description: 'Adaptive UI responding to user behavior' },
    { icon: React.createElement(BarChartIcon, { className: "w-6 h-6" }), title: 'Real-Time Analytics', description: 'Auto-generated insights' }
];

export const AI_AGENTS_FEATURES = [
    "Conversational AI Agents (CopilotKit Actions)",
    "Crew AI Multi-Agent Teams",
    "LangGraph Context & Memory",
    "n8n Workflow Bridges"
];

export const USE_CASES_PLATFORMS = [
    { platform: 'WhatsApp', useCase: 'Lead capture + AI follow-ups', result: '+42% engagement' },
    { platform: 'Instagram', useCase: 'Auto-captions + scheduling', result: '3× faster campaigns' },
    { platform: 'Facebook', useCase: 'Ad budget optimization', result: '–25% CPL' },
    { platform: 'TikTok', useCase: 'Trend detection + video edits', result: '+55% view duration' }
];

export const ADDITIONAL_SERVICES = [
    { title: "Web Design", subtitle: "Design that Thinks.", description: "Minimal, accessible, responsive designs.", cta: "Explore Design →" },
    { title: "AI Social Media Marketing", subtitle: "Create Smarter. Post Faster.", description: "Automated content generation, captioning, scheduling.", cta: "See AI Marketing →" },
    { title: "E-Commerce Solutions", subtitle: "Shop with Intelligence.", description: "Dynamic pricing, AI recommendations, chat commerce.", cta: "Discover AI Commerce →" }
];

// WhatsApp Automation Page Data
export const WHATSAPP_METRICS = [
    { value: '98%', label: 'Open Rate', subtext: 'vs 20% for email - your messages actually get seen' },
    { value: '70%', label: 'Response Rate', subtext: 'Customers engage instantly with automated conversations' },
    { value: '5-10x', label: 'ROI Potential', subtext: 'From automated sales, support, and customer retention' },
];

export const WHATSAPP_CORE_SERVICES = [
    { icon: React.createElement(WhatsAppIcon), title: 'WhatsApp Automation Setup', subtitle: 'Conversations that run themselves.', points: ['Auto-replies', 'Lead capture', 'Payment & order updates', 'Multi-language flows'] },
    { icon: React.createElement(BotIcon), title: 'AI Chat Agents & Copilots', subtitle: 'Your 24/7 sales and support team.', points: ['Conversational memory', 'Smart human handoff', 'Personalized tone', 'Analytics dashboard'] },
    { icon: React.createElement(CrmIcon), title: 'CRM & Pipeline Integration', subtitle: 'Every chat becomes a lead.', points: ['Lead syncing', 'Follow-up automations', 'Deal tracking', 'Performance reports'] },
    { icon: React.createElement(MessageCircleIcon), title: 'WhatsApp Marketing Campaigns', subtitle: 'Broadcast messages that get read.', points: ['Broadcast scheduling', 'Segmentation', 'Catalog cards', 'Real-time engagement tracking'] },
    { icon: React.createElement(ShoppingCartIcon), title: 'E-commerce & Payment Flows', subtitle: 'From chat to checkout in seconds.', points: ['Shopify / Stripe integration', 'Abandoned cart recovery', 'Order updates', 'Upsell automations'] },
    { icon: React.createElement(GlobeIcon), title: 'Industry Solutions', subtitle: 'Tailored automation for every sector.', points: ['Booking & reservation bots', 'Menu & catalog sharing', 'Feedback & surveys', 'Event registration'] },
];

export const WHATSAPP_USE_CASES = [
    { icon: React.createElement(UserCheckIcon), title: 'Lead Generation Flow', steps: ['Ad → WhatsApp chat → AI qualifies lead → CRM sync → Auto follow-up → Payment link → Confirmation'] },
    { icon: React.createElement(ShoppingCartIcon), title: 'E-commerce Flow', steps: ['Customer chats → Browse catalog → Adds to cart → Pays in-chat → Receives updates'] },
    { icon: React.createElement(CheckCircleIcon), title: 'Service Booking Flow', steps: ['Client messages → AI confirms slot → Invoice sent → Booking recorded → CRM updated'] },
];

export const WHATSAPP_RESULTS = [
    { before: '2 hours', after: '< 2 minutes', label: 'Response time', improved: true },
    { before: '40%', after: '< 5%', label: 'Missed leads', improved: true },
    { before: '12%', after: '38%', label: 'Conversion rate', improved: true },
    { before: '7 / 10', after: '9.4 / 10', label: 'Customer satisfaction', improved: true },
];

export const WHATSAPP_PROCESS = [
    { step: 1, title: 'Discovery Call', subtitle: 'Understand Your Goals', description: 'A short consultation to map your communication needs, pain points, and automation potential.' },
    { step: 2, title: 'Workflow Blueprint', subtitle: 'Design Your Automation Flow', description: 'Our experts design a custom WhatsApp journey — from first message to sale or booking.' },
    { step: 3, title: 'Development & Integration', subtitle: 'Build and Connect Everything', description: 'We integrate with your CRM, Supabase, n8n, and any payment gateway you use.' },
    { step: 4, title: 'AI Training & Testing', subtitle: 'Train Your Chat Agents', description: 'We teach your Copilot to answer real customer questions, qualify leads, and adapt over time.' },
    { step: 5, title: 'Launch & Optimize', subtitle: 'Go Live & Measure Results', description: 'Once launched, we monitor performance, tweak flows, and report conversions every week.' },
];

export const WHATSAPP_TECHNOLOGIES = ['Supabase', 'n8n', 'CopilotKit', 'CrewAI', 'LangChain', 'Stripe', 'Cloudinary', 'Webflow'];

export const WHATSAPP_FAQ = [
    { q: 'Do you use the official WhatsApp Business API?', a: 'Yes, we only use the official WhatsApp Business API to ensure reliability, security, and access to all features.' },
    { q: 'Can I integrate WhatsApp with my CRM or database?', a: 'Absolutely. We specialize in integrating WhatsApp with CRMs like HubSpot, Salesforce, and custom databases via Supabase or other platforms.' },
    { q: 'Is this AI or just a bot?', a: 'We use advanced AI agents, not simple rule-based bots. Our systems understand context, have memory, and can handle complex conversations, including handing off to a human when necessary.' },
    { q: 'How long does setup take?', a: 'A standard setup can be launched in as little as 2 weeks, including discovery, development, and testing.' },
];

// Tech Stack Page Data
export const TECH_STACK_WHY_FEATURES = [
    { icon: React.createElement(TrendingUpIcon, { className: "w-6 h-6" }), title: "Enterprise-grade scalability & reliability" },
    { icon: React.createElement(BrainCircuitIcon, { className: "w-6 h-6" }), title: "Context-aware agents & dynamic UI" },
    { icon: React.createElement(RocketIcon, { className: "w-6 h-6", strokeWidth: "2" }), title: "Fast go-to-market (weeks, not months)" },
    { icon: React.createElement(Share2Icon, { className: "w-6 h-6" }), title: "Transparent, traceable workflows" },
];

export const TECH_STACK_CORE_FRAMEWORKS = [
    { title: "CopilotKit", tagline: "Embed intelligent copilots in your UI.", copy: "CopilotKit enables contextual assistants, UI components and workflow triggers that live inside your app." },
    { title: "LangGraph", tagline: "Stateful agents. Complex workflows.", copy: "LangGraph empowers multi-step, multi-agent workflows with full memory and branching logic." },
    { title: "Crew AI", tagline: "Multi-agent teams working together.", copy: "Crew AI orchestrates agent groups with roles and tools, coordinating collaboration amongst agents." },
    { title: "Supabase", tagline: "Backend that just works.", copy: "Supabase handles your auth, database, realtime updates and storage — so you focus on value, not infrastructure." },
    { title: "OpenAI / Claude SDK", tagline: "The generative intelligence core.", copy: "We use OpenAI and Claude SDKs to power reasoning, generation, and natural-language workflows." },
];

export const TECH_STACK_ADDITIONAL_TOOLS = ["Stripe", "n8n", "Webflow / Lovable", "AWS / Cloudflare", "Vercel", "GitHub"];

export const TECH_STACK_USE_CASES = [
    { title: "Agent-enabled CRM", description: "Built with CopilotKit + LangGraph; reduced time-to-value by 60%." },
    { title: "Social-media automation platform", description: "Crew AI + Supabase powering 500k users/month." },
    { title: "E-commerce recommendation engine", description: "OpenAI + Supabase driving +28% conversion." },
];

export const TECH_STACK_FAQ = [
    { q: "What frameworks do you support?", a: "Our core stack includes CopilotKit, LangGraph, Crew AI, and Supabase. However, we are flexible and can integrate with any modern framework or API to meet your project's specific needs." },
    { q: "Can you integrate with our existing data stack?", a: "Yes. We specialize in creating seamless integrations with existing databases, CRMs, and internal tools. Our process includes a thorough discovery phase to map out all necessary data connections." },
    { q: "How do you maintain security & compliance?", a: "Security is paramount. We leverage Supabase's enterprise-grade security features, including row-level security and JWT-based authentication. All code undergoes security audits, and we follow best practices for data handling and compliance." },
    { q: "What’s the timeline for stack deployment?", a: "Our 8-week process includes full stack deployment. A basic infrastructure can be up in the first two weeks, with continuous deployment and integration throughout the project lifecycle." },
];