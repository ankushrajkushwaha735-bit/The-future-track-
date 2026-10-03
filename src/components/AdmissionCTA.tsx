import React from 'react';
import { Sparkles, PhoneCall, MessageCircle, ArrowRight, Award } from 'lucide-react';

interface AdmissionCTAProps {
  onApplyClick: () => void;
  phone?: string;
  whatsapp?: string;
}

export const AdmissionCTA: React.FC<AdmissionCTAProps> = ({
  onApplyClick,
  phone = '+91 62032 69614',
  whatsapp = '+91 62032 69614',
}) => {
  return (
    <section className="py-20 bg-[#26002F] text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D83A27]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E4B52D]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Subtle Ring Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#E4B52D] text-xs font-bold uppercase tracking-wider border border-[#E4B52D]/30">
          <Award className="w-3.5 h-3.5" />
          <span>New Batches Starting Every Monday</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Your Future Starts With{' '}
          <span className="text-[#E4B52D]">The Right Skills.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Take the next step toward learning, growth and opportunity. 
          Limited seats per lab batch to guarantee individual computer attention.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onApplyClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#D83A27]/25 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#E4B52D]" />
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all border border-white/20"
          >
            <PhoneCall className="w-4 h-4 text-[#E4B52D]" />
            <span>Talk to Us ({phone})</span>
          </a>
        </div>

        {/* Secondary Instant WhatsApp Link */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs text-gray-300">
          <span>Need quick batch fees &amp; syllabus over chat?</span>
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=Hello%20The%20Future%20Track,%20I%20want%20to%20know%20about%20admissions.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#E4B52D] hover:underline font-bold"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
