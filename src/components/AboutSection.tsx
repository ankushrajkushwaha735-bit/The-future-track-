import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, Laptop2, Users2 } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onEnquireClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMore,
  onEnquireClick,
}) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Campus & Classroom Image with Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900&auto=format&fit=crop"
                alt="The Future Track Computer Education Campus Classroom and Lab"
                className="w-full h-[400px] sm:h-[460px] object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26002F]/80 via-transparent to-transparent" />
              
              {/* Bottom Overlay Label */}
              <div className="absolute bottom-5 left-5 right-5 text-white bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <div className="text-xs uppercase tracking-wider font-extrabold text-[#E4B52D]">
                  विद्या परम् बलम् • Knowledge is Ultimate Power
                </div>
                <div className="text-sm font-bold mt-1 text-white">
                  State-of-the-Art Digital Learning Environment
                </div>
                <div className="text-xs text-gray-200 mt-0.5">
                  Over a decade dedicated to high-quality technology skill development.
                </div>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#26002F] text-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-[#E4B52D]/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E4B52D]">
                12+
              </div>
              <div className="text-xs font-bold text-gray-200">
                Years of Educational
              </div>
              <div className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold">
                Excellence
              </div>
            </div>
          </div>

          {/* Right Column: Content & Mini Highlights */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D83A27]/10 text-[#D83A27] text-xs font-bold uppercase tracking-wider">
              <span>About The Future Track</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight leading-tight">
              Shaping Tomorrow's Tech Leaders Through{' '}
              <span className="text-[#D83A27]">Practical Excellence</span>
            </h2>

            <p className="text-base text-[#66616A] leading-relaxed">
              At <strong>The Future Track Computer Education</strong>, we believe true digital capability 
              is built with real keyboard time, actual project code, and real accounting ledger entries. 
              Founded with the sacred motto <em className="text-[#26002F] font-semibold">"विद्या परम् बलम्"</em>, 
              our institute bridges the gap between academic theory and real-world workplace demand.
            </p>

            <p className="text-sm text-[#66616A] leading-relaxed">
              Whether you are preparing for government competitive examinations, entering corporate accounting 
              with Tally Prime &amp; GST, coding your first web application, or mastering AI productivity tools, 
              The Future Track provides a supportive, student-friendly mentor-led environment.
            </p>

            {/* Three Mini Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F5F8] border border-gray-100 hover:border-[#D83A27]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#D83A27] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Laptop2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E1B20]">
                    ✓ Practical Learning
                  </h4>
                  <p className="text-xs text-[#66616A] mt-0.5">
                    Individual PC workstation for every student with dedicated lab hours and live assignments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F5F8] border border-gray-100 hover:border-[#26002F]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#26002F] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Users2 className="w-4 h-4 text-[#E4B52D]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E1B20]">
                    ✓ Expert Guidance
                  </h4>
                  <p className="text-xs text-[#66616A] mt-0.5">
                    Personalized mentoring led by Director Er. Raushan Kumar and qualified educators.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F5F8] border border-gray-100 hover:border-[#E4B52D]/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#E4B52D] text-[#26002F] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E1B20]">
                    ✓ Future-Ready Skills
                  </h4>
                  <p className="text-xs text-[#66616A] mt-0.5">
                    Industry-certified curriculums in software coding, Tally Prime GST, AI tools, and office automation.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onEnquireClick}
                className="inline-flex items-center gap-2 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#courses"
                className="text-xs font-bold text-[#26002F] hover:text-[#D83A27] underline decoration-[#D83A27] underline-offset-4 transition-colors"
              >
                View Institute Syllabus &amp; Batches →
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
