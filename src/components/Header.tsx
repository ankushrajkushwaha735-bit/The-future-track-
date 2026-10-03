import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  ChevronDown, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap,
  Monitor,
  Briefcase,
  Calculator,
  Cpu,
  Palette,
  Phone,
  FileCheck,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  onEnquireClick: () => void;
  onStudentLoginClick: () => void;
  onTeacherLoginClick?: () => void;
  onAdminLoginClick: () => void;
  onVerifyCertClick?: () => void;
  onAdmissionClick?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onEnquireClick,
  onStudentLoginClick,
  onTeacherLoginClick,
  onAdminLoginClick,
  onVerifyCertClick,
  onAdmissionClick,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setPortalDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryFilter = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    const coursesSec = document.querySelector('#courses');
    if (coursesSec) {
      coursesSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const courseMenuItems = [
    { name: 'All Courses (16 Programs)', filter: 'all', icon: GraduationCap, desc: 'Browse all diplomas & certificates' },
    { name: 'Computer & Office', filter: 'Computer & Office', icon: Monitor, desc: 'ADCA, Typing Master, DFA & Office' },
    { name: 'Accounting & GST', filter: 'Accounting', icon: Calculator, desc: 'Tally Prime, e-Filing & Accounts' },
    { name: 'AI & Technology', filter: 'AI & Technology', icon: Cpu, desc: 'Python, Java, AI Automation & Web' },
    { name: 'Creative & Media', filter: 'Creative', icon: Palette, desc: '2D Animation, DTP, Video & Graphics' },
    { name: 'Digital Business', filter: 'Digital Business', icon: Briefcase, desc: 'Digital Marketing & E-Commerce' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-gray-100'
          : 'bg-white py-3 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2 group shrink-0"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('#home')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              About
            </button>

            {/* Courses Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('#courses')}
                className="flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md group"
              >
                <span>Courses</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180 text-[#D83A27]' : ''}`} />
              </button>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 transition-all z-50 animate-fadeIn">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#8A131B] px-3 py-1 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E4B52D]" />
                    Academic Programs (16 Specializations)
                  </div>
                  <div className="space-y-1">
                    {courseMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleCategoryFilter(item.filter)}
                          className="w-full text-left flex items-start gap-3 px-3 py-2 rounded-xl hover:bg-[#F7F5F8] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#26002F]/5 group-hover:bg-[#26002F] text-[#26002F] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1E1B20] group-hover:text-[#D83A27] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-[#66616A]">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('#faculty')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              Faculty
            </button>
            <button
              onClick={() => handleNavClick('#gallery')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('#blog')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-[#1E1B20] hover:text-[#D83A27] transition-colors rounded-md"
            >
              Contact
            </button>

            {/* Direct Tool Links */}
            {onVerifyCertClick && (
              <button
                onClick={onVerifyCertClick}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#26002F] hover:bg-purple-50 transition border border-purple-200"
                title="Verify Official Certificate"
              >
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verify Certificate</span>
              </button>
            )}

            {onAdmissionClick && (
              <button
                onClick={onAdmissionClick}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#D83A27] hover:bg-red-50 transition border border-red-200"
                title="Online Student Admission Form"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Admission 2026</span>
              </button>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Unified Portals Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPortalDropdownOpen(true)}
              onMouseLeave={() => setPortalDropdownOpen(false)}
            >
              <button
                onClick={onStudentLoginClick}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#26002F] hover:bg-[#F7F5F8] border border-[#26002F]/20 transition shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-[#D83A27]" />
                <span>Portals Login</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {portalDropdownOpen && (
                <div className="absolute right-0 top-full w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      onStudentLoginClick();
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E1B20] hover:bg-purple-50 hover:text-[#26002F] transition"
                  >
                    <GraduationCap className="w-4 h-4 text-[#D83A27]" />
                    <div>
                      <span>Student Portal</span>
                      <span className="text-[10px] text-gray-400 block font-normal">Attendance &amp; Fees</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      if (onTeacherLoginClick) onTeacherLoginClick();
                      else onStudentLoginClick();
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E1B20] hover:bg-purple-50 hover:text-[#26002F] transition"
                  >
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <div>
                      <span>Faculty &amp; Staff</span>
                      <span className="text-[10px] text-gray-400 block font-normal">Attendance &amp; Grading</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      onAdminLoginClick();
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E1B20] hover:bg-purple-50 hover:text-[#26002F] transition border-t border-gray-100 mt-1 pt-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#26002F]" />
                    <div>
                      <span>Admin ERP &amp; CMS</span>
                      <span className="text-[10px] text-gray-400 block font-normal">Management Console</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onEnquireClick}
              className="inline-flex items-center gap-1.5 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onEnquireClick}
              className="sm:hidden bg-[#D83A27] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#26002F] hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#26002F]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStudentLoginClick();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#26002F]/20 text-xs font-bold text-[#26002F] bg-[#F7F5F8]"
            >
              <User className="w-4 h-4 text-[#D83A27]" />
              <span>Student Login</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onTeacherLoginClick) onTeacherLoginClick();
                else onAdminLoginClick();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-purple-200 text-xs font-bold text-[#26002F] bg-purple-50"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Faculty Portal</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            {onVerifyCertClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onVerifyCertClick();
                }}
                className="py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Verify Certificate</span>
              </button>
            )}

            {onAdmissionClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdmissionClick();
                }}
                className="py-2 px-3 rounded-xl bg-red-50 text-[#D83A27] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Admission 2026</span>
              </button>
            )}
          </div>

          <div className="space-y-1 pt-1 text-sm font-semibold text-[#1E1B20]">
            <button
              onClick={() => handleNavClick('#home')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              About The Future Track
            </button>
            <button
              onClick={() => handleNavClick('#courses')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Courses (16 Programs)
            </button>
            <button
              onClick={() => handleNavClick('#faculty')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Faculty &amp; Instructors
            </button>
            <button
              onClick={() => handleNavClick('#gallery')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Institute Gallery
            </button>
            <button
              onClick={() => handleNavClick('#blog')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Blog &amp; Career Updates
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminLoginClick();
              }}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              <span>Admin ERP &amp; CMS Login</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick();
              }}
              className="w-full bg-[#D83A27] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enquire for Admission</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
