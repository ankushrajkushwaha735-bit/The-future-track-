export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  batchYear: string;
  rating: number;
  review: string;
  photo: string;
  achievement: string;
  isVerified: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    studentName: 'Rahul Kumar',
    course: 'ADCA (Advanced Diploma in Computer Applications)',
    batchYear: 'Batch 2024-25',
    rating: 5,
    review: 'The Future Track provided the best practical computer lab experience. The teachers explained Excel formulas and Tally GST entries from basics to advanced. I secured an accountant role right after completing my 1-year diploma!',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    achievement: 'Accountant at Pragati Infotech',
    isVerified: true,
  },
  {
    id: 'test-2',
    studentName: 'Sneha Kumari',
    course: 'Tally Prime & GST Master',
    batchYear: 'Batch 2025',
    rating: 5,
    review: 'Learning Tally Prime with live GST portal filing gave me immense confidence. The individual PC allocation in lab and faculty support is remarkable. Highly recommend The Future Track to every commerce student!',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    achievement: 'Tax Associate at CA Firm',
    isVerified: true,
  },
  {
    id: 'test-3',
    studentName: 'Vikas Sharma',
    course: 'Full Stack Web Development',
    batchYear: 'Batch 2025',
    rating: 5,
    review: 'The project-based learning model here is exceptional. We built real React and Node.js applications with database connectivity. The faculty helped resolve every coding bug patiently during practical hours.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    achievement: 'Frontend Developer Trainee',
    isVerified: true,
  },
  {
    id: 'test-4',
    studentName: 'Neha Patel',
    course: 'Graphic Design & UI/UX',
    batchYear: 'Batch 2024-25',
    rating: 5,
    review: 'I created a full commercial portfolio in Photoshop and Illustrator. The Future Track’s creative atmosphere, modern lab setups, and certified recognition gave a huge boost to my freelance career.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    achievement: 'Freelance Brand Designer',
    isVerified: true,
  },
];
