import React from 'react';
import { Award, Trophy, Star, CheckCircle, Code2, Users, FileCheck } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const highlights = [
    {
      icon: Trophy,
      count: '98.6%',
      title: 'Certification Pass Rate',
      desc: 'Consistently high distinction and first-division outcomes in official ADCA & DCA examinations.',
    },
    {
      icon: Users,
      count: '3,200+',
      title: 'Successful Placements',
      desc: 'Graduates placed in regional IT hubs, accounting firms, banks, schools, and digital agencies.',
    },
    {
      icon: Code2,
      count: '1,400+',
      title: 'Live Projects Completed',
      desc: 'Commercial websites, full-stack apps, and real business GST ledgers built by students.',
    },
    {
      icon: FileCheck,
      count: '100%',
      title: 'Verifiable Credentials',
      desc: 'Every certificate comes with a unique roll number and QR verification for life-long trust.',
    },
  ];

  const milestones = [
    { year: '2026', title: 'AI & Next-Gen Tech Lab Launched', desc: 'Introduced Generative AI & Prompt Engineering curriculum for students.' },
    { year: '2024', title: '5,000th Student Certified', desc: 'Crossed the milestone of 5,000 certified learners across computer disciplines.' },
    { year: '2021', title: 'Tally Prime & GST Excellence Center', desc: 'Upgraded accounting laboratory to cloud-connected Tally Prime enterprise edition.' },
    { year: '2014', title: 'Foundation of The Future Track', desc: 'Established with the mission "विद्या परम् बलम्" to make quality computer education accessible.' },
  ];

  return (
    <section id="achievements" className="py-20 bg-[#26002F] text-white relative overflow-hidden">
      {/* Subtle Gold / Red Glow Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E4B52D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D83A27]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E4B52D] text-xs font-bold uppercase tracking-wider mb-3 border border-[#E4B52D]/20">
            <Star className="w-3.5 h-3.5 fill-[#E4B52D]" />
            <span>Honors &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Learning. Creating. <span className="text-[#E4B52D]">Achieving.</span>
          </h2>
          <p className="text-base text-gray-300 mt-3">
            Celebrating the hard work, career transitions, and industry recognition of our students and institute.
          </p>
        </div>

        {/* 4 Large Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#E4B52D]/60 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E4B52D]/15 flex items-center justify-center mb-4 text-[#E4B52D] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {item.count}
                </div>
                <div className="text-sm font-bold text-[#E4B52D] mt-1">
                  {item.title}
                </div>
                <div className="text-xs text-gray-300 mt-1 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Journey Milestones Strip */}
        <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#E4B52D] mb-6 flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Institutional Journey &amp; Legacy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {milestones.map((m, idx) => (
              <div key={m.year} className={`${idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}>
                <div className="text-2xl font-black text-[#D83A27]">{m.year}</div>
                <div className="text-sm font-bold text-white mt-1">{m.title}</div>
                <div className="text-xs text-gray-300 mt-1 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
