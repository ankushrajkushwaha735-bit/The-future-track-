export interface StudentProfile {
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  batchTime: string;
  enrollmentDate: string;
  avatar: string;
  attendancePercentage: number;
  overallScore: number;
  feeStatus: 'Paid' | 'Partial' | 'Pending';
  feePaid: number;
  totalFee: number;
}

export interface StudentCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  nextClass: string;
}

export interface ClassScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  instructor: string;
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  subject: string;
  fileType: 'PDF' | 'ZIP' | 'DOC';
  size: string;
  uploadDate: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Submitted' | 'Pending' | 'Graded';
  score?: string;
  feedback?: string;
}

export interface ResultItem {
  examName: string;
  date: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  status: 'Pass' | 'Fail';
}

export interface CertificateItem {
  certId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  completionDate: string;
  grade: string;
  percentage: number;
  verificationCode: string;
  status: 'Issued' | 'In Verification';
  authorizedSignatory: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'Urgent' | 'Academic' | 'Holiday' | 'Exam';
  content: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  qualification: string;
  assignedCourses: string[];
  assignedBatches: string[];
  avatar: string;
}

export interface TeacherBatchStudent {
  rollNo: string;
  name: string;
  course: string;
  batch: string;
  attendanceToday: 'Present' | 'Absent' | 'Late' | 'Leave';
  overallAttendance: number;
  phone: string;
}

export const DEMO_STUDENT: StudentProfile = {
  rollNo: 'TFT-2025-0842',
  name: 'Aman Kushwaha',
  email: 'aman.k@student.thefuturetrack.edu.in',
  phone: '+91 98765 12345',
  course: 'ADCA (Advanced Diploma in Computer Applications)',
  batchTime: 'Morning Batch (10:00 AM - 12:00 PM)',
  enrollmentDate: '15 July 2025',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
  attendancePercentage: 92,
  overallScore: 88,
  feeStatus: 'Paid',
  feePaid: 12000,
  totalFee: 12000,
};

export const DEMO_STUDENT_COURSES: StudentCourse[] = [
  {
    id: 'c-1',
    title: 'Advanced MS Excel & Financial Functions',
    instructor: 'Ms. Priyanka Kushwaha',
    progress: 85,
    completedModules: 17,
    totalModules: 20,
    nextClass: 'Monday, 10:00 AM (Lab 1)',
  },
  {
    id: 'c-2',
    title: 'Tally Prime with GST & e-Filing',
    instructor: 'Raushan Kumar (Director)',
    progress: 60,
    completedModules: 12,
    totalModules: 20,
    nextClass: 'Tuesday, 10:00 AM (Lab 2)',
  },
  {
    id: 'c-3',
    title: 'Desktop Publishing (Photoshop & CorelDraw)',
    instructor: 'Senior IT Faculty',
    progress: 40,
    completedModules: 8,
    totalModules: 20,
    nextClass: 'Wednesday, 10:00 AM (Lab 1)',
  },
];

export const DEMO_SCHEDULE: ClassScheduleItem[] = [
  { id: 'sch-1', day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'Advanced Excel VLOOKUP & Pivot Tables', room: 'Computer Lab 1 (Workstation 14)', instructor: 'Ms. Priyanka' },
  { id: 'sch-2', day: 'Monday', time: '11:00 AM - 12:00 PM', subject: 'Typing Master & English Typing Speed Test', room: 'Lab 1 Speed Station', instructor: 'Ms. Priyanka' },
  { id: 'sch-3', day: 'Tuesday', time: '10:00 AM - 11:30 AM', subject: 'Tally Prime: GST Invoicing & Ledger Setup', room: 'Computer Lab 2', instructor: 'Raushan Sir' },
  { id: 'sch-4', day: 'Wednesday', time: '10:00 AM - 11:30 AM', subject: 'Photoshop: Pen Tool & Layer Masking', room: 'Multimedia Lab', instructor: 'Creative Faculty' },
  { id: 'sch-5', day: 'Thursday', time: '10:00 AM - 11:30 AM', subject: 'Tally Prime: Balance Sheet Reconciliation', room: 'Computer Lab 2', instructor: 'Raushan Sir' },
  { id: 'sch-6', day: 'Friday', time: '10:00 AM - 12:00 PM', subject: 'Capstone Project Work & Practical Assessment', room: 'Computer Lab 1', instructor: 'Tech Faculty' },
];

