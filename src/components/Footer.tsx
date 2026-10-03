import React from 'react';
import { Logo } from './Logo';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  Heart,
  ExternalLink,
  ShieldCheck,
  Award,
  FileCheck,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface FooterProps {
  onStudentLoginClick: () => void;
  onTeacherLoginClick?: () => void;
  onAdminLoginClick: () => void;
  onEnquireClick: () => void;
  onVerifyCertClick?: () => void;
  onAdmissionClick?: () => void;
  onOpenPolicy: (policyType: 'privacy' | 'terms' | 'refund') => void;
  onSelectCategory: (category: string) => void;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onStudentLoginClick,
  onTeacherLoginClick,
  onAdminLoginClick,
  onEnquireClick,
  onVerifyCertClick,
  onAdmissionClick,
  onOpenPolicy,
  onSelectCategory,
  phone = '+91 62032 69614',
  whatsapp = '+91 62032 69614',
  email = 'raushankmr75@gmail.com',
  address = 'City Centre, near Bus Stand, Bartand, Jharudih, Dhanbad, Jharkhand 826001',
}) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappClean = whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#26002F] text-white pt-16 pb-12 border-t border-[#3D004B] relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D83A27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E4B52D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Branding Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/5 inline-block p-2 rounded-2xl border border-white/10">
              <Logo size="lg" inverted={true} />
            </div>
            
            <p className="text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed">
              <strong>The Future Track Computer Education</strong> is a premier technology institute providing government-standard computer certifications, hands-on software labs, accounting with Tally GST, and career readiness under the sacred motto 
              <span className="text-[#E4B52D] font-bold"> "विद्या परम् बलम्"</span>.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors text-white"
                aria-label="Official WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              {/* Phone Call */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D83A27] flex items-center justify-center transition-colors text-white"
                aria-label="Official Phone Helpline"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#3D004B] flex items-center justify-center transition-colors text-white"
                aria-label="Official Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4B52D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => scrollTo('#home')} className="hover:text-white transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#courses')} className="hover:text-white transition-colors">
                  Courses (16 Programs)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#faculty')} className="hover:text-white transition-colors">
                  Faculty Profiles
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#gallery')} className="hover:text-white transition-colors">
                  Campus Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#blog')} className="hover:text-white transition-colors">
                  Blog &amp; Updates
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#faq')} className="hover:text-white transition-colors">
                  FAQs &amp; Help
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#contact')} className="hover:text-white transition-colors">
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Courses Categories Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4B52D]">
              Key Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onSelectCategory('Computer & Office')} className="hover:text-white transition-colors text-left">
                  ADCA (12 Months)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Accounting')} className="hover:text-white transition-colors text-left">
                  Tally Prime with GST
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('AI & Technology')} className="hover:text-white transition-colors text-left">
                  Python + Java Suite
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Career')} className="hover:text-white transition-colors text-left">
                  Job-Oriented IT Course
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('AI & Technology')} className="hover:text-white transition-colors text-left">
                  AI Automation Tools
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Creative')} className="hover:text-white transition-colors text-left">
                  2D Animation &amp; Video
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Computer & Office')} className="hover:text-white transition-colors text-left">
                  Typing Master Certification
                </button>
              </li>
            </ul>
          </div>

          {/* Student & Administration Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4B52D]">
              Portals &amp; Verification
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onStudentLoginClick}
                className="w-full text-left py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#D83A27]" />
                  <span>Student Portal Login</span>
                </span>
                <span className="text-[#E4B52D]">→</span>
              </button>

              {onTeacherLoginClick && (
                <button
                  onClick={onTeacherLoginClick}
                  className="w-full text-left py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    <span>Faculty &amp; Staff Portal</span>
                  </span>
                  <span className="text-[#E4B52D]">→</span>
                </button>
              )}

              {onVerifyCertClick && (
                <button
                  onClick={onVerifyCertClick}
                  className="w-full text-left py-2 px-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-200 font-bold border border-emerald-500/30 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verify Certificate Online</span>
                  </span>
                  <span className="text-emerald-300">✓</span>
                </button>
              )}

              {onAdmissionClick && (
                <button
                  onClick={onAdmissionClick}
                  className="w-full text-left py-2 px-3 rounded-xl bg-[#D83A27] hover:bg-[#BF2F1E] text-white font-bold flex items-center justify-between shadow"
                >
                  <span>Apply for Admission (2026)</span>
                  <span>★</span>
                </button>
              )}

              <div className="pt-2 text-xs text-gray-300 space-y-1">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D83A27] shrink-0 mt-0.5" />
                  <span>{address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white underline">
                    {phone}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#E4B52D] shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-white underline">
                    {email}
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onAdminLoginClick}
                  className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E4B52D]" />
                  <span>Administrative Control Panel</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Policy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 The Future Track Computer Education. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
