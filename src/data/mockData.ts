import { Category, Project, Freelancer, Proposal, UserProfile, Conversation, ChatMessage } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Web & App Development',
    slug: 'web-development',
    iconName: 'Code',
    description: 'Custom web apps, mobile apps, e-commerce, and full-stack solutions.',
    projectCount: 142,
    freelancerCount: 890,
    popularSkills: ['React', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Python'],
    color: 'emerald'
  },
  {
    id: 'cat-2',
    name: 'UI/UX & Brand Design',
    slug: 'design',
    iconName: 'Palette',
    description: 'Web & mobile UI design, brand identities, design systems, and wireframing.',
    projectCount: 98,
    freelancerCount: 650,
    popularSkills: ['Figma', 'Adobe XD', 'UI Design', 'Wireframing', 'Branding', 'Prototyping'],
    color: 'purple'
  },
  {
    id: 'cat-3',
    name: 'AI & Data Science',
    slug: 'ai-data',
    iconName: 'Cpu',
    description: 'Machine learning models, AI agents, data engineering, and automation scripts.',
    projectCount: 76,
    freelancerCount: 420,
    popularSkills: ['Python', 'TensorFlow', 'LLM Integration', 'PyTorch', 'Data Analysis', 'SQL'],
    color: 'blue'
  },
  {
    id: 'cat-4',
    name: 'Content & Copywriting',
    slug: 'writing',
    iconName: 'FileText',
    description: 'Technical articles, SEO blog posts, website copywriting, and documentation.',
    projectCount: 64,
    freelancerCount: 510,
    popularSkills: ['SEO Copywriting', 'Technical Writing', 'Content Strategy', 'Editing', 'Blog Posts'],
    color: 'amber'
  },
  {
    id: 'cat-5',
    name: 'Digital Marketing & SEO',
    slug: 'marketing',
    iconName: 'TrendingUp',
    description: 'Search engine optimization, PPC ad campaigns, growth hacking, and social media.',
    projectCount: 53,
    freelancerCount: 380,
    popularSkills: ['Google Ads', 'SEO Audit', 'Social Media Marketing', 'Email Marketing', 'Analytics'],
    color: 'rose'
  },
  {
    id: 'cat-6',
    name: 'Video & 3D Animation',
    slug: 'video-animation',
    iconName: 'Video',
    description: 'Explainer videos, motion graphics, video editing, and 3D product rendering.',
    projectCount: 41,
    freelancerCount: 290,
    popularSkills: ['After Effects', 'Premiere Pro', 'Blender', 'Motion Design', 'Video Editing'],
    color: 'indigo'
  }
];

