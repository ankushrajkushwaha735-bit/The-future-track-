import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface ContactSectionProps {
  onSuccessSubmit?: (enquiryData: any) => void;
  instituteAddress?: string;
  institutePhone?: string;
  instituteWhatsApp?: string;
  instituteEmail?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSuccessSubmit,
  instituteAddress = 'City Centre, Near Bus Stand, Bartand, Jharudih, Dhanbad, Jharkhand 826001',
  institutePhone = '+91 62032 69614',
  instituteWhatsApp = '+91 62032 69614',
  instituteEmail = 'raushankmr75@gmail.com',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    course: COURSES[0].title,
    batchPreference: 'Morning (8:00 AM - 12:00 PM)',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.mobile.trim())) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.course) errs.course = 'Please select a course';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Save lead to localStorage for Admin CMS demonstration
    setTimeout(() => {
      const newLead = {
        id: `ENQ-${Date.now().toString().slice(-5)}`,
        name: formData.fullName,
        phone: formData.mobile,
        email: formData.email || 'N/A',
        course: formData.course,
        batchPreference: formData.batchPreference,
        message: formData.message || 'No additional note',
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'New',
      };

      try {
        const stored = JSON.parse(localStorage.getItem('tft_enquiries') || '[]');
        localStorage.setItem('tft_enquiries', JSON.stringify([newLead, ...stored]));
      } catch (err) {
        // local storage fallback
      }

      if (onSuccessSubmit) {
        onSuccessSubmit(newLead);
      }

      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Let's <span className="text-[#D83A27]">Connect</span>
          </h2>
          <p className="text-base text-[#66616A] mt-2">
            Visit our campus for free counseling, schedule a practical lab tour, or submit your admission query online.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Institute Information */}
          <div className="lg:col-span-5 bg-[#F7F5F8] p-8 rounded-3xl border border-gray-200/80 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#26002F]">
                The Future Track Computer Education
              </h3>
              <p className="text-xs text-[#66616A] mt-1 font-medium">
                विद्या परम् बलम् • Pioneer in Quality Digital Education
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#1E1B20]">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#26002F] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#E4B52D]" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-bold">
                    Campus Address
                  </strong>
                  <span className="text-xs leading-relaxed text-gray-700">
                    {instituteAddress}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D83A27] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-bold">
                    Phone Numbers
                  </strong>
                  <a
                    href={`tel:${institutePhone.replace(/\s+/g, '')}`}
                    className="text-xs font-bold text-[#26002F] hover:text-[#D83A27] transition-colors"
                  >
                    {institutePhone}
                  </a>
                  <span className="block text-[11px] text-gray-500">
                    Toll-Free &amp; Admission Helpline
                  </span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-bold">
                    Official WhatsApp
                  </strong>
                  <a
                    href={`https://wa.me/${instituteWhatsApp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-green-700 hover:underline"
                  >
                    {instituteWhatsApp} (Instant Chat)
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#26002F] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-bold">
                    Email Desk
                  </strong>
                  <a
                    href={`mailto:${instituteEmail}`}
                    className="text-xs font-semibold text-[#26002F] hover:underline"
                  >
                    {instituteEmail}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E4B52D] text-[#26002F] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-bold">
                    Opening Hours
                  </strong>
                  <span className="text-xs text-gray-700 block">
                    Monday – Saturday: <strong>8:00 AM – 7:00 PM</strong>
                  </span>
                  <span className="text-[11px] text-gray-500 block">
                    Sunday: Special Doubt Classes &amp; Weekend Batches
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Verification Note */}
            <div className="p-3 bg-white rounded-xl border border-gray-200 text-[11px] text-[#66616A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Free student counseling &amp; 1-day demo class available on prior appointment.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact / Admission Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-gray-200 shadow-xl shadow-[#26002F]/5">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#26002F]">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-[#66616A] max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Our admission counselor will call you 
                  at <strong>{formData.mobile}</strong> shortly with batch availability and fee concessions.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        mobile: '',
                        email: '',
                        course: COURSES[0].title,
                        batchPreference: 'Morning (8:00 AM - 12:00 PM)',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-[#26002F] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3D004B]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-xl font-extrabold text-[#26002F]">
                    Course Admission &amp; Counselling Form
                  </h3>
                  <p className="text-xs text-[#66616A] mt-0.5">
                    Fill out the form below. We will provide complete details and fee structures.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                    Full Name <span className="text-[#D83A27]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter student full name"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                      errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                    } focus:outline-none focus:border-[#D83A27] focus:ring-1 focus:ring-[#D83A27]`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                      Mobile Number <span className="text-[#D83A27]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                        errors.mobile ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                      } focus:outline-none focus:border-[#D83A27] focus:ring-1 focus:ring-[#D83A27]`}
                    />
                    {errors.mobile && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.mobile}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@gmail.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                      } focus:outline-none focus:border-[#D83A27] focus:ring-1 focus:ring-[#D83A27]`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Course Selection & Batch Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                      Select Course <span className="text-[#D83A27]">*</span>
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27] bg-white font-medium"
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
                      value={formData.batchPreference}
                      onChange={(e) => setFormData({ ...formData, batchPreference: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27] bg-white font-medium"
                    >
                      <option value="Morning (8:00 AM - 10:00 AM)">Morning (8:00 AM - 10:00 AM)</option>
                      <option value="Mid-Morning (10:00 AM - 12:00 PM)">Mid-Morning (10:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 3:00 PM)">Afternoon (1:00 PM - 3:00 PM)</option>
                      <option value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</option>
                      <option value="Late Evening (5:30 PM - 7:00 PM)">Late Evening (5:30 PM - 7:00 PM)</option>
                      <option value="Weekend Special Batch">Weekend Special Batch</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B20] mb-1">
                    Your Questions / Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your educational background or ask any question..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D83A27] hover:bg-[#BF2F1E] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#D83A27]/20 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Admission Enquiry</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-gray-500 text-center">
                  🔒 We respect your privacy. No spam. Instant counselor support guaranteed.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
