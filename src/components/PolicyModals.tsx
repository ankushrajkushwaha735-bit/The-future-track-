import React from 'react';
import { X, ShieldCheck, FileText, RefreshCw } from 'lucide-react';

interface PolicyModalsProps {
  type: 'privacy' | 'terms' | 'refund' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-[#66616A] leading-relaxed">
          <p>
            At <strong>The Future Track Computer Education</strong>, we are committed to safeguarding student and visitor privacy.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Information We Collect</h5>
          <p>
            We collect personal details such as student name, mobile number, email, and preferred courses only when you voluntarily submit an admission enquiry, register for courses, or log in to the student portal.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Use of Information</h5>
          <p>
            Your information is used solely for academic counseling, course scheduling, examination notifications, fee receipt generation, and official certification issuance. We do not sell or lease student data to third-party commercial marketing firms.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Data Security</h5>
          <p>
            We deploy secure digital portals and access-controlled student record databases. Academic certificates and verification keys are encrypted.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-[#66616A] leading-relaxed">
          <p>
            Welcome to <strong>The Future Track Computer Education</strong>. By enrolling in our courses or using this web platform, you agree to these academic terms.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Class &amp; Lab Conduct</h5>
          <p>
            Students must maintain at least 75% attendance in both theoretical lectures and practical computer lab sessions to qualify for final certification examinations. Misuse of laboratory hardware or software is strictly prohibited.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Certification Requirements</h5>
          <p>
            Official diplomas and certificates are awarded upon passing module assessments, practical viva, and submission of the mandatory capstone project.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Intellectual Property</h5>
          <p>
            Course materials, worksheets, and lecture handbooks are copyrighted to The Future Track and provided strictly for student educational use.
          </p>
        </div>
      ),
    },
    refund: {
      title: 'Fee & Refund Policy',
      icon: RefreshCw,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-[#66616A] leading-relaxed">
          <p>
            Our fee structure is transparent, affordable, and structured to make high-quality computer education accessible.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Enrollment &amp; Installments</h5>
          <p>
            Course fees can be paid in full with upfront scholarship discounts or split into convenient monthly or semester-wise installments.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Cancellation &amp; Refund Windows</h5>
          <p>
            - Written cancellation requests received prior to batch commencement: 100% refund of course fees (less nominal registration processing fee).<br />
            - Cancellation requests within the first 3 days of batch start: 70% refund of tuition fees.<br />
            - After 7 days of classes or lab usage, tuition fees are non-refundable as individual workstation seats are allocated.
          </p>
          <h5 className="font-bold text-[#1E1B20]">Batch Transfers</h5>
          <p>
            Students may request a one-time batch timing transfer or course change without penalty upon written request to the academic director.
          </p>
        </div>
      ),
    },
  };

  const activeContent = contentMap[type];
  const Icon = activeContent.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#26002F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D83A27] text-white flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {activeContent.title}
              </h3>
              <span className="text-[11px] text-gray-300">
                The Future Track Computer Education Guidelines
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {activeContent.body}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#26002F] text-white text-xs font-bold rounded-xl hover:bg-[#3D004B]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
