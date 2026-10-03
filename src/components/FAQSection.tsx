import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  onAskQuestion?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onAskQuestion }) => {
  const [openIds, setOpenIds] = useState<string[]>([FAQ_DATA[0].id]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-[#F7F5F8] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Frequently Asked <span className="text-[#D83A27]">Questions</span>
          </h2>
          <p className="text-base text-[#66616A] mt-2">
            Clear answers to help you make informed decisions about your computer education.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#26002F] hover:text-[#D83A27] transition-colors leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#D83A27] text-white rotate-180' : 'bg-[#F7F5F8] text-[#D83A27]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#66616A] leading-relaxed border-t border-gray-100 bg-[#FBFBFC]">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional query link */}
        <div className="mt-10 text-center text-xs text-[#66616A]">
          Have a unique question not listed here?{' '}
          <a
            href="#contact"
            className="font-bold text-[#D83A27] hover:underline ml-1"
          >
            Talk directly to our admission counselor →
          </a>
        </div>

      </div>
    </section>
  );
};
