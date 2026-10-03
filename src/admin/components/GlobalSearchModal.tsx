import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { Search, User, BookOpen, Calendar, Inbox, X, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (page: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const { students, courses, batches, enquiries } = useAdmin();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredStudents = q ? students.filter((s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.course.toLowerCase().includes(q)) : [];
  const filteredCourses = q ? courses.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)) : [];
  const filteredBatches = q ? batches.filter((b) => b.name.toLowerCase().includes(q) || b.courseName.toLowerCase().includes(q)) : [];
  const filteredEnquiries = q ? enquiries.filter((e) => e.name.toLowerCase().includes(q) || e.interestedCourse.toLowerCase().includes(q)) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, courses, batches, leads... (e.g. Aman, Tally, ADCA)"
            className="w-full text-sm font-medium focus:outline-none placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {!q ? (
            <div className="text-center py-8 text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Type keywords to search across students, courses, and admissions.</p>
            </div>
          ) : (
            <>
              {/* Students Results */}
              {filteredStudents.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">Students</span>
                  <div className="space-y-1">
                    {filteredStudents.slice(0, 4).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onSelect('students-all');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F7F5F8] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <User className="w-4 h-4 text-[#D83A27]" />
                          <div>
                            <strong className="block text-gray-800">{s.name} ({s.id})</strong>
                            <span className="text-[11px] text-gray-500">{s.course}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {filteredCourses.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">Courses</span>
                  <div className="space-y-1">
                    {filteredCourses.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelect('courses');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F7F5F8] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#26002F]" />
                          <div>
                            <strong className="block text-gray-800">{c.name}</strong>
                            <span className="text-[11px] text-[#E4B52D] font-bold">{c.category} • {c.duration}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Batches Results */}
              {filteredBatches.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">Batches</span>
                  <div className="space-y-1">
                    {filteredBatches.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          onSelect('batches');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F7F5F8] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#E4B52D]" />
                          <div>
                            <strong className="block text-gray-800">{b.name}</strong>
                            <span className="text-[11px] text-gray-500">{b.startTime} - {b.endTime} ({b.roomLab})</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {filteredStudents.length === 0 && filteredCourses.length === 0 && filteredBatches.length === 0 && filteredEnquiries.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No records found matching "{query}".
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
          <span>Search index includes all 16 courses and student rosters.</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">ESC to close</kbd>
        </div>
      </div>
    </div>
  );
};
