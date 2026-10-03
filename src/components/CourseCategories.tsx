import React from 'react';
import { COURSE_CATEGORIES } from '../data/coursesData';
import { Monitor, Briefcase, Calculator, Cpu, Globe, Palette, ArrowRight } from 'lucide-react';

interface CourseCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CourseCategories: React.FC<CourseCategoriesProps> = ({
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return Monitor;
      case 'Briefcase': return Briefcase;
      case 'Calculator': return Calculator;
      case 'Cpu': return Cpu;
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      default: return Monitor;
    }
  };

  const getAccentColors = (accent: 'purple' | 'red' | 'gold') => {
    switch (accent) {
      case 'purple':
        return {
          bg: '#26002F',
          text: '#26002F',
          lightBg: '#26002F10',
          border: 'hover:border-[#26002F]/40',
        };
      case 'red':
        return {
          bg: '#D83A27',
          text: '#D83A27',
          lightBg: '#D83A2710',
          border: 'hover:border-[#D83A27]/40',
        };
      case 'gold':
        return {
          bg: '#E4B52D',
          text: '#B3800B',
          lightBg: '#E4B52D15',
          border: 'hover:border-[#E4B52D]/60',
        };
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D83A27]/10 text-[#D83A27] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Pathways to Success</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
              Explore Our <span className="text-[#D83A27]">Learning Programs</span>
            </h2>
            <p className="text-base text-[#66616A] mt-2 max-w-xl">
              From school diplomas to career transitions in AI &amp; Web Development, explore 
              structured learning tracks mapped to high-demand industry skills.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#26002F] hover:text-[#D83A27] transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COURSE_CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.iconName);
            const colors = getAccentColors(cat.accent);

            return (
              <div
                key={cat.id}
                className={`group relative bg-white rounded-2xl p-7 border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${colors.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: colors.lightBg, color: colors.bg }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span 
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: colors.lightBg, color: colors.text }}
                    >
                      {cat.courseCount} Courses
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E1B20] group-hover:text-[#26002F] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-sm text-[#66616A] mt-2.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Industry Curriculum
                  </span>
                  
                  <button
                    onClick={() => onSelectCategory(cat.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:translate-x-1"
                    style={{ color: colors.bg }}
                  >
                    <span>Explore Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
