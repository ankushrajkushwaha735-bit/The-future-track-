import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/testimonialsData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-[#F7F5F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Student Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
              What Our Students <span className="text-[#D83A27]">Say</span>
            </h2>
            <p className="text-base text-[#66616A] mt-2 max-w-xl">
              Real feedback from students who transformed their technical knowledge and careers at The Future Track.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-[#26002F] flex items-center justify-center hover:bg-[#26002F] hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-[#26002F] flex items-center justify-center hover:bg-[#26002F] hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid / Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                idx === currentIndex ? 'border-[#D83A27] ring-1 ring-[#D83A27]/30' : 'border-gray-200/90'
              }`}
            >
              <div>
                {/* Top Row: 5 Stars + Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#E4B52D] fill-[#E4B52D]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#26002F]/10" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#1E1B20] leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              {/* Student Info Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.studentName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#E4B52D]"
                  loading="lazy"
                />
                <div>
                  <div className="text-xs font-bold text-[#1E1B20] flex items-center gap-1">
                    <span>{t.studentName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div className="text-[11px] font-semibold text-[#D83A27] truncate max-w-[170px]">
                    {t.course.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {t.achievement}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
