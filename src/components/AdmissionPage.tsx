import React, { useState } from 'react';
import { Logo } from './Logo';
import { COURSES } from '../data/coursesData';
import { 
  GraduationCap, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Printer
} from 'lucide-react';

interface AdmissionPageProps {
  onBackToHome: () => void;
  phone?: string;
  whatsapp?: string;
}

export const AdmissionPage: React.FC<AdmissionPageProps> = ({
  onBackToHome,
  phone = '+91 62032 69614',
  whatsapp = '+91 62032 69614',
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    course: 'ADCA (Advanced Diploma in Computer Applications)',
    batch: 'Morning (10:00 AM - 12:00 PM)',
    qualification: '12th (Intermediate)',
    hasPhoto: false,
    hasIdProof: false,
    notes: '',
  });

  const [submittedApp, setSubmittedApp] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone) return;

    const newApplication = {
      id: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: 'Pending Verification',
      appliedAt: new Date().toLocaleString(),
    };

    // Save to local storage for Admin CRM
    try {
      const existing = JSON.parse(localStorage.getItem('tft_admissions') || '[]');
      existing.unshift(newApplication);
      localStorage.setItem('tft_admissions', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setSubmittedApp(newApplication);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F8] text-[#1E1B20] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner */}
      <div className="bg-[#26002F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-900">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-200 hover:text-white bg-white/10 px-3 py-1.5 rounded-full mb-4 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Institute Website
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E4B52D] bg-white/10 px-3 py-1 rounded-full inline-block mb-2">
                Official Admission Form • Session 2026–2027
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">Online Student Registration &amp; Admission</h1>
              <p className="text-purple-200 text-xs sm:text-sm mt-1">
                Fill the formal registration form below to secure your seat at <strong className="text-white">The Future Track Computer Education</strong>.
              </p>
            </div>
            <div className="shrink-0 hidden md:block">
              <Logo size="md" showText={false} inverted={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {submittedApp ? (
          <div className="bg-white rounded-3xl border border-purple-100 shadow-xl p-6 sm:p-10 text-center animate-fadeIn max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-[#D83A27] bg-red-50 px-3 py-1 rounded-full">
              Registration Successful
            </span>
            <h2 className="text-2xl font-black text-[#26002F] mt-3">Provisional Admission Recorded</h2>
            <p className="text-xs text-[#66616A] mt-2 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{submittedApp.studentName}</strong>. Your online application has been transmitted to our Dhanbad Admissions Office for verification.
            </p>

            {/* Slip Summary */}
            <div className="mt-6 bg-[#F7F5F8] p-5 rounded-2xl border border-purple-50 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[#66616A]">Application Reference:</span>
                <span className="font-mono font-black text-[#26002F]">{submittedApp.id}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[#66616A]">Enrolled Course:</span>
                <span className="font-bold text-[#D83A27]">{submittedApp.course}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[#66616A]">Selected Batch:</span>
                <span className="font-bold text-[#26002F]">{submittedApp.batch}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-[#66616A]">Contact Number:</span>
                <span className="font-bold text-[#26002F]">{submittedApp.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66616A]">Current Status:</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Pending Desk Verification</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-2xl text-left text-xs text-[#26002F] leading-relaxed">
              <p className="font-bold mb-1">What to do next?</p>
              <p className="text-[#66616A]">
                Please visit our Dhanbad campus (City Centre, Bartand) with original copies of your 10th/12th mark sheet and Aadhaar card, or wait for an admission coordinator to call you at <strong>{submittedApp.phone}</strong>.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="bg-[#26002F] hover:bg-[#3d004b] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-[#E4B52D]" />
                Print Application Slip
              </button>
              <button
                onClick={onBackToHome}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-xs font-bold transition"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Candidate Information */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#26002F] flex items-center gap-2 mb-4 pb-2 border-b border-purple-50">
                  <User className="w-4 h-4 text-[#D83A27]" />
                  1. Candidate Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar Sharma"
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Father's / Guardian's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Shri Suresh Sharma"
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#26002F] flex items-center gap-2 mb-4 pb-2 border-b border-purple-50">
                  <Phone className="w-4 h-4 text-[#D83A27]" />
                  2. Contact &amp; Communication Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="For updates & notes"
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                    Residential Address (City, Area, Pin Code) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    placeholder="e.g. Bartand, Near Bus Stand, Dhanbad, Jharkhand 826001"
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Section 3: Course Selection & Academic Background */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#26002F] flex items-center gap-2 mb-4 pb-2 border-b border-purple-50">
                  <GraduationCap className="w-4 h-4 text-[#D83A27]" />
                  3. Course &amp; Batch Enrollment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Desired Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.course}
                      onChange={e => setFormData({ ...formData, course: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none font-bold text-[#26002F]"
                    >
                      {COURSES.map(c => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Preferred Batch Timing <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.batch}
                      onChange={e => setFormData({ ...formData, batch: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none font-medium"
                    >
                      <option>Morning (08:00 AM - 10:00 AM)</option>
                      <option>Morning (10:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 02:00 PM)</option>
                      <option>Afternoon (02:00 PM - 04:00 PM)</option>
                      <option>Evening (04:00 PM - 06:00 PM)</option>
                      <option>Weekend Special (Saturday &amp; Sunday)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1E1B20] block mb-1.5">
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#26002F] outline-none font-medium"
                    >
                      <option>10th Matriculation</option>
                      <option>12th (Intermediate Arts / Science / Commerce)</option>
                      <option>Graduation (BA / B.Sc / B.Com / BCA)</option>
                      <option>Post-Graduation</option>
                      <option>Working Professional</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Document Verification Checklist */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#26002F] flex items-center gap-2 mb-4 pb-2 border-b border-purple-50">
                  <FileText className="w-4 h-4 text-[#D83A27]" />
                  4. Documents &amp; Declarations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F7F5F8] p-4 rounded-2xl">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasPhoto}
                      onChange={e => setFormData({ ...formData, hasPhoto: e.target.checked })}
                      className="w-4 h-4 accent-[#26002F] rounded"
                    />
                    <span className="font-semibold text-gray-700">I have passport-size photos for student identity card</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasIdProof}
                      onChange={e => setFormData({ ...formData, hasIdProof: e.target.checked })}
                      className="w-4 h-4 accent-[#26002F] rounded"
                    />
                    <span className="font-semibold text-gray-700">I will provide Aadhaar Card copy during desk verification</span>
                  </label>
                </div>
              </div>

              {/* Submission Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                <p className="text-[11px] text-[#66616A] text-center sm:text-left">
                  By submitting, you certify that all entered details are accurate and agree to follow institute rules.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#D83A27] hover:bg-[#b82e1d] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E4B52D]" />
                  Submit Formal Admission
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
