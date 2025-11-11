import React from 'react';
import { NavLink as NavLinkType } from '../types';
import { 
    CodeIcon, Share2Icon, MessageCircleIcon, PencilRulerIcon, DatabaseIcon, ZapIcon, 
    CheckCircleIcon, FlaskConicalIcon, RocketIcon, ClockIcon, DollarSignIcon, TrendingUpIcon, 
    UserCheckIcon, BarChartIcon, WhatsAppIcon, BotIcon, CrmIcon, ShoppingCartIcon, GlobeIcon, 
    BrainCircuitIcon,
    MobileIcon,
    ShieldCheckIcon,
    TargetIcon,
    HeartIcon,
    GemIcon,
    SparklesIcon,
    TrendingUpIconV2
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
export const PROCESS_PAGE_TIMELINE = [
    { phase: "01", title: "Design Sprint", duration: "1 Week", description: "Research, wireframes, and specifications.", icon: React.createElement(PencilRulerIcon, { className: "w-8 h-8" }) },
    { phase: "02", title: "Build", duration: "4 Weeks", description: "Development, integrations, and testing setup.", icon: React.createElement(ZapIcon, { className: "w-8 h-8" }) },
    { phase: "03", title: "Test", duration: "1 Week", description: "QA, bug fixes, usability validation.", icon: React.createElement(ShieldCheckIcon, { className: "w-8 h-8" }) },
    { phase: "04", title: "Launch & Scale", duration: "2 Weeks", description: "Deployment, analytics, and optimization.", icon: React.createElement(RocketIcon, { className: "w-8 h-8" }) }
];

export const PROCESS_PAGE_COMPARISON = [
    { category: 'Project Duration', sunai: '8 Weeks', traditional: '6+ Months' },
    { category: 'Feedback Loops', sunai: 'Weekly', traditional: 'Monthly' },
    { category: 'Time to Market', sunai: '2 Months', traditional: '6-12 Months' },
    { category: 'Risk Level', sunai: 'Low', traditional: 'High' }
];

export const PROCESS_PAGE_METRICS = [
    { value: "2", unit: "x", label: "Faster than industry average" },
    { value: "98", unit: "%", label: "On-time delivery" },
    { value: "24", unit: "", label: "Successful launches", isPlus: true }
];

export const PROCESS_PAGE_QUALITY_METRICS = [
    { label: "Code Coverage", value: "95%" },
    { label: "Security", value: "A+" },
    { label: "Accessibility", value: "AA" }
];

export const PROCESS_PAGE_CALCULATOR = [
    { name: "MVP", time: "4–6 weeks", icon: React.createElement(RocketIcon, { className: "w-8 h-8" }) },
    { name: "Standard App", time: "6–8 weeks", icon: React.createElement(CodeIcon, { className: "w-8 h-8" }) },
    { name: "Complex System", time: "8–12 weeks", icon: React.createElement(BrainCircuitIcon, { className: "w-8 h-8" }) },
    { name: "Enterprise", time: "12+ weeks", icon: React.createElement(Share2Icon, { className: "w-8 h-8" }) }
];

// Projects Page Data
export const PROJECTS_PAGE_STORIES = [
  {
    industry: 'E-commerce',
    name: 'FashionOS',
    subtitle: 'AI-Powered Fashion Marketplace',
    challenge: 'A fashion startup needed a full e-commerce platform with AI-driven product recommendations and inventory management in 8 weeks.',
    solution: 'We deployed a complete marketplace with AI recommendations, payment processing, and CRM integration using Supabase, Stripe, and custom ML models.',
    metrics: [
      { value: '97', unit: '%', label: 'User Satisfaction' },
      { value: '65', unit: 'K+', label: 'Monthly Users' },
      { value: '300', unit: '%', label: 'Conversion Increase' },
    ],
    techStack: ['React', 'Supabase', 'Stripe', 'OpenAI'],
    testimonial: {
      quote: "Sunai transformed our vision into reality. The AI recommendations increased our average order value by 40%.",
      author: 'Sarah Chen',
      title: 'Founder'
    }
  },
  {
    industry: 'SaaS',
    name: 'AutoMax AI',
    subtitle: '$4.2M Monthly Revenue With Automation',
    challenge: 'Manual car lead processing was costing $50K/month and losing potential customers to competitors due to slow response times.',
    solution: 'Developed multi-agent AI system to qualify leads, schedule test drives, and automate follow-ups via WhatsApp and email.',
    metrics: [
      { value: '4.2', unit: 'M', label: 'Monthly Revenue', prefix: '$' },
      { value: '90', unit: '%', label: 'Automation Rate' },
      { value: '-85', unit: '%', label: 'Processing Time' },
    ],
    techStack: ['FastAPI', 'CrewAI', 'WhatsApp API', 'HubSpot'],
    testimonial: {
      quote: "This AI assistant freed up our sales team to focus on closing deals. ROI was 7x in the first quarter.",
      author: 'Michael Rodriguez',
      title: 'CEO'
    }
  },
  {
    industry: 'Tourism',
    name: 'I Love Medellin',
    subtitle: 'Website Translation Platform',
    challenge: 'A tourism company needed to manage 1,000+ hotel listings with real-time translation to 8 languages.',
    solution: 'Created AI-powered booking platform with automated multi-language support and dynamic pricing engine.',
    metrics: [
      { value: '98', unit: '%', label: 'International Bookings', prefix: '+' },
      { value: '8', unit: '', label: 'Languages' },
      { value: '97.5', unit: '%', label: 'Translation Accuracy' },
    ],
    techStack: ['Next.js', 'Supabase', 'Google AI', 'Stripe'],
    testimonial: {
      quote: "The platform expanded our market reach by 400%. AI translation quality rivals human translators.",
      author: 'Carlos Martinez',
      title: 'Director'
    }
  }
];

export const PROJECTS_TECH_STACK = [
    {
        title: "Frontend & Development",
        technologies: ["Vite", "React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        title: "AI & Orchestration",
        technologies: ["CrewAI", "LangChain", "Anthropic", "OpenAI", "CopilotKit"],
    },
    {
        title: "AI Intelligence & Assist",
        technologies: ["Cursor", "Perplexity", "ChatGPT", "Claude"],
    },
    {
        title: "Data & Infrastructure",
        technologies: ["Supabase", "PostgreSQL", "Firebase", "Stripe"],
    },
];

export const PROJECTS_METRICS = [
    { value: "47", label: "Projects Delivered", unit: "+" },
    { value: "8.2", label: "Weeks Average Delivery Time" },
    { value: "94", label: "On-Time Delivery", unit: "%" },
    { value: "293", label: "ROI Average", unit: "%" }
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

// About Page Data
export const ABOUT_PAGE_HERO_METRICS = [
    { value: "50", unit: "+", label: "Live AI Apps" },
    { value: "2-8", unit: "", label: "Week Delivery" },
    { value: "293", unit: "%", label: "Average ROI" },
    { value: "100", unit: "%", label: "Production Ready" },
];

export const ABOUT_PAGE_MISSION_VISION = [
    { icon: React.createElement(TargetIcon), title: "Mission", description: "To empower businesses with AI solutions that are production-ready, cost-effective, and deliver measurable results in weeks, not months." },
    { icon: React.createElement(HeartIcon), title: "Vision", description: "To become the world's leading platform for rapid AI application development, making enterprise-grade AI accessible to every business." },
    { icon: React.createElement(GemIcon), title: "Values", description: "Speed, transparency, and quality. We believe in delivering production-ready solutions fast without compromising on excellence." },
];

export const ABOUT_PAGE_WHY_CHOOSE_US = [
    { icon: React.createElement(ZapIcon), title: "Lightning-Fast Delivery", description: "Go from concept to production in 2-4 weeks. No lengthy development cycles.", highlight: "8x faster than traditional dev" },
    { icon: React.createElement(SparklesIcon), title: "Cutting-Edge AI Expertise", description: "Latest AI models and frameworks integrated seamlessly into your business.", highlight: "GPT-4, Claude, Custom Models" },
    { icon: React.createElement(TrendingUpIconV2), title: "Proven Track Record", description: "50+ live AI applications serving thousands of users daily.", highlight: "293% average ROI" },
    { icon: React.createElement(ShieldCheckIcon), title: "Enterprise Security", description: "SOC-compliant applications with enterprise-grade security built-in.", highlight: "Bank-level encryption" },
];

export const ABOUT_PAGE_WHY_CHOOSE_US_METRICS = [
    { value: "50", unit: "+", label: "Live AI Applications" },
    { value: "90", unit: "%", label: "Process Automation" },
    { value: "3", unit: "", label: "Month ROI" },
];

export const ABOUT_PAGE_PROCESS_STEPS = [
    { step: 1, title: "Discovery & Planning", description: "We dive deep into your business goals, AI needs, and technical requirements through detailed workshops and analysis.", deliverables: ["AI Requirements Workshop", "Technical Scope Definition"] },
    { step: 2, title: "AI Architecture & Design", description: "We architect your AI solution using best practices and create intuitive designs for optimal user experience.", deliverables: ["AI System Design", "UI/UX Wireframes"] },
    { step: 3, title: "Development", description: "Our team builds your AI application using cutting-edge technologies and AI frameworks, with weekly progress updates.", deliverables: ["AI Model Integration", "Weekly Demos"] },
    { step: 4, title: "Testing & Optimization", description: "Rigorous testing and AI model optimization ensure your application performs flawlessly in production.", deliverables: ["AI Performance Evaluation", "Load Testing"] },
    { step: 5, title: "Launch & Support", description: "We deploy your AI vision and provide ongoing support to ensure continuous success.", deliverables: ["Production Deployment", "30-Day Support"] },
];

export const ABOUT_PAGE_TESTIMONIALS = [
    { stars: 5, rating: "4.9/5", category: "Client Satisfaction", quote: "AMO AI delivered our WhatsApp automation platform in just 3 weeks. Game-changing results.", author: "Sarah Chen", company: "CEO, TechStart Inc", metric: "85% faster response time" },
    { stars: 5, rating: "100%", category: "On-Time Delivery", quote: "The 8-week timeline was perfect. We launched on schedule and saw immediate ROI.", author: "Michael Rodriguez", company: "CTO, Enterprise Solutions", metric: "60% cost reduction" },
    { stars: 5, rating: "293%", category: "Average ROI", quote: "Our AI chatbot reduced support costs by 60% in the first month. Incredible value.", author: "Emily Watson", company: "VP Operations, RetailCo", metric: "60% cost reduction" },
];

export const ABOUT_PAGE_TRUSTED_METRICS = [
    { value: "50", unit: "+", label: "Live Apps" },
    { value: "4.9/5", unit: "", label: "Client Rating" },
    { value: "100", unit: "%", label: "On-Time" },
    { value: "293", unit: "%", label: "Avg ROI" },
];

export const ABOUT_PAGE_BUILD_FUTURE_CARDS = [
    { icon: React.createElement(MessageCircleIcon), title: "Book a Call", description: "Schedule a free consultation", cta: "Schedule Free Call →" },
    { icon: React.createElement(PencilRulerIcon), title: "View Process", description: "Learn about our 8-week methodology", cta: "See Process →" },
    { icon: React.createElement(BotIcon), title: "Submit AI Brief", description: "Get a custom project quote", cta: "Start Your Project →", primary: true },
];
