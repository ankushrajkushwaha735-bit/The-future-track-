import React from 'react';
import { 
  GraduationCap, 
  Terminal, 
  MonitorCheck, 
  Compass, 
  Award, 
  Headphones 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: GraduationCap,
      title: 'Expert Faculty',
      desc: 'Industry veterans and qualified educators led by Er. Raushan Kumar, mentoring students with patient step-by-step guidance.',
      accent: '#26002F',
    },
    {
      icon: Terminal,
      title: 'Practical Learning',
      desc: 'No idle lectures. Every theoretical session is immediately followed by hands-on exercises on individual computers.',
      accent: '#D83A27',
    },
    {
      icon: MonitorCheck,
      title: 'Modern Infrastructure',
      desc: 'Fully air-conditioned computer labs with high-speed fiber internet, modern OS, and updated licensed software.',
      accent: '#E4B52D',
    },
    {
      icon: Compass,
      title: 'Career Guidance',
      desc: 'Resume building, mock interviews, placement assistance, and freelance portfolio coaching to launch your career.',
      accent: '#26002F',
    },
    {
      icon: Award,
      title: 'Certification',
      desc: 'Receive ISO-aligned, verifiable certificates and diplomas with unique roll numbers valid across government and private sectors.',
      accent: '#D83A27',
    },
    {
      icon: Headphones,
      title: 'Student Support',
      desc: 'Backup classes for missed topics, flexible batch rescheduling, extra lab practice hours, and digital study materials.',
      accent: '#E4B52D',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#F7F5F8] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Our Distinct Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Why Choose <span className="text-[#D83A27]">The Future Track?</span>
          </h2>
          <p className="text-base text-[#66616A] mt-3">
            Built upon principles of integrity, practical rigor, and personalized student attention.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Purple / Orange top accent line appearing on hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: item.accent }}
                />

                <div>
                  {/* Icon Container */}
                  <div 
                    className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.accent}12` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>

                  <h3 className="text-lg font-bold text-[#1E1B20] group-hover:text-[#26002F] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#66616A] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#66616A]">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400">
                    Feature 0{index + 1}
                  </span>
                  <span className="text-[#D83A27] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn More →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
