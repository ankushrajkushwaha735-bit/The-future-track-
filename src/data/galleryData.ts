export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classes' | 'Students' | 'Teachers' | 'Events' | 'Workshops' | 'Achievements' | 'Certificates' | 'Campus' | 'Activities';
  image: string;
  caption: string;
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'High-Tech Computer Laboratory',
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
    caption: 'Air-conditioned modern computer lab with dedicated individual high-speed workstations for every student.',
    date: 'Academic Year 2026',
  },
  {
    id: 'g-2',
    title: 'Practical Coding & Web Session',
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    caption: 'Full-stack development batch working on live projects under senior faculty supervision.',
    date: 'February 2026',
  },
  {
    id: 'g-3',
    title: 'Annual Certificate Award Ceremony',
    category: 'Certificates',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    caption: 'Proud graduates receiving their official certified ADCA and Tally Prime diplomas.',
    date: 'Batch 2025 Convocation',
  },
  {
    id: 'g-4',
    title: 'Generative AI & Tech Innovation Workshop',
    category: 'Workshops',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    caption: 'Hands-on weekend workshop on Prompt Engineering, Python AI tools, and automation workflows.',
    date: 'January 2026',
  },
  {
    id: 'g-5',
    title: 'Interactive Theory Lecture Hall',
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    caption: 'Digital interactive smart classroom for conceptual foundation and audio-visual presentations.',
    date: 'Classroom Wing B',
  },
  {
    id: 'g-6',
    title: 'Student Team Collaboration',
    category: 'Students',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    caption: 'Students discussing digital marketing campaign analytics and creative UI design wireframes.',
    date: 'Student Lounge',
  },
  {
    id: 'g-7',
    title: 'Faculty Technical Mentorship',
    category: 'Teachers',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    caption: 'Director and instructors conducting individual doubt clearing and voucher audit checks.',
    date: 'Faculty Room',
  },
  {
    id: 'g-8',
    title: 'Annual Tech Quiz & Speed Typing Contest',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    caption: 'Inter-batch computer competitions celebrating speed typing and spreadsheet mastery.',
    date: 'National Technology Day',
  },
  {
    id: 'g-9',
    title: 'Student Placement & Felicitations',
    category: 'Achievements',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
    caption: 'Honoring top scorers in Tally Prime, ADCA, and Java certification examinations.',
    date: 'Dhanbad Campus Event',
  },
  {
    id: 'g-10',
    title: 'Typing Speed Drills & Lab Practice',
    category: 'Activities',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
    caption: 'Daily timed English and Hindi Remington Gail typing practice sessions.',
    date: 'Lab Speed Row',
  }
];
