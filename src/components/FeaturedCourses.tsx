import React, { useState, useMemo } from 'react';
import { COURSES, Course } from '../data/coursesData';
import { 
  Search, 
  Clock, 
  Layers, 
  Monitor, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Info,
  X
} from 'lucide-react';

interface FeaturedCoursesProps {
  onViewCourseDetail: (course: Course) => void;
  onEnquireCourse: (course: Course) => void;
  selectedCategoryFilter?: string;
  onCategoryFilterChange?: (category: string) => void;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  onViewCourseDetail,
  onEnquireCourse,
  selectedCategoryFilter = 'all',
  onCategoryFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internalCategory, setInternalCategory] = useState(selectedCategoryFilter);

  // Sync with prop when passed
  const activeCategory = selectedCategoryFilter !== 'all' ? selectedCategoryFilter : internalCategory;

  const handleCategorySelect = (cat: string) => {
    setInternalCategory(cat);
    if (onCategoryFilterChange) {
      onCategoryFilterChange(cat);
    }
  };

  const categories = [
    { label: 'All Courses', value: 'all' },
    { label: 'Computer Education', value: 'Computer Education' },
    { label: 'Professional Courses', value: 'Professional Courses' },
    { label: 'Accounting & GST', value: 'Accounting' },
    { label: 'AI & Technology', value: 'AI & Technology' },
    { label: 'Creative Skills', value: 'Creative Skills' },
    { label: 'Digital Skills', value: 'Digital Skills' },
  ];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((c) => {
      const matchesCategory =
        activeCategory === 'all' ||
        c.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="courses" className="py-20 bg-[#F7F5F8] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Career-Focused Curriculums</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
              Popular <span className="text-[#D83A27]">Courses</span>
            </h2>
            <p className="text-base text-[#66616A] mt-2">
              Recognized diplomas and certificates designed with 100% practical lab assignments and job-oriented skills.
            </p>
          </div>

          <button
            onClick={() => handleCategorySelect('all')}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-[#26002F] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3D004B] transition-all shadow-sm shrink-0"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E4B52D]" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-gray-200">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course, Tally, ADCA, Python..."
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27] focus:ring-1 focus:ring-[#D83A27] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategorySelect(cat.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#26002F] text-white shadow-sm'
                      : 'bg-[#F7F5F8] text-[#66616A] hover:text-[#1E1B20] hover:bg-gray-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    {course.badge && (
                      <div className="absolute top-3 right-3 bg-[#D83A27] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
                        {course.badge}
                      </div>
                    )}

                    {/* Category Label */}
                    <div className="absolute bottom-3 left-3 bg-[#26002F]/90 backdrop-blur-sm text-[#E4B52D] text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                      {course.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#1E1B20] group-hover:text-[#26002F] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#66616A] line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Course Metadata Meta Chips */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#66616A] border-t border-gray-100">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#1E1B20]">
                        <Clock className="w-3.5 h-3.5 text-[#D83A27]" />
                        {course.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#E4B52D]" />
                        {course.level}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Monitor className="w-3.5 h-3.5 text-[#26002F]" />
                        {course.mode}
                      </span>
                    </div>

                    {/* Key Highlights list */}
                    <div className="pt-2 space-y-1">
                      {course.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                  <button
                    onClick={() => onViewCourseDetail(course)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#26002F] hover:bg-[#3D004B] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    <Info className="w-3.5 h-3.5 text-[#E4B52D]" />
                    <span>View Course</span>
                  </button>

                  <button
                    onClick={() => onEnquireCourse(course)}
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-[#D83A27] hover:bg-[#BF2F1E] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-sm font-semibold text-gray-500">
              No courses found matching "{searchQuery}" in this category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('all');
              }}
              className="mt-3 text-xs font-bold text-[#D83A27] underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
