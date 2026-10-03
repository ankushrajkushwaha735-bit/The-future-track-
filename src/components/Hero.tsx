import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  CheckCircle2, 
  Award, 
  Laptop, 
  ShieldCheck, 
  BookOpen,
  Users
} from 'lucide-react';

interface HeroProps {
  onExploreCourses: () => void;
  onEnquireClick: () => void;
  phone?: string;
  whatsapp?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCourses,
  onEnquireClick,
  phone = '+91 62032 69614',
  whatsapp = '+91 62032 69614',
}) => {
  return (
    <section id="home" className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden bg-white">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#26002F]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-[#D83A27]/5 blur-3xl pointer-events-none" />
      
      {/* Subtle Digital Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#26002F 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Typography & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#26002F]/5 border border-[#26002F]/10 text-[#26002F] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D83A27] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#D83A27] -ml-3" />
              <span>THE FUTURE OF COMPUTER EDUCATION</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1B20] tracking-tight leading-[1.12]">
              Learn Today.{' '}
              <span className="text-[#D83A27] relative inline-block">
                Build Your Future.
                <svg
                  className="absolute left-0 -bottom-1 w-full h-2.5 text-[#E4B52D] opacity-80"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5.5C40 2 120 1.5 199 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#66616A] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Build practical digital and technology skills with future-ready learning. 
              Master software programming, Tally Prime with GST, graphic design, and AI automation 
              with dedicated workstation lab training at Dhanbad's premier computer education institute.
            </p>

            {/* Micro Highlights Pill Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs sm:text-sm font-semibold text-[#1E1B20]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D83A27]" />
                100% Practical Lab Training
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D83A27]" />
                Govt. Recognized Certification
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E4B52D]" />
                Individual Workstation
              </span>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#26002F] hover:bg-[#3D004B] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#26002F]/15 hover:shadow-xl active:scale-98"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-[#E4B52D]" />
              </button>

              <button
                onClick={onEnquireClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#D83A27]/20 hover:shadow-xl active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Quick Links: Phone & WhatsApp */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-5 text-xs text-[#66616A] border-t border-gray-100">
              <span className="font-semibold text-gray-500">Instant Assistance:</span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-[#26002F] hover:text-[#D83A27] font-semibold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D83A27]" />
                <span>Call {phone}</span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=Hello%20The%20Future%20Track,%20I%20am%20interested%20in%20computer%20courses.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#075E54] hover:text-green-700 font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Student + Computer / Technology Visual */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Purple/Orange Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#26002F]/20 via-[#D83A27]/15 to-[#E4B52D]/10 rounded-3xl filter blur-2xl -z-10 transform scale-95" />

            {/* Main Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-3 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md border border-white/60 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] bg-[#26002F]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop"
                  alt="Students learning computer programming at The Future Track Computer Education"
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
                  loading="eager"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#26002F] via-[#26002F]/40 to-transparent" />

                {/* Inner Banner with Vidya Param Balam */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E4B52D] text-[#26002F] text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                    <Award className="w-3 h-3" />
                    विद्या परम् बलम्
                  </div>
                  <p className="text-sm font-bold text-white">
                    Hands-On Practical Lab Stations
                  </p>
                  <p className="text-[11px] text-gray-200">
                    Individual Core i5/i7 Workstations for Every Registered Student
                  </p>
                </div>
              </div>

              {/* Floating UI Card 1 (Top Left): Practical Lab Active */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
                <div className="w-10 h-10 rounded-lg bg-[#26002F] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Laptop className="w-5 h-5 text-[#E4B52D]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D83A27]">
                    Modern Infrastructure
                  </div>
                  <div className="text-xs font-extrabold text-[#1E1B20]">
                    Dedicated Lab Seat
                  </div>
                </div>
              </div>

              {/* Floating UI Card 2 (Bottom Right): Certified Success */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500">
                <div className="w-10 h-10 rounded-lg bg-[#D83A27] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-green-600">
                    Verified Credentials
                  </div>
                  <div className="text-xs font-extrabold text-[#1E1B20]">
                    ISO &amp; Govt. Aligned
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
