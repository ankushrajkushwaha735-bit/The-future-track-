import React from 'react';
import { Course } from '../data/coursesData';
import { 
  X, 
  Clock, 
  Layers, 
  Monitor, 
  CheckCircle2, 
  Award, 
  GraduationCap, 
  BookOpen, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnquire: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnquire,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col">
        {/* Modal Top Banner */}
        <div className="relative h-44 sm:h-52 bg-[#26002F] shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26002F] via-[#26002F]/60 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#D83A27] text-white text-[10px] font-extrabold uppercase tracking-wider">
              {course.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#1E1B20]">
          
          {/* Key Quick Metadata */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-[#F7F5F8] rounded-2xl border border-gray-200/80 text-center">
            <div>
              <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold">Duration</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#26002F] flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#D83A27]" />
                {course.duration}
              </span>
            </div>
            <div className="border-x border-gray-200">
              <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold">Level</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#26002F] flex items-center justify-center gap-1 mt-0.5">
                <Layers className="w-3.5 h-3.5 text-[#E4B52D]" />
                {course.level}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold">Training Mode</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#26002F] flex items-center justify-center gap-1 mt-0.5">
                <Monitor className="w-3.5 h-3.5 text-[#26002F]" />
                {course.mode}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Course Description
            </h4>
            <p className="text-xs sm:text-sm text-[#66616A] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#26002F] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#D83A27]" />
              Detailed Module Syllabus
            </h4>
            <div className="space-y-2">
              {course.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#F7F5F8] border border-gray-100 flex items-start gap-2.5 text-xs text-gray-700"
                >
                  <span className="w-5 h-5 rounded-md bg-[#26002F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Eligibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <h5 className="text-xs font-bold text-[#1E1B20] mb-2 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#D83A27]" />
                Eligibility Criteria
              </h5>
              <p className="text-xs text-gray-600">{course.eligibility}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <h5 className="text-xs font-bold text-[#1E1B20] mb-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#E4B52D]" />
                Certification Awarded
              </h5>
              <p className="text-xs text-gray-600">{course.certification}</p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-gray-500 hidden sm:block">
            Flexible morning &amp; evening batch slots available.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(course);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#D83A27] hover:bg-[#BF2F1E] text-white py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow active:scale-95"
            >
              <span>Enquire &amp; Reserve Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
