import React from 'react';
import { PhoneCall, MessageCircle } from 'lucide-react';

interface FloatingActionsProps {
  phone?: string;
  whatsapp?: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  phone = '+91 62032 69614',
  whatsapp = '+91 62032 69614',
}) => {
  const cleanPhone = phone.replace(/\s+/g, '');
  const cleanWhatsapp = whatsapp.replace(/\D/g, '');

  return (
    <>
      {/* Desktop Floating Action Buttons (Right Bottom Corner) */}
      <aside aria-label="Quick contact" className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        {/* WhatsApp Float */}
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=Hello%20The%20Future%20Track,%20I%20am%20interested%20in%20computer%20courses.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-end"
          aria-label="Chat on WhatsApp"
        >
          <span className="mr-2 px-3 py-1.5 rounded-xl bg-white text-[#1E1B20] text-xs font-bold shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat on WhatsApp
          </span>
          <div className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
        </a>

        {/* Call Float */}
        <a
          href={`tel:${cleanPhone}`}
          className="group flex items-center justify-end"
          aria-label="Call Institute Helpline"
        >
          <span className="mr-2 px-3 py-1.5 rounded-xl bg-white text-[#1E1B20] text-xs font-bold shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Call Helpline
          </span>
          <div className="w-13 h-13 rounded-full bg-[#D83A27] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200">
            <PhoneCall className="w-6 h-6" />
          </div>
        </a>
      </aside>

      {/* Mobile Fixed Bottom Bar */}
      <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 px-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#26002F] text-white py-2.5 rounded-xl text-xs font-bold shadow active:scale-98"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#E4B52D]" />
          <span>Call Now</span>
        </a>

        <a
          href={`https://wa.me/${cleanWhatsapp}?text=Hello%20The%20Future%20Track,%20I%20am%20interested%20in%20courses.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-bold shadow active:scale-98"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </aside>
    </>
  );
};
