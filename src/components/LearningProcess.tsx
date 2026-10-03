import React from 'react';
import { 
  Compass, 
  MessagesSquare, 
  BookOpen, 
  Terminal, 
  Award, 
  Rocket 
} from 'lucide-react';

export const LearningProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Course',
      desc: 'Explore our catalog of certified diploma, IT, coding, or accounting programs tailored to your goals.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Enquire',
      desc: 'Submit your online admission form or call our counselor for course syllabus and batch timings.',
      icon: MessagesSquare,
    },
    {
      num: '03',
      title: 'Get Counselling',
      desc: 'Attend a free 1-on-1 counseling session, visit our modern computer lab, and select your slot.',
      icon: MessagesSquare,
    },
    {
      num: '04',
      title: 'Start Learning',
      desc: 'Join your batch with experienced faculty mentors, lecture handbooks, and individual PC stations.',
      icon: BookOpen,
    },
    {
      num: '05',
      title: 'Practice & Projects',
      desc: 'Hands-on training with real-world corporate accounting, live software apps, and portfolio designs.',
      icon: Terminal,
    },
    {
      num: '06',
      title: 'Complete Training',
      desc: 'Pass practical assessments and receive your verified diploma/certificate with placement support.',
      icon: Award,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Methodical Student Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Our 6-Step <span className="text-[#D83A27]">Learning Process</span>
          </h2>
          <p className="text-base text-[#66616A] mt-2">
            A structured roadmap turning aspiring beginners into confident, credentialed professionals.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-[#26002F]/15 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#26002F] text-white flex items-center justify-center font-black text-sm mb-4 relative shadow-md group-hover:bg-[#D83A27] transition-colors">
                    {step.num}
                    {/* Orange active indicator pulse */}
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E4B52D] border-2 border-white" />
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#F7F5F8] text-[#26002F] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#D83A27]" />
                  </div>

                  <h3 className="text-sm font-bold text-[#1E1B20] leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#66616A] mt-2 leading-relaxed">
                    {step.desc}
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
