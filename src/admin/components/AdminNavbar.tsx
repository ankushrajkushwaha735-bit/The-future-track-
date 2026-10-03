import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { AdminRole } from '../types';
import { 
  Menu, 
  Search, 
  Bell, 
  Inbox, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onNavigate: (page: string) => void;
  onReturnToWebsite: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onNavigate,
  onReturnToWebsite,
}) => {
  const { currentUser, activeRole, switchRole, logout, enquiries, students, courses } = useAdmin();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const rolesList: AdminRole[] = [
    'Super Admin',
    'Admin',
    'Accountant',
    'Teacher',
    'Admission Manager',
    'Content Manager',
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Sidebar Toggle & Quick Global Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-[#26002F] hover:bg-[#F7F5F8] transition-colors focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F7F5F8] border border-gray-200/80 text-xs text-gray-500 hover:border-[#D83A27] hover:text-[#1E1B20] transition-all w-60 lg:w-72 text-left"
        >
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <span className="flex-1 truncate">Search students, courses, leads...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-gray-400 border border-gray-200 shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Notifications, Role Switcher, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Quick Return to Public Website */}
        <button
          onClick={onReturnToWebsite}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#26002F] hover:bg-[#26002F] hover:text-white transition-all shadow-2xs"
          title="Open Public Website"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#E4B52D]" />
          <span>Public Website</span>
        </button>

        {/* Enquiries Indicator */}
        <button
          onClick={() => onNavigate('admissions-enquiries')}
          className="relative p-2 rounded-xl text-[#1E1B20] hover:bg-[#F7F5F8] transition-colors"
          title="New Enquiries"
        >
          <Inbox className="w-4 h-4 text-[#26002F]" />
          {pendingEnquiriesCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D83A27] text-white text-[10px] font-black flex items-center justify-center animate-pulse">
              {pendingEnquiriesCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileDropdownOpen(false);
              setRoleDropdownOpen(false);
            }}
            className="relative p-2 rounded-xl text-[#1E1B20] hover:bg-[#F7F5F8] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[#26002F]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E4B52D]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 px-1">
                <span className="text-xs font-bold text-[#26002F]">Recent Alerts</span>
                <span className="text-[10px] font-bold text-[#D83A27] bg-[#D83A27]/10 px-2 py-0.5 rounded-full">
                  Live System
                </span>
              </div>
              <div className="space-y-1.5 mt-2 text-xs">
                <div className="p-2 rounded-xl bg-[#F7F5F8] space-y-0.5">
                  <strong className="block text-[11px] text-[#1E1B20]">New Enquiry from Pooja Kumari</strong>
                  <p className="text-[10px] text-gray-500">Interested in 1-year ADCA diploma with Tally GST.</p>
                </div>
                <div className="p-2 rounded-xl bg-[#F7F5F8] space-y-0.5">
                  <strong className="block text-[11px] text-[#1E1B20]">Fee Installment Received</strong>
                  <p className="text-[10px] text-gray-500">Receipt #RCPT-8424 generated for Vikas Sharma.</p>
                </div>
                <div className="p-2 rounded-xl bg-[#F7F5F8] space-y-0.5">
                  <strong className="block text-[11px] text-[#1E1B20]">Certificate Ready for Verification</strong>
                  <p className="text-[10px] text-gray-500">Certificate TFT-CERT-2026-1044 active online.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Pill for instant multi-role testing */}
        <div className="relative">
          <button
            onClick={() => {
              setRoleDropdownOpen(!roleDropdownOpen);
              setProfileDropdownOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#26002F]/5 border border-[#26002F]/15 hover:bg-[#26002F]/10 transition-colors text-xs font-bold text-[#26002F]"
            title="Switch Active Testing Role"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D83A27]" />
            <span className="hidden xl:inline text-gray-500 font-medium">Role:</span>
            <span>{activeRole}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 py-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E4B52D]" />
                <span>Simulate Admin Role</span>
              </div>
              <div className="space-y-1">
                {rolesList.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      activeRole === r ? 'bg-[#26002F] text-white' : 'hover:bg-[#F7F5F8] text-[#1E1B20]'
                    }`}
                  >
                    <span>{r}</span>
                    {activeRole === r && <Check className="w-3.5 h-3.5 text-[#E4B52D]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setRoleDropdownOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1 pl-2 rounded-2xl hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#26002F]/20 bg-[#26002F]">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                alt={currentUser?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-bold text-[#1E1B20] block leading-tight">
                {currentUser?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold block leading-none">
                {activeRole}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-3 border-b border-gray-100">
                <strong className="block text-xs text-[#1E1B20] font-bold">
                  {currentUser?.name}
                </strong>
                <span className="text-[11px] text-gray-400 block truncate">
                  {currentUser?.email}
                </span>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black bg-[#26002F] text-[#E4B52D]">
                  {activeRole}
                </span>
              </div>

              <div className="py-1 space-y-0.5 text-xs">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onNavigate('users');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F7F5F8] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>My Profile &amp; Staff</span>
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-[#F7F5F8] flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  <span>Account Settings</span>
                </button>
              </div>

              <div className="pt-1 border-t border-gray-100">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-xs flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