export const INITIAL_FREELANCERS: Freelancer[] = [
  {
    id: 'fl-1',
    name: 'Elena Rostova',
    title: 'Senior Full-Stack Developer & React Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    category: 'Web & App Development',
    bio: 'Full-stack software engineer with 7+ years of experience crafting enterprise-grade web applications. Passionate about scalable frontend architectures, TypeScript, clean code, and delightful micro-interactions.',
    hourlyRate: 85,
    experienceLevel: 'Expert',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS'],
    rating: 4.96,
    reviewsCount: 48,
    totalEarnings: '$120K+',
    jobsCompleted: 54,
    jobSuccessRate: 99,
    onTimeRate: 100,
    location: 'San Francisco, CA, USA',
    memberSince: 'Mar 2021',
    badge: 'Top Rated',
    available: true,
    languages: ['English (Fluent)', 'Spanish (Conversational)'],
    responseHours: 1,
    portfolio: [
      {
        id: 'port-1-1',
        title: 'SaaS Analytics Cloud Platform',
        description: 'Comprehensive data visualizer and team collaboration dashboard built with Next.js, Tailwind, and Recharts.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        tags: ['React', 'Next.js', 'Tailwind CSS', 'Recharts'],
        link: 'https://example.com/project-analytics'
      },
      {
        id: 'port-1-2',
        title: 'FinTech Payment Management Portal',
        description: 'Real-time multi-currency transaction processing and automated invoice generator.',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
        tags: ['TypeScript', 'Node.js', 'Stripe', 'PostgreSQL']
      }
    ],
    reviews: [
      {
        id: 'rev-1-1',
        author: 'Marcus Vance',
        company: 'Apex Digital Labs',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Elena delivered exceptional work on our dashboard revamp. Her attention to detail in state management and TypeScript typing saved our team weeks of debugging. Highly recommended!',
        projectTitle: 'Modern Dashboard Redesign with React'
      },
      {
        id: 'rev-1-2',
        author: 'Sarah Jenkins',
        company: 'CloudBridge Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Super fast communication and top-tier code quality. Elena is one of the most reliable developers we have ever contracted.',
        projectTitle: 'Full-Stack Next.js Migration'
      }
    ]
  },
  {
    id: 'fl-2',
    name: 'David Chen',
    title: 'Product Designer (UI/UX) & Design Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    category: 'UI/UX & Brand Design',
    bio: 'User-centric product designer who turns complex workflows into intuitive, beautiful digital experiences. Over 6 years leading design systems for fintech, healthtech, and B2B SaaS startups.',
    hourlyRate: 75,
    experienceLevel: 'Expert',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Mobile App Design', 'Wireframing', 'User Research', 'Prototyping'],
    rating: 4.92,
    reviewsCount: 39,
    totalEarnings: '$95K+',
    jobsCompleted: 42,
    jobSuccessRate: 98,
    onTimeRate: 97,
    location: 'Vancouver, Canada',
    memberSince: 'Jan 2022',
    badge: 'Verified Pro',
    available: true,
    languages: ['English (Native)', 'Mandarin (Fluent)'],
    responseHours: 2,
    portfolio: [
      {
        id: 'port-2-1',
        title: 'MedPulse Telehealth Mobile App',
        description: 'Complete end-to-end iOS & Android patient booking and consultation UX redesign.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        tags: ['Figma', 'Mobile UI', 'iOS Design', 'Design System']
      },
      {
        id: 'port-2-2',
        title: 'B2B Enterprise Design System',
        description: 'Scalable multi-brand component library with over 150+ interactive tokens and components.',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
        tags: ['Design Systems', 'Figma', 'Tokens', 'UI Kits']
      }
    ],
    reviews: [
      {
        id: 'rev-2-1',
        author: 'Chloe Dupont',
        company: 'Verve Health',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'David was fantastic to work with. He conducted user tests, created high-fidelity prototypes in Figma, and handed off crystal-clear component specs.',
        projectTitle: 'Telehealth UI/UX Redesign'
      }
    ]
  },
  {
    id: 'fl-3',
    name: 'Amina Al-Mansoor',
    title: 'AI Engineer & NLP / LLM Integration Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    category: 'AI & Data Science',
    bio: 'AI researcher and engineer specializing in Large Language Model (LLM) agents, semantic vector search, RAG pipelines, and automated intelligence pipelines using Python, LangChain, and FastAPI.',
    hourlyRate: 95,
    experienceLevel: 'Expert',
    skills: ['Python', 'LLM Integration', 'FastAPI', 'LangChain', 'OpenAI API', 'Vector Databases', 'PyTorch'],
    rating: 5.0,
    reviewsCount: 27,
    totalEarnings: '$80K+',
    jobsCompleted: 31,
    jobSuccessRate: 100,
    onTimeRate: 100,
    location: 'London, UK',
    memberSince: 'Nov 2022',
    badge: 'Top Rated',
    available: true,
    languages: ['English (Fluent)', 'Arabic (Native)'],
    responseHours: 1,
    portfolio: [
      {
        id: 'port-3-1',
        title: 'Intelligent Document RAG Pipeline',
        description: 'Automated legal and financial document semantic indexing and question-answering assistant.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        tags: ['Python', 'FastAPI', 'Pinecone', 'RAG']
      }
    ],
    reviews: [
      {
        id: 'rev-3-1',
        author: 'Robert Sterling',
        company: 'Lexis Automations',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Amina is a genius when it comes to LLM orchestration. She built our agentic assistant ahead of schedule with remarkable precision.',
        projectTitle: 'AI Knowledge Base Agent'
      }
    ]
  },
  {
    id: 'fl-4',
    name: 'Julian Morales',
    title: 'Senior Technical Writer & SEO Copywriter',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    category: 'Content & Copywriting',
    bio: 'Bridging the gap between engineering and marketing. I write technical whitepapers, developer documentation, API tutorials, and search-optimized SaaS landing page copy that converts.',
    hourlyRate: 55,
    experienceLevel: 'Intermediate',
    skills: ['SEO Copywriting', 'Technical Writing', 'Developer Docs', 'Content Strategy', 'B2B SaaS', 'Markdown'],
    rating: 4.88,
    reviewsCount: 34,
    totalEarnings: '$45K+',
    jobsCompleted: 48,
    jobSuccessRate: 97,
    onTimeRate: 99,
    location: 'Austin, TX, USA',
    memberSince: 'Jul 2022',
    badge: 'Rising Star',
    available: true,
    languages: ['English (Native)'],
    responseHours: 3,
    portfolio: [
      {
        id: 'port-4-1',
        title: 'Developer Documentation Portal',
        description: 'Comprehensive API reference, quickstart guides, and SDK integration walkthroughs for a cloud database service.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
        tags: ['Technical Writing', 'API Docs', 'Markdown']
      }
    ],
    reviews: [
      {
        id: 'rev-4-1',
        author: 'Devin Zhao',
        company: 'MeshAPI',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Julian converted our complex backend specs into beautiful, developer-friendly documentation.',
        projectTitle: 'API Documentation Revamp'
      }
    ]
  },
  {
    id: 'fl-5',
    name: 'Sofia Lindqvist',
    title: 'Growth Marketer & Performance Ads Strategist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    category: 'Digital Marketing & SEO',
    bio: 'Data-driven growth marketer focused on scale, ROI, and customer acquisition cost reduction. Managed over $2M in combined ad spend across Google, Meta, and LinkedIn.',
    hourlyRate: 65,
    experienceLevel: 'Intermediate',
    skills: ['Google Ads', 'Meta Ads', 'SEO Audit', 'Conversion Rate Optimization', 'Google Analytics 4', 'HubSpot'],
    rating: 4.9,
    reviewsCount: 22,
    totalEarnings: '$52K+',
    jobsCompleted: 29,
    jobSuccessRate: 96,
    onTimeRate: 98,
    location: 'Stockholm, Sweden',
    memberSince: 'Sep 2022',
    badge: 'Verified Pro',
    available: false,
    languages: ['English (Fluent)', 'Swedish (Native)'],
    responseHours: 4,
    portfolio: [
      {
        id: 'port-5-1',
        title: 'E-commerce 3.4x ROAS Campaign',
        description: 'Multi-channel acquisition funnel optimization for an eco-friendly apparel brand.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        tags: ['Google Ads', 'ROAS', 'Analytics']
      }
    ],
    reviews: [
      {
        id: 'rev-5-1',
        author: 'Emil Larson',
        company: 'Nordic Pure',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Sofia revamped our PPC structure and cut our CPA by 38% in the first 45 days. Absolutely stellar performance!',
        projectTitle: 'PPC Optimization & Strategy'
      }
    ]
  },
  {
    id: 'fl-6',
    name: 'Tariq Johnson',
    title: 'Motion Designer & 3D Visualizer (Blender / After Effects)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    category: 'Video & 3D Animation',
    bio: 'Creating immersive 3D product animations, dynamic UI micro-interactions, and engaging promotional videos that capture audience imagination.',
    hourlyRate: 70,
    experienceLevel: 'Expert',
    skills: ['Blender', 'After Effects', '3D Modeling', 'Motion Graphics', 'Cinema 4D', 'Premiere Pro'],
    rating: 4.95,
    reviewsCount: 31,
    totalEarnings: '$68K+',
    jobsCompleted: 35,
    jobSuccessRate: 100,
    onTimeRate: 100,
    location: 'Atlanta, GA, USA',
    memberSince: 'Feb 2022',
    badge: 'Top Rated',
    available: true,
    languages: ['English (Native)'],
    responseHours: 2,
    portfolio: [
      {
        id: 'port-6-1',
        title: 'Futuristic Hardware 3D Commercial',
        description: 'Photorealistic product rendering, dynamic lighting, and sound-synced camera movement in Blender.',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
        tags: ['Blender', '3D Animation', 'Motion Graphics']
      }
    ],
    reviews: [
      {
        id: 'rev-6-1',
        author: 'Clara Oswald',
        company: 'Pulse Devices',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Tariq is an incredible artist. The 3D video he produced made our product launch a massive viral hit.',
        projectTitle: '3D Product Teaser Video'
      }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Modern B2B SaaS Dashboard Redesign in React & Tailwind',
    category: 'Web & App Development',
    categorySlug: 'web-development',
    budgetType: 'fixed',
    budgetMin: 1800,
    budgetMax: 2500,
    description: 'Looking for a senior frontend developer to convert Figma designs into clean, modular React TypeScript components with responsive Tailwind CSS layout and dark mode support.',
    fullDescription: `We are a high-growth B2B logistics SaaS company looking to revamp our customer analytics portal. Our design team has prepared comprehensive Figma mockups and component tokens.

We need an experienced React and TypeScript developer to:
1. Build reusable, high-performance UI components using Tailwind CSS and Lucide React.
2. Implement robust responsive behavior across mobile, tablet, and ultra-wide screens.
3. Integrate chart visualizations (using Recharts or Chart.js) for live shipment metrics.
4. Ensure clean state management and strong TypeScript typing.
5. Provide clean documentation and automated test fixtures where appropriate.

Requirements:
- Proven experience with modern React 18+, TypeScript, and Tailwind CSS.
- High attention to design fidelity (pixel-perfect implementation of Figma specs).
- Strong understanding of accessibility (WCAG AA compliance).
- Available for weekly async syncs and quick turnaround.`,
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Responsive Design', 'Recharts'],
    deadline: '2026-09-30',
    estimatedDuration: '3-4 Weeks',
    experienceLevel: 'Expert',
    client: {
      name: 'Sarah Lin',
      company: 'LogiFlow Technologies',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      location: 'San Jose, CA, USA',
      rating: 4.95,
      reviewsCount: 18,
      totalSpent: 42000,
      hireRate: 88,
      memberSince: 'Jun 2022',
      paymentVerified: true
    },
    status: 'open',
    proposalsCount: 8,
    featured: true,
    createdAt: '2026-08-27T10:30:00Z',
    deliverables: [
      'Production-ready React codebase with full TypeScript types',
      'Interactive Chart widgets and responsive tables with pagination/filters',
      'Dark/Light mode theme integration',
      'Clean component documentation'
    ],
    scope: 'Medium'
  },
  {
    id: 'proj-2',
    title: 'Complete Mobile App UI/UX Design System for Fitness Platform',
    category: 'UI/UX & Brand Design',
    categorySlug: 'design',
    budgetType: 'fixed',
    budgetMin: 1200,
    budgetMax: 1800,
    description: 'Need a talented UI/UX designer to craft an intuitive 20-screen mobile app experience in Figma for iOS and Android with workout trackers and meal planning.',
    fullDescription: `FitSphere is an upcoming fitness and nutrition app connecting personal trainers with remote athletes. We require an end-to-end design system and high-fidelity prototype in Figma.

Key Deliverables:
- User flows and interactive wireframes for onboardings, workout logging, trainer chat, and progress dashboards.
- 20+ polished UI screens in Figma with component auto-layouts and typography tokens.
- Clickable interactive prototype for user validation testing.
- Design specs for handoff to mobile development team (React Native / Flutter).

Ideal candidate has a solid portfolio of published iOS/Android mobile apps and a great sense of modern typography, micro-interactions, and visual harmony.`,
    requiredSkills: ['Figma', 'UI/UX Design', 'Mobile App Design', 'Wireframing', 'Prototyping', 'Design System'],
    deadline: '2026-09-20',
    estimatedDuration: '2-3 Weeks',
    experienceLevel: 'Intermediate',
    client: {
      name: 'David Reynolds',
      company: 'FitSphere Health LLC',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      location: 'Austin, TX, USA',
      rating: 4.89,
      reviewsCount: 12,
      totalSpent: 28500,
      hireRate: 92,
      memberSince: 'Jan 2023',
      paymentVerified: true
    },
    status: 'open',
    proposalsCount: 14,
    featured: true,
    createdAt: '2026-08-26T14:15:00Z',
    deliverables: [
      'Comprehensive Figma project file with scalable design system',
      'Light and Dark UI theme states',
      'Clickable prototype for usability testing',
      'Exportable iconography and asset kits'
    ],
    scope: 'Medium'
  },
  {
    id: 'proj-3',
    title: 'Custom AI Knowledge Agent & RAG Pipeline with Python & FastAPI',
    category: 'AI & Data Science',
    categorySlug: 'ai-data',
    budgetType: 'hourly',
    budgetMin: 60,
    budgetMax: 95,
    description: 'Build an internal AI knowledge retrieval system capable of indexing PDF manuals, internal notion docs, and answering complex technical support queries.',
    fullDescription: `We have a library of over 500 technical manuals and documentation documents. We are seeking a seasoned AI/NLP engineer to build a high-performance RAG (Retrieval-Augmented Generation) backend.

Responsibilities:
- Build a Python FastAPI server interfacing with vector databases (e.g. Pinecone/Chroma/Qdrant).
- Implement chunking and embedding pipelines for PDF, Markdown, and HTML documents.
- Integrate modern LLMs with hallucination guardrails, citations, and re-ranking.
- Provide clean RESTful endpoints and webhook integrations for our existing web app.

Qualifications:
- Strong experience with Python 3.11+, LangChain or LlamaIndex, and vector databases.
- Deep understanding of embeddings, similarity search, and prompt engineering.
- Experience containerizing solutions with Docker.`,
    requiredSkills: ['Python', 'LLM Integration', 'FastAPI', 'Vector Databases', 'LangChain', 'Docker'],
    deadline: '2026-10-15',
    estimatedDuration: '1-2 Months',
    experienceLevel: 'Expert',
    client: {
      name: 'Alexei Ivanov',
      company: 'OmniData Systems',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      location: 'Berlin, Germany',
      rating: 5.0,
      reviewsCount: 24,
      totalSpent: 67000,
      hireRate: 95,
      memberSince: 'Oct 2021',
      paymentVerified: true
    },
    status: 'open',
    proposalsCount: 6,
    featured: true,
    createdAt: '2026-08-25T09:00:00Z',
    deliverables: [
      'FastAPI server source code with Dockerfile and setup instructions',
      'Automated batch ingestion script for local PDF & Markdown docs',
      'Comprehensive unit tests and API documentation (Swagger/OpenAPI)',
      'Performance benchmarking report on latency and retrieval precision'
    ],
    scope: 'Large'
  },
  {
    id: 'proj-4',
    title: 'SEO-Optimized Technical Blog Articles for Cloud Infrastructure Startup',
    category: 'Content & Copywriting',
    categorySlug: 'writing',
    budgetType: 'fixed',
    budgetMin: 600,
    budgetMax: 1000,
    description: 'Looking for a technical writer to produce 4 deep-dive articles (1,800-2,200 words each) on Kubernetes optimization, serverless architecture, and CI/CD best practices.',
    fullDescription: `Our devops startup provides automated container scaling. We want to publish high-authority blog posts targeting software architects and devops engineers.

Scope:
- 4 comprehensive articles (approx. 2,000 words each)
- Topics: Kubernetes Cost Optimization, Zero-Downtime Deployments, Observability in Microservices, and Edge Computing Trends.
- Must include code snippets, architecture diagrams (ASCII or Mermaid), and original technical insights.
- Keyword research and on-page SEO optimization included.

Ideal freelancer has real software engineering or devops background and demonstrated writing samples.`,
    requiredSkills: ['Technical Writing', 'SEO Copywriting', 'Kubernetes', 'DevOps', 'Content Strategy'],
    deadline: '2026-09-18',
    estimatedDuration: '2 Weeks',
    experienceLevel: 'Intermediate',
    client: {
      name: 'Rachel Adams',
      company: 'ScaleStack Cloud',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
      location: 'Seattle, WA, USA',
      rating: 4.92,
      reviewsCount: 15,
      totalSpent: 19000,
      hireRate: 85,
      memberSince: 'Mar 2023',
      paymentVerified: true
    },
    status: 'open',
    proposalsCount: 11,
    featured: false,
    createdAt: '2026-08-24T16:20:00Z',
    deliverables: [
      '4 Google Docs / Markdown files formatted with meta tags and headings',
      'Keyword density and SEO audit checklist for each article',
      'Revision cycle based on editorial feedback'
    ],
    scope: 'Small'
  },
  {
    id: 'proj-5',
    title: 'Google & Meta Ads Growth Strategy for High-Ticket B2B Services',
    category: 'Digital Marketing & SEO',
    categorySlug: 'marketing',
    budgetType: 'hourly',
    budgetMin: 50,
    budgetMax: 80,
    description: 'Seeking a seasoned PPC manager to overhaul our Google Search and LinkedIn Lead Gen ad campaigns to lower cost per lead and increase pipeline quality.',
    fullDescription: `We provide enterprise cybersecurity consulting. We are looking for an experienced digital marketing specialist to audit and restructure our paid advertising accounts.

Key Activities:
- Audit past 6 months of Google Search Ads and LinkedIn Sponsored Content.
- Perform keyword expansion and negative keyword hygiene.
- Set up conversion tracking with Google Tag Manager and CRM attribution.
- Create high-converting ad copy variations and A/B test schedules.
- Weekly reporting on ROAS, CPL, and appointment conversion rates.`,
    requiredSkills: ['Google Ads', 'PPC Strategy', 'LinkedIn Ads', 'Google Tag Manager', 'Conversion Rate Optimization'],
    deadline: '2026-10-01',
    estimatedDuration: '1 Month',
    experienceLevel: 'Expert',
    client: {
      name: 'Thomas Mueller',
      company: 'CyberGuard Enterprise',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      location: 'Zurich, Switzerland',
      rating: 4.85,
      reviewsCount: 9,
      totalSpent: 34000,
      hireRate: 90,
      memberSince: 'Aug 2022',
      paymentVerified: true
    },
    status: 'open',
    proposalsCount: 7,
    featured: false,
    createdAt: '2026-08-23T11:45:00Z',
    deliverables: [
      'Comprehensive PPC Audit & Action Plan',
      'Targeted campaign structure with segmented ad groups and negative lists',
      'Verified GTM conversion tracking setup',
      'Bi-weekly performance dashboard'
    ],
    scope: 'Medium'
  },
  {
    id: 'proj-6',
    title: '3D Product Showcase Animation for Next-Gen Ergonomic Keyboard',
    category: 'Video & 3D Animation',
    categorySlug: 'video-animation',
    budgetType: 'fixed',
    budgetMin: 1500,
    budgetMax: 2200,
    description: 'Create a 45-second photorealistic 3D render video showing keyboard assembly, magnetic wrist rest snapping, and RGB key switch mechanics for a Kickstarter campaign.',
    fullDescription: `We have engineered a revolutionary mechanical split keyboard. We need a 3D motion animator to bring CAD step files to life with studio-grade lighting, cinematic camera sweeps, and motion graphics callouts.

What we provide:
- SolidWorks/STEP 3D model files
- Brand color palette and typography guidelines
- Storyboard sketch and audio voiceover track

Deliverables:
- 45s main commercial in 4K (16:9) and vertical social cut (9:16)
- Sound design and dynamic background music mixing
- 5 high-res 4K still renders for marketing website hero banner`,
    requiredSkills: ['Blender', '3D Animation', 'Motion Graphics', 'After Effects', 'Product Rendering', '3D Modeling'],
    deadline: '2026-09-25',
    estimatedDuration: '3 Weeks',
    experienceLevel: 'Expert',
    client: {
      name: 'Liam Gallagher',
      company: 'KeyMatrix Innovations',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
      location: 'Melbourne, Australia',
      rating: 4.97,
      reviewsCount: 21,
      totalSpent: 51000,
      hireRate: 94,
      memberSince: 'May 2022',
      paymentVerified: true
    },
    status: 'open',
    proposalsCount: 5,
    featured: false,
    createdAt: '2026-08-22T08:15:00Z',
    deliverables: [
      '4K 60fps Master Video File (ProRes / MP4)',
      'Vertical 9:16 Social Media Cut',
      '5 High-Resolution Product Render Stills',
      'Complete Blender project archive with textures and materials'
    ],
    scope: 'Medium'
  }
];

export const DEMO_CLIENT_ACCOUNT: UserProfile = {
  id: 'user-client-1',
  name: 'Sarah Connor',
  email: 'sarah.connor@westonmedia.com',
  role: 'client',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  title: 'VP of Product Engineering',
  bio: 'Leading digital product acceleration and scaling distributed engineering & design teams at Weston Media. Looking for top 1% talent for long-term collaborations.',
  hourlyRate: 0,
  experienceLevel: 'Expert',
  skills: ['Product Strategy', 'Agile Leadership', 'Full-Stack Management', 'Design Systems'],
  location: 'Austin, TX, USA',
  companyName: 'Weston Media Group',
  savedProjectIds: ['proj-1', 'proj-2'],
  balance: 14500,
  escrowLocked: 2200,
  totalSpent: 48900,
  totalEarned: 0,
  memberSince: 'Jan 2021',
  phone: '+1 (512) 555-0192',
  website: 'https://westonmedia.example.com',
  verified: true
};

export const DEMO_FREELANCER_ACCOUNT: UserProfile = {
  id: 'user-freelancer-1',
  name: 'Nitin Saini',
  email: 'nitinisaini2005@gmail.com',
  role: 'freelancer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  title: 'Senior Full-Stack JavaScript & UI Engineer',
  bio: 'Specializing in modern React, Next.js, Node.js, and clean Tailwind CSS interfaces. I help startups and businesses launch delightful digital products quickly with bulletproof quality.',
  hourlyRate: 75,
  experienceLevel: 'Expert',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'PostgreSQL', 'Figma'],
  location: 'Jaipur, RJ, India',
  companyName: 'Mercer Creative Labs',
  savedProjectIds: ['proj-1', 'proj-3'],
  balance: 3850,
  escrowLocked: 1500,
  totalSpent: 0,
  totalEarned: 32400,
  memberSince: 'Mar 2022',
  phone: '+91 (Jaipur) 98765 43210',
  website: 'https://nitinsaini.dev',
  verified: true
};

