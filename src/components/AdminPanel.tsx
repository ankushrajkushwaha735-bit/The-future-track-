import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COURSES, Course } from '../data/coursesData';
import { FACULTY_MEMBERS } from '../data/facultyData';
import { DEMO_CERTIFICATES, CertificateItem } from '../data/portalData';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Inbox, 
  Calendar, 
  Award, 
  Sliders, 
  LogOut, 
  Search, 
  Plus, 
  Check, 
  Trash2, 
  Save, 
  Edit3, 
  TrendingUp, 
  Globe, 
  CheckCircle2, 
  X,
  PhoneCall,
  Mail,
  GraduationCap,
  CreditCard,
  FileCheck,
  CheckSquare,
  ShieldCheck,
  Printer,
  History,
  AlertCircle,
  Clock,
  DollarSign,
  Download,
  Filter
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
  siteSettings: {
    announcementText: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    heroHeading: string;
    heroSubtitle: string;
  };
  onUpdateSiteSettings: (newSettings: any) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onLogout,
  siteSettings,
  onUpdateSiteSettings,
}) => {
  // Current Role: Super Admin, Admin, Accountant, Teacher, Admission Manager, Content Manager
  const [currentRole, setCurrentRole] = useState<string>('Super Admin');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Relational Entities State
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([
    { rollNo: 'TFT-2025-0842', name: 'Aman Kushwaha', course: 'ADCA', batch: 'Morning Batch B', phone: '+91 98765 12345', feeStatus: 'Paid', feePaid: 12000, totalFee: 12000, attendance: 92 },
    { rollNo: 'TFT-2025-0843', name: 'Neha Kumari', course: 'ADCA', batch: 'Morning Batch B', phone: '+91 98765 23456', feeStatus: 'Paid', feePaid: 12000, totalFee: 12000, attendance: 96 },
    { rollNo: 'TFT-2025-0844', name: 'Vikas Kumar', course: 'Tally Prime', batch: 'Morning Batch A', phone: '+91 98765 34567', feeStatus: 'Partial', feePaid: 3000, totalFee: 5500, attendance: 84 },
    { rollNo: 'TFT-2025-0845', name: 'Pooja Singh', course: 'Python + Java', batch: 'Evening Batch A', phone: '+91 98765 45678', feeStatus: 'Pending', feePaid: 0, totalFee: 15000, attendance: 90 },
  ]);
  const [payments, setPayments] = useState<any[]>([
    { id: 'REC-901', studentName: 'Aman Kushwaha', rollNo: 'TFT-2025-0842', course: 'ADCA', amount: 12000, mode: 'UPI', date: '15 Jul 2025', receiptNo: 'TFT/25-26/0842' },
    { id: 'REC-902', studentName: 'Neha Kumari', rollNo: 'TFT-2025-0843', course: 'ADCA', amount: 12000, mode: 'Cash', date: '20 Jul 2025', receiptNo: 'TFT/25-26/0843' },
    { id: 'REC-903', studentName: 'Vikas Kumar', rollNo: 'TFT-2025-0844', course: 'Tally Prime', amount: 3000, mode: 'UPI', date: '02 Aug 2025', receiptNo: 'TFT/25-26/0844' },
  ]);
  const [certificates, setCertificates] = useState<CertificateItem[]>(DEMO_CERTIFICATES);
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES);
  const [tempSettings, setTempSettings] = useState(siteSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Modal states
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [showIssueCertModal, setShowIssueCertModal] = useState(false);

  // New Payment Form
  const [payStudent, setPayStudent] = useState('Aman Kushwaha');
  const [payRoll, setPayRoll] = useState('TFT-2025-0842');
  const [payCourse, setPayCourse] = useState('ADCA');
  const [payAmount, setPayAmount] = useState('5000');
  const [payMode, setPayMode] = useState('UPI');

  // New Certificate Form
  const [newCertStudent, setNewCertStudent] = useState('');
  const [newCertCourse, setNewCertCourse] = useState('ADCA (Advanced Diploma in Computer Applications)');
  const [newCertGrade, setNewCertGrade] = useState('A+ (Outstanding)');
  const [newCertPercentage, setNewCertPercentage] = useState('92');

  // Load enquiries & admissions
  useEffect(() => {
    try {
      const storedEnq = JSON.parse(localStorage.getItem('tft_enquiries') || '[]');
      if (storedEnq.length > 0) {
        setEnquiries(storedEnq);
      } else {
        const initialEnq = [
          { id: 'ENQ-9041', name: 'Pooja Kumari', phone: '+91 98351 22345', email: 'pooja.k@gmail.com', course: 'ADCA', batchPreference: 'Morning (10:00 AM - 12:00 PM)', message: 'Interested in 1-year diploma with Tally GST module.', date: 'Today, 10:15 AM', status: 'New' },
          { id: 'ENQ-9040', name: 'Amit Kumar Singh', phone: '+91 87654 99120', email: 'amit.singh@yahoo.com', course: 'Tally Prime with GST', batchPreference: 'Evening (4:00 PM - 6:00 PM)', message: 'Need urgent admission for commerce audit practice.', date: 'Yesterday', status: 'Contacted' },
          { id: 'ENQ-9039', name: 'Rohan Verma', phone: '+91 76543 88123', email: 'rohan.tech@gmail.com', course: 'Website Development', batchPreference: 'Morning (8:00 AM - 10:00 AM)', message: 'Want to switch from non-tech to frontend developer.', date: '02 Oct 2026', status: 'Enrolled' },
        ];
        setEnquiries(initialEnq);
        localStorage.setItem('tft_enquiries', JSON.stringify(initialEnq));
      }

      const storedAdm = JSON.parse(localStorage.getItem('tft_admissions') || '[]');
      if (storedAdm.length > 0) {
        setAdmissions(storedAdm);
      } else {
        const initialAdm = [
          { id: 'APP-2026-1049', studentName: 'Ramesh Kumar Sharma', parentName: 'Shri Suresh Sharma', phone: '+91 98765 43210', email: 'ramesh.sharma@gmail.com', course: 'ADCA (Advanced Diploma in Computer Applications)', batch: 'Morning (10:00 AM - 12:00 PM)', qualification: '12th (Intermediate)', address: 'Bartand, Dhanbad', status: 'Pending Verification', appliedAt: '03 Oct 2026, 09:30 AM' },
          { id: 'APP-2026-1048', studentName: 'Sunita Devi', parentName: 'Shri Manoj Mahto', phone: '+91 98351 88765', email: 'sunita.d@gmail.com', course: 'Tally Prime with GST & e-Filing Master', batch: 'Evening (04:00 PM - 06:00 PM)', qualification: 'Graduation (B.Com)', address: 'Jharudih, Dhanbad', status: 'Verified & Approved', appliedAt: '02 Oct 2026, 04:15 PM' },
        ];
        setAdmissions(initialAdm);
        localStorage.setItem('tft_admissions', JSON.stringify(initialAdm));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    try {
      localStorage.setItem('tft_enquiries', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleApproveAdmission = (id: string) => {
    const app = admissions.find(a => a.id === id);
    if (!app) return;

    // Create student
    const newStudent = {
      rollNo: `TFT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: app.studentName,
      course: app.course.split('(')[0].trim(),
      batch: app.batch.split('(')[0].trim() || 'Morning Batch',
      phone: app.phone,
      feeStatus: 'Pending',
      feePaid: 0,
      totalFee: 12000,
      attendance: 100
    };

    setStudents([newStudent, ...students]);
    const updatedAdm = admissions.map(a => a.id === id ? { ...a, status: 'Enrolled (Student Created)' } : a);
    setAdmissions(updatedAdm);
    try {
      localStorage.setItem('tft_admissions', JSON.stringify(updatedAdm));
    } catch (e) {}
    alert(`Application approved! Student enrolled with Roll No: ${newStudent.rollNo}`);
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      studentName: payStudent,
      rollNo: payRoll,
      course: payCourse,
      amount: parseInt(payAmount) || 0,
      mode: payMode,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      receiptNo: `TFT/26-27/${Math.floor(1000 + Math.random() * 9000)}`
    };

    setPayments([newRec, ...payments]);
    setShowNewPaymentModal(false);
    setSelectedReceipt(newRec);
  };

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertStudent.trim()) return;

    const newCert: CertificateItem = {
      certId: `TFT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: newCertStudent,
      courseName: newCertCourse,
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      completionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      grade: newCertGrade,
      percentage: parseInt(newCertPercentage) || 90,
      verificationCode: `VERIFY-TFT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Issued',
      authorizedSignatory: 'Director, The Future Track'
    };

    setCertificates([newCert, ...certificates]);
    setShowIssueCertModal(false);
    alert(`Certificate generated successfully with Serial: ${newCert.certId}`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(tempSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Nav menu
  const navItems = [
    { id: 'dashboard', label: 'Dashboard & KPI', icon: LayoutDashboard },
    { id: 'admissions', label: 'Online Admissions', icon: GraduationCap, count: admissions.filter(a => a.status.includes('Pending')).length },
    { id: 'enquiries', label: 'Enquiries & CRM', icon: Inbox, count: enquiries.filter(e => e.status === 'New').length },
    { id: 'students', label: 'Students Directory', icon: Users },
    { id: 'fees', label: 'Fees & Receipts', icon: CreditCard },
    { id: 'courses', label: 'Courses Manager', icon: BookOpen },
    { id: 'certificates', label: 'Certificates Manager', icon: Award },
    { id: 'cms', label: 'Website CMS Settings', icon: Sliders },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F5F8] flex flex-col md:flex-row overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#26002F] text-white flex flex-col shrink-0 border-r border-[#3D004B] shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="sm" inverted={true} showText={false} />
            <div>
              <h2 className="text-xs font-black tracking-tight text-white uppercase">
                Admin Console
              </h2>
              <span className="text-[10px] text-[#E4B52D] font-bold block">
                The Future Track ERP
              </span>
            </div>
          </div>
          <button onClick={onLogout} className="md:hidden text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher Pill */}
        <div className="p-3 border-b border-white/10 bg-black/20">
          <label className="text-[10px] font-bold text-purple-200 block mb-1 uppercase tracking-wider">
            RBAC Active Role:
          </label>
          <select
            value={currentRole}
            onChange={e => setCurrentRole(e.target.value)}
            className="w-full bg-[#3D004B] text-white text-xs font-bold px-2 py-1.5 rounded-lg border border-purple-400/30 focus:outline-none"
          >
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Accountant</option>
            <option>Admission Manager</option>
            <option>Content Manager</option>
          </select>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                  isActive
                    ? 'bg-[#D83A27] text-white shadow-md'
                    : 'text-purple-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="bg-[#E4B52D] text-[#26002F] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs bg-black/10">
          <div className="text-[11px] text-purple-200">
            <span className="font-bold text-white block">Dhanbad Head Office</span>
            <span className="text-[10px] text-emerald-400">● Live Connected</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-purple-200 hover:text-white bg-white/10 px-2.5 py-1.5 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-purple-100 h-16 px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-black text-[#26002F] capitalize">
              {activeTab === 'cms' ? 'Website Content Management System' : activeTab.replace('-', ' ')}
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#26002F] border border-purple-100">
              Role: {currentRole}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'fees' && (
              <button
                onClick={() => setShowNewPaymentModal(true)}
                className="bg-[#26002F] hover:bg-[#3d004b] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5 text-[#E4B52D]" />
                Record Fee Payment
              </button>
            )}

            {activeTab === 'certificates' && (
              <button
                onClick={() => setShowIssueCertModal(true)}
                className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Award className="w-3.5 h-3.5 text-[#E4B52D]" />
                Issue Certificate
              </button>
            )}

            <button
              onClick={onLogout}
              className="bg-[#D83A27] hover:bg-[#BF2F1E] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              View Public Website
            </button>
          </div>
        </header>

        {/* Tab Content Panes */}
        <div className="p-6 flex-1 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick KPI Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-[#66616A] text-xs font-semibold mb-1">
                    <span>Active Students</span>
                    <Users className="w-4 h-4 text-[#26002F]" />
                  </div>
                  <div className="text-2xl font-black text-[#26002F]">{students.length}</div>
                  <span className="text-[10px] text-emerald-600 font-bold">100% verified Dhanbad batch</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-[#66616A] text-xs font-semibold mb-1">
                    <span>New Enquiries</span>
                    <Inbox className="w-4 h-4 text-[#D83A27]" />
                  </div>
                  <div className="text-2xl font-black text-[#D83A27]">{enquiries.length}</div>
                  <span className="text-[10px] text-emerald-600 font-bold">● Active pipeline</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-[#66616A] text-xs font-semibold mb-1">
                    <span>Total Fee Collection</span>
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-[#26002F]">
                    ₹{payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">Recorded receipts</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-[#66616A] text-xs font-semibold mb-1">
                    <span>Issued Certificates</span>
                    <Award className="w-4 h-4 text-[#E4B52D]" />
                  </div>
                  <div className="text-2xl font-black text-[#26002F]">{certificates.length}</div>
                  <span className="text-[10px] text-[#66616A] font-bold">Verifiable in portal</span>
                </div>
              </div>

              {/* Admissions & Inquiries Live Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Admissions */}
                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-[#26002F] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#D83A27]" />
                      Recent Online Admissions
                    </h2>
                    <button onClick={() => setActiveTab('admissions')} className="text-xs text-[#D83A27] font-bold hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {admissions.slice(0, 3).map(adm => (
                      <div key={adm.id} className="p-3 bg-[#F7F5F8] rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-[#1E1B20]">{adm.studentName}</p>
                          <p className="text-[11px] text-[#66616A]">{adm.course} • {adm.batch}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          adm.status.includes('Pending') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {adm.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Payments */}
                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-[#26002F] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      Recent Fee Receipts
                    </h2>
                    <button onClick={() => setActiveTab('fees')} className="text-xs text-[#D83A27] font-bold hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {payments.slice(0, 3).map(pay => (
                      <div key={pay.id} className="p-3 bg-[#F7F5F8] rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-[#1E1B20]">{pay.studentName} ({pay.rollNo})</p>
                          <p className="text-[11px] text-[#66616A]">{pay.course} • Mode: {pay.mode}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-[#26002F]">₹{pay.amount}</p>
                          <button 
                            onClick={() => setSelectedReceipt(pay)}
                            className="text-[10px] text-[#D83A27] font-bold hover:underline"
                          >
                            Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-purple-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#26002F]">Online Student Registration Queue</h2>
                  <p className="text-xs text-[#66616A]">Submitted from public admission portal</p>
                </div>
                <span className="text-xs bg-purple-50 text-[#26002F] font-bold px-3 py-1 rounded-full">
                  Total Applications: {admissions.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Application ID</th>
                      <th className="py-3 px-4">Student &amp; Parent</th>
                      <th className="py-3 px-4">Course &amp; Batch</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Address</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {admissions.map(adm => (
                      <tr key={adm.id} className="hover:bg-purple-50/40">
                        <td className="py-3 px-4 font-mono font-bold text-[#26002F]">{adm.id}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#1E1B20] block">{adm.studentName}</span>
                          <span className="text-[10px] text-[#66616A]">C/o {adm.parentName}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#D83A27] block">{adm.course}</span>
                          <span className="text-[10px] text-[#66616A]">{adm.batch}</span>
                        </td>
                        <td className="py-3 px-4 text-[#66616A]">{adm.phone}</td>
                        <td className="py-3 px-4 text-[#66616A]">{adm.address}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            adm.status.includes('Pending') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {adm.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {adm.status.includes('Pending') ? (
                            <button
                              onClick={() => handleApproveAdmission(adm.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-[11px] font-bold shadow"
                            >
                              Approve &amp; Enroll
                            </button>
                          ) : (
                            <span className="text-emerald-700 text-[11px] font-bold">Enrolled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ENQUIRIES & CRM */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-purple-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#26002F]">Website Leads &amp; Enquiries CRM</h2>
                  <p className="text-xs text-[#66616A]">Track status pipeline from initial lead to enrollment</p>
                </div>
                <span className="text-xs bg-red-50 text-[#D83A27] font-bold px-3 py-1 rounded-full">
                  {enquiries.filter(e => e.status === 'New').length} New Leads
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Lead ID</th>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Interested Course</th>
                      <th className="py-3 px-4">Message / Query</th>
                      <th className="py-3 px-4">Stage</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {enquiries.map(enq => (
                      <tr key={enq.id} className="hover:bg-purple-50/40">
                        <td className="py-3 px-4 font-mono font-bold text-[#26002F]">{enq.id}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#1E1B20] block">{enq.name}</span>
                          <span className="text-[10px] text-[#66616A]">{enq.phone}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#D83A27]">{enq.course}</td>
                        <td className="py-3 px-4 text-[#66616A] max-w-xs truncate">{enq.message}</td>
                        <td className="py-3 px-4">
                          <select
                            value={enq.status}
                            onChange={e => handleUpdateStatus(enq.id, e.target.value)}
                            className="bg-purple-50 border border-purple-200 text-[#26002F] font-bold text-[11px] rounded-lg px-2 py-1 outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Counseling">Counseling</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Dropped">Dropped</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded-lg text-[11px] font-bold"
                          >
                            <PhoneCall className="w-3 h-3" />
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: STUDENTS DIRECTORY */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-purple-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#26002F]">Registered Students Roster</h2>
                  <p className="text-xs text-[#66616A]">Active institute students across morning and evening cohorts</p>
                </div>
                <span className="text-xs font-bold text-[#26002F]">Total Students: {students.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Batch</th>
                      <th className="py-3 px-4">Attendance %</th>
                      <th className="py-3 px-4">Fee Status</th>
                      <th className="py-3 px-4">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {students.map(std => (
                      <tr key={std.rollNo} className="hover:bg-purple-50/40">
                        <td className="py-3 px-4 font-mono font-bold text-[#26002F]">{std.rollNo}</td>
                        <td className="py-3 px-4 font-bold text-[#1E1B20]">{std.name}</td>
                        <td className="py-3 px-4 text-[#66616A]">{std.course}</td>
                        <td className="py-3 px-4 text-[#66616A]">{std.batch}</td>
                        <td className="py-3 px-4 font-bold text-emerald-600">{std.attendance}%</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            std.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                            std.feeStatus === 'Partial' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {std.feeStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#66616A]">{std.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FEES & RECEIPTS */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-purple-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#26002F]">Fee Payments Ledger &amp; Receipts</h2>
                    <p className="text-xs text-[#66616A]">Official cash, UPI, card, and bank transactions</p>
                  </div>
                  <button
                    onClick={() => setShowNewPaymentModal(true)}
                    className="bg-[#26002F] hover:bg-[#3d004b] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E4B52D]" />
                    Record New Payment
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Receipt No</th>
                        <th className="py-3 px-4">Student &amp; Roll No</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Mode</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {payments.map(pay => (
                        <tr key={pay.id} className="hover:bg-purple-50/40">
                          <td className="py-3 px-4 font-mono font-bold text-[#26002F]">{pay.receiptNo}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#1E1B20] block">{pay.studentName}</span>
                            <span className="text-[10px] font-mono text-[#66616A]">{pay.rollNo}</span>
                          </td>
                          <td className="py-3 px-4 text-[#66616A]">{pay.course}</td>
                          <td className="py-3 px-4 font-black text-[#26002F]">₹{pay.amount.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4">
                            <span className="bg-purple-50 text-[#26002F] font-bold text-[10px] px-2 py-0.5 rounded">
                              {pay.mode}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#66616A]">{pay.date}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedReceipt(pay)}
                              className="inline-flex items-center gap-1 bg-[#D83A27] text-white hover:bg-[#b82e1d] px-2.5 py-1 rounded-lg text-[10px] font-bold shadow"
                            >
                              <Printer className="w-3 h-3" />
                              View / Print
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COURSES */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#26002F]">Academic Course Catalog</h2>
                  <p className="text-xs text-[#66616A]">All 16 certified diploma and certificate courses</p>
                </div>
                <span className="text-xs font-black bg-purple-50 text-[#26002F] px-3 py-1 rounded-full">
                  {coursesList.length} Active Courses
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coursesList.map(c => (
                  <div key={c.id} className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition bg-[#F7F5F8]/50 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D83A27] block mb-1">
                        {c.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#26002F] leading-snug">{c.title}</h3>
                      <p className="text-xs text-[#66616A] mt-1 line-clamp-2">{c.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-700">Duration: {c.duration}</span>
                      <span className="font-black text-[#D83A27]">₹{c.fee || 5000}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-purple-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#26002F]">Institutional Certificates Register</h2>
                    <p className="text-xs text-[#66616A]">Issue and verify tamper-proof student credentials</p>
                  </div>
                  <button
                    onClick={() => setShowIssueCertModal(true)}
                    className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E4B52D]" />
                    Issue New Certificate
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Certificate ID</th>
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Course Name</th>
                        <th className="py-3 px-4">Grade &amp; %</th>
                        <th className="py-3 px-4">Issue Date</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {certificates.map(cert => (
                        <tr key={cert.certId} className="hover:bg-purple-50/40">
                          <td className="py-3 px-4 font-mono font-bold text-[#26002F]">{cert.certId}</td>
                          <td className="py-3 px-4 font-bold text-[#1E1B20]">{cert.studentName}</td>
                          <td className="py-3 px-4 text-[#66616A]">{cert.courseName}</td>
                          <td className="py-3 px-4 font-bold text-emerald-600">{cert.grade} ({cert.percentage}%)</td>
                          <td className="py-3 px-4 text-[#66616A]">{cert.issueDate}</td>
                          <td className="py-3 px-4">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {cert.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: WEBSITE CMS */}
          {activeTab === 'cms' && (
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 max-w-4xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
                <div>
                  <h2 className="text-base font-bold text-[#26002F]">Website CMS &amp; Global Brand Settings</h2>
                  <p className="text-xs text-[#66616A]">Update website announcements, contact information, and hero text in real-time</p>
                </div>
                {savedSuccess && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Changes Live on Website!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Top Announcement Bar Message
                  </label>
                  <input
                    type="text"
                    value={tempSettings.announcementText}
                    onChange={e => setTempSettings({ ...tempSettings, announcementText: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Official Phone Number
                    </label>
                    <input
                      type="text"
                      value={tempSettings.phone}
                      onChange={e => setTempSettings({ ...tempSettings, phone: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Official WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={tempSettings.whatsapp}
                      onChange={e => setTempSettings({ ...tempSettings, whatsapp: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={tempSettings.email}
                      onChange={e => setTempSettings({ ...tempSettings, email: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Campus Physical Address
                    </label>
                    <input
                      type="text"
                      value={tempSettings.address}
                      onChange={e => setTempSettings({ ...tempSettings, address: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#E4B52D]" />
                    Publish Changes to Live Website
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* RECORD PAYMENT MODAL */}
      {showNewPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-purple-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#26002F]">Record Student Fee Payment</h3>
              <button onClick={() => setShowNewPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Select Student</label>
                <select
                  value={payRoll}
                  onChange={e => {
                    const std = students.find(s => s.rollNo === e.target.value);
                    if (std) {
                      setPayRoll(std.rollNo);
                      setPayStudent(std.name);
                      setPayCourse(std.course);
                    }
                  }}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#26002F]"
                >
                  {students.map(s => (
                    <option key={s.rollNo} value={s.rollNo}>
                      {s.name} ({s.rollNo}) - {s.course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Amount (₹ INR)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={e => setPayAmount(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Payment Method</label>
                <select
                  value={payMode}
                  onChange={e => setPayMode(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none font-bold"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Cash">Cash at Dhanbad Center</option>
                  <option value="Bank Transfer">Bank Transfer / NEFT</option>
                  <option value="Debit Card">Debit / Credit Card</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewPaymentModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#26002F] hover:bg-[#3d004b] text-white px-5 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#E4B52D]" />
                  Save &amp; Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ISSUE CERTIFICATE MODAL */}
      {showIssueCertModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-purple-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#26002F]">Issue Official Certificate</h3>
              <button onClick={() => setShowIssueCertModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={newCertStudent}
                  onChange={e => setNewCertStudent(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Course Name</label>
                <select
                  value={newCertCourse}
                  onChange={e => setNewCertCourse(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none"
                >
                  {coursesList.map(c => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Grade</label>
                  <select
                    value={newCertGrade}
                    onChange={e => setNewCertGrade(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none font-bold"
                  >
                    <option>A+ (Outstanding)</option>
                    <option>A (Exemplary)</option>
                    <option>B+ (Very Good)</option>
                    <option>B (Good)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Percentage (%)</label>
                  <input
                    type="number"
                    value={newCertPercentage}
                    onChange={e => setNewCertPercentage(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-xl outline-none font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowIssueCertModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-5 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-[#E4B52D]" />
                  Issue &amp; Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFICIAL FEE RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-200 animate-fadeIn relative my-auto">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Printable Receipt Frame */}
            <div className="border-4 border-double border-purple-200 p-6 rounded-2xl bg-white text-left">
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b-2 border-[#26002F] pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <Logo size="sm" showText={false} />
                  <div>
                    <h2 className="text-sm font-black text-[#26002F] tracking-tight">THE FUTURE TRACK</h2>
                    <p className="text-[10px] text-[#D83A27] font-bold">COMPUTER EDUCATION</p>
                    <p className="text-[9px] text-[#66616A]">City Centre, Bartand, Dhanbad, Jharkhand 826001</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#26002F] bg-purple-50 px-2 py-0.5 rounded">
                    Money Receipt
                  </span>
                  <p className="text-[10px] font-mono font-bold text-[#66616A] mt-1">{selectedReceipt.receiptNo}</p>
                  <p className="text-[10px] text-[#66616A]">Date: {selectedReceipt.date}</p>
                </div>
              </div>

              {/* Receipt Details */}
              <div className="space-y-2.5 text-xs text-[#1E1B20]">
                <div className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-[#66616A]">Received with thanks from:</span>
                  <span className="font-bold text-[#26002F]">{selectedReceipt.studentName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-[#66616A]">Student Roll Number:</span>
                  <span className="font-mono font-bold">{selectedReceipt.rollNo}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-[#66616A]">Towards Course Fee of:</span>
                  <span className="font-bold text-[#D83A27]">{selectedReceipt.course}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-[#66616A]">Payment Mode:</span>
                  <span className="font-bold">{selectedReceipt.mode}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm">
                  <span className="font-bold text-[#26002F]">Amount Paid (INR):</span>
                  <span className="font-black text-lg text-emerald-700">₹{selectedReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Stamp & Signature Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end text-[10px] text-[#66616A]">
                <div>
                  <p className="font-bold text-[#26002F]">विद्या परम् बलम्</p>
                  <p>Computer generated valid receipt.</p>
                </div>
                <div className="text-center">
                  <div className="w-24 border-b border-gray-400 mb-1"></div>
                  <p className="font-bold text-[#26002F]">Authorized Cashier / Director</p>
                  <p className="text-[9px]">The Future Track, Dhanbad</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="bg-[#26002F] hover:bg-[#3d004b] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5 text-[#E4B52D]" />
                Print Official Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