export const DEMO_STUDY_MATERIALS: StudyMaterialItem[] = [
  { id: 'sm-1', title: 'ADCA Semester 1 Complete Study Handbook', subject: 'Computer Fundamentals', fileType: 'PDF', size: '14.2 MB', uploadDate: '10 Jan 2026' },
  { id: 'sm-2', title: 'Tally Prime Shortcut Keys & GST Cheatsheet', subject: 'Accounting', fileType: 'PDF', size: '3.8 MB', uploadDate: '18 Jan 2026' },
  { id: 'sm-3', title: 'Photoshop Design Assets & Practice RAW Files', subject: 'Graphic Design', fileType: 'ZIP', size: '85.4 MB', uploadDate: '02 Feb 2026' },
  { id: 'sm-4', title: 'MS Office 365 Advanced Formulas Reference Guide', subject: 'Office Suite', fileType: 'PDF', size: '6.1 MB', uploadDate: '12 Feb 2026' },
];

export const DEMO_ASSIGNMENTS: AssignmentItem[] = [
  { id: 'as-1', title: 'GST Billing Voucher Entry in Tally Prime', subject: 'Accounting', dueDate: '15 Oct 2026', status: 'Graded', score: '94/100', feedback: 'Excellent invoice ledger entries and tax breakup.' },
  { id: 'as-2', title: 'Corporate Brochure & Logo in Photoshop', subject: 'Design', dueDate: '22 Oct 2026', status: 'Submitted', score: 'Pending', feedback: 'Under review by faculty.' },
  { id: 'as-3', title: 'Excel Dynamic Dashboard with Slicers', subject: 'MS Excel', dueDate: '28 Oct 2026', status: 'Pending' },
];

export const DEMO_RESULTS: ResultItem[] = [
  { examName: 'Semester 1 Theory Assessment', date: 'Dec 2025', marksObtained: 92, totalMarks: 100, grade: 'A+', status: 'Pass' },
  { examName: 'Practical Lab Examination 1', date: 'Jan 2026', marksObtained: 88, totalMarks: 100, grade: 'A', status: 'Pass' },
  { examName: 'Tally Prime Midterm Practical', date: 'Feb 2026', marksObtained: 95, totalMarks: 100, grade: 'A+', status: 'Pass' },
];

export const DEMO_CERTIFICATES: CertificateItem[] = [
  { 
    certId: 'TFT-2025-0842', 
    studentName: 'Aman Kushwaha', 
    courseName: 'ADCA (Advanced Diploma in Computer Applications)', 
    issueDate: '15 July 2025', 
    completionDate: '30 June 2025',
    grade: 'A+ (Outstanding)',
    percentage: 92,
    verificationCode: 'VERIFY-TFT-0842-ADCA', 
    status: 'Issued',
    authorizedSignatory: 'Director, The Future Track'
  },
  { 
    certId: 'TFT-2024-0519', 
    studentName: 'Priya Kumari', 
    courseName: 'Tally Prime with GST & e-Filing Master', 
    issueDate: '10 Nov 2024', 
    completionDate: '30 Oct 2024',
    grade: 'A+ (Exemplary)',
    percentage: 94,
    verificationCode: 'VERIFY-TFT-0519-TALLY', 
    status: 'Issued',
    authorizedSignatory: 'Director, The Future Track'
  },
  { 
    certId: 'TFT-2025-1102', 
    studentName: 'Rahul Verma', 
    courseName: 'Graphic Design & Visual Branding', 
    issueDate: '05 Feb 2025', 
    completionDate: '28 Jan 2025',
    grade: 'A (Distinction)',
    percentage: 88,
    verificationCode: 'VERIFY-TFT-1102-DESIGN', 
    status: 'Issued',
    authorizedSignatory: 'Director, The Future Track'
  },
  { 
    certId: 'TFT-2025-3301', 
    studentName: 'Anjali Gupta', 
    courseName: 'Python + Java Full Programming Suite', 
    issueDate: '12 Aug 2025', 
    completionDate: '31 July 2025',
    grade: 'A+ (Outstanding)',
    percentage: 96,
    verificationCode: 'VERIFY-TFT-3301-PROG', 
    status: 'Issued',
    authorizedSignatory: 'Director, The Future Track'
  },
];