export const INITIAL_USER_ACCOUNTS: UserProfile[] = [
  DEMO_CLIENT_ACCOUNT,
  DEMO_FREELANCER_ACCOUNT
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    projectId: 'proj-1',
    projectTitle: 'Modern B2B SaaS Dashboard Redesign in React & Tailwind',
    category: 'Web & App Development',
    clientName: 'LogiFlow Technologies',
    clientId: 'user-client-1',
    freelancerId: 'fl-1',
    freelancerName: 'Elena Rostova',
    freelancerEmail: 'elena.rostova@example.com',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    coverLetter: 'Hello Sarah! I have extensive experience converting complex Figma systems into modular, blazing-fast React TypeScript applications. I recently built a similar analytics dashboard for an enterprise logistics client with dynamic Recharts widgets and full keyboard accessibility. I will structure the project into clear verifiable milestones.',
    bidAmount: 2200,
    deliveryDays: 21,
    status: 'accepted',
    submittedAt: '2026-08-27T14:30:00Z',
    escrowFundedAmount: 1700,
    releasedAmount: 800,
    milestones: [
      {
        id: 'ms-1-1',
        title: 'Phase 1: Architecture, Layout Shell & Design Tokens',
        description: 'Set up Vite + TypeScript project structure, Tailwind themes, sidebar navigation, and auth guard wrappers.',
        amount: 800,
        deliveryDays: 6,
        status: 'released',
        submissionNotes: 'Completed layout, responsive navigation, dark theme tokens, and Storybook documentation.',
        submissionLink: 'https://github.com/example/logiflow-dashboard-v1',
        submittedAt: '2026-08-27T18:00:00Z',
        fundedAt: '2026-08-27T14:45:00Z',
        releasedAt: '2026-08-28T01:00:00Z'
      },
      {
        id: 'ms-1-2',
        title: 'Phase 2: Interactive Charts, Filter Grids & Real-Time Telemetry',
        description: 'Integrate Recharts graphs, date-range picker, server sorting, CSV export, and filter pills.',
        amount: 900,
        deliveryDays: 8,
        status: 'submitted',
        submissionNotes: 'All charts, live drill-downs, and table pagination are implemented and tested on mobile & 4K screens.',
        submissionLink: 'https://staging.logiflow-preview.app',
        submittedAt: '2026-08-28T02:30:00Z',
        fundedAt: '2026-08-27T14:45:00Z'
      },
      {
        id: 'ms-1-3',
        title: 'Phase 3: QA Testing, Edge Cases, Lighthouse 98+ & Deployment Handover',
        description: 'Cross-browser validation, accessibility audit (WCAG AA), documentation, and deployment pipeline.',
        amount: 500,
        deliveryDays: 7,
        status: 'pending'
      }
    ]
  },
  {
    id: 'prop-2',
    projectId: 'proj-2',
    projectTitle: 'Complete Mobile App UI/UX Design System for Fitness Platform',
    category: 'UI/UX & Brand Design',
    clientName: 'FitSphere Health LLC',
    clientId: 'client-fitsphere',
    freelancerId: 'fl-2',
    freelancerName: 'David Chen',
    freelancerEmail: 'david.chen@example.com',
    freelancerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverLetter: 'Hi team! I specialize in fitness and wellness mobile application design. I designed MedPulse and GymTrack, which achieved 4.9 stars on the App Store. I will provide structured Figma component libraries with scalable tokens, dark/light variants, and clickable prototypes.',
    bidAmount: 1600,
    deliveryDays: 14,
    status: 'interviewing',
    submittedAt: '2026-08-26T18:00:00Z',
    escrowFundedAmount: 600,
    releasedAmount: 0,
    milestones: [
      {
        id: 'ms-2-1',
        title: 'Wireframes and Core User Flow Approval',
        description: 'Low-fidelity wireframes covering Onboarding, Workout Tracking, and Profile Analytics.',
        amount: 600,
        deliveryDays: 4,
        status: 'funded',
        fundedAt: '2026-08-27T10:00:00Z'
      },
      {
        id: 'ms-2-2',
        title: 'High-Fidelity Screens and Component System',
        description: '40+ polished screens in Figma with Auto Layout, typography scale, and dark mode variants.',
        amount: 700,
        deliveryDays: 6,
        status: 'pending'
      },
      {
        id: 'ms-2-3',
        title: 'Interactive Prototype and Developer Handoff Tokens',
        description: 'Micro-interaction prototype with Figma variables and export ready asset guide.',
        amount: 300,
        deliveryDays: 4,
        status: 'pending'
      }
    ]
  },
  {
    id: 'prop-3',
    projectId: 'proj-3',
    projectTitle: 'AI Customer Support Agent with RAG Pipeline & Gemini API',
    category: 'AI & Data Science',
    clientName: 'Nexus Retail Innovations',
    clientId: 'client-nexus',
    freelancerId: 'user-freelancer-1',
    freelancerName: 'Nitin Saini',
    freelancerEmail: 'nitinisaini2005@gmail.com',
    freelancerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    coverLetter: 'Hello Nexus team! I have built several enterprise-grade conversational AI assistants with vector embedding pipelines, streaming responses, and fallbacks. I would love to build this resilient customer support agent for your e-commerce operations.',
    bidAmount: 3200,
    deliveryDays: 18,
    status: 'pending',
    submittedAt: '2026-08-28T01:15:00Z',
    escrowFundedAmount: 0,
    releasedAmount: 0,
    milestones: [
      {
        id: 'ms-3-1',
        title: 'Milestone 1: Knowledge Base Vectorization & Embedding Pipeline',
        description: 'Chunking product manuals, setting up vector storage, and similarity search indexing.',
        amount: 1000,
        deliveryDays: 5,
        status: 'pending'
      },
      {
        id: 'ms-3-2',
        title: 'Milestone 2: Context-Aware Agent Engine & Guardrails',
        description: 'Gemini 1.5 Flash integration with prompt engineering, function calling for order lookup, and rate limiting.',
        amount: 1400,
        deliveryDays: 8,
        status: 'pending'
      },
      {
        id: 'ms-3-3',
        title: 'Milestone 3: Web Chat Widget & Analytics Dashboard',
        description: 'Embeddable React chat widget with live streaming text, user satisfaction rating, and fallback escalation.',
        amount: 800,
        deliveryDays: 5,
        status: 'pending'
      }
    ]
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['user-client-1', 'fl-1'],
    participants: [
      {
        id: 'user-client-1',
        name: 'Sarah Connor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        role: 'client',
        title: 'VP of Product Engineering',
        company: 'Weston Media Group',
        isOnline: true
      },
      {
        id: 'fl-1',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        role: 'freelancer',
        title: 'Senior Full-Stack Developer',
        isOnline: true
      }
    ],
    projectId: 'proj-1',
    projectTitle: 'Modern B2B SaaS Dashboard Redesign in React & Tailwind',
    proposalId: 'prop-1',
    lastMessage: 'Phase 2 charts are deployed to the preview staging environment! Let me know if you want any color tweaks.',
    lastMessageTimestamp: '2026-08-28T02:35:00Z',
    unreadCount: 1,
    type: 'project'
  },
  {
    id: 'conv-2',
    participantIds: ['user-client-1', 'fl-2'],
    participants: [
      {
        id: 'user-client-1',
        name: 'Sarah Connor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        role: 'client',
        title: 'VP of Product Engineering',
        company: 'Weston Media Group',
        isOnline: true
      },
      {
        id: 'fl-2',
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        role: 'freelancer',
        title: 'Product Designer (UI/UX)',
        isOnline: false,
        lastSeen: '10m ago'
      }
    ],
    projectId: 'proj-2',
    projectTitle: 'Complete Mobile App UI/UX Design System for Fitness Platform',
    proposalId: 'prop-2',
    lastMessage: 'I have funded Phase 1 in escrow. Feel free to begin the initial wireframe explorations!',
    lastMessageTimestamp: '2026-08-27T10:15:00Z',
    unreadCount: 0,
    type: 'proposal'
  },
  {
    id: 'conv-3',
    participantIds: ['user-client-1', 'fl-3'],
    participants: [
      {
        id: 'user-client-1',
        name: 'Sarah Connor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        role: 'client',
        title: 'VP of Product Engineering',
        company: 'Weston Media Group',
        isOnline: true
      },
      {
        id: 'fl-3',
        name: 'Marcus Thorne',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        role: 'freelancer',
        title: 'Lead AI Engineer & LLM Specialist',
        isOnline: true
      }
    ],
    lastMessage: 'Hi Sarah, are you looking for local LLM fine-tuning or hosted API orchestration with RAG pipelines?',
    lastMessageTimestamp: '2026-08-27T08:20:00Z',
    unreadCount: 0,
    type: 'general'
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'user-client-1',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      senderRole: 'client',
      text: 'Hi Elena! Thanks for submitting your detailed proposal. We love your past work on analytics dashboards.',
      timestamp: '2026-08-27T14:35:00Z',
      projectId: 'proj-1'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'fl-1',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      senderRole: 'freelancer',
      text: 'Thank you Sarah! Excited to work on LogiFlow. I reviewed the wireframes and everything is ready for modular React components.',
      timestamp: '2026-08-27T14:40:00Z',
      projectId: 'proj-1'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-client-1',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      senderRole: 'client',
      text: 'I have funded Phase 1 ($800) and Phase 2 ($900) into Lancly Escrow protection.',
      timestamp: '2026-08-27T14:45:00Z',
      systemEvent: 'milestone_funded',
      projectId: 'proj-1'
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      senderId: 'fl-1',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      senderRole: 'freelancer',
      text: 'Phase 1 layout shell and design tokens are completed and approved! Now wrapping up Phase 2 charts.',
      timestamp: '2026-08-28T01:10:00Z',
      projectId: 'proj-1'
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: 'fl-1',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      senderRole: 'freelancer',
      text: 'Phase 2 charts are deployed to the preview staging environment! Let me know if you want any color tweaks.',
      timestamp: '2026-08-28T02:35:00Z',
      systemEvent: 'milestone_submitted',
      projectId: 'proj-1',
      attachments: [
        { name: 'staging-charts-screenshot.png', size: '1.4 MB', type: 'image' },
        { name: 'metrics-schema.json', size: '24 KB', type: 'code' }
      ]
    }
  ],
  'conv-2': [
    {
      id: 'msg-201',
      conversationId: 'conv-2',
      senderId: 'user-client-1',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      senderRole: 'client',
      text: 'Hi David! We received your proposal for the FitSphere design system. Are you able to complete the initial wireframe review within 4 days?',
      timestamp: '2026-08-27T09:40:00Z',
      projectId: 'proj-2'
    },
    {
      id: 'msg-202',
      conversationId: 'conv-2',
      senderId: 'fl-2',
      senderName: 'David Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      senderRole: 'freelancer',
      text: 'Absolutely! I have the component structure mapped out already and can deliver wireframe Figma links by Thursday.',
      timestamp: '2026-08-27T09:55:00Z',
      projectId: 'proj-2'
    },
    {
      id: 'msg-203',
      conversationId: 'conv-2',
      senderId: 'user-client-1',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      senderRole: 'client',
      text: 'I have funded Phase 1 in escrow. Feel free to begin the initial wireframe explorations!',
      timestamp: '2026-08-27T10:15:00Z',
      systemEvent: 'milestone_funded',
      projectId: 'proj-2'
    }
  ],
  'conv-3': [
    {
      id: 'msg-301',
      conversationId: 'conv-3',
      senderId: 'user-client-1',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      senderRole: 'client',
      text: 'Hi Marcus! We are looking to build an AI workflow for automated document indexing. Wanted to see your availability this month.',
      timestamp: '2026-08-27T08:00:00Z'
    },
    {
      id: 'msg-302',
      conversationId: 'conv-3',
      senderId: 'fl-3',
      senderName: 'Marcus Thorne',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      senderRole: 'freelancer',
      text: 'Hi Sarah, are you looking for local LLM fine-tuning or hosted API orchestration with RAG pipelines?',
      timestamp: '2026-08-27T08:20:00Z'
    }
  ]
};

