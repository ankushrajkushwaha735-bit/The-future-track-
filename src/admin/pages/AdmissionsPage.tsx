import React, { useState, useMemo } from 'react';
import { useAdmin } from '../AdminContext';
import { EnquiryLead, EnquiryStatus } from '../types';
import { 
  Inbox, 
  Search, 
  Plus, 
  PhoneCall, 
  MessageCircle, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Filter, 
  X, 
  Edit3, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AdmissionsPageProps {
  initialSubTab?: 'applications' | 'enquiries' | 'followups';
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ initialSubTab = 'enquiries' }) => {
  const { enquiries, addEnquiry, updateEnquiry, convertEnquiryToStudent, courses } = useAdmin();

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'enquiries' | 'followups'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryLead | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    interestedCourse: courses[0]?.name || 'ADCA',
    source: 'Website Form' as any,
    message: '',
    notes: '',
  });

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchSearch =
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone.includes(searchQuery) ||
        e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.interestedCourse.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || e.status === statusFilter;
      const matchCourse = courseFilter === 'all' || e.interestedCourse === courseFilter;

      if (activeSubTab === 'followups') {
        return matchSearch && matchStatus && matchCourse && ['Contacted', 'Interested', 'Follow-up'].includes(e.status);
      }

      return matchSearch && matchStatus && matchCourse;
    });
  }, [enquiries, searchQuery, statusFilter, courseFilter, activeSubTab]);

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    addEnquiry({
      ...formData,
      whatsapp: formData.whatsapp || formData.phone,
    });

    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      interestedCourse: courses[0]?.name || 'ADCA',
      source: 'Website Form',
      message: '',
      notes: '',
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26002F]/5 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-1">
            <span>Admission CRM</span>
          </div>
          <h1 className="text-2xl font-black text-[#26002F]">
            Admissions &amp; Lead Management
          </h1>
          <p className="text-xs text-[#66616A]">
            Track website inquiries, schedule student counselling, and convert prospective leads into enrolled batches.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#D83A27] hover:bg-[#BF2F1E] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Admission Enquiry</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveSubTab('enquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'enquiries'
              ? 'bg-[#26002F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>All Enquiries &amp; Leads</span>
          <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
            {enquiries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('followups')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'followups'
              ? 'bg-[#26002F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>Active Follow-ups</span>
          <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-[#E4B52D] text-[#26002F] font-black">
            {enquiries.filter((e) => ['Contacted', 'Interested', 'Follow-up'].includes(e.status)).length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'applications'
              ? 'bg-[#26002F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>Converted to Students</span>
          <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-green-100 text-green-700">
            {enquiries.filter((e) => e.status === 'Converted').length}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, phone, ref ID..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-2 rounded-xl border border-gray-200 bg-white font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="New">Status: New</option>
            <option value="Contacted">Status: Contacted</option>
            <option value="Interested">Status: Interested</option>
            <option value="Follow-up">Status: Follow-up</option>
            <option value="Converted">Status: Converted</option>
            <option value="Closed">Status: Closed</option>
          </select>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="text-xs p-2 rounded-xl border border-gray-200 bg-white font-medium focus:outline-none max-w-[200px] truncate"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#26002F] text-white uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Ref ID</th>
                <th className="p-3.5">Student Details</th>
                <th className="p-3.5">Interested Course</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Follow-up</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Quick Contact &amp; Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#F7F5F8] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#D83A27]">
                      {enq.id}
                    </td>

                    <td className="p-3.5">
                      <strong className="block text-sm text-[#1E1B20] font-bold">
                        {enq.name}
                      </strong>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {enq.phone}
                      </span>
                      {enq.email !== 'N/A' && (
                        <span className="block text-[10px] text-gray-400">
                          {enq.email}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 max-w-[200px]">
                      <span className="text-gray-800 font-semibold block truncate">
                        {enq.interestedCourse}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Received: {enq.createdAt}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                        {enq.source}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-gray-700 block">
                        {enq.followUpDate}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Staff: {enq.assignedStaff}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiry(enq.id, { status: e.target.value as any })}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                          enq.status === 'New'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : enq.status === 'Converted'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                        }`}
                      >
                        <option value="New">● New</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="Interested">● Interested</option>
                        <option value="Follow-up">● Follow-up</option>
                        <option value="Converted">● Converted</option>
                        <option value="Not Interested">● Not Interested</option>
                        <option value="Closed">● Closed</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Call Button */}
                        <a
                          href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-[#D83A27] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                          title="Call Lead"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>

                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/${enq.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.name)},%20greetings%20from%20The%20Future%20Track%20Computer%20Education%20Dhanbad.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-green-50 hover:bg-green-600 hover:text-white text-green-700 flex items-center justify-center transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        {/* Convert to Student Action */}
                        {enq.status !== 'Converted' ? (
                          <button
                            onClick={() => convertEnquiryToStudent(enq.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#26002F] hover:bg-[#3D004B] text-white text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1"
                            title="Enroll directly into student roster"
                          >
                            <UserCheck className="w-3 h-3 text-[#E4B52D]" />
                            <span>Enroll</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                            Enrolled
                          </span>
                        )}

                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-100 font-semibold"
                        >
                          Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No admission enquiries matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Admission Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative">
            <div className="p-5 bg-[#26002F] text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Record New Admission Enquiry</h3>
                <span className="text-[11px] text-gray-300">Offline walk-in, phone call or referral lead</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEnquiry} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-800 mb-1">Email ID</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D83A27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">Interested Course *</label>
                  <select
                    value={formData.interestedCourse}
                    onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-medium"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-800 mb-1">Lead Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-medium"
                  >
                    <option value="Walk-in">Campus Walk-in</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Website Form">Website Form</option>
                    <option value="WhatsApp CTA">WhatsApp Message</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Counselor Discussion Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Batch preference, fee discussion, demo class time..."
                  className="w-full p-2 rounded-xl border border-gray-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D83A27] text-white font-bold hover:bg-[#BF2F1E] shadow"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enquiry Notes / Details Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <strong className="block text-base text-[#26002F]">{selectedEnquiry.name}</strong>
                <span className="text-xs text-gray-500">{selectedEnquiry.id} • {selectedEnquiry.phone}</span>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div>
                <span className="font-bold text-gray-400 uppercase text-[10px] block">Course Requested</span>
                <span className="font-semibold text-gray-800">{selectedEnquiry.interestedCourse}</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 uppercase text-[10px] block">Original Message</span>
                <p className="p-2.5 rounded-xl bg-gray-50 text-gray-700">{selectedEnquiry.message || 'No additional note'}</p>
              </div>
              <div>
                <span className="font-bold text-gray-400 uppercase text-[10px] block">Counsellor Notes</span>
                <textarea
                  rows={3}
                  defaultValue={selectedEnquiry.notes}
                  onBlur={(e) => updateEnquiry(selectedEnquiry.id, { notes: e.target.value })}
                  placeholder="Type notes and click outside to save..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 mt-1"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => {
                  convertEnquiryToStudent(selectedEnquiry.id);
                  setSelectedEnquiry(null);
                }}
                className="bg-[#26002F] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#E4B52D]" />
                <span>Enroll Student</span>
              </button>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-gray-100 text-gray-700 font-bold text-xs px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
