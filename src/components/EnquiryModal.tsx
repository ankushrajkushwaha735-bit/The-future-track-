import React, { useState } from 'react';
import { COURSES, Course } from '../data/coursesData';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, PhoneCall } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCourse,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(
    initialCourse ? initialCourse.title : COURSES[0].title
  );
  const [batchPref, setBatchPref] = useState('Morning Batch (8:00 AM - 10:00 AM)');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(mobile.trim())) {
      errs.mobile = 'Enter a valid 10-digit number';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newLead = {
        id: `ENQ-${Date.now().toString().slice(-5)}`,
        name: fullName,
        phone: mobile,
        email: email || 'N/A',
        course: selectedCourse,
        batchPreference: batchPref,
        message: message || 'Quick modal enquiry',
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'New',
      };

      try {
        const stored = JSON.parse(localStorage.getItem('tft_enquiries') || '[]');
        localStorage.setItem('tft_enquiries', JSON.stringify([newLead, ...stored]));
      } catch (err) {
        // fallback
      }

      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#26002F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#D83A27] text-white text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-[#E4B52D]" />
            Session 2026-27 Admission
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Course Admission &amp; Counselling
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            Get instant syllabus, batch schedules, and fee concession details.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#26002F]">
                Thank You, {fullName}!
              </h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                Your enquiry for <strong>{selectedCourse}</strong> has been registered. 
                Our senior academic advisor will contact you on <strong>{mobile}</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#26002F] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#3D004B]"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                  Full Name <span className="text-[#D83A27]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter student full name"
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                  } focus:outline-none focus:border-[#D83A27]`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 mt-0.5">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                    Mobile Number <span className="text-[#D83A27]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border ${
                      errors.mobile ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                    } focus:outline-none focus:border-[#D83A27]`}
                  />
                  {errors.mobile && (
                    <p className="text-[11px] text-red-600 mt-0.5">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                  Selected Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white font-medium focus:outline-none focus:border-[#D83A27]"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                  Preferred Batch Timing
                </label>
                <select
                  value={batchPref}
                  onChange={(e) => setBatchPref(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white font-medium focus:outline-none focus:border-[#D83A27]"
                >
                  <option value="Morning Batch (8:00 AM - 10:00 AM)">Morning Batch (8:00 AM - 10:00 AM)</option>
                  <option value="Mid-Morning (10:00 AM - 12:00 PM)">Mid-Morning (10:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 3:00 PM)">Afternoon (1:00 PM - 3:00 PM)</option>
                  <option value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</option>
                  <option value="Weekend Batch">Weekend Batch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                  Questions / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any specific requirement or timing query..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D83A27] hover:bg-[#BF2F1E] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Free Batch Information</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