export const INITIAL_USER_PROFILE: UserProfile = DEMO_FREELANCER_ACCOUNT;

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'lancly_projects_v2',
  FREELANCERS: 'lancly_freelancers_v2',
  PROPOSALS: 'lancly_proposals_v2',
  USER_PROFILE: 'lancly_user_profile_v2',
  CATEGORIES: 'lancly_categories_v2',
  CONVERSATIONS: 'lancly_conversations_v2',
  MESSAGES: 'lancly_messages_v2',
  ALL_ACCOUNTS: 'lancly_all_accounts_v2'
};

export const getStoredProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading projects from localStorage', e);
  }
  return INITIAL_PROJECTS;
};

export const saveStoredProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects to localStorage', e);
  }
};

export const getStoredFreelancers = (): Freelancer[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FREELANCERS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading freelancers from localStorage', e);
  }
  return INITIAL_FREELANCERS;
};

export const saveStoredFreelancers = (freelancers: Freelancer[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FREELANCERS, JSON.stringify(freelancers));
  } catch (e) {
    console.error('Error saving freelancers to localStorage', e);
  }
};

export const getStoredProposals = (): Proposal[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading proposals from localStorage', e);
  }
  return INITIAL_PROPOSALS;
};

export const saveStoredProposals = (proposals: Proposal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  } catch (e) {
    console.error('Error saving proposals to localStorage', e);
  }
};

