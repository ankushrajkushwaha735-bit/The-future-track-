import React, { useState } from 'react';
import { FACULTY_MEMBERS, FacultyMember } from '../data/facultyData';
import { Award, GraduationCap, Briefcase, Mail, CheckCircle2, X } from 'lucide-react';

interface FacultySectionProps {
  onEnquire: () => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onEnquire }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  return (
    <section id="faculty" className="py-20 bg-[#F7F5F8] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Academic Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Meet Our <span className="text-[#D83A27]">Faculty</span>
          </h2>
          <p className="text-base text-[#66616A] mt-2">
            Qualified instructors, certified IT trainers, and corporate accounting mentors dedicated to student success.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FACULTY_MEMBERS.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with gradient overlay */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#26002F] to-[#D83A27]">
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to high quality educator portrait if asset URL differs
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Verified badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#26002F] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    Verified Faculty
                  </div>

                  {/* Experience Tag */}
                  <div className="absolute bottom-3 left-3 bg-[#D83A27] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow">
                    {faculty.experience}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-[#1E1B20] group-hover:text-[#26002F] transition-colors leading-snug">
                    {faculty.name}
                  </h3>
                  
                  <div className="text-xs font-semibold text-[#D83A27]">
                    {faculty.designation}
                  </div>

                  <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs text-[#66616A]">
                    <div className="flex items-start gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#26002F] shrink-0 mt-0.5" />
                      <span>{faculty.qualification}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#E4B52D] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{faculty.specialization}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Profile Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedFaculty(faculty)}
                  className="w-full py-2 px-3 rounded-xl bg-[#F7F5F8] hover:bg-[#26002F] text-[#26002F] hover:text-white text-xs font-bold transition-all text-center"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Faculty Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onEnquire}
            className="inline-flex items-center gap-2 bg-[#26002F] hover:bg-[#3D004B] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <span>View All Faculty &amp; Mentors</span>
            <Award className="w-4 h-4 text-[#E4B52D]" />
          </button>
        </div>

      </div>

      {/* Faculty Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-2/5 h-48 sm:h-auto relative bg-[#26002F]">
                <img
                  src={selectedFaculty.photo}
                  alt={selectedFaculty.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:w-3/5 space-y-3">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D83A27] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  {selectedFaculty.experience}
                </div>
                <h3 className="text-xl font-extrabold text-[#1E1B20]">
                  {selectedFaculty.name}
                </h3>
                <p className="text-xs font-semibold text-[#26002F]">
                  {selectedFaculty.designation}
                </p>

                <div className="text-xs text-[#66616A] space-y-1 pt-1 border-t border-gray-100">
                  <p><strong>Qualification:</strong> {selectedFaculty.qualification}</p>
                  <p><strong>Specialization:</strong> {selectedFaculty.specialization}</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed pt-1">
                  {selectedFaculty.bio}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedFaculty(null);
                      onEnquire();
                    }}
                    className="w-full bg-[#D83A27] hover:bg-[#BF2F1E] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow"
                  >
                    Book Counselling Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
