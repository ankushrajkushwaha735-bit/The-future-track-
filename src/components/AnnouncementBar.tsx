import React from 'react';
import { Sparkles, ArrowRight, PhoneCall } from 'lucide-react';

interface AnnouncementBarProps {
  onApplyClick: () => void;
  text?: string;
  phone?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onApplyClick,
  text = '🎓 Admissions Open 2026–27 • New Batches Starting Soon',
  phone = '+91 62032 69614',
}) => {
  return (
    <aside aria-label="Announcement" className="bg-[#26002F] text-white text-xs py-2 px-4 border-b border-[#3D004B] transition-colors relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#D83A27] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3 h-3" /> New
          </span>
          <span className="font-medium text-gray-200 text-xs sm:text-sm">
            {text}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="hidden md:inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E4B52D]" />
            <span>Helpline: <strong className="text-white">{phone}</strong></span>
          </a>

          <button
            onClick={onApplyClick}
            className="inline-flex items-center gap-1 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-3 py-1 rounded font-semibold text-xs transition-all shadow-sm active:scale-95"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