export const getStoredUserProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (data) {
      const parsed: UserProfile = JSON.parse(data);
      // Migrate demo freelancer email/location if found
      if (parsed.id === 'user-freelancer-1' || parsed.email === 'alex.mercer@devworkspace.io') {
        parsed.email = 'nitinisaini2005@gmail.com';
        parsed.location = 'Jaipur, RJ, India';
        parsed.name = parsed.name === 'Alex Mercer' ? 'Nitin Saini' : parsed.name;
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error reading user profile from localStorage', e);
  }
  return DEMO_FREELANCER_ACCOUNT;
};

export const saveStoredUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving user profile to localStorage', e);
  }
};

export const getStoredAccounts = (): UserProfile[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ALL_ACCOUNTS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading accounts from localStorage', e);
  }
  return INITIAL_USER_ACCOUNTS;
};

export const saveStoredAccounts = (accounts: UserProfile[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ALL_ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error('Error saving accounts to localStorage', e);
  }
};

export const getStoredUserAccounts = getStoredAccounts;
export const saveStoredUserAccounts = saveStoredAccounts;

export const getStoredConversations = (): Conversation[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading conversations from localStorage', e);
  }
  return INITIAL_CONVERSATIONS;
};

export const saveStoredConversations = (conversations: Conversation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  } catch (e) {
    console.error('Error saving conversations to localStorage', e);
  }
};

export const getStoredMessages = (): Record<string, ChatMessage[]> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Error reading messages from localStorage', e);
  }
  return INITIAL_MESSAGES;
};

export const saveStoredMessages = (messages: Record<string, ChatMessage[]>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.error('Error saving messages to localStorage', e);
  }
};

export const resetAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.FREELANCERS);
  localStorage.removeItem(STORAGE_KEYS.PROPOSALS);
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  localStorage.removeItem(STORAGE_KEYS.ALL_ACCOUNTS);
};