export const DEMO_NOTICES: NoticeItem[] = [
  { id: 'not-1', title: 'Admissions Open for Summer Batch 2026-27', date: '01 Oct 2026', category: 'Academic', content: 'Registrations are now open for new batches in Full Stack Web Development and AI Prompt Engineering. Contact front desk for batch slots.' },
  { id: 'not-2', title: 'Upcoming Practical Lab Test for ADCA & DCA', date: '05 Oct 2026', category: 'Exam', content: 'Lab practical test on Excel functions and Tally voucher entry will be conducted this Saturday. Attendance is compulsory.' },
  { id: 'not-3', title: 'Institute Holiday on Occasion of Festival', date: '12 Oct 2026', category: 'Holiday', content: 'The institute premises and labs will remain closed on Tuesday. Regular schedule resumes on Wednesday 8:00 AM.' },
];

export const DEMO_TEACHER: TeacherProfile = {
  id: 'TFT-TEACHER-01',
  name: 'Raushan Kumar',
  email: 'raushankmr75@gmail.com',
  phone: '+91 62032 69614',
  designation: 'Director & Lead Technical Instructor',
  qualification: 'MCA, Certified Tally & Software Architect',
  assignedCourses: [
    'ADCA (Advanced Diploma in Computer Applications)',
    'Tally Prime with GST & e-Filing Master',
    'Python + Java Full Programming Suite'
  ],
  assignedBatches: [
    'Morning Batch A (08:00 AM - 10:00 AM)',
    'Morning Batch B (10:00 AM - 12:00 PM)',
    'Evening Batch A (04:00 PM - 06:00 PM)'
  ],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
};

export const DEMO_BATCH_STUDENTS: TeacherBatchStudent[] = [
  { rollNo: 'TFT-2025-0842', name: 'Aman Kushwaha', course: 'ADCA', batch: 'Morning Batch B', attendanceToday: 'Present', overallAttendance: 92, phone: '+91 98765 12345' },
  { rollNo: 'TFT-2025-0843', name: 'Neha Kumari', course: 'ADCA', batch: 'Morning Batch B', attendanceToday: 'Present', overallAttendance: 96, phone: '+91 98765 23456' },
  { rollNo: 'TFT-2025-0844', name: 'Vikas Kumar', course: 'ADCA', batch: 'Morning Batch B', attendanceToday: 'Absent', overallAttendance: 84, phone: '+91 98765 34567' },
  { rollNo: 'TFT-2025-0845', name: 'Pooja Singh', course: 'ADCA', batch: 'Morning Batch B', attendanceToday: 'Present', overallAttendance: 90, phone: '+91 98765 45678' },
  { rollNo: 'TFT-2025-0846', name: 'Rohan Sharma', course: 'ADCA', batch: 'Morning Batch B', attendanceToday: 'Late', overallAttendance: 88, phone: '+91 98765 56789' },
  { rollNo: 'TFT-2025-0847', name: 'Swati Verma', course: 'ADCA', batch: 'Morning Batch B', attendanceToday: 'Present', overallAttendance: 95, phone: '+91 98765 67890' },
];
