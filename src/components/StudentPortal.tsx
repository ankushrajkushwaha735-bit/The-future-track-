import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  DEMO_STUDENT, 
  DEMO_STUDENT_COURSES, 
  DEMO_SCHEDULE, 
  DEMO_STUDY_MATERIALS, 
  DEMO_ASSIGNMENTS, 
  DEMO_RESULTS, 
  DEMO_CERTIFICATES, 
  DEMO_NOTICES 
} from '../data/portalData';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  FileText, 
  ClipboardList, 
  GraduationCap, 
  CreditCard, 
  Award, 
  Bell, 
  Settings, 
  LogOut, 
  Download, 
  ExternalLink,
  ChevronRight,
  Clock,
  Laptop,
  CheckCircle2,
  X
} from 'lucide-react';

interface StudentPortalProps {
  onLogout: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [student, setStudent] = useState(DEMO_STUDENT);
  const [activeCertificate, setActiveCertificate] = useState<any | null>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'progress', label: 'Course Progress', icon: BarChart3 },
    { id: 'schedule', label: 'Class Schedule', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle },
    { id: 'materials', label: 'Study Material', icon: FileText },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'results', label: 'Results & Grades', icon: GraduationCap },
    { id: 'fees', label: 'Fees & Receipts', icon: CreditCard },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'notices', label: 'Notices & Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F5F8] flex flex-col md:flex-row overflow-hidden animate-in fade-in">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#26002F] text-white flex flex-col shrink-0 border-r border-[#3D004B] shadow-2xl">
        {/* Portal Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="sm" inverted={true} showText={false} />
            <div>
              <h2 className="text-xs font-black tracking-tight text-white uppercase">
                Student Portal
              </h2>
              <span className="text-[10px] text-[#E4B52D] font-bold block">
                The Future Track
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="md:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Card */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#E4B52D]"
          />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">
              {student.name}
            </div>
            <div className="text-[10px] text-gray-300 truncate">
              Roll: {student.rollNo}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all ${
                  isActive
                    ? 'bg-[#D83A27] text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E4B52D]'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-red-900/60 text-xs font-bold text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit to Main Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Logged in as Student
            </span>
            <h1 className="text-lg font-black text-[#26002F] capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Batch Active: 2025-26
            </span>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#D83A27] bg-[#D83A27]/10 hover:bg-[#D83A27] hover:text-white px-3 py-1.5 rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Tab Body View */}
        <div className="p-6 space-y-6">

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Top Welcome Banner */}
              <div className="bg-gradient-to-r from-[#26002F] to-[#3D004B] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-xl space-y-2">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#E4B52D]">
                    Welcome Back, {student.name.split(' ')[0]}!
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {student.course}
                  </h2>
                  <p className="text-xs text-gray-200">
                    Next upcoming class: <strong>Monday, 10:00 AM (Computer Lab 1 - Station 14)</strong>
                  </p>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Attendance</span>
                  <div className="text-2xl font-extrabold text-[#26002F] mt-1">
                    {student.attendancePercentage}%
                  </div>
                  <span className="text-[11px] text-green-600 font-medium">Above required 75%</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Average Score</span>
                  <div className="text-2xl font-extrabold text-[#D83A27] mt-1">
                    {student.overallScore}%
                  </div>
                  <span className="text-[11px] text-[#26002F] font-medium">Grade: A (Distinction)</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Active Modules</span>
                  <div className="text-2xl font-extrabold text-[#1E1B20] mt-1">
                    3 In Progress
                  </div>
                  <span className="text-[11px] text-gray-500">Excel, Tally &amp; Photoshop</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Fee Status</span>
                  <div className="text-2xl font-extrabold text-green-700 mt-1">
                    {student.feeStatus}
                  </div>
                  <span className="text-[11px] text-gray-500">Receipt Verified</span>
                </div>
              </div>

              {/* Active Courses Progress & Recent Notices */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Courses Progress */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-bold text-[#26002F] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#D83A27]" />
                      My Active Course Modules
                    </h3>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-xs font-bold text-[#D83A27] hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-4">
                    {DEMO_STUDENT_COURSES.map((c) => (
                      <div key={c.id} className="p-4 rounded-xl bg-[#F7F5F8] border border-gray-100 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-[#1E1B20]">{c.title}</h4>
                            <p className="text-[11px] text-gray-500">Instructor: {c.instructor}</p>
                          </div>
                          <span className="text-xs font-extrabold text-[#26002F]">{c.progress}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#D83A27] h-full rounded-full transition-all"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                          <span>{c.completedModules} of {c.totalModules} chapters completed</span>
                          <span className="text-[#26002F] font-semibold">{c.nextClass}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Notices */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-bold text-[#26002F] flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#E4B52D]" />
                      Latest Campus Notices
                    </h3>
                    <button
                      onClick={() => setActiveTab('notices')}
                      className="text-xs font-bold text-[#D83A27] hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {DEMO_NOTICES.map((n) => (
                      <div key={n.id} className="p-3.5 rounded-xl bg-[#F7F5F8] border border-gray-100 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-[#26002F] text-white">
                            {n.category}
                          </span>
                          <span className="text-gray-400">{n.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#1E1B20]">{n.title}</h4>
                        <p className="text-[11px] text-gray-600 line-clamp-2">{n.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* MY PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm max-w-3xl space-y-6">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-[#26002F]"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-[#26002F]">{student.name}</h3>
                  <p className="text-xs font-semibold text-[#D83A27]">{student.course}</p>
                  <p className="text-xs text-gray-500 mt-1">Roll No: {student.rollNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-[#F7F5F8] rounded-xl">
                  <span className="text-gray-400 block font-bold uppercase text-[10px]">Mobile Number</span>
                  <span className="font-bold text-gray-800 text-sm">{student.phone}</span>
                </div>
                <div className="p-3.5 bg-[#F7F5F8] rounded-xl">
                  <span className="text-gray-400 block font-bold uppercase text-[10px]">Email ID</span>
                  <span className="font-bold text-gray-800 text-sm">{student.email}</span>
                </div>
                <div className="p-3.5 bg-[#F7F5F8] rounded-xl">
                  <span className="text-gray-400 block font-bold uppercase text-[10px]">Batch Time Slot</span>
                  <span className="font-bold text-gray-800 text-sm">{student.batchTime}</span>
                </div>
                <div className="p-3.5 bg-[#F7F5F8] rounded-xl">
                  <span className="text-gray-400 block font-bold uppercase text-[10px]">Enrollment Date</span>
                  <span className="font-bold text-gray-800 text-sm">{student.enrollmentDate}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => alert('Profile update request sent to front office.')}
                  className="bg-[#26002F] text-white text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-[#3D004B]"
                >
                  Request Profile Edit
                </button>
              </div>
            </div>
          )}

          {/* CLASS SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#26002F]">
                Weekly Lab &amp; Lecture Schedule (Session 2025-26)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#26002F] text-white uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Day</th>
                      <th className="p-3">Time</th>
                      <th className="p-3">Subject / Topic</th>
                      <th className="p-3">Room / Workstation</th>
                      <th className="p-3">Instructor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {DEMO_SCHEDULE.map((s) => (
                      <tr key={s.id} className="hover:bg-[#F7F5F8]">
                        <td className="p-3 font-bold text-[#D83A27]">{s.day}</td>
                        <td className="p-3 font-semibold text-gray-700">{s.time}</td>
                        <td className="p-3 text-gray-800">{s.subject}</td>
                        <td className="p-3 text-gray-600">{s.room}</td>
                        <td className="p-3 text-[#26002F] font-medium">{s.instructor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STUDY MATERIAL TAB */}
          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#26002F]">
                Download Course Notes &amp; Handbooks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEMO_STUDY_MATERIALS.map((m) => (
                  <div key={m.id} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#D83A27]">
                        {m.subject} • {m.fileType} ({m.size})
                      </span>
                      <h4 className="text-xs font-bold text-[#1E1B20] mt-1">{m.title}</h4>
                      <span className="text-[11px] text-gray-400">Uploaded {m.uploadDate}</span>
                    </div>

                    <button
                      onClick={() => alert(`Starting download for ${m.title}`)}
                      className="w-10 h-10 rounded-xl bg-[#F7F5F8] text-[#26002F] hover:bg-[#26002F] hover:text-white flex items-center justify-center transition-colors"
                      title="Download Material"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#26002F]">
                    Issued Diplomas &amp; Certificates
                  </h3>
                  <p className="text-xs text-gray-500">
                    Official verified credentials with QR validation code.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEMO_CERTIFICATES.map((cert) => (
                  <div key={cert.certId} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#E4B52D]" />
                        <span className="text-xs font-bold text-[#26002F]">{cert.certId}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">
                        {cert.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-[#1E1B20]">{cert.courseName}</h4>
                      <p className="text-xs text-gray-500 mt-1">Issued Date: {cert.issueDate}</p>
                      <p className="text-xs text-gray-500">Verification Key: <code>{cert.verificationCode}</code></p>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => alert(`Viewing verified digital certificate ${cert.certId}`)}
                        className="flex-1 bg-[#26002F] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#3D004B]"
                      >
                        View Certificate
                      </button>
                      <button
                        onClick={() => alert(`Downloading verified PDF for ${cert.certId}`)}
                        className="py-2 px-3 bg-[#F7F5F8] border border-gray-200 text-[#26002F] rounded-xl text-xs font-bold hover:bg-gray-100 flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEES TAB */}
          {activeTab === 'fees' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm max-w-2xl space-y-5">
              <h3 className="text-base font-bold text-[#26002F]">Fee Account &amp; Receipts</h3>
              
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F7F5F8] rounded-2xl text-center text-xs">
                <div>
                  <span className="text-gray-400 block font-bold">Total Fees</span>
                  <span className="text-base font-black text-[#26002F]">₹{student.totalFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-x border-gray-200">
                  <span className="text-gray-400 block font-bold">Paid Fees</span>
                  <span className="text-base font-black text-green-600">₹{student.feePaid.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold">Due Amount</span>
                  <span className="text-base font-black text-gray-700">₹0</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-green-200 bg-green-50/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <strong className="block text-green-800">All Installments Clear</strong>
                    <span className="text-green-700 text-[11px]">Official receipt #RCPT-8422 generated</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Downloading official fee receipt receipt-8422.pdf')}
                  className="bg-white text-green-800 border border-green-300 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-green-100"
                >
                  Download Receipt
                </button>
              </div>
            </div>
          )}

          {/* FALLBACK / OTHER TABS */}
          {!['dashboard', 'profile', 'schedule', 'materials', 'certificates', 'fees'].includes(activeTab) && (
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#26002F]/5 text-[#26002F] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-[#D83A27]" />
              </div>
              <h3 className="text-base font-bold text-[#1E1B20] capitalize">
                {activeTab.replace('-', ' ')}
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                All records for {student.name} ({student.rollNo}) are active and updated as of session 2026.
              </p>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};
