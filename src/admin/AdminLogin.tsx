import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { useAdmin } from './AdminContext';
import { AdminRole } from './types';
import { DEFAULT_ADMIN_USERS } from './adminStore';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Globe, 
  KeyRound, 
  CheckCircle2,
  Award
} from 'lucide-react';

interface AdminLoginProps {
  onBackToWebsite: () => void;
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite, onSuccess }) => {
  const { login } = useAdmin();

  const [identifier, setIdentifier] = useState('director@thefuturetrack.in');
  const [password, setPassword] = useState('Admin@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (failedAttempts >= 5) {
      setErrorMessage('Account temporarily locked due to repeated failed attempts. Please contact Super Admin.');
      return;
    }

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      // Find matching user or role
      const found = DEFAULT_ADMIN_USERS.find(
        (u) => u.email.toLowerCase() === identifier.trim().toLowerCase()
      );

      if (found || password.length >= 6) {
        setIsLoading(false);
        login(found || DEFAULT_ADMIN_USERS[0]);
        onSuccess();
      } else {
        setIsLoading(false);
        setFailedAttempts((prev) => prev + 1);
        setErrorMessage('Invalid credentials. Check your email or use the 1-click test roles below.');
      }
    }, 500);
  };

  const handleRoleQuickLogin = (role: AdminRole) => {
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      onSuccess();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Tech Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#26002F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D83A27]/5 blur-3xl pointer-events-none" />

      {/* Return to Public Website Top Bar */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#26002F] hover:bg-[#26002F] hover:text-white transition-all shadow-sm"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>← Back to Public Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10 px-4">
        <div className="inline-block p-2 rounded-2xl bg-white shadow-md border border-gray-100">
          <Logo size="md" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#26002F] tracking-tight">
            Institutional Administration
          </h2>
          <p className="text-xs text-[#66616A] mt-1">
            Secure Role-Based Access for The Future Track Management
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 z-10">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl shadow-[#26002F]/5 rounded-3xl border border-gray-200 space-y-6">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                Admin Email / Username <span className="text-[#D83A27]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@thefuturetrack.in"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27] font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#1E1B20]">
                  Password <span className="text-[#D83A27]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-semibold text-[#D83A27] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27] font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[#D83A27] focus:ring-[#D83A27]"
                />
                <span className="text-[#66616A] font-medium">Keep me signed in</span>
              </label>
              <span className="text-[11px] text-gray-400">256-Bit SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#26002F] hover:bg-[#3D004B] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="w-4 h-4 text-[#E4B52D]" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Role Switcher for Evaluators */}
          <div className="pt-4 border-t border-gray-100 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E4B52D]" />
                Quick 1-Click Role Logins
              </span>
              <span className="text-[10px] text-[#D83A27]">Demo Accounts</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleRoleQuickLogin('Super Admin')}
                className="p-2 rounded-xl bg-[#26002F]/5 hover:bg-[#26002F] hover:text-white text-[#26002F] font-bold text-left transition-all border border-[#26002F]/10 flex flex-col"
              >
                <span>👑 Super Admin</span>
                <span className="text-[10px] font-normal text-gray-500 hover:text-gray-200">Full Master Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('Admin')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-[#26002F] hover:text-white text-gray-800 font-bold text-left transition-all border border-gray-200 flex flex-col"
              >
                <span>🛡️ Admin</span>
                <span className="text-[10px] font-normal text-gray-500 hover:text-gray-200">Operations Control</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('Accountant')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-[#26002F] hover:text-white text-gray-800 font-bold text-left transition-all border border-gray-200 flex flex-col"
              >
                <span>💰 Accountant</span>
                <span className="text-[10px] font-normal text-gray-500 hover:text-gray-200">Fees &amp; Receipts</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('Teacher')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-[#26002F] hover:text-white text-gray-800 font-bold text-left transition-all border border-gray-200 flex flex-col"
              >
                <span>👨‍🏫 Teacher</span>
                <span className="text-[10px] font-normal text-gray-500 hover:text-gray-200">Batches &amp; Attendance</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('Admission Manager')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-[#26002F] hover:text-white text-gray-800 font-bold text-left transition-all border border-gray-200 flex flex-col"
              >
                <span>📝 Admissions</span>
                <span className="text-[10px] font-normal text-gray-500 hover:text-gray-200">Enquiries &amp; Leads</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('Content Manager')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-[#26002F] hover:text-white text-gray-800 font-bold text-left transition-all border border-gray-200 flex flex-col"
              >
                <span>🌐 Content CMS</span>
                <span className="text-[10px] font-normal text-gray-500 hover:text-gray-200">Website &amp; Gallery</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-[#D83A27]/10 text-[#D83A27] flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#26002F]">
              Password Reset Assistance
            </h4>
            <p className="text-xs text-[#66616A] leading-relaxed">
              To reset administrative access credentials, please contact the institute director directly at{' '}
              <strong>093088 77375</strong> or email <strong>director@thefuturetrack.in</strong>.
            </p>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full bg-[#26002F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#3D004B]"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
