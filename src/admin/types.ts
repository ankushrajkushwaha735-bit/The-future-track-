export type AdminRole = 
  | 'Super Admin' 
  | 'Admin' 
  | 'Accountant' 
  | 'Teacher' 
  | 'Admission Manager' 
  | 'Content Manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  avatar: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  assignedCourses?: string[];
  assignedBatches?: string[];
}

export type AdmissionStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Counselling' 
  | 'Applied' 
  | 'Approved' 
  | 'Rejected' 
  | 'Enrolled' 
  | 'Completed';

export interface AdmissionApplication {
  id: string;
  studentName: string;
  guardianName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  course: string;
  batchTime: string;
  previousQualification: string;
  schoolCollege: string;
  admissionDate: string;
  source: 'Website' | 'WhatsApp' | 'Phone' | 'Walk-in' | 'Social Media' | 'Referral';
  photo?: string;
  documents?: { name: string; type: string; url: string }[];
  notes?: string;
  status: AdmissionStatus;
  counsellor?: string;
}

export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Interested' 
  | 'Follow-up' 
  | 'Converted' 
  | 'Not Interested' 
  | 'Closed';

export interface EnquiryLead {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  interestedCourse: string;
  source: 'Website Form' | 'Course Popup' | 'WhatsApp CTA' | 'Phone Call' | 'Walk-in';
  message: string;
  assignedStaff: string;
  followUpDate: string;
  status: EnquiryStatus;
  notes: string;
  createdAt: string;
}

export interface StudentRecord {
  id: string; // e.g. TFT-2025-0842
  name: string;
  guardianName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  course: string;
  batchId: string;
  batchTime: string;
  admissionDate: string;
  photo: string;
  status: 'Active' | 'Suspended' | 'Completed' | 'Dropped';
  attendancePercentage: number;
  overallScore: number;
  feeStatus: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  totalFee: number;
  paidFee: number;
  remainingFee: number;
  nextDueDate: string;
  documents: { id: string; name: string; type: string; uploadDate: string; verified: boolean }[];
  notes?: string;
}

export interface TeacherRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string;
  bio: string;
  photo: string;
  assignedCourses: string[];
  assignedBatches: string[];
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface AdminCourse {
  id: string;
  name: string;
  slug: string;
  category: 'Computer & Office' | 'Accounting' | 'AI & Technology' | 'Creative' | 'Digital Business' | 'Career';
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  eligibility: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  mode: 'Classroom' | 'Practical Lab' | 'Hybrid (Lab + Online)';
  syllabus: string[];
  learningOutcomes: string[];
  certification: string;
  assignedFaculty: string;
  status: 'Published' | 'Draft' | 'Archived';
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface AdminBatch {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  classDays: string[];
  startTime: string;
  endTime: string;
  roomLab: string;
  maxStudents: number;
  enrolledStudentsCount: number;
  status: 'Upcoming' | 'Active' | 'Completed' | 'Cancelled';
}

export interface AttendanceEntry {
  studentId: string;
  studentName: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  remarks?: string;
}

export interface BatchAttendanceRecord {
  id: string;
  batchId: string;
  batchName: string;
  courseName: string;
  date: string;
  markedBy: string;
  records: AttendanceEntry[];
}

export interface PaymentReceipt {
  receiptNo: string;
  studentId: string;
  studentName: string;
  courseName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Card' | 'Other';
  transactionId?: string;
  receivedBy: string;
  notes?: string;
  balanceRemaining: number;
}

export interface ExamRecord {
  id: string;
  name: string;
  courseName: string;
  batchName: string;
  date: string;
  subject: string;
  maxMarks: number;
  passMarks: number;
  status: 'Scheduled' | 'Completed' | 'Results Published';
}

export interface StudentResultEntry {
  id: string;
  examId: string;
  examName: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  courseName: string;
  batchName: string;
  subject: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'Fail';
  status: 'Pass' | 'Fail';
  remarks?: string;
  published: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  courseName: string;
  batchName: string;
  subject: string;
  uploadedBy: string;
  fileType: 'PDF' | 'DOC' | 'PPT' | 'ZIP' | 'Video';
  fileSize: string;
  fileUrl: string;
  publishDate: string;
  status: 'Published' | 'Draft';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseName: string;
  batchName: string;
  teacherName: string;
  dueDate: string;
  totalMarks: number;
  status: 'Active' | 'Closed';
  submissionsCount: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  fileUrl: string;
  marksObtained?: number;
  feedback?: string;
  status: 'Submitted' | 'Graded' | 'Returned';
}

export interface CertificateRecord {
  certificateNo: string; // e.g. TFT-CERT-2025-9921
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  completionDate: string;
  grade: string;
  percentage: number;
  authorizedPerson: string;
  verificationCode: string;
  status: 'Issued' | 'Pending Verification' | 'Revoked';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'General' | 'Admission' | 'Fee' | 'Exam' | 'Result' | 'Batch' | 'Announcement';
  targetAudience: 'All Students' | 'Specific Course' | 'Specific Batch' | 'Teachers' | 'All Staff';
  targetName?: string;
  createdAt: string;
  sentBy: string;
  channel: 'In-App' | 'SMS Ready' | 'WhatsApp Ready' | 'Email Ready';
}

export interface AuditLogItem {
  id: string;
  user: string;
  userRole: AdminRole;
  action: 'Login' | 'Logout' | 'Create' | 'Update' | 'Delete' | 'Publish' | 'Unpublish' | 'Payment Recorded' | 'Certificate Issued' | 'Settings Changed';
  module: string;
  details: string;
  timestamp: string;
  ip: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
