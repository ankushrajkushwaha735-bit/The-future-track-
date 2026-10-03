import React, { useState, useMemo } from 'react';
import { useAdmin } from '../AdminContext';
import { StudentRecord } from '../types';
import { 
  Users, 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Printer, 
  X,
  Eye,
  Download
} from 'lucide-react';
import { Logo } from '../../components/Logo';

interface StudentsPageProps {
  initialSubTab?: 'all' | 'add' | 'idcards';
}

export const StudentsPage: React.FC<StudentsPageProps> = ({ initialSubTab = 'all' }) => {
  const { students, addStudent, updateStudent, deleteStudent, courses, batches } = useAdmin();

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'add' | 'idcards'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Selected student for Profile Drawer & ID Card
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [printingIdCardStudent, setPrintingIdCardStudent] = useState<StudentRecord | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<StudentRecord | null>(null);

  // Add Student Form State
  const [formData, setFormData] = useState({
    name: '',
    guardianName: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: 'City Centre, Dhanbad, Jharkhand',
    dob: '2005-01-01',
    gender: 'Male' as any,
    course: courses[0]?.name || 'ADCA',
    batchTime: 'Morning Batch (10:00 AM - 12:00 PM)',
    totalFee: 12000,
    paidFee: 6000,
  });

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery) ||
        s.course.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCourse = courseFilter === 'all' || s.course === courseFilter;
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;

      return matchSearch && matchCourse && matchStatus;
    });
  }, [students, searchQuery, courseFilter, statusFilter]);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    addStudent({
      name: formData.name,
      guardianName: formData.guardianName,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@student.thefuturetrack.edu.in`,
      address: formData.address,
      dob: formData.dob,
      gender: formData.gender,
      course: formData.course,
      batchTime: formData.batchTime,
      totalFee: Number(formData.totalFee),
      paidFee: Number(formData.paidFee),
      feeStatus: Number(formData.paidFee) >= Number(formData.totalFee) ? 'Paid' : 'Partial',
    });

    setFormData({
      name: '',
      guardianName: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: 'City Centre, Dhanbad, Jharkhand',
      dob: '2005-01-01',
      gender: 'Male',
      course: courses[0]?.name || 'ADCA',
      batchTime: 'Morning Batch (10:00 AM - 12:00 PM)',
      totalFee: 12000,
      paidFee: 6000,
    });
    setActiveSubTab('all');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-1">
            <span>Student Information System (SIS)</span>
          </div>
          <h1 className="text-2xl font-black text-[#26002F]">
            Students Directory &amp; Credentials
          </h1>
          <p className="text-xs text-[#66616A]">
            Manage student records, track attendance benchmarks, verify academic documents, and print official ID cards.
          </p>
        </div>

        <button
          onClick={() => setActiveSubTab('add')}
          className="inline-flex items-center gap-2 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Enroll New Student</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveSubTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'all'
              ? 'bg-[#26002F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>All Students ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('idcards')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'idcards'
              ? 'bg-[#26002F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>Student ID Cards</span>
        </button>

        <button
          onClick={() => setActiveSubTab('add')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'add'
              ? 'bg-[#26002F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>+ Register Student</span>
        </button>
      </div>

      {/* SUBTAB: ALL STUDENTS */}
      {activeSubTab === 'all' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, roll number, course..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="text-xs p-2 rounded-xl border border-gray-200 bg-white font-medium focus:outline-none max-w-[200px] truncate"
              >
                <option value="all">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs p-2 rounded-xl border border-gray-200 bg-white font-medium focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#26002F] text-white uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Course &amp; Batch</th>
                    <th className="p-3.5">Attendance</th>
                    <th className="p-3.5">Fee Status</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-[#F7F5F8] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#D83A27]">
                        {s.id}
                      </td>

                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={s.photo}
                          alt={s.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#26002F]"
                        />
                        <div>
                          <strong className="block text-gray-800 font-bold">{s.name}</strong>
                          <span className="text-[11px] text-gray-400">{s.phone}</span>
                        </div>
                      </td>

                      <td className="p-3.5 max-w-[200px]">
                        <span className="font-semibold text-gray-800 block truncate">{s.course}</span>
                        <span className="text-[10px] text-gray-400">{s.batchTime}</span>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-[#26002F]">
                          <span>{s.attendancePercentage}%</span>
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className="bg-green-600 h-1.5 rounded-full"
                            style={{ width: `${s.attendancePercentage}%` }}
                          />
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.feeStatus === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : s.feeStatus === 'Partial'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {s.feeStatus} (₹{s.paidFee.toLocaleString('en-IN')})
                        </span>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {s.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#26002F] hover:text-white text-gray-600 transition-colors"
                            title="View Student Profile Drawer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setPrintingIdCardStudent(s)}
                            className="p-1.5 rounded-lg bg-purple-50 hover:bg-[#26002F] hover:text-white text-[#26002F] transition-colors"
                            title="Generate Official Student ID Card"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setStudentToDelete(s)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-[#D83A27] hover:text-white text-[#D83A27] transition-colors"
                            title="Archive / Remove Student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: ID CARDS GALLERY */}
      {activeSubTab === 'idcards' && (
        <div className="space-y-4">
          <div className="bg-[#26002F] text-white p-6 rounded-3xl flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold">Official The Future Track Student ID Cards</h3>
              <p className="text-xs text-gray-300">Printable tamper-resistant student identification cards with photo &amp; barcode</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#D83A27] text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Cards Batch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-3xl p-5 border-2 border-gray-200 shadow-md flex flex-col justify-between relative overflow-hidden"
              >
                {/* ID Card Top Band */}
                <div className="bg-[#26002F] -m-5 mb-4 p-4 text-white flex items-center gap-2.5">
                  <Logo size="sm" inverted={true} showText={false} />
                  <div>
                    <h4 className="text-xs font-black tracking-tight uppercase">The Future Track</h4>
                    <span className="text-[9px] text-[#E4B52D] font-bold block">Computer Education • Dhanbad</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-1">
                  <img
                    src={st.photo}
                    alt={st.name}
                    className="w-20 h-24 rounded-2xl object-cover border-2 border-[#D83A27] shadow-sm"
                  />
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono font-black text-[#D83A27] block">{st.id}</span>
                    <strong className="block text-sm font-extrabold text-[#1E1B20]">{st.name}</strong>
                    <span className="text-[11px] text-gray-600 block leading-tight">{st.course.split('(')[0]}</span>
                    <span className="text-[10px] text-gray-400 block">Valid: Session 2026-27</span>
                  </div>
                </div>

                {/* ID Card Bottom Strip */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
                  <span>Bartand, Dhanbad Campus</span>
                  <button
                    onClick={() => setPrintingIdCardStudent(st)}
                    className="text-[#D83A27] font-bold hover:underline"
                  >
                    Print ID Slip →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB: ADD STUDENT FORM */}
      {activeSubTab === 'add' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm max-w-3xl space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-[#26002F]">
              Enrollment Registration Form
            </h3>
            <p className="text-xs text-gray-500">
              Create an official student record with course allocation, lab batch time slot, and fee structure.
            </p>
          </div>

          <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Father / Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="e.g. Suresh Kumar"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit number"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="Same as mobile"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Enroll In Course *</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-medium"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>{c.name} ({c.duration})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Batch Preference</label>
                <select
                  value={formData.batchTime}
                  onChange={(e) => setFormData({ ...formData, batchTime: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-medium"
                >
                  <option value="Morning Batch (08:00 AM - 10:00 AM)">Morning Batch (08:00 AM - 10:00 AM)</option>
                  <option value="Morning Batch (10:00 AM - 12:00 PM)">Morning Batch (10:00 AM - 12:00 PM)</option>
                  <option value="Afternoon Batch (01:00 PM - 03:00 PM)">Afternoon Batch (01:00 PM - 03:00 PM)</option>
                  <option value="Evening Batch (04:00 PM - 06:00 PM)">Evening Batch (04:00 PM - 06:00 PM)</option>
                  <option value="Weekend Special Batch">Weekend Special Batch</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Total Course Fee (₹)</label>
                <input
                  type="number"
                  value={formData.totalFee}
                  onChange={(e) => setFormData({ ...formData, totalFee: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-[#26002F]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1E1B20] mb-1">Initial Paid Amount (₹)</label>
                <input
                  type="number"
                  value={formData.paidFee}
                  onChange={(e) => setFormData({ ...formData, paidFee: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-green-700"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setActiveSubTab('all')}
                className="px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#D83A27] hover:bg-[#BF2F1E] text-white font-bold shadow-md"
              >
                Confirm &amp; Generate Student ID
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STUDENT PROFILE DRAWER (Section 12) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in" onClick={() => setSelectedStudent(null)}>
          <div
            className="bg-white w-full max-w-lg h-full overflow-y-auto p-6 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-[#D83A27] tracking-wider block">Official Profile</span>
                <h3 className="text-lg font-black text-[#26002F]">{selectedStudent.name}</h3>
                <span className="text-xs text-gray-400 font-mono">{selectedStudent.id}</span>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-1 rounded-lg text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#F7F5F8] rounded-2xl border border-gray-100">
              <img
                src={selectedStudent.photo}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#26002F]"
              />
              <div className="text-xs space-y-0.5">
                <strong className="block text-sm text-[#1E1B20]">{selectedStudent.name}</strong>
                <span className="text-gray-500 block">Guardian: {selectedStudent.guardianName}</span>
                <span className="text-gray-500 block">Phone: {selectedStudent.phone}</span>
                <span className="text-[#D83A27] font-semibold block">{selectedStudent.course}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Attendance Avg</span>
                <span className="text-base font-extrabold text-[#26002F]">{selectedStudent.attendancePercentage}%</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Exam Overall Score</span>
                <span className="text-base font-extrabold text-green-700">{selectedStudent.overallScore}%</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Total Fee</span>
                <span className="text-base font-extrabold text-gray-800">₹{selectedStudent.totalFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Paid / Balance</span>
                <span className="text-base font-extrabold text-green-600">₹{selectedStudent.paidFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Verified Documents (Section 13) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#26002F] block">Uploaded Documents (Protected)</span>
              <div className="space-y-1.5 text-xs">
                {selectedStudent.documents.map((doc) => (
                  <div key={doc.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#D83A27]" />
                      <div>
                        <strong className="block text-gray-800 text-xs">{doc.name}</strong>
                        <span className="text-[10px] text-gray-400">{doc.type} • {doc.uploadDate}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => {
                  setPrintingIdCardStudent(selectedStudent);
                  setSelectedStudent(null);
                }}
                className="flex-1 bg-[#26002F] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-[#E4B52D]" />
                <span>Print ID Card</span>
              </button>

              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ID CARD PRINT PREVIEW MODAL */}
      {printingIdCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-[#26002F]">Student ID Card Preview</span>
              <button onClick={() => setPrintingIdCardStudent(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable ID Card */}
            <div className="bg-[#26002F] text-white p-5 rounded-3xl border-4 border-[#E4B52D] space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <Logo size="sm" inverted={true} showText={false} />
                  <div>
                    <h3 className="text-xs font-black tracking-wider uppercase text-white">The Future Track</h3>
                    <span className="text-[9px] text-[#E4B52D] font-bold block">Computer Education • Dhanbad</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">STUDENT</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={printingIdCardStudent.photo}
                  alt={printingIdCardStudent.name}
                  className="w-20 h-24 rounded-2xl object-cover border-2 border-white"
                />
                <div className="space-y-1 text-xs">
                  <div className="text-[10px] font-mono text-[#E4B52D] font-black">{printingIdCardStudent.id}</div>
                  <div className="text-sm font-black text-white">{printingIdCardStudent.name}</div>
                  <div className="text-[11px] text-gray-200 leading-tight">{printingIdCardStudent.course}</div>
                  <div className="text-[10px] text-gray-300">Guardian: {printingIdCardStudent.guardianName}</div>
                  <div className="text-[10px] text-gray-300">Valid: Session 2026-27</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] text-gray-300">
                <span>Bartand, Dhanbad Campus (Jharkhand)</span>
                <span className="font-mono text-[#E4B52D] font-bold">||||| |||| |||||||</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPrintingIdCardStudent(null)}
                className="px-4 py-2 bg-gray-100 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#D83A27] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print ID Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Section 43) */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#26002F]">
              Archive Student Record?
            </h4>
            <p className="text-xs text-[#66616A] leading-relaxed">
              Are you sure you want to remove <strong>{studentToDelete.name}</strong> ({studentToDelete.id}) from the active roster? Academic history will be archived.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteStudent(studentToDelete.id);
                  setStudentToDelete(null);
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow"
              >
                Yes, Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
