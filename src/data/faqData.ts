export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Which courses are available at The Future Track?',
    answer: 'The Future Track offers a broad spectrum of career-oriented computer education courses including ADCA (12 Months), DCA (6 Months), Tally Prime with GST & e-Filing, Full Stack Web Development (MERN/Python), AI & Prompt Engineering, Graphic Design & UI/UX, Python for Data Science, CCC, Hardware & Networking, and Office Typing Master in Hindi & English.',
    category: 'Courses',
  },
  {
    id: 'faq-2',
    question: 'Who can join The Future Track Computer Education?',
    answer: 'Our courses are open to school students (10th/12th pass), college students (BA, B.Com, B.Sc, BCA, B.Tech), job seekers, working professionals wishing to upskill, and business owners wanting to master accounting or digital technologies. No prior coding background is needed for beginner-level programs.',
    category: 'Eligibility',
  },
  {
    id: 'faq-3',
    question: 'What is the course duration for different programs?',
    answer: 'Durations range from 2 months (CCC & Office Essentials), 3 months (Tally Prime & GST, AI Masterclass, Digital Marketing), 4-6 months (DCA, Graphic Design, Web Development), up to 12 months for comprehensive diplomas like ADCA (Advanced Diploma in Computer Applications). Flexible morning and evening schedules are available.',
    category: 'Batches',
  },
  {
    id: 'faq-4',
    question: 'How can I take admission at the institute?',
    answer: 'You can submit the online enquiry/admission form on this website, visit our campus directly for free counseling and a demo lab session, or reach us via WhatsApp or Phone call. Once you select your course, complete the basic registration form with your ID proof and 2 passport-size photographs to begin.',
    category: 'Admission',
  },
  {
    id: 'faq-5',
    question: 'What are the batch timings and flexible options?',
    answer: 'We operate from 8:00 AM to 7:00 PM (Monday to Saturday). Regular batches run for 1.5 to 2 hours daily (combining theory and dedicated 1-on-1 practical lab practice). We also run early-morning batches for college students, evening batches for working professionals, and weekend special batches.',
    category: 'Batches',
  },
  {
    id: 'faq-6',
    question: 'Is official certification provided upon course completion?',
    answer: 'Yes! Every student receives an official, ISO/Govt-aligned course completion diploma or certificate from The Future Track Computer Education, featuring an authentic verification number, student roll number, and QR code for online credential verification.',
    category: 'Certification',
  },
  {
    id: 'faq-7',
    question: 'Where is the institute located and how is the campus setup?',
    answer: 'The Future Track Computer Education is centrally located with convenient connectivity. Our campus features fully air-conditioned computer labs with high-speed fiber internet, power backup, interactive smart classrooms, digital library, and individual PC seating for hands-on learning.',
    category: 'Location',
  },
  {
    id: 'faq-8',
    question: 'How can I contact the institute for quick assistance?',
    answer: 'You can call our help desk directly at +91 98765 43210, send a message on WhatsApp for instant batch timing and fee details, or email info@thefuturetrack.edu.in. Our counselors are available 6 days a week from 8:00 AM to 7:00 PM.',
    category: 'Contact',
  },
];
