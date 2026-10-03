export interface Course {
  id: string;
  title: string;
  category: 'Computer & Office' | 'Accounting' | 'AI & Technology' | 'Creative' | 'Digital Business' | 'Career';
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner to Intermediate' | 'Beginner to Advanced' | 'Intermediate to Advanced';
  mode: 'Classroom' | 'Practical Lab' | 'Hybrid (Lab + Online)';
  image: string;
  badge?: string;
  highlights: string[];
  syllabus: string[];
  eligibility: string;
  certification: string;
  popular?: boolean;
  fee?: number;
}

export interface CategoryInfo {
  id: string;
  name: 'Computer & Office' | 'Accounting' | 'AI & Technology' | 'Creative' | 'Digital Business' | 'Career';
  description: string;
  iconName: string;
  courseCount: number;
  accent: 'purple' | 'red' | 'gold';
}

export const COURSE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'computer-office',
    name: 'Computer & Office',
    description: 'Foundational computing, office productivity, OS, typing, and essential desktop software.',
    iconName: 'Monitor',
    courseCount: 4,
    accent: 'purple',
  },
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Computerized accounting, Tally Prime with GST, DFA, financial reporting, and taxation.',
    iconName: 'Calculator',
    courseCount: 3,
    accent: 'gold',
  },
  {
    id: 'ai-tech',
    name: 'AI & Technology',
    description: 'Artificial intelligence tools, Python, Java programming, web development, and modern automation.',
    iconName: 'Cpu',
    courseCount: 4,
    accent: 'purple',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Graphic design, 2D animation, video editing, DTP, and multimedia production tools.',
    iconName: 'Palette',
    courseCount: 4,
    accent: 'red',
  },
  {
    id: 'digital-business',
    name: 'Digital Business',
    description: 'Digital marketing, SEO, social media strategies, e-commerce store operations, and online growth.',
    iconName: 'Globe',
    courseCount: 2,
    accent: 'gold',
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Job-oriented professional diplomas, corporate executive readiness, and interview skillsets.',
    iconName: 'Briefcase',
    courseCount: 2,
    accent: 'red',
  },
];

