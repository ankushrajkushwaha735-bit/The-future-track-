import React from 'react';
import { Users, BookOpenCheck, Award, CalendarClock } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      value: '5000+',
      label: 'Students',
      sub: 'Certified & Career-Ready',
      icon: Users,
      accent: '#D83A27',
    },
    {
      value: '20+',
      label: 'Courses',
      sub: 'Diplomas & IT Programs',
      icon: BookOpenCheck,
      accent: '#E4B52D',
    },
    {
      value: '10+',
      label: 'Years',
      sub: 'Academic Excellence',
      icon: CalendarClock,
      accent: '#D83A27',
    },
    {
      value: 'Expert',
      label: 'Faculty',
      sub: 'Dedicated Mentors',
      icon: Award,
      accent: '#26002F',
    },
  ];

  return (
    <section className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-[#26002F]/5 border border-gray-100 p-6 md:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className={`flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 ${
                  idx > 1 ? 'pt-6 lg:pt-0' : idx % 2 === 1 ? 'pl-2 sm:pl-0' : ''
                } ${idx > 0 ? 'lg:pl-6' : ''}`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${stat.accent}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.accent }} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#1E1B20] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#66616A] mt-0.5">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
