import React, { useState } from 'react';
import { Logo } from '../../components/Logo';
import { useAdmin } from '../AdminContext';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  Award, 
  CreditCard, 
  Globe, 
  Bell, 
  BarChart3, 
  Settings, 
  FolderLock, 
  History, 
  LogOut, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Inbox,
  UserPlus,
  Briefcase,
  Layers,
  FileSpreadsheet,
  Receipt,
  FileCheck,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  PhoneCall,
  Sliders,
  ShieldCheck,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onReturnToWebsite: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onCloseMobile,
  onReturnToWebsite,
}) => {
  const { currentUser, activeRole, hasPermission, logout, enquiries } = useAdmin();

  // Collapsible section states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    students: true,
    academics: true,
    academicMgmt: false,
    finance: true,
    certificates: false,
    cms: false,
    system: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const pendingEnquiries = enquiries.filter((e) => e.status === 'New').length;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#26002F] text-white flex flex-col shrink-0 border-r border-[#3D004B] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Logo Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#1E0025]">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" inverted={true} showText={false} />
            <div>
              <h2 className="text-xs font-black tracking-tight text-white uppercase leading-none">
                The Future Track
              </h2>
              <span className="text-[10px] text-[#E4B52D] font-extrabold block mt-0.5 tracking-wider">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 rounded-lg text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Banner */}
        <div className="p-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={currentUser?.name}
              className="w-9 h-9 rounded-xl object-cover border border-[#E4B52D]"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate leading-tight">
                {currentUser?.name}
              </span>
              <span className="text-[10px] text-[#E4B52D] font-semibold block leading-none mt-0.5">
                {activeRole}
              </span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Online Session" />
        </div>

        {/* Scrollable Nav Hierarchy matching Section 59 */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs scrollbar-thin scrollbar-thumb-white/20">
          
          {/* Dashboard */}
          <div>
            <button
              onClick={() => {
                onNavigate('dashboard');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-[#D83A27] text-white shadow-md'
                  : 'text-gray-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#E4B52D]" />
              <span>Dashboard Overview</span>
            </button>
          </div>

          {/* 📊 OVERVIEW / ADMISSIONS */}
          {hasPermission('admissions') && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('overview')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>📊 Admissions &amp; Leads</span>
                {openSections.overview ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.overview && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('admissions-applications');
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'admissions-applications' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>Applications</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('admissions-enquiries');
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'admissions-enquiries' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>Enquiries &amp; Leads</span>
                    {pendingEnquiries > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#E4B52D] text-[#26002F]">
                        {pendingEnquiries} New
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('admissions-followups');
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'admissions-followups' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>Follow-ups &amp; CRM</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 👨‍🎓 STUDENTS */}
          {hasPermission('students') && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('students')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>👨‍🎓 Students</span>
                {openSections.students ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.students && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('students-all');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'students-all' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    All Enrolled Students
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('students-add');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'students-add' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    + Add New Student
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('students-idcards');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'students-idcards' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Student ID Cards
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 👨‍🏫 ACADEMICS */}
          {(hasPermission('courses') || hasPermission('teachers') || hasPermission('batches')) && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('academics')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>👨‍🏫 Academics</span>
                {openSections.academics ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.academics && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('teachers');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'teachers' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Teachers &amp; Faculty
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('courses');
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'courses' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>Courses (16 Programs)</span>
                    <span className="text-[10px] font-bold text-[#E4B52D]">16</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('batches');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'batches' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Batches &amp; Timetable
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 📝 ACADEMIC MANAGEMENT */}
          {(hasPermission('attendance') || hasPermission('exams') || hasPermission('assignments') || hasPermission('materials')) && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('academicMgmt')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>📝 Academic Mgmt</span>
                {openSections.academicMgmt ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.academicMgmt && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('attendance');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'attendance' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Attendance Marking
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('exams');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'exams' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Exams &amp; Results
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('assignments');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'assignments' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Assignments
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('materials');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'materials' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Study Materials
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 💰 FINANCE */}
          {hasPermission('fees') && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('finance')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>💰 Finance &amp; Fees</span>
                {openSections.finance ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.finance && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('fees-payments');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'fees-payments' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Payments &amp; Receipts
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('fees-pending');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'fees-pending' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Pending Fee Dues
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 🏆 CERTIFICATES */}
          {hasPermission('certificates') && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('certificates')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>🏆 Certificates</span>
                {openSections.certificates ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.certificates && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('certificates-manage');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'certificates-manage' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Generate &amp; Manage
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('certificates-verify');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'certificates-verify' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Online Verification Tool
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 🌐 WEBSITE CMS */}
          {hasPermission('cms') && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('cms')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>🌐 Website CMS</span>
                {openSections.cms ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.cms && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('cms-homepage');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'cms-homepage' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Hero, Banner &amp; Contact CMS
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('cms-gallery');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'cms-gallery' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Campus Photo Gallery
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('cms-faq');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'cms-faq' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    FAQ Management
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 📢 NOTIFICATIONS */}
          {hasPermission('notifications') && (
            <div>
              <button
                onClick={() => {
                  onNavigate('notifications');
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
                  currentPage === 'notifications' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Bell className="w-4 h-4 text-[#E4B52D]" />
                <span>Notifications &amp; Alerts</span>
              </button>
            </div>
          )}

          {/* 📈 REPORTS */}
          {hasPermission('reports') && (
            <div>
              <button
                onClick={() => {
                  onNavigate('reports');
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
                  currentPage === 'reports' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-[#E4B52D]" />
                <span>Reports &amp; Analytics</span>
              </button>
            </div>
          )}

          {/* ⚙️ SYSTEM */}
          {(hasPermission('users') || hasPermission('settings') || hasPermission('logs') || hasPermission('media')) && (
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('system')}
                className="w-full flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1 hover:text-white"
              >
                <span>⚙️ System</span>
                {openSections.system ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openSections.system && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => {
                      onNavigate('users');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'users' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Users &amp; Roles
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('settings');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'settings' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    System Settings
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('media');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'media' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Media Library
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('logs');
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all ${
                      currentPage === 'logs' ? 'bg-[#D83A27] text-white font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Audit Activity Logs
                  </button>
                </div>
              )}
            </div>
          )}

        </nav>

        {/* Footer Controls: Public Website & Logout */}
        <div className="p-3 border-t border-white/10 space-y-2 shrink-0 bg-[#1E0025]">
          <button
            onClick={onReturnToWebsite}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
          >
            <span>Public Website View</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#D83A27]/20 hover:bg-[#D83A27] text-xs font-bold text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>

      </aside>
    </>
  );
};
