import React, { useState } from 'react';
import { Logo } from './Logo';
import { X, User, ShieldCheck, Lock, ArrowRight, Sparkles, GraduationCap, Briefcase } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  type: 'student' | 'teacher' | 'admin';
  onClose: () => void;
  onSuccessLogin: (targetType: 'student' | 'teacher' | 'admin') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  type: initialType,
  onClose,
  onSuccessLogin,
}) => {
  const [activeRole, setActiveRole] = useState<'student' | 'teacher' | 'admin'>(initialType || 'student');
  
  const [username, setUsername] = useState(
    initialType === 'student' ? 'TFT-2025-0842' :
    initialType === 'teacher' ? 'TFT-TEACHER-01' : 'admin@thefuturetrack.edu.in'
  );
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRoleSwitch = (newRole: 'student' | 'teacher' | 'admin') => {
    setActiveRole(newRole);
    if (newRole === 'student') {
      setUsername('TFT-2025-0842');
      setPassword('student123');
    } else if (newRole === 'teacher') {
      setUsername('TFT-TEACHER-01');
      setPassword('teacher123');
    } else {
      setUsername('admin@thefuturetrack.edu.in');
      setPassword('admin123');
    }
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please provide your login credentials.');
      return;
    }
    setError('');
    onSuccessLogin(activeRole);
  };

  const handleQuickDemo = () => {
    onSuccessLogin(activeRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        
        {/* Top Header */}
        <div className="bg-[#26002F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D83A27] text-white flex items-center justify-center shrink-0">
              {activeRole === 'student' ? <GraduationCap className="w-5 h-5" /> :
               activeRole === 'teacher' ? <Briefcase className="w-5 h-5" /> :
               <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E4B52D]">
                Institute Unified Portals
              </span>
              <h3 className="text-lg font-black text-white">
                {activeRole === 'student' ? 'Student Portal Login' :
                 activeRole === 'teacher' ? 'Faculty & Staff Login' :
                 'Administration & CMS Login'}
              </h3>
            </div>
          </div>

          {/* Role Switcher Tabs */}
          <div className="mt-4 grid grid-cols-3 gap-1.5 p-1 bg-black/30 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => handleRoleSwitch('student')}
              className={`py-1.5 rounded-lg transition ${activeRole === 'student' ? 'bg-[#D83A27] text-white shadow' : 'text-purple-200 hover:text-white'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('teacher')}
              className={`py-1.5 rounded-lg transition ${activeRole === 'teacher' ? 'bg-[#D83A27] text-white shadow' : 'text-purple-200 hover:text-white'}`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('admin')}
              className={`py-1.5 rounded-lg transition ${activeRole === 'admin' ? 'bg-[#D83A27] text-white shadow' : 'text-purple-200 hover:text-white'}`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4 text-left">
          
          {/* Quick Demo Instant Access Pill */}
          <div className="p-3 bg-[#F7F5F8] rounded-xl border border-gray-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#1E1B20] block">
                {activeRole === 'student' ? 'Demo Student Account' :
                 activeRole === 'teacher' ? 'Demo Faculty Account' :
                 'Demo Admin Account'}
              </span>
              <span className="text-[11px] text-gray-500">
                {activeRole === 'student' ? 'Aman Kushwaha (ADCA)' :
                 activeRole === 'teacher' ? 'Raushan Sir (Director & Lead Faculty)' :
                 'Full SaaS ERP & CMS Access'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="bg-[#26002F] hover:bg-[#3D004B] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm shrink-0"
            >
              <Sparkles className="w-3 h-3 text-[#E4B52D]" />
              <span>1-Click Test</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {activeRole === 'student' ? 'Student Roll No / ID' :
                 activeRole === 'teacher' ? 'Faculty ID / Email' :
                 'Administrator Email'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26002F]"
                  placeholder="Enter login ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26002F]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D83A27] hover:bg-[#BF2F1E] text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-4"
            >
              <span>Sign In to {activeRole === 'student' ? 'Student Portal' : activeRole === 'teacher' ? 'Faculty Portal' : 'Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#66616A]">
            <span>Need credentials assistance? </span>
            <a href="tel:+916203269614" className="font-bold text-[#D83A27] hover:underline">
              Contact Dhanbad Desk (+91 62032 69614)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
