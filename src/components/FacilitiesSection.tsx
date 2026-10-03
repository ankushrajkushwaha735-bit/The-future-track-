import React from 'react';
import { 
  Monitor, 
  School, 
  Cpu, 
  Wifi, 
  BookMarked, 
  HelpCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const facilityCards = [
    {
      icon: Monitor,
      title: 'High-Speed Computer Lab',
      desc: 'Air-conditioned lab with individual latest-generation Core i5/i7 PCs, SSD storage, and uninterrupted power backup.',
      color: '#26002F',
    },
    {
      icon: School,
      title: 'Modern Smart Classrooms',
      desc: 'Acoustically optimized lecture rooms with digital projectors for interactive theory and software demonstrations.',
      color: '#D83A27',
    },
    {
      icon: Cpu,
      title: '1-on-1 Practical Training',
      desc: 'No sharing of screens during practical hours. Each student works on their dedicated system to build muscle memory.',
      color: '#E4B52D',
    },
    {
      icon: Wifi,
      title: 'High-Speed Fiber Network',
      desc: 'Dedicated enterprise internet connectivity ensuring seamless online research, software updates, and cloud project builds.',
      color: '#26002F',
    },
    {
      icon: BookMarked,
      title: 'Updated Study Material',
      desc: 'Comprehensive printed handbooks, digital PDF cheat sheets, practical exercise worksheets, and sample test papers.',
      color: '#D83A27',
    },
    {
      icon: HelpCircle,
      title: 'Daily Doubt Clearing',
      desc: 'Dedicated lab instructors present throughout the day for immediate step-by-step assistance and revision sessions.',
      color: '#E4B52D',
    },
  ];

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D83A27]/10 text-[#D83A27] text-xs font-bold uppercase tracking-wider mb-3">
            <span>World-Class Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Campus <span className="text-[#D83A27]">Facilities &amp; Labs</span>
          </h2>
          <p className="text-base text-[#66616A] mt-2">
            Engineered to provide an immersive, comfortable, and technically advanced learning environment.
          </p>
        </div>

        {/* Large Feature Banner + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Large Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-[#26002F]">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=900&auto=format&fit=crop"
                alt="The Future Track Computer Laboratory Facility"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26002F] via-[#26002F]/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#E4B52D] text-[#26002F] text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                  Campus Highlight
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Dedicated Workstation per Student
                </h3>
                <p className="text-xs text-gray-200 mt-1">
                  100% individual lab allocation during your scheduled time slot.
                </p>
                
                <div className="flex items-center gap-4 mt-3 text-xs text-[#E4B52D] font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High-Spec PCs
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fiber Broadband
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller Feature Cards (6 items) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {facilityCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#F7F5F8] p-5 rounded-2xl border border-gray-100 hover:border-[#26002F]/20 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>

                  <h4 className="text-sm font-bold text-[#1E1B20] group-hover:text-[#26002F] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#66616A] mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
