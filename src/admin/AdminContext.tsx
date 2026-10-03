import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdminUser, 
  AdminRole, 
  StudentRecord, 
  EnquiryLead, 
  TeacherRecord, 
  AdminCourse, 
  AdminBatch, 
  BatchAttendanceRecord, 
  PaymentReceipt, 
  CertificateRecord, 
  StudyMaterial, 
  AuditLogItem, 
  ToastMessage 
} from './types';
import { 
  DEFAULT_ADMIN_USERS, 
  ROLE_PERMISSIONS, 
  INITIAL_16_COURSES, 
  INITIAL_STUDENTS, 
  INITIAL_BATCHES, 
  INITIAL_ENQUIRIES, 
  INITIAL_PAYMENTS, 
  INITIAL_CERTIFICATES, 
  INITIAL_STUDY_MATERIALS, 
  INITIAL_AUDIT_LOGS 
} from './adminStore';
import { FACULTY_MEMBERS } from '../data/facultyData';

interface AdminContextType {
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  activeRole: AdminRole;
  login: (userOrRole: AdminRole | AdminUser) => void;
  logout: () => void;
  switchRole: (newRole: AdminRole) => void;
  hasPermission: (module: string) => boolean;

  // Students
  students: StudentRecord[];
  addStudent: (studentData: Partial<StudentRecord>) => StudentRecord;
  updateStudent: (id: string, updates: Partial<StudentRecord>) => void;
  deleteStudent: (id: string) => void;

  // Enquiries & Admissions
  enquiries: EnquiryLead[];
  addEnquiry: (leadData: Partial<EnquiryLead>) => EnquiryLead;
  updateEnquiry: (id: string, updates: Partial<EnquiryLead>) => void;
  convertEnquiryToStudent: (enquiryId: string) => StudentRecord | null;

  // Teachers
  teachers: any[];
  addTeacher: (teacherData: any) => void;
  updateTeacher: (id: string, updates: any) => void;

  // Courses (all 16)
  courses: AdminCourse[];
  addCourse: (courseData: Partial<AdminCourse>) => void;
  updateCourse: (id: string, updates: Partial<AdminCourse>) => void;
  toggleCoursePublish: (id: string) => void;
  toggleCourseFeatured: (id: string) => void;
  deleteCourse: (id: string) => void;

  // Batches
  batches: AdminBatch[];
  addBatch: (batchData: Partial<AdminBatch>) => void;

  // Attendance
  attendanceRecords: BatchAttendanceRecord[];
  recordBatchAttendance: (batchId: string, records: any[], date: string) => void;

  // Fees & Payments
  payments: PaymentReceipt[];
  recordPayment: (paymentData: Partial<PaymentReceipt>) => PaymentReceipt;

  // Certificates
  certificates: CertificateRecord[];
  generateCertificate: (certData: Partial<CertificateRecord>) => CertificateRecord;
  verifyCertificate: (codeOrNo: string) => CertificateRecord | null;

  // Study Materials
  materials: StudyMaterial[];
  addMaterial: (materialData: Partial<StudyMaterial>) => void;

  // CMS Settings
  cmsSettings: any;
  updateCmsSettings: (updates: any) => void;

