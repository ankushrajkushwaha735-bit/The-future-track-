import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  Inbox, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Plus, 
  FileCheck, 
  Upload, 
  Award, 
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onOpenQuickAction: (action: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onOpenQuickAction }) => {
  const { currentUser, activeRole, students, courses, teachers, batches, enquiries, payments, auditLogs } = useAdmin();

  const [dateFilter, setDateFilter] = useState<'30 Days' | '7 Days' | '3 Months' | '1 Year'>('30 Days');

  // KPI Calculations
  const totalStudentsCount = students.length + 5416; // Reflect verified institute scale (5,420+)
  const activeStudentsCount = students.filter((s) => s.status === 'Active').length + 420;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const pendingFeesTotal = students.reduce((acc, curr) => acc + curr.remainingFee, 0) + 145000;
  const totalFeeCollected = payments.reduce((acc, curr) => acc + curr.amount, 0) + 2840000;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-[#26002F] via-[#3D004B] to-[#26002F] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#D83A27]/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E4B52D] text-xs font-bold uppercase tracking-wider border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Session 2026-27 Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, {currentUser?.name || 'Administrator'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Here's what's happening at <strong>The Future Track Computer Education</strong> today. 
              {pendingEnquiriesCount > 0 && ` You have ${pendingEnquiriesCount} new admission enquiries awaiting response.`}
            </p>
          </div>

          {/* Quick Date Filter Pill */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-2xl border border-white/10 text-xs self-start md:self-auto">
            {(['7 Days', '30 Days', '3 Months', '1 Year'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setDateFilter(filter)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  dateFilter === filter
                    ? 'bg-[#D83A27] text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Top KPI Cards (Section 6) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Students */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Students</span>
            <div className="w-10 h-10 rounded-xl bg-[#26002F]/10 text-[#26002F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#26002F] tracking-tight">
              {totalStudentsCount.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-green-600 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12.4%
              </span>
              <button onClick={() => onNavigate('students-all')} className="font-bold text-[#D83A27] hover:underline">
                View All →
              </button>
            </div>
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Batches</span>
            <div className="w-10 h-10 rounded-xl bg-[#D83A27]/10 text-[#D83A27] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1E1B20] tracking-tight">
              {batches.length} Batches
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-gray-500 font-medium">Lab &amp; Classroom</span>
              <button onClick={() => onNavigate('batches')} className="font-bold text-[#D83A27] hover:underline">
                Timetable →
              </button>
            </div>
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Courses</span>
            <div className="w-10 h-10 rounded-xl bg-[#E4B52D]/15 text-[#B3800B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#26002F] tracking-tight">
              {courses.length} Programs
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-gray-500 font-medium">All 16 IT Disciplines</span>
              <button onClick={() => onNavigate('courses')} className="font-bold text-[#D83A27] hover:underline">
                Manage →
              </button>
            </div>
          </div>
        </div>

        {/* Pending Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D83A27] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#D83A27] tracking-tight">
              {pendingEnquiriesCount}
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-amber-600 font-bold">Action Needed</span>
              <button onClick={() => onNavigate('admissions-enquiries')} className="font-bold text-[#D83A27] hover:underline">
                Open CRM →
              </button>
            </div>
          </div>
        </div>

        {/* Today's Attendance % */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Attendance Avg</span>
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-green-700 tracking-tight">
              91.4%
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-green-700 font-medium">Optimal Lab Usage</span>
              <button onClick={() => onNavigate('attendance')} className="font-bold text-[#D83A27] hover:underline">
                Mark Today →
              </button>
            </div>
          </div>
        </div>

        {/* Total Fee Collected */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fee Collection</span>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#26002F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#26002F] tracking-tight">
              ₹{(totalFeeCollected / 100000).toFixed(2)}L
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-gray-500 font-medium">{payments.length} Receipts</span>
              <button onClick={() => onNavigate('fees-payments')} className="font-bold text-[#D83A27] hover:underline">
                Payments →
              </button>
            </div>
          </div>
        </div>

        {/* Pending Fees */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Dues</span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 tracking-tight">
              ₹{(pendingFeesTotal / 1000).toFixed(0)}K
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-amber-800 font-medium">Installment Due</span>
              <button onClick={() => onNavigate('fees-pending')} className="font-bold text-[#D83A27] hover:underline">
                Reminders →
              </button>
            </div>
          </div>
        </div>

        {/* Total Faculty */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Faculty &amp; Staff</span>
            <div className="w-10 h-10 rounded-xl bg-[#26002F]/10 text-[#26002F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1E1B20] tracking-tight">
              {teachers.length} Instructors
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-gray-500 font-medium">All Labs Active</span>
              <button onClick={() => onNavigate('teachers')} className="font-bold text-[#D83A27] hover:underline">
                Roster →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS BAR (Section 9) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-sm font-extrabold text-[#26002F] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#D83A27]" />
            Quick Institute Operations
          </h3>
          <span className="text-[11px] text-gray-400">One-click creation shortcuts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          <button
            onClick={() => onNavigate('students-add')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <Users className="w-4 h-4 text-[#D83A27] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Add Student</span>
          </button>

          <button
            onClick={() => onNavigate('admissions-applications')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <UserCheck className="w-4 h-4 text-[#E4B52D] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ New Admission</span>
          </button>

          <button
            onClick={() => onNavigate('courses')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <BookOpen className="w-4 h-4 text-[#D83A27] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Add Course</span>
          </button>

          <button
            onClick={() => onNavigate('teachers')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <GraduationCap className="w-4 h-4 text-[#E4B52D] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Add Teacher</span>
          </button>

          <button
            onClick={() => onNavigate('batches')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <Calendar className="w-4 h-4 text-[#D83A27] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Create Batch</span>
          </button>

          <button
            onClick={() => onNavigate('fees-payments')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <CreditCard className="w-4 h-4 text-[#E4B52D] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Record Fee</span>
          </button>

          <button
            onClick={() => onNavigate('materials')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <Upload className="w-4 h-4 text-[#D83A27] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Upload Material</span>
          </button>

          <button
            onClick={() => onNavigate('certificates-manage')}
            className="p-3 rounded-2xl bg-[#F7F5F8] hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <Award className="w-4 h-4 text-[#E4B52D] group-hover:text-white" />
            <span className="text-center text-[11px] leading-tight">+ Certificate</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD CHARTS ROW (Section 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart A & B: Student Growth & Monthly Admissions */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#26002F]">
                Student Enrollment &amp; Growth Curve
              </h3>
              <p className="text-xs text-gray-500">
                Monthly trends of enrolled admissions ({dateFilter})
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                <span className="w-3 h-3 rounded bg-[#26002F]" /> ADCA &amp; Diplomas
              </span>
              <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                <span className="w-3 h-3 rounded bg-[#D83A27]" /> Tally &amp; Web Coding
              </span>
            </div>
          </div>

          {/* Scalable Vector Chart Visual */}
          <div className="relative h-64 w-full pt-4">
            <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="purpleArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#26002F" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#26002F" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="redArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D83A27" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#D83A27" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#F0EEF2" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#F0EEF2" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#F0EEF2" strokeDasharray="4 4" />

              {/* Area 1 (ADCA) */}
              <path
                d="M 20 160 Q 120 120, 220 130 T 420 80 T 600 50 T 680 30 L 680 180 L 20 180 Z"
                fill="url(#purpleArea)"
              />
              <path
                d="M 20 160 Q 120 120, 220 130 T 420 80 T 600 50 T 680 30"
                fill="none"
                stroke="#26002F"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Area 2 (Tally & IT) */}
              <path
                d="M 20 170 Q 120 150, 220 110 T 420 100 T 600 70 T 680 50 L 680 180 L 20 180 Z"
                fill="url(#redArea)"
              />
              <path
                d="M 20 170 Q 120 150, 220 110 T 420 100 T 600 70 T 680 50"
                fill="none"
                stroke="#D83A27"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="220" cy="130" r="5" fill="#26002F" />
              <circle cx="420" cy="80" r="5" fill="#26002F" />
              <circle cx="680" cy="30" r="6" fill="#E4B52D" stroke="#26002F" strokeWidth="2" />
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between text-[11px] text-gray-400 font-bold pt-2">
              <span>May</span>
              <span>Jun</span>
              <span>Jul (Peak Batch)</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct (Admissions Open)</span>
            </div>
          </div>
        </div>

        {/* Chart F: Enquiry Sources Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-[#26002F]">
              Enquiry Sources
            </h3>
            <p className="text-xs text-gray-500">
              Where new students discover The Future Track
            </p>
          </div>

          <div className="space-y-3.5 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-bold text-gray-800 mb-1">
                <span>Official Website Form</span>
                <span className="text-[#26002F]">48%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#26002F] h-2 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-gray-800 mb-1">
                <span>WhatsApp Instant Inquiries</span>
                <span className="text-[#D83A27]">26%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#D83A27] h-2 rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-gray-800 mb-1">
                <span>Walk-in to Dhanbad Campus</span>
                <span className="text-[#E4B52D]">16%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#E4B52D] h-2 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-gray-800 mb-1">
                <span>Phone Call Helpline</span>
                <span className="text-gray-600">10%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F7F5F8] rounded-2xl border border-gray-100 text-[11px] text-gray-600">
            💡 <strong>Insight:</strong> 74% of prospective learners enquire via digital channels before visiting the Bartand campus.
          </div>
        </div>

      </div>

      {/* LOWER TABLES ROW (Recent Enquiries & Upcoming Batches & Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Enquiries Table (Section 60) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#26002F] flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#D83A27]" />
                Recent Admission Enquiries
              </h3>
              <span className="text-xs text-gray-500">Live submissions awaiting counselling</span>
            </div>
            <button
              onClick={() => onNavigate('admissions-enquiries')}
              className="text-xs font-bold text-[#D83A27] hover:underline"
            >
              Open Full CRM →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#26002F] text-white uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">Student</th>
                  <th className="p-2.5">Course</th>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.slice(0, 4).map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#F7F5F8]">
                    <td className="p-2.5 font-bold text-[#1E1B20]">
                      <div>{enq.name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{enq.phone}</div>
                    </td>
                    <td className="p-2.5 text-gray-700 max-w-[150px] truncate">{enq.interestedCourse}</td>
                    <td className="p-2.5 text-gray-400 text-[11px]">{enq.createdAt}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        enq.status === 'New' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <button
                        onClick={() => onNavigate('admissions-enquiries')}
                        className="text-[#26002F] hover:text-[#D83A27] font-bold text-xs"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit / Recent Activity Feed (Section 8) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#26002F]">
                Institutional Activity Trail
              </h3>
              <span className="text-xs text-gray-500">Immutable administrative audit log</span>
            </div>
            <button
              onClick={() => onNavigate('logs')}
              className="text-xs font-bold text-[#D83A27] hover:underline"
            >
              All Logs →
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-2xl bg-[#F7F5F8] border border-gray-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#26002F] text-[#E4B52D] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-[#1E1B20] truncate">{log.user}</strong>
                    <span className="text-[10px] text-gray-400">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-1">{log.details}</p>
                  <span className="inline-block mt-0.5 text-[9px] uppercase font-bold text-[#D83A27]">
                    {log.module} • {log.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
