export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Career Guide' | 'Government Jobs' | 'Technology & AI' | 'Accounting & GST';
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'why-adca-is-essential-for-govt-and-private-jobs',
    title: 'Why ADCA Diploma is Essential for Government & Corporate Jobs in India',
    excerpt: 'Explore how an Advanced Diploma in Computer Applications (ADCA) fulfills mandatory computer qualification criteria for state and central government recruitment.',
    category: 'Government Jobs',
    author: 'Raushan Kumar (Director, TFT)',
    date: 'February 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    tags: ['ADCA', 'Govt Jobs', 'Computer Diploma', 'Dhanbad'],
    content: [
      'In today’s competitive job market across Jharkhand, Bihar, and all over India, basic computer literacy is no longer just an optional bonus—it is a non-negotiable statutory requirement for almost every competitive recruitment examination.',
      'From SSC (Staff Selection Commission), State Civil Courts, Panchayat Sachiv, Revenue Clerks, to Railways and Banking assistance posts, candidate notification criteria explicitly mandate a certified 1-year computer diploma from a recognized institute.',
      'An Advanced Diploma in Computer Applications (ADCA) at The Future Track is specifically structured to cover both general office productivity (MS Word, Excel, PowerPoint, Access) and computerized business accounting (Tally Prime with GST) along with Desktop Publishing (Photoshop, CorelDraw).',
      'This multi-disciplinary curriculum ensures our alumni possess verifiable typing proficiency, data manipulation capability, and institutional certification that stands valid during government document verification (DV).'
    ]
  },
  {
    id: 'blog-2',
    slug: 'mastering-tally-prime-with-gst-in-2026',
    title: 'How Mastering Tally Prime with GST Opens Instant Accounting Careers',
    excerpt: 'Local businesses, MSMEs, chartered accountant firms, and retail outlets constantly search for trained accountants proficient in e-Invoicing and GSTR returns.',
    category: 'Accounting & GST',
    author: 'Priyanka Kushwaha (Senior Faculty)',
    date: 'January 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    tags: ['Tally Prime', 'GST', 'Accounting', 'Careers'],
    content: [
      'Every registered enterprise in India must maintain regular digital ledgers and submit monthly or quarterly Goods and Services Tax (GST) returns.',
      'Tally Prime has emerged as the unchallenged backbone of accounting for over 2 million businesses across India. However, employers do not just need someone who knows basic data entry; they demand professionals who understand input tax credit (ITC) reconciliation, E-Way bills, and TDS calculations.',
      'At The Future Track, accounting students receive hands-on training with genuine commercial invoices, voucher series, bank reconciliation statements (BRS), and live GST portal practice.',
      'Students completing our 3-month Tally Prime or 6-month DFA program routinely secure accounting positions across Dhanbad and nearby commercial hubs.'
    ]
  },
  {
    id: 'blog-3',
    slug: 'practical-ai-tools-every-student-should-learn',
    title: 'Practical AI & Automation Tools Every Modern Student Must Learn in 2026',
    excerpt: 'Artificial intelligence is not just for software engineers. Discover how students and office executives use AI tools to automate repetitive tasks and boost output.',
    category: 'Technology & AI',
    author: 'Tech Faculty Team',
    date: 'January 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    tags: ['Artificial Intelligence', 'Automation', 'Future Skills', 'Python'],
    content: [
      'The modern workforce in 2026 operates at an unprecedented speed. While traditional computer literacy taught typing and spreadsheet formulas, today’s top professionals combine spreadsheets with AI automation.',
      'Learning how to structure clear prompts for data synthesis, writing automated document workflows, and generating visual assets via generative AI has become a cornerstone of digital efficiency.',
      'Our newly introduced AI Automation & Modern Productivity course trains students to build real automations, integrate smart assistants into office operations, and understand ethical AI usage.',
      'Whether you are preparing for a corporate career or freelancing remotely, having verifiable AI workflow skills on your resume immediately separates you from conventional applicants.'
    ]
  }
];