export const COURSES: Course[] = [
  // 1. ADCA
  {
    id: 'adca',
    title: 'ADCA (Advanced Diploma in Computer Applications)',
    category: 'Computer & Office',
    description: 'Comprehensive 1-year flagship diploma covering computer fundamentals, advanced MS Office, Tally Prime with GST, Desktop Publishing (DTP), HTML/web basics, and cyber hygiene.',
    duration: '12 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    badge: 'Flagship Diploma',
    popular: true,
    fee: 12000,
    highlights: ['Govt. Recognized Certification', '100% Practical Lab Training', 'Free Typing Master Training', 'Job Placement Support'],
    syllabus: [
      'Semester 1: Fundamentals of Computers, Windows & Linux OS',
      'Advanced MS Office Suite (Word, Excel with VLOOKUP/Pivot, PowerPoint, Access)',
      'Computerized Accounting with Tally Prime & GST Billing',
      'Semester 2: Desktop Publishing (Photoshop, PageMaker, CorelDraw)',
      'Internet Applications, Emailing, Digital Security & Cloud Basics',
      'Live Capstone Project & Viva Examination'
    ],
    eligibility: '10th / 12th Pass in any stream',
    certification: 'The Future Track Certified Advanced Diploma (ADCA) with Transcript'
  },
  // 2. 2D Animation
  {
    id: '2d-animation',
    title: '2D Animation & Motion Design',
    category: 'Creative',
    description: 'Master character animation, storyboard sketching, vector illustration, frame-by-frame movement, and digital storytelling using industry-standard animation suites.',
    duration: '6 Months',
    level: 'Intermediate',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    badge: 'Creative Career',
    popular: false,
    fee: 14000,
    highlights: ['Character Rigging & Walk Cycles', 'Adobe Animate & After Effects', 'Audio Sync & Storyboarding', 'Showreel Portfolio Development'],
    syllabus: [
      '12 Principles of Classical Animation',
      'Character Design & Anatomy Breakdown',
      'Adobe Animate Vector Tools & Timeline Workflow',
      'Motion Graphics, Keyframing & Interpolation',
      'Lip Sync, Voiceover Integration & Sound Design',
      'Final Animated Short Film Project'
    ],
    eligibility: '10th Pass with creative interest',
    certification: 'The Future Track Certified 2D Animation Specialist'
  },
  // 3. Tally Prime
  {
    id: 'tally-prime',
    title: 'Tally Prime with GST & e-Filing Master',
    category: 'Accounting',
    description: 'Industry-standard computerized financial accounting with real invoice processing, GST calculation, TDS, payroll management, and balance sheet preparation.',
    duration: '3 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    badge: 'High Employment',
    popular: true,
    fee: 5500,
    highlights: ['Real-World Business Accounting', 'Live GST Return Filing (GSTR-1, 3B)', 'Payroll & Employee Salary Slips', 'Audit & Financial Reporting'],
    syllabus: [
      'Accounting Principles & Ledger Creation',
      'Inventory Management & Stock Grouping',
      'Goods & Services Tax (CGST, SGST, IGST)',
      'TDS (Tax Deducted at Source) & TCS Modules',
      'Payroll Management, Attendance & Payslip Generation',
      'Trial Balance, Profit & Loss Account and Balance Sheet'
    ],
    eligibility: '10th / 12th Pass or B.Com/Commerce Students',
    certification: 'The Future Track Certified Tally Prime Professional'
  },
  // 4. Python + Java
  {
    id: 'python-java',
    title: 'Python + Java Full Programming Suite',
    category: 'AI & Technology',
    description: 'A dual-language software foundation covering core-to-advanced Python, Object-Oriented Java, data structures, algorithms, and database integration.',
    duration: '6 Months',
    level: 'Beginner to Advanced',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop',
    badge: 'Coding Specialist',
    popular: true,
    fee: 15000,
    highlights: ['Two In-Demand Languages', 'Object-Oriented Architecture (OOP)', 'SQL Database Connectivity', 'Real Desktop & CLI Applications'],
    syllabus: [
      'Module 1: Python Fundamentals, Data Structures & Modules',
      'Python File Handling, Exceptions & GUI with Tkinter',
      'Module 2: Java Syntax, Classes, Inheritance & Polymorphism',
      'Java Collections Framework & Multi-threading',
      'JDBC (Java Database Connectivity) with MySQL',
      'Comprehensive Capstone Software Project'
    ],
    eligibility: '12th Pass / BCA / B.Tech / Science stream students',
    certification: 'The Future Track Certified Software Developer (Python & Java)'
  },
  // 5. Job-Oriented Course
  {
    id: 'job-oriented-course',
    title: 'Job-Oriented Course (Office Specialist & IT Executive)',
    category: 'Career',
    description: 'Fast-track career transformation program designed specifically for immediate employment in government offices, private corporates, and local enterprises.',
    duration: '6 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    badge: '100% Placement Focus',
    popular: true,
    fee: 9500,
    highlights: ['Corporate IT Skills', 'Bilingual Typing Proficiency', 'Office Automation & Email Etiquette', 'Mock Interviews & Resume Building'],
    syllabus: [
      'Advanced MS Excel (Data Validation, Macros, Dashboards)',
      'Government e-Portal Operations & Online Services',
      'Hindi & English High-Speed Typing Master',
      'Commercial Billing, Invoicing & Data Entry Standards',
      'Business Communication & Corporate Soft Skills',
      'Interview Preparation & Live Office Simulations'
    ],
    eligibility: '10th / 12th / Graduate seeking immediate employment',
    certification: 'The Future Track Certified Corporate IT Executive'
  },
  // 6. Digital Marketing
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media Strategy',
    category: 'Digital Business',
    description: 'Master Search Engine Optimization (SEO), Google Ads, Meta (Facebook & Instagram) ads, content strategy, email marketing, and web analytics for business.',
    duration: '4 Months',
    level: 'Beginner to Intermediate',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    badge: 'High Demand',
    popular: true,
    fee: 8500,
    highlights: ['Live Ad Campaigns Execution', 'SEO Keyword Research & On-Page Tools', 'Meta Business Suite & Reel Strategies', 'Google Analytics 4 Certification'],
    syllabus: [
      'Fundamentals of Inbound & Outbound Digital Marketing',
      'Search Engine Optimization (On-Page, Off-Page, Local SEO)',
      'Google Search, Display & YouTube Ad Campaigns',
      'Meta Ads Manager, Audience Targeting & Retargeting',
      'Email Marketing, Funnels & Lead Generation',
      'Portfolio & Client Freelancing Blueprint'
    ],
    eligibility: '10th / 12th Pass or Business Owners',
    certification: 'The Future Track Certified Digital Marketing Professional'
  },
  // 7. AI Automation
  {
    id: 'ai-automation',
    title: 'AI Automation & Modern Productivity Tools',
    category: 'AI & Technology',
    description: 'Harness the power of modern Artificial Intelligence, large language models, workflow automations, AI content generation, and smart office integration.',
    duration: '3 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    badge: 'Future Tech 2026',
    popular: true,
    fee: 9000,
    highlights: ['Prompt Engineering Mastery', 'No-Code Workflow Automations', 'AI Image & Video Generation', 'Productivity Boost for Professionals'],
    syllabus: [
      'Foundations of Generative AI & Large Language Models',
      'Advanced Prompt Engineering for Research & Coding',
      'No-Code Automations (Zapier, Make, Notion AI)',
      'AI for Document Summarization, Excel & Reports',
      'AI Media Tools (Midjourney, Stable Diffusion, ElevenLabs)',
      'Building an Automated AI Business Workflow'
    ],
    eligibility: 'Anyone with basic computer knowledge',
    certification: 'The Future Track Certified AI Automation Practitioner'
  },
  // 8. DTP
  {
    id: 'dtp',
    title: 'DTP (Desktop Publishing & Print Design)',
    category: 'Creative',
    description: 'Learn professional publication design, book setting, brochure layouts, newspaper advertising, wedding card designing, and print prepress mechanics.',
    duration: '3 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    badge: 'Self-Employment',
    popular: false,
    fee: 4500,
    highlights: ['Adobe PageMaker & InDesign', 'CorelDraw Vector Layouts', 'Adobe Photoshop Print Prep', 'Commercial Print Knowledge'],
    syllabus: [
      'Fundamentals of Typography, Color Modes (CMYK vs RGB)',
      'Adobe PageMaker: Document Setup, Master Pages & Typesetting',
      'CorelDraw: Vector Art, Flex Banners & Pamphlets',
      'Adobe Photoshop: Photo Retouching & Compositing',
      'Regional Font Typing (Kruti Dev, Mangal) for Indian Printing',
      'Prepress Output, Color Separation & Plate Making'
    ],
    eligibility: '10th Pass or aspiring print shop entrepreneurs',
    certification: 'The Future Track Certified DTP Specialist'
  },
  // 9. Video Editing
  {
    id: 'video-editing',
    title: 'Video Editing & Motion Graphics',
    category: 'Creative',
    description: 'Create cinematic videos, YouTube content, commercial advertisements, and social media reels using Adobe Premiere Pro and After Effects.',
    duration: '4 Months',
    level: 'Intermediate',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    badge: 'Creator Economy',
    popular: true,
    fee: 11000,
    highlights: ['Adobe Premiere Pro & After Effects', 'Color Grading & Audio Mastering', 'Green Screen & VFX Compositing', 'YouTube & Instagram Reel Crafting'],
    syllabus: [
      'Video Theory, Codecs, Frame Rates & Resolutions',
      'Timeline Editing, Cuts, Transitions & Pacing in Premiere Pro',
      'Sound Design, Noise Reduction & Voice Enhancement',
      'Motion Graphics, Title Sequences & Lower Thirds in After Effects',
      'Chroma Key (Green Screen) & Visual Effects',
      'Professional Showreel Portfolio Creation'
    ],
    eligibility: '10th Pass with basic computer familiarity',
    certification: 'The Future Track Certified Video Editor'
  },
  // 10. Graphic Design
  {
    id: 'graphic-design',
    title: 'Graphic Design & Visual Branding',
    category: 'Creative',
    description: 'Comprehensive design training in Adobe Photoshop, Illustrator, and CorelDraw for creating corporate logos, brand identities, marketing collateral, and UI assets.',
    duration: '4 Months',
    level: 'Beginner to Intermediate',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    badge: 'Popular Creative',
    popular: true,
    fee: 8000,
    highlights: ['Logo & Brand Identity Design', 'Vector Illustration Masterclass', 'Social Media Graphics & Banners', 'Behance Portfolio Setup'],
    syllabus: [
      'Visual Design Fundamentals: Balance, Contrast & Color Theory',
      'Adobe Photoshop: Photo Manipulation & Digital Matte Art',
      'Adobe Illustrator: Vector Logomarks, Icons & Badges',
      'CorelDraw: Marketing Flex, Posters & Signage',
      'Packaging Design & Print Ready File Formats',
      'Client Presentation & Freelance Workflow'
    ],
    eligibility: '10th Pass or creative students',
    certification: 'The Future Track Certified Graphic Designer'
  },
  // 11. Typing
  {
    id: 'typing',
    title: 'Typing Master (Hindi & English Certification)',
    category: 'Computer & Office',
    description: 'Attain high-speed touch typing speed (30+ WPM Hindi, 40+ WPM English) required for Central and State government clerk exams, SSC, civil courts, and private data entry jobs.',
    duration: '2 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
    badge: 'Govt Job Essential',
    popular: true,
    fee: 2500,
    highlights: ['Hindi (Kruti Dev / Remington Gail)', 'English Touch Typing Technique', 'Live Speed & Accuracy Tracking', 'Government Exam Mock Tests'],
    syllabus: [
      'Correct Finger Placement & Home Row Technique',
      'Numeric Keypad Mastery & Special Symbols',
      'English Speed Building: 20 -> 40+ Words Per Minute',
      'Hindi Typing: Kruti Dev 010 & Mangal Unicode Font',
      'Timed Passage Drills with Error Deduction Rules',
      'Final Typing Speed Examination & Certificate'
    ],
    eligibility: 'Open to all students and job aspirants',
    certification: 'The Future Track Certified Speed Typist (WPM & Accuracy Endorsed)'
  },
  // 12. DFA
  {
    id: 'dfa',
    title: 'DFA (Diploma in Financial Accounting)',
    category: 'Accounting',
    description: 'A 6-month specialized financial accounting diploma combining manual ledger bookkeeping, MS Excel accounting sheets, Tally Prime with GST, and banking procedures.',
    duration: '6 Months',
    level: 'Intermediate',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
    badge: 'Accounting Diploma',
    popular: false,
    fee: 7500,
    highlights: ['Dual Bookkeeping & Software Skills', 'Advanced Excel Financial Functions', 'Tally Prime with Multi-Currency & GST', 'Banking Operations & e-Payments'],
    syllabus: [
      'Manual Bookkeeping, Cash Books & Journal Entries',
      'MS Excel for Financial Analysis & Formulae',
      'Tally Prime: Company Creation, Ledgers & Inventory',
      'GST Accounting, Tax Invoicing & E-Way Bill',
      'Banking Transactions, Bank Reconciliation Statement (BRS)',
      'Final Accounts Preparation: Trading, P&L & Balance Sheet'
    ],
    eligibility: '10th / 12th Pass (Commerce preferred but open to all)',
    certification: 'The Future Track Certified Diploma in Financial Accounting (DFA)'
  },
  // 13. Account Course
  {
    id: 'account-course',
    title: 'Account Course (Computerized Accounting)',
    category: 'Accounting',
    description: 'Focused 3-month course for business owners, accountants, and commerce graduates to master computerized accounting software, commercial transactions, and taxation.',
    duration: '3 Months',
    level: 'All Levels',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    badge: 'Business Essential',
    popular: false,
    fee: 4500,
    highlights: ['Voucher Entry & Bill of Supply', 'Stock Items & Unit Calculations', 'GST Tax Invoicing Rules', 'MIS Reports Generation'],
    syllabus: [
      'Accounting Basics & Debit-Credit Rules',
      'Voucher Types: Payment, Receipt, Contra, Journal, Sales, Purchase',
      'Inventory Setup: Units of Measure, Godowns & Stock Groups',
      'GST Tax Computation and Invoicing',
      'Outstanding Management & Ageing Analysis',
      'Practical Case Study on Local Retail Business'
    ],
    eligibility: '10th / 12th Pass',
    certification: 'The Future Track Certified Computerized Accountant'
  },
  // 14. E-Commerce
  {
    id: 'e-commerce',
    title: 'E-Commerce Store & Marketplace Management',
    category: 'Digital Business',
    description: 'Learn how to launch, operate, and scale profitable e-commerce stores on Amazon, Flipkart, Meesho, Shopify, and manage inventory, product listings, and digital payments.',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=800&auto=format&fit=crop',
    badge: 'Entrepreneurship',
    popular: false,
    fee: 7000,
    highlights: ['Amazon, Flipkart & Meesho Seller Central', 'Shopify Store Building', 'Product Cataloging & SEO Titles', 'Shipping, Logistics & Return Handling'],
    syllabus: [
      'E-Commerce Ecosystem & Business Models in India',
      'Seller Account Setup on Amazon, Flipkart & Meesho',
      'High-Converting Product Photography & A+ Content',
      'Inventory Planning, SKU Codes & Barcoding',
      'Shopify Store Creation & Payment Gateway Integration',
      'E-Commerce Digital Ads & Customer Support'
    ],
    eligibility: '10th Pass or aspiring online sellers',
    certification: 'The Future Track Certified E-Commerce Specialist'
  },
  // 15. Website Development
  {
    id: 'website-development',
    title: 'Website Development (Full-Stack Coding)',
    category: 'AI & Technology',
    description: 'Become a full-stack web developer. Learn modern HTML5, CSS3, JavaScript (ES6+), React, Node.js, Express, databases, and deploying live production web apps.',
    duration: '6 Months',
    level: 'Intermediate to Advanced',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    badge: 'In-Demand Tech',
    popular: true,
    fee: 16000,
    highlights: ['Modern JavaScript & React', 'RESTful API Building with Node.js', 'Responsive Tailwind CSS Styling', 'GitHub & Cloud Deployment'],
    syllabus: [
      'HTML5 Semantic Markup & CSS3 Responsive Grid/Flexbox',
      'JavaScript ES6+, DOM Manipulation & Asynchronous Fetch',
      'Frontend Development with React & Component Architecture',
      'Backend Programming with Node.js & Express Router',
      'Database Design with SQL / MongoDB',
      'Full-Stack Live Capstone Project on Cloud Server'
    ],
    eligibility: '12th Pass / Graduate with logical interest',
    certification: 'The Future Track Certified Full-Stack Web Developer'
  },
  // 16. Website Creation
  {
    id: 'website-creation',
    title: 'Website Creation (No-Code & CMS Design)',
    category: 'AI & Technology',
    description: 'Create professional business websites, blogs, school portals, and portfolios quickly using WordPress, Elementor, Canva web, and modern no-code builders without writing complex code.',
    duration: '3 Months',
    level: 'Beginner',
    mode: 'Practical Lab',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    badge: 'Quick Launch',
    popular: false,
    fee: 6500,
    highlights: ['WordPress & Elementor Page Builder', 'Domain & Web Hosting Setup', 'Responsive Mobile Design', 'Form & WhatsApp Integration'],
    syllabus: [
      'Domain Name Registration, DNS & Web Hosting Setup',
      'WordPress Installation & Admin Dashboard Walkthrough',
      'Theme Selection & Customization with Elementor Builder',
      'Creating Core Pages: Home, About, Services, Contact & Blog',
      'Plugins: Security, SEO, WhatsApp Chat & Contact Forms',
      'Publishing a Live Business Website'
    ],
    eligibility: 'Anyone with basic computer knowledge',
    certification: 'The Future Track Certified Web Creation Specialist'
  }
];
