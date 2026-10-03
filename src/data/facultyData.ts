export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experience: string;
  photo: string;
  bio: string;
  isVerified?: boolean;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-director',
    name: 'Er. Raushan Kumar',
    designation: 'Founder & Director',
    qualification: 'B.Tech / MCA (Computer Science)',
    specialization: 'Software Architecture, IT Programming & Career Mentorship',
    experience: '10+ Years of Educational Leadership',
    photo: 'IMG_2cbe743d-91e2-424d-9c98-87baf80f74ea.jpg',
    bio: 'Founder and Director of The Future Track Computer Education, dedicated to empowering students of Dhanbad and beyond with practical computer literacy, professional IT diplomas, and future-ready technology skills under the motto "विद्या परम् बलम्".',
    isVerified: true,
  },
  {
    id: 'fac-2',
    name: 'Prof. Anjali Sharma',
    designation: 'Senior Accounting & Tally Specialist',
    qualification: 'M.Com, Certified Tally Professional, CA Inter',
    specialization: 'Tally Prime, GST Taxation, E-Filing & Audit',
    experience: '8+ Years in Corporate Accounting',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    bio: 'Specialist in computerized financial accounting and business taxation, guiding students through practical balance sheets, GST invoices, and voucher reconciliation.',
    isVerified: true,
  },
  {
    id: 'fac-3',
    name: 'Mr. Amitav Sen',
    designation: 'Head of Multimedia & Creative Design',
    qualification: 'BFA (Applied Art), Adobe Certified Expert',
    specialization: 'Photoshop, Illustrator, CorelDraw, UI/UX & Figma',
    experience: '7+ Years in Creative Design & Advertising',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    bio: 'Passionate graphic design and digital media mentor guiding students through typography, photo retouching, print layout, and commercial portfolio building.',
    isVerified: true,
  },
  {
    id: 'fac-4',
    name: 'Ms. Priyanka Kushwaha',
    designation: 'Computer Applications & Office Automation Lead',
    qualification: 'BCA, ADCA Certified, NIELIT ‘A’ Level',
    specialization: 'ADCA, DCA, Advanced Excel, English & Hindi Typing',
    experience: '6+ Years in Practical Lab Instruction',
    photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop',
    bio: 'Dedicated practical computer instructor focusing on one-on-one lab guidance, speed typing accuracy, and corporate MS Office mastery.',
    isVerified: true,
  },
];