  // Audit Logs
  auditLogs: AuditLogItem[];
  addAuditLog: (action: any, module: string, details: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session & User
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('tft_current_admin');
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_USERS[0];
    } catch {
      return DEFAULT_ADMIN_USERS[0];
    }
  });

  const [activeRole, setActiveRole] = useState<AdminRole>(() => {
    return currentUser ? currentUser.role : 'Super Admin';
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString().slice(-4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit Logging
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('tft_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const addAuditLog = (action: any, module: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: currentUser ? currentUser.name : 'System User',
      userRole: activeRole,
      action,
      module,
      details,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      ip: '192.168.1.' + Math.floor(Math.random() * 80 + 100),
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    try {
      localStorage.setItem('tft_audit_logs', JSON.stringify(updated.slice(0, 100)));
    } catch {}
  };

  // Auth methods
  const login = (userOrRole: AdminRole | AdminUser) => {
    let targetUser: AdminUser;
    if (typeof userOrRole === 'string') {
      const found = DEFAULT_ADMIN_USERS.find((u) => u.role === userOrRole);
      targetUser = found || DEFAULT_ADMIN_USERS[0];
    } else {
      targetUser = userOrRole;
    }
    setCurrentUser(targetUser);
    setActiveRole(targetUser.role);
    try {
      localStorage.setItem('tft_current_admin', JSON.stringify(targetUser));
    } catch {}
    addAuditLog('Login', 'Authentication', `Logged in successfully as ${targetUser.role}`);
    showToast('success', 'Authentication Successful', `Welcome back, ${targetUser.name} (${targetUser.role})`);
  };

  const logout = () => {
    addAuditLog('Logout', 'Authentication', `Logged out from role ${activeRole}`);
    setCurrentUser(null);
    try {
      localStorage.removeItem('tft_current_admin');
    } catch {}
    showToast('info', 'Logged Out', 'You have been safely signed out.');
  };

  const switchRole = (newRole: AdminRole) => {
    const found = DEFAULT_ADMIN_USERS.find((u) => u.role === newRole) || {
      id: `USR-${newRole.toUpperCase().replace(/\s+/g, '')}`,
      name: `${newRole} Official`,
      email: `${newRole.toLowerCase().replace(/\s+/g, '')}@thefuturetrack.in`,
      phone: '+91 93088 77375',
      role: newRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      status: 'Active',
      lastLogin: 'Just now',
    };
    setCurrentUser(found);
    setActiveRole(newRole);
    try {
      localStorage.setItem('tft_current_admin', JSON.stringify(found));
    } catch {}
    addAuditLog('Update', 'Role Switcher', `Switched active viewpoint to ${newRole}`);
    showToast('info', 'View Role Changed', `Now inspecting Admin Panel as ${newRole}`);
  };

  const hasPermission = (module: string): boolean => {
    const permitted = ROLE_PERMISSIONS[activeRole] || [];
    return permitted.includes(module);
  };

  // Students Store
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('tft_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const addStudent = (studentData: Partial<StudentRecord>): StudentRecord => {
    const rollYear = new Date().getFullYear();
    const count = students.length + 1;
    const newStudent: StudentRecord = {
      id: studentData.id || `TFT-${rollYear}-${String(count).padStart(4, '0')}`,
      name: studentData.name || 'New Student',
      guardianName: studentData.guardianName || 'Guardian Name',
      email: studentData.email || 'student@thefuturetrack.edu.in',
      phone: studentData.phone || '+91 93088 00000',
      whatsapp: studentData.whatsapp || studentData.phone || '+91 93088 00000',
      address: studentData.address || 'Bartand, Dhanbad, Jharkhand',
      dob: studentData.dob || '01-01-2004',
      gender: studentData.gender || 'Male',
      course: studentData.course || 'ADCA (Advanced Diploma in Computer Applications)',
      batchId: studentData.batchId || 'B-ADCA-01',
      batchTime: studentData.batchTime || 'Morning (10:00 AM - 12:00 PM)',
      admissionDate: studentData.admissionDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      photo: studentData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      status: studentData.status || 'Active',
      attendancePercentage: studentData.attendancePercentage || 100,
      overallScore: studentData.overallScore || 85,
      feeStatus: studentData.feeStatus || 'Paid',
      totalFee: studentData.totalFee || 12000,
      paidFee: studentData.paidFee || 12000,
      remainingFee: (studentData.totalFee || 12000) - (studentData.paidFee || 12000),
      nextDueDate: studentData.nextDueDate || 'None (Completed)',
      documents: studentData.documents || [
        { id: 'doc-1', name: 'Aadhaar Verification', type: 'PDF', uploadDate: 'Today', verified: true }
      ],
      notes: studentData.notes || '',
    };
    const updated = [newStudent, ...students];
    setStudents(updated);
    try {
      localStorage.setItem('tft_students', JSON.stringify(updated));
    } catch {}
    addAuditLog('Create', 'Students', `Enrolled new student ${newStudent.name} (${newStudent.id})`);
    showToast('success', 'Student Enrolled', `${newStudent.name} has been enrolled in ${newStudent.course}.`);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<StudentRecord>) => {
    const updated = students.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setStudents(updated);
    try {
      localStorage.setItem('tft_students', JSON.stringify(updated));
    } catch {}
    addAuditLog('Update', 'Students', `Updated student record for ${id}`);
    showToast('success', 'Record Updated', `Student ${id} details updated.`);
  };

  const deleteStudent = (id: string) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    try {
      localStorage.setItem('tft_students', JSON.stringify(updated));
    } catch {}
    addAuditLog('Delete', 'Students', `Archived/deleted student ${id}`);
    showToast('warning', 'Student Removed', `Student ${id} has been archived.`);
  };

  // Enquiries & Admissions Store
  const [enquiries, setEnquiries] = useState<EnquiryLead[]>(() => {
    try {
      const saved = localStorage.getItem('tft_enquiries');
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  const addEnquiry = (leadData: Partial<EnquiryLead>): EnquiryLead => {
    const newLead: EnquiryLead = {
      id: `ENQ-${Date.now().toString().slice(-4)}`,
      name: leadData.name || 'Anonymous Lead',
      phone: leadData.phone || '+91 93088 00000',
      whatsapp: leadData.whatsapp || leadData.phone || '+91 93088 00000',
      email: leadData.email || 'N/A',
      interestedCourse: leadData.interestedCourse || 'ADCA (Advanced Diploma)',
      source: leadData.source || 'Website Form',
      message: leadData.message || 'No additional note',
      assignedStaff: leadData.assignedStaff || 'Suman Roy',
      followUpDate: leadData.followUpDate || 'Tomorrow',
      status: leadData.status || 'New',
      notes: leadData.notes || '',
      createdAt: 'Just now',
    };
    const updated = [newLead, ...enquiries];
    setEnquiries(updated);
    try {
      localStorage.setItem('tft_enquiries', JSON.stringify(updated));
    } catch {}
    addAuditLog('Create', 'Admissions', `New enquiry received from ${newLead.name}`);
    showToast('info', 'New Enquiry Received', `${newLead.name} enquired for ${newLead.interestedCourse}`);
    return newLead;
  };

  const updateEnquiry = (id: string, updates: Partial<EnquiryLead>) => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, ...updates } : e));
    setEnquiries(updated);
    try {
      localStorage.setItem('tft_enquiries', JSON.stringify(updated));
    } catch {}
    addAuditLog('Update', 'Admissions', `Updated enquiry ${id} status to ${updates.status || 'updated'}`);
    showToast('success', 'Enquiry Updated', `Enquiry ${id} was updated.`);
  };

  const convertEnquiryToStudent = (enquiryId: string): StudentRecord | null => {
    const enq = enquiries.find((e) => e.id === enquiryId);
    if (!enq) return null;

    const newStudent = addStudent({
      name: enq.name,
      phone: enq.phone,
      whatsapp: enq.whatsapp,
      email: enq.email !== 'N/A' ? enq.email : `${enq.name.toLowerCase().replace(/\s+/g, '')}@student.thefuturetrack.edu.in`,
      course: enq.interestedCourse,
      address: 'Dhanbad, Jharkhand',
      notes: `Converted from enquiry ${enquiryId}. Lead note: ${enq.notes || enq.message}`,
    });

    updateEnquiry(enquiryId, { status: 'Converted', notes: `${enq.notes} [Enrolled as ${newStudent.id}]` });
    showToast('success', 'Enquiry Converted!', `${enq.name} has been enrolled with Roll No ${newStudent.id}`);
    return newStudent;
  };

  // Teachers
  const [teachers, setTeachers] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('tft_teachers');
      return saved ? JSON.parse(saved) : FACULTY_MEMBERS;
    } catch {
      return FACULTY_MEMBERS;
    }
  });

  const addTeacher = (teacherData: any) => {
    const newTeacher = {
      id: `fac-${Date.now().toString().slice(-4)}`,
      ...teacherData,
      isVerified: true,
    };
    const updated = [newTeacher, ...teachers];
    setTeachers(updated);
    try {
      localStorage.setItem('tft_teachers', JSON.stringify(updated));
    } catch {}
    addAuditLog('Create', 'Academics', `Added teacher ${newTeacher.name}`);
    showToast('success', 'Teacher Added', `${newTeacher.name} was added to faculty.`);
  };

  const updateTeacher = (id: string, updates: any) => {
    const updated = teachers.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTeachers(updated);
    try {
      localStorage.setItem('tft_teachers', JSON.stringify(updated));
    } catch {}
    addAuditLog('Update', 'Academics', `Updated teacher ${id}`);
    showToast('success', 'Teacher Updated', `Teacher profile updated.`);
  };

  // Courses (all 16)
  const [courses, setCourses] = useState<AdminCourse[]>(() => {
    try {
      const saved = localStorage.getItem('tft_admin_courses');
      return saved ? JSON.parse(saved) : INITIAL_16_COURSES;
    } catch {
      return INITIAL_16_COURSES;
    }
  });

  const addCourse = (courseData: Partial<AdminCourse>) => {
    const newCourse: AdminCourse = {
      id: `c-${Date.now().toString().slice(-5)}`,
      name: courseData.name || 'New Course Title',
      slug: (courseData.name || 'course').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: courseData.category || 'Computer & Office',
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      shortDescription: courseData.shortDescription || 'Course overview description...',
      fullDescription: courseData.fullDescription || 'Complete course syllabus breakdown...',
      duration: courseData.duration || '3 Months',
      eligibility: courseData.eligibility || '10th / 12th Pass',
      level: courseData.level || 'Beginner',
      mode: courseData.mode || 'Practical Lab',
      syllabus: courseData.syllabus || ['Module 1: Fundamentals', 'Module 2: Practical Exercises', 'Module 3: Project Work'],
      learningOutcomes: courseData.learningOutcomes || ['Practical skill mastery'],
      certification: courseData.certification || 'The Future Track Certified Diploma',
      assignedFaculty: courseData.assignedFaculty || 'Er. Raushan Kumar',
      status: courseData.status || 'Published',
      featured: courseData.featured || false,
      seoTitle: courseData.seoTitle || `${courseData.name} - The Future Track Dhanbad`,
      seoDescription: courseData.seoDescription || `Learn ${courseData.name} with certified practical lab training.`,
    };
    const updated = [newCourse, ...courses];
    setCourses(updated);
    try {
      localStorage.setItem('tft_admin_courses', JSON.stringify(updated));
    } catch {}
    addAuditLog('Create', 'Courses', `Created new course ${newCourse.name}`);
    showToast('success', 'Course Created', `${newCourse.name} has been published.`);
  };

  const updateCourse = (id: string, updates: Partial<AdminCourse>) => {
    const updated = courses.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCourses(updated);
    try {
      localStorage.setItem('tft_admin_courses', JSON.stringify(updated));
    } catch {}
    addAuditLog('Update', 'Courses', `Updated course details for ${id}`);
    showToast('success', 'Course Updated', `Course has been updated.`);
  };

  const toggleCoursePublish = (id: string) => {
    const target = courses.find((c) => c.id === id);
    if (!target) return;
    const nextStatus = target.status === 'Published' ? 'Draft' : 'Published';
    updateCourse(id, { status: nextStatus });
    showToast('info', 'Status Changed', `Course is now ${nextStatus}`);
  };

  const toggleCourseFeatured = (id: string) => {
    const target = courses.find((c) => c.id === id);
    if (!target) return;
    updateCourse(id, { featured: !target.featured });
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    try {
      localStorage.setItem('tft_admin_courses', JSON.stringify(updated));
    } catch {}
    addAuditLog('Delete', 'Courses', `Deleted course ${id}`);
    showToast('warning', 'Course Archived', 'The course has been archived.');
  };

  // Batches
  const [batches, setBatches] = useState<AdminBatch[]>(() => {
    try {
      const saved = localStorage.getItem('tft_admin_batches');
      return saved ? JSON.parse(saved) : INITIAL_BATCHES;
    } catch {
      return INITIAL_BATCHES;
    }
  });

  const addBatch = (batchData: Partial<AdminBatch>) => {
    const newBatch: AdminBatch = {
      id: `B-${Date.now().toString().slice(-4)}`,
      name: batchData.name || 'New Batch',
      courseId: batchData.courseId || 'c-adca',
      courseName: batchData.courseName || 'ADCA',
      teacherId: batchData.teacherId || 'fac-director',
      teacherName: batchData.teacherName || 'Er. Raushan Kumar',
      startDate: batchData.startDate || '15-10-2026',
      endDate: batchData.endDate || '15-04-2027',
      classDays: batchData.classDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      startTime: batchData.startTime || '10:00 AM',
      endTime: batchData.endTime || '12:00 PM',
      roomLab: batchData.roomLab || 'Computer Lab 1',
      maxStudents: batchData.maxStudents || 20,
      enrolledStudentsCount: batchData.enrolledStudentsCount || 0,
      status: batchData.status || 'Upcoming',
    };
    const updated = [newBatch, ...batches];
    setBatches(updated);
    try {
      localStorage.setItem('tft_admin_batches', JSON.stringify(updated));
    } catch {}
    addAuditLog('Create', 'Batches', `Created new batch ${newBatch.name}`);
    showToast('success', 'Batch Created', `Batch ${newBatch.name} is ready for enrollments.`);
  };

  // Attendance
  const [attendanceRecords, setAttendanceRecords] = useState<BatchAttendanceRecord[]>([]);

  const recordBatchAttendance = (batchId: string, records: any[], date: string) => {
    const batch = batches.find((b) => b.id === batchId);
    const newRecord: BatchAttendanceRecord = {
      id: `ATT-${Date.now().toString().slice(-5)}`,
      batchId,
      batchName: batch ? batch.name : 'Selected Batch',
      courseName: batch ? batch.courseName : 'Course',
      date,
      markedBy: currentUser ? currentUser.name : 'Teacher',
      records,
    };
    setAttendanceRecords([newRecord, ...attendanceRecords]);
    addAuditLog('Create', 'Attendance', `Marked attendance for ${newRecord.batchName} on ${date}`);
    showToast('success', 'Attendance Recorded', `Saved attendance for ${records.length} students on ${date}.`);
  };

  // Fees & Payments
  const [payments, setPayments] = useState<PaymentReceipt[]>(() => {
    try {
      const saved = localStorage.getItem('tft_payments');
      return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  const recordPayment = (paymentData: Partial<PaymentReceipt>): PaymentReceipt => {
    const receiptNo = `RCPT-${new Date().getFullYear()}-${Math.floor(Math.random() * 8999 + 1000)}`;
    const student = students.find((s) => s.id === paymentData.studentId);
    const newPayment: PaymentReceipt = {
      receiptNo,
      studentId: paymentData.studentId || (student ? student.id : 'TFT-2025-0842'),
      studentName: paymentData.studentName || (student ? student.name : 'Aman Kushwaha'),
      courseName: paymentData.courseName || (student ? student.course : 'Course'),
      amount: paymentData.amount || 5000,
      paymentDate: paymentData.paymentDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      paymentMethod: paymentData.paymentMethod || 'UPI',
      transactionId: paymentData.transactionId || `TXN-${Date.now().toString().slice(-6)}`,
      receivedBy: currentUser ? currentUser.name : 'Prof. Anjali Sharma',
      notes: paymentData.notes || 'Tuition fee installment payment',
      balanceRemaining: paymentData.balanceRemaining !== undefined ? paymentData.balanceRemaining : 0,
    };
    const updated = [newPayment, ...payments];
    setPayments(updated);
    try {
      localStorage.setItem('tft_payments', JSON.stringify(updated));
    } catch {}

    // Update student fee status if student exists
    if (student) {
      const newPaid = student.paidFee + newPayment.amount;
      const newRemaining = Math.max(0, student.totalFee - newPaid);
      updateStudent(student.id, {
        paidFee: newPaid,
        remainingFee: newRemaining,
        feeStatus: newRemaining === 0 ? 'Paid' : 'Partial',
        nextDueDate: newRemaining === 0 ? 'Completed' : '15 Next Month',
      });
    }

    addAuditLog('Payment Recorded', 'Finance', `Recorded fee receipt ${receiptNo} of ₹${newPayment.amount} for ${newPayment.studentName}`);
    showToast('success', 'Payment Recorded', `Receipt ${receiptNo} created for ₹${newPayment.amount.toLocaleString('en-IN')}`);
    return newPayment;
  };

  // Certificates
  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    try {
      const saved = localStorage.getItem('tft_certificates');
      return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  });

  const generateCertificate = (certData: Partial<CertificateRecord>): CertificateRecord => {
    const certNumber = certData.certificateNo || `TFT-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 8999 + 1000)}`;
    const verificationCode = `VERIFY-TFT-${certNumber.slice(-4)}`;
    const newCert: CertificateRecord = {
      certificateNo: certNumber,
      studentId: certData.studentId || 'TFT-2025-0842',
      studentName: certData.studentName || 'Student Name',
      courseName: certData.courseName || 'ADCA (12 Months)',
      issueDate: certData.issueDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      completionDate: certData.completionDate || '10-09-2026',
      grade: certData.grade || 'A+ (Distinction)',
      percentage: certData.percentage || 92,
      authorizedPerson: 'Er. Raushan Kumar (Director)',
      verificationCode,
      status: 'Issued',
    };
    const updated = [newCert, ...certificates];
    setCertificates(updated);
    try {
      localStorage.setItem('tft_certificates', JSON.stringify(updated));
    } catch {}
    addAuditLog('Certificate Issued', 'Certificates', `Generated certificate ${certNumber} for ${newCert.studentName}`);
    showToast('success', 'Certificate Issued', `Certificate ${certNumber} generated with verification code ${verificationCode}`);
    return newCert;
  };

  const verifyCertificate = (codeOrNo: string): CertificateRecord | null => {
    const clean = codeOrNo.trim().toUpperCase();
    return certificates.find(
      (c) => c.certificateNo.toUpperCase() === clean || c.verificationCode.toUpperCase() === clean
    ) || null;
  };

  // Study Materials
  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('tft_materials');
      return saved ? JSON.parse(saved) : INITIAL_STUDY_MATERIALS;
    } catch {
      return INITIAL_STUDY_MATERIALS;
    }
  });

  const addMaterial = (materialData: Partial<StudyMaterial>) => {
    const newMaterial: StudyMaterial = {
      id: `mat-${Date.now().toString().slice(-4)}`,
      title: materialData.title || 'Course Material',
      description: materialData.description || 'Study notes and exercise practicals',
      courseName: materialData.courseName || 'ADCA',
      batchName: materialData.batchName || 'All Batches',
      subject: materialData.subject || 'Practical Computing',
      uploadedBy: currentUser ? currentUser.name : 'Faculty Member',
      fileType: materialData.fileType || 'PDF',
      fileSize: materialData.fileSize || '5.2 MB',
      fileUrl: '#',
      publishDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: 'Published',
    };
    const updated = [newMaterial, ...materials];
    setMaterials(updated);
    try {
      localStorage.setItem('tft_materials', JSON.stringify(updated));
    } catch {}
    addAuditLog('Create', 'Study Materials', `Uploaded material ${newMaterial.title}`);
    showToast('success', 'Material Uploaded', `${newMaterial.title} published for students.`);
  };

  // Website CMS Settings (Synchronized with Public Website)
  const [cmsSettings, setCmsSettings] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('tft_cms_settings');
      return saved ? JSON.parse(saved) : {
        instituteName: 'The Future Track Computer Education',
        tagline: 'Learn Today. Build Your Future.',
        sanskritMotto: 'विद्या परम् बलम्',
        announcementText: '🎓 Admissions Open 2026–27 • New Batches Starting Soon',
        phone: '+91 93088 77375',
        whatsapp: '+91 93088 77375',
        email: 'raushankmr75@gmail.com',
        address: 'City Centre, Near Bus Stand, Bartand, Jharudih, Dhanbad, Jharkhand 826001',
        heroHeading: 'Learn Today. Build Your Future.',
        heroSubtitle: 'Build practical digital and technology skills with future-ready learning.',
        openingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM | Sunday: Special Batches',
        googleMapsUrl: 'https://maps.google.com/maps?q=The%20Future%20Track%20Computer%20Education%20Bartand%20Dhanbad%20Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed',
        heroBadge: 'THE FUTURE OF COMPUTER EDUCATION',
      };
    } catch {
      return {
        instituteName: 'The Future Track Computer Education',
        tagline: 'Learn Today. Build Your Future.',
        sanskritMotto: 'विद्या परम् बलम्',
        announcementText: '🎓 Admissions Open 2026–27 • New Batches Starting Soon',
        phone: '+91 93088 77375',
        whatsapp: '+91 93088 77375',
        email: 'raushankmr75@gmail.com',
        address: 'City Centre, Near Bus Stand, Bartand, Jharudih, Dhanbad, Jharkhand 826001',
        heroHeading: 'Learn Today. Build Your Future.',
        heroSubtitle: 'Build practical digital and technology skills with future-ready learning.',
        openingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM | Sunday: Special Batches',
        googleMapsUrl: 'https://maps.google.com/maps?q=The%20Future%20Track%20Computer%20Education%20Bartand%20Dhanbad%20Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed',
        heroBadge: 'THE FUTURE OF COMPUTER EDUCATION',
      };
    }
  });

  const updateCmsSettings = (updates: any) => {
    const updated = { ...cmsSettings, ...updates };
    setCmsSettings(updated);
    try {
      localStorage.setItem('tft_cms_settings', JSON.stringify(updated));
    } catch {}
    addAuditLog('Settings Changed', 'Website CMS', 'Updated live website settings & contact info');
    showToast('success', 'Website CMS Updated', 'Public website and portal updated live.');
  };

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        activeRole,
        login,
        logout,
        switchRole,
        hasPermission,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        enquiries,
        addEnquiry,
        updateEnquiry,
        convertEnquiryToStudent,
        teachers,
        addTeacher,
        updateTeacher,
        courses,
        addCourse,
        updateCourse,
        toggleCoursePublish,
        toggleCourseFeatured,
        deleteCourse,
        batches,
        addBatch,
        attendanceRecords,
        recordBatchAttendance,
        payments,
        recordPayment,
        certificates,
        generateCertificate,
        verifyCertificate,
        materials,
        addMaterial,
        cmsSettings,
        updateCmsSettings,
        auditLogs,
        addAuditLog,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
