import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  DEMO_TEACHER, 
  DEMO_BATCH_STUDENTS, 
  TeacherBatchStudent, 
  DEMO_STUDY_MATERIALS, 
  DEMO_ASSIGNMENTS,
  StudyMaterialItem 
} from '../data/portalData';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BookOpen, 
  FileText, 
  Award, 
  User, 
  LogOut, 
  Calendar, 
  Clock, 
  Search, 
  Plus, 
  Check, 
  X, 
  AlertCircle,
  Download,
  Upload,
  Send,
  Sparkles,
  Phone,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface TeacherPortalProps {
  onLogout: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'batches' | 'attendance' | 'materials' | 'assignments' | 'results' | 'profile'>('dashboard');
  
  // State for attendance
  const [selectedBatch, setSelectedBatch] = useState<string>('Morning Batch B');
  const [students, setStudents] = useState<TeacherBatchStudent[]>(DEMO_BATCH_STUDENTS);
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // State for materials
  const [materials, setMaterials] = useState<StudyMaterialItem[]>(DEMO_STUDY_MATERIALS);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialSubject, setNewMaterialSubject] = useState('');
  const [showAddMaterial, setShowAddMaterial] = useState(false);

  // State for assignments
  const [assignments, setAssignments] = useState(DEMO_ASSIGNMENTS);
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [newAssTitle, setNewAssTitle] = useState('');
  const [newAssSubject, setNewAssSubject] = useState('');
  const [newAssDue, setNewAssDue] = useState('');

  // State for grading modal
  const [selectedAssignmentToGrade, setSelectedAssignmentToGrade] = useState<any | null>(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  // Handle attendance change
  const handleAttendanceChange = (rollNo: string, status: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setStudents(prev => prev.map(s => s.rollNo === rollNo ? { ...s, attendanceToday: status } : s));
    setAttendanceSaved(false);
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, attendanceToday: 'Present' })));
    setAttendanceSaved(false);
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 4000);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterialTitle.trim()) return;
    const newItem: StudyMaterialItem = {
      id: `sm-${Date.now()}`,
      title: newMaterialTitle,
      subject: newMaterialSubject || 'Computer Education',
      fileType: 'PDF',
      size: '2.4 MB',
      uploadDate: 'Today'
    };
    setMaterials([newItem, ...materials]);
    setNewMaterialTitle('');
    setNewMaterialSubject('');
    setShowAddMaterial(false);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssTitle.trim()) return;
    const newAss = {
      id: `as-${Date.now()}`,
      title: newAssTitle,
      subject: newAssSubject || 'Computer Lab',
      dueDate: newAssDue || '30 Oct 2026',
      status: 'Pending' as const,
    };
    setAssignments([newAss, ...assignments]);
    setNewAssTitle('');
    setNewAssSubject('');
    setNewAssDue('');
    setShowNewAssignment(false);
  };

  const handleSaveGrade = () => {
    if (selectedAssignmentToGrade) {
      setAssignments(prev => prev.map(a => a.id === selectedAssignmentToGrade.id ? {
        ...a,
        status: 'Graded',
        score: gradeInput || '90/100',
        feedback: feedbackInput || 'Well done.'
      } : a));
      setSelectedAssignmentToGrade(null);
      setGradeInput('');
      setFeedbackInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F8] text-[#1E1B20] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <header className="bg-[#26002F] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} inverted={true} />
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">THE FUTURE TRACK</span>
              <span className="text-[10px] text-[#E4B52D] font-bold uppercase tracking-wider block">Faculty &amp; Staff Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 text-xs text-purple-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Faculty ID: <strong>{DEMO_TEACHER.id}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <img 
                src={DEMO_TEACHER.avatar} 
                alt={DEMO_TEACHER.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#E4B52D]"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{DEMO_TEACHER.name}</p>
                <p className="text-[10px] text-purple-200">{DEMO_TEACHER.designation.split('&')[0]}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-[#D83A27] hover:bg-[#b82e1d] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
              title="Logout from Faculty Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4 sticky top-24">
            <div className="text-xs font-bold uppercase tracking-wider text-[#66616A] mb-3 px-3">
              Faculty Modules
            </div>
            
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'batches', label: 'My Batches & Students', icon: Users },
                { id: 'attendance', label: 'Daily Attendance', icon: CheckSquare },
                { id: 'materials', label: 'Study Materials', icon: BookOpen },
                { id: 'assignments', label: 'Assignments & Grading', icon: FileText },
                { id: 'results', label: 'Exam Marks Entry', icon: Award },
                { id: 'profile', label: 'Faculty Profile', icon: User },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive 
                        ? 'bg-[#26002F] text-white shadow-sm' 
                        : 'text-[#1E1B20] hover:bg-purple-50 hover:text-[#26002F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#E4B52D]' : 'text-[#66616A]'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#E4B52D]" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-purple-100">
              <div className="bg-[#26002F]/5 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#26002F]">
                  <ShieldCheck className="w-4 h-4 text-[#D83A27]" />
                  <span>Academic Session</span>
                </div>
                <p className="text-[11px] text-[#66616A] mt-1">2026–2027 Ongoing</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">● Dhanbad Center Active</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-[#26002F] via-[#3d004b] to-[#26002F] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block bg-[#E4B52D] text-[#26002F] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                    Faculty Dashboard
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black">Welcome back, {DEMO_TEACHER.name}</h1>
                  <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-xl">
                    You have 3 active batches today. Daily attendance for Morning Batch B is pending submission.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab('attendance')}
                      className="bg-[#D83A27] hover:bg-[#b82e1d] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      Take Today's Attendance
                    </button>
                    <button
                      onClick={() => setActiveTab('assignments')}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Review Submissions (2)
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#26002F] flex items-center justify-center font-bold mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#26002F]">3</div>
                  <div className="text-xs text-[#66616A] font-semibold">Assigned Batches</div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-2">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#26002F]">48</div>
                  <div className="text-xs text-[#66616A] font-semibold">Enrolled Students</div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-2">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-emerald-600">92%</div>
                  <div className="text-xs text-[#66616A] font-semibold">Avg. Attendance</div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#D83A27] flex items-center justify-center font-bold mb-2">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#D83A27]">3</div>
                  <div className="text-xs text-[#66616A] font-semibold">Pending Grades</div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#26002F] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D83A27]" />
                    Today's Teaching Schedule
                  </h2>
                  <span className="text-xs bg-purple-50 text-[#26002F] px-2.5 py-1 rounded-full font-bold">
                    Lab 1 &amp; Lab 2
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { time: '08:00 AM - 10:00 AM', batch: 'Morning Batch A', course: 'Tally Prime with GST & e-Filing', room: 'Computer Lab 2', status: 'Completed' },
                    { time: '10:00 AM - 12:00 PM', batch: 'Morning Batch B', course: 'ADCA (Advanced Diploma in Computer Applications)', room: 'Computer Lab 1', status: 'In Progress' },
                    { time: '04:00 PM - 06:00 PM', batch: 'Evening Batch A', course: 'Python + Java Programming Suite', room: 'Lab 1 Speed Station', status: 'Upcoming' },
                  ].map((cls, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-purple-200 transition bg-[#F7F5F8]/50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#26002F]">{cls.batch}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cls.status === 'Completed' ? 'bg-gray-200 text-gray-700' :
                            cls.status === 'In Progress' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {cls.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#66616A] mt-0.5">{cls.course} • <span className="font-semibold">{cls.room}</span></p>
                      </div>
                      <div className="mt-2 sm:mt-0 font-mono text-xs font-bold text-[#D83A27]">
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BATCHES & STUDENTS */}
          {activeTab === 'batches' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#26002F]">My Batches &amp; Student Roster</h2>
                  <p className="text-xs text-[#66616A]">Assigned classroom cohorts and enrolled student profiles</p>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedBatch} 
                    onChange={e => setSelectedBatch(e.target.value)}
                    className="bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-bold text-[#26002F] focus:outline-none focus:ring-2 focus:ring-[#26002F]"
                  >
                    <option value="Morning Batch A">Morning Batch A (08:00 AM - 10:00 AM)</option>
                    <option value="Morning Batch B">Morning Batch B (10:00 AM - 12:00 PM)</option>
                    <option value="Evening Batch A">Evening Batch A (04:00 PM - 06:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Roll Number</th>
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Attendance %</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {students.map(std => (
                        <tr key={std.rollNo} className="hover:bg-purple-50/50 transition">
                          <td className="py-3 px-4 font-mono font-bold text-[#26002F]">{std.rollNo}</td>
                          <td className="py-3 px-4 font-bold text-[#1E1B20]">{std.name}</td>
                          <td className="py-3 px-4 text-[#66616A]">{std.course}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    std.overallAttendance >= 90 ? 'bg-emerald-500' :
                                    std.overallAttendance >= 75 ? 'bg-amber-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${std.overallAttendance}%` }}
                                ></div>
                              </div>
                              <span className="font-bold text-[11px]">{std.overallAttendance}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#66616A]">{std.phone}</td>
                          <td className="py-3 px-4 text-right">
                            <a 
                              href={`https://wa.me/${std.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded-lg text-[10px] font-bold"
                            >
                              <Phone className="w-3 h-3" />
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DAILY ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#26002F]">Daily Attendance Marker</h2>
                  <p className="text-xs text-[#66616A]">Record daily presence, late arrivals, and approved leaves</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input 
                    type="date" 
                    value={attendanceDate} 
                    onChange={e => setAttendanceDate(e.target.value)}
                    className="bg-white border border-purple-200 rounded-xl px-3 py-1.5 text-xs font-bold text-[#26002F]"
                  />
                  <button
                    onClick={handleMarkAllPresent}
                    className="bg-purple-100 hover:bg-purple-200 text-[#26002F] px-3 py-1.5 rounded-xl text-xs font-bold transition"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={handleSaveAttendance}
                    className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Save Attendance
                  </button>
                </div>
              </div>

              {attendanceSaved && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Attendance for {selectedBatch} ({attendanceDate}) saved successfully! Student portals updated.
                </div>
              )}

              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-purple-50/50 border-b border-purple-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#26002F]">{selectedBatch} • {students.length} Students</span>
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <span className="text-emerald-700">● Present: {students.filter(s => s.attendanceToday === 'Present').length}</span>
                    <span className="text-red-700">● Absent: {students.filter(s => s.attendanceToday === 'Absent').length}</span>
                    <span className="text-amber-700">● Late: {students.filter(s => s.attendanceToday === 'Late').length}</span>
                  </div>
                </div>

                <div className="divide-y divide-purple-50">
                  {students.map((student) => (
                    <div key={student.rollNo} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-purple-50/30 transition">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#26002F]">{student.rollNo}</span>
                          <span className="font-bold text-sm text-[#1E1B20]">{student.name}</span>
                        </div>
                        <p className="text-xs text-[#66616A]">{student.course} • Overall: {student.overallAttendance}%</p>
                      </div>

                      {/* Attendance Selector Buttons */}
                      <div className="flex items-center gap-1.5">
                        {(['Present', 'Absent', 'Late', 'Leave'] as const).map(status => {
                          const isSelected = student.attendanceToday === status;
                          return (
                            <button
                              key={status}
                              onClick={() => handleAttendanceChange(student.rollNo, status)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                                isSelected && status === 'Present' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' :
                                isSelected && status === 'Absent' ? 'bg-red-600 text-white border-red-600 shadow-sm' :
                                isSelected && status === 'Late' ? 'bg-amber-500 text-white border-amber-500 shadow-sm' :
                                isSelected && status === 'Leave' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' :
                                'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDY MATERIALS */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#26002F]">Study Materials &amp; Notes Repository</h2>
                  <p className="text-xs text-[#66616A]">Upload and share syllabus modules, cheatsheets, and lab manuals</p>
                </div>
                <button
                  onClick={() => setShowAddMaterial(true)}
                  className="bg-[#26002F] hover:bg-[#3d004b] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E4B52D]" />
                  Upload Material
                </button>
              </div>

              {/* Add Material Modal / Form */}
              {showAddMaterial && (
                <div className="bg-white p-5 rounded-2xl border-2 border-[#26002F] shadow-md animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-[#26002F]">Upload New Study Material</h3>
                    <button onClick={() => setShowAddMaterial(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleAddMaterial} className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Title / Document Name</label>
                      <input
                        type="text"
                        value={newMaterialTitle}
                        onChange={e => setNewMaterialTitle(e.target.value)}
                        placeholder="e.g. Tally Prime GST Invoicing Step-by-Step Guide"
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Subject</label>
                        <input
                          type="text"
                          value={newMaterialSubject}
                          onChange={e => setNewMaterialSubject(e.target.value)}
                          placeholder="e.g. Accounting"
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Assigned Batch</label>
                        <select className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none">
                          <option>All Batches</option>
                          <option>Morning Batch A</option>
                          <option>Morning Batch B</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddMaterial(false)}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-4 py-1.5 rounded-lg text-xs font-bold"
                      >
                        Upload &amp; Publish
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Material Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {materials.map(mat => (
                  <div key={mat.id} className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-[#26002F] mb-1">
                        {mat.subject} • {mat.fileType}
                      </span>
                      <h4 className="text-xs font-bold text-[#1E1B20] leading-snug">{mat.title}</h4>
                      <p className="text-[10px] text-[#66616A] mt-1">Size: {mat.size} • Uploaded: {mat.uploadDate}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading ${mat.title}`)} 
                      className="p-2 text-[#26002F] hover:bg-purple-50 rounded-lg transition"
                      title="Download Material"
                    >
                      <Download className="w-4 h-4 text-[#D83A27]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ASSIGNMENTS & GRADING */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#26002F]">Assignments &amp; Submissions</h2>
                  <p className="text-xs text-[#66616A]">Issue practical lab tasks and evaluate student work</p>
                </div>
                <button
                  onClick={() => setShowNewAssignment(true)}
                  className="bg-[#26002F] hover:bg-[#3d004b] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E4B52D]" />
                  Create Assignment
                </button>
              </div>

              {/* Create assignment form */}
              {showNewAssignment && (
                <div className="bg-white p-5 rounded-2xl border-2 border-[#26002F] shadow-md animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-[#26002F]">Create New Student Assignment</h3>
                    <button onClick={() => setShowNewAssignment(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateAssignment} className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Assignment Title</label>
                      <input
                        type="text"
                        value={newAssTitle}
                        onChange={e => setNewAssTitle(e.target.value)}
                        placeholder="e.g. Create GST Sales Invoice in Tally Prime"
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Subject</label>
                        <input
                          type="text"
                          value={newAssSubject}
                          onChange={e => setNewAssSubject(e.target.value)}
                          placeholder="e.g. Accounting Lab"
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Due Date</label>
                        <input
                          type="date"
                          value={newAssDue}
                          onChange={e => setNewAssDue(e.target.value)}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowNewAssignment(false)}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-4 py-1.5 rounded-lg text-xs font-bold"
                      >
                        Publish Assignment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Assignment list */}
              <div className="space-y-3">
                {assignments.map(ass => (
                  <div key={ass.id} className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1E1B20]">{ass.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ass.status === 'Graded' ? 'bg-emerald-100 text-emerald-800' :
                          ass.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {ass.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#66616A] mt-0.5">Subject: {ass.subject} • Due: {ass.dueDate}</p>
                      {ass.score && (
                        <p className="text-xs font-bold text-emerald-600 mt-1">Score: {ass.score} {ass.feedback && `• "${ass.feedback}"`}</p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedAssignmentToGrade(ass);
                        setGradeInput(ass.score || '92/100');
                        setFeedbackInput(ass.feedback || 'Good work on the practical application.');
                      }}
                      className="bg-purple-50 hover:bg-purple-100 text-[#26002F] px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#D83A27]" />
                      {ass.status === 'Graded' ? 'Edit Grade' : 'Grade Submission'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Grade Modal */}
              {selectedAssignmentToGrade && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-purple-200">
                    <h3 className="text-base font-bold text-[#26002F] mb-1">Evaluate Assignment</h3>
                    <p className="text-xs text-[#66616A] mb-4">{selectedAssignmentToGrade.title}</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Marks Obtained (e.g. 95/100)</label>
                        <input
                          type="text"
                          value={gradeInput}
                          onChange={e => setGradeInput(e.target.value)}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Faculty Feedback</label>
                        <textarea
                          value={feedbackInput}
                          onChange={e => setFeedbackInput(e.target.value)}
                          rows={3}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setSelectedAssignmentToGrade(null)}
                        className="px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveGrade}
                        className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-4 py-2 rounded-xl text-xs font-bold shadow"
                      >
                        Submit Grade
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-[#26002F]">Exam Marks Entry &amp; Publishing</h2>
                <p className="text-xs text-[#66616A]">Enter theory and practical assessment scores for batch publication</p>
              </div>

              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-purple-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#26002F]">Examination:</span>
                    <span className="text-xs font-black bg-purple-50 text-[#26002F] px-2.5 py-1 rounded-lg">Semester 1 Practical &amp; Viva (ADCA)</span>
                  </div>
                  <button 
                    onClick={() => alert('Marks published successfully to student portal!')}
                    className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Publish Results to Portal
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#26002F] text-white uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Roll No</th>
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-3">Theory (50)</th>
                        <th className="py-2.5 px-3">Practical (50)</th>
                        <th className="py-2.5 px-3">Total (100)</th>
                        <th className="py-2.5 px-3">Grade</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {[
                        { roll: 'TFT-2025-0842', name: 'Aman Kushwaha', th: 46, pr: 46, tot: 92, gr: 'A+', st: 'Pass' },
                        { roll: 'TFT-2025-0843', name: 'Neha Kumari', th: 48, pr: 48, tot: 96, gr: 'A+', st: 'Pass' },
                        { roll: 'TFT-2025-0844', name: 'Vikas Kumar', th: 38, pr: 42, tot: 80, gr: 'A', st: 'Pass' },
                        { roll: 'TFT-2025-0845', name: 'Pooja Singh', th: 44, pr: 44, tot: 88, gr: 'A', st: 'Pass' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-purple-50/50">
                          <td className="py-3 px-3 font-mono font-bold text-[#26002F]">{row.roll}</td>
                          <td className="py-3 px-3 font-bold text-[#1E1B20]">{row.name}</td>
                          <td className="py-3 px-3 font-semibold">{row.th}</td>
                          <td className="py-3 px-3 font-semibold">{row.pr}</td>
                          <td className="py-3 px-3 font-black text-[#26002F]">{row.tot}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded font-black text-[10px] bg-emerald-100 text-emerald-800">{row.gr}</span>
                          </td>
                          <td className="py-3 px-3 text-emerald-600 font-bold">{row.st}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={DEMO_TEACHER.avatar} 
                  alt={DEMO_TEACHER.name} 
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#26002F]"
                />
                <div>
                  <h2 className="text-lg font-black text-[#26002F]">{DEMO_TEACHER.name}</h2>
                  <p className="text-xs text-[#D83A27] font-bold">{DEMO_TEACHER.designation}</p>
                  <p className="text-[11px] text-[#66616A]">{DEMO_TEACHER.qualification}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-purple-100 pt-4">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-[#66616A]">Faculty ID:</span>
                  <span className="font-mono font-bold text-[#26002F]">{DEMO_TEACHER.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-[#66616A]">Official Email:</span>
                  <span className="font-bold text-[#26002F]">{DEMO_TEACHER.email}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-[#66616A]">Phone:</span>
                  <span className="font-bold text-[#26002F]">{DEMO_TEACHER.phone}</span>
                </div>
                <div className="py-1.5">
                  <span className="text-[#66616A] block mb-1">Assigned Courses:</span>
                  <div className="flex flex-wrap gap-1">
                    {DEMO_TEACHER.assignedCourses.map((c, i) => (
                      <span key={i} className="bg-purple-50 text-[#26002F] px-2 py-0.5 rounded text-[10px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
