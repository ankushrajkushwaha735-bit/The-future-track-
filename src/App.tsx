/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CourseCategories } from './components/CourseCategories';
import { FeaturedCourses } from './components/FeaturedCourses';
import { LearningProcess } from './components/LearningProcess';
import { FacultySection } from './components/FacultySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AchievementsSection } from './components/AchievementsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { AdmissionCTA } from './components/AdmissionCTA';
import { ContactSection } from './components/ContactSection';
import { GoogleMapSection } from './components/GoogleMapSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

// Portals & Dedicated Pages
import { StudentPortal } from './components/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { AdminPanel } from './components/AdminPanel';
import { CertificateVerification } from './components/CertificateVerification';
import { AdmissionPage } from './components/AdmissionPage';

// Modals
import { EnquiryModal } from './components/EnquiryModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LightboxModal } from './components/LightboxModal';
import { PolicyModals } from './components/PolicyModals';
import { LoginModal } from './components/LoginModal';

import { Course } from './data/coursesData';
import { GalleryItem } from './data/galleryData';

export default function App() {
  // Website CMS Settings (editable live via Admin Panel)
  const [siteSettings, setSiteSettings] = useState({
    announcementText: '🎓 Admissions Open 2026–27 • New Batches Starting This Monday',
    phone: '+91 62032 69614',
    whatsapp: '+91 62032 69614',
    email: 'raushankmr75@gmail.com',
    address: 'City Centre, Near Bus Stand, Bartand, Jharudih, Dhanbad, Jharkhand 826001',
    heroHeading: 'Learn Today. Build Your Future.',
    heroSubtitle: 'Build practical digital, accounting and technology skills with future-ready learning.',
  });

  // Navigation & Filtering
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals state
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryInitialCourse, setEnquiryInitialCourse] = useState<Course | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  // Login modal
  const [loginModalType, setLoginModalType] = useState<'student' | 'teacher' | 'admin' | null>(null);

  // Active view: 'website' | 'student-portal' | 'teacher-portal' | 'admin-panel' | 'verify-certificate' | 'admission'
  const [currentView, setCurrentView] = useState<'website' | 'student-portal' | 'teacher-portal' | 'admin-panel' | 'verify-certificate' | 'admission'>('website');

  // Handlers
  const handleOpenEnquiry = (course?: Course) => {
    setEnquiryInitialCourse(course || null);
    setIsEnquiryModalOpen(true);
  };

  const handleSelectCategory = (categoryName: string) => {
    setCategoryFilter(categoryName);
    const el = document.querySelector('#courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCourses = () => {
    const el = document.querySelector('#courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. If in Student Portal View
  if (currentView === 'student-portal') {
    return (
      <StudentPortal
        onLogout={() => setCurrentView('website')}
      />
    );
  }

  // 2. If in Teacher Portal View
  if (currentView === 'teacher-portal') {
    return (
      <TeacherPortal
        onLogout={() => setCurrentView('website')}
      />
    );
  }

  // 3. If in Admin Panel View
  if (currentView === 'admin-panel') {
    return (
      <AdminPanel
        onLogout={() => setCurrentView('website')}
        siteSettings={siteSettings}
        onUpdateSiteSettings={(newSettings) => setSiteSettings(newSettings)}
      />
    );
  }

  // 4. If in Certificate Verification Page
  if (currentView === 'verify-certificate') {
    return (
      <CertificateVerification
        onBackToHome={() => setCurrentView('website')}
        onEnquireClick={() => handleOpenEnquiry()}
      />
    );
  }

  // 5. If in Formal Admission Application Page
  if (currentView === 'admission') {
    return (
      <AdmissionPage
        onBackToHome={() => setCurrentView('website')}
        phone={siteSettings.phone}
        whatsapp={siteSettings.whatsapp}
      />
    );
  }

  // Public Website View
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E1B20] selection:bg-[#D83A27] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 01. Top Announcement Bar */}
      <AnnouncementBar
        text={siteSettings.announcementText}
        onApplyClick={() => setCurrentView('admission')}
        phone={siteSettings.phone}
      />

      {/* 02. Header */}
      <Header
        onEnquireClick={() => handleOpenEnquiry()}
        onStudentLoginClick={() => setLoginModalType('student')}
        onTeacherLoginClick={() => setLoginModalType('teacher')}
        onAdminLoginClick={() => setLoginModalType('admin')}
        onVerifyCertClick={() => setCurrentView('verify-certificate')}
        onAdmissionClick={() => setCurrentView('admission')}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Website Sections */}
      <main className="flex-1">
        
        {/* 03. Hero Section */}
        <Hero
          onExploreCourses={handleExploreCourses}
          onEnquireClick={() => handleOpenEnquiry()}
          phone={siteSettings.phone}
          whatsapp={siteSettings.whatsapp}
        />

        {/* 04. Trust / Statistics Section */}
        <TrustStats />

        {/* 05. About Section */}
        <AboutSection
          onEnquireClick={() => handleOpenEnquiry()}
        />

        {/* 06. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 07. Course Categories Section */}
        <CourseCategories
          onSelectCategory={handleSelectCategory}
        />

        {/* 08. Featured Courses Section */}
        <FeaturedCourses
          selectedCategoryFilter={categoryFilter}
          onCategoryFilterChange={(cat) => setCategoryFilter(cat)}
          onViewCourseDetail={(course) => setSelectedCourseDetail(course)}
          onEnquireCourse={(course) => handleOpenEnquiry(course)}
        />

        {/* 09. Learning Process Timeline */}
        <LearningProcess />

        {/* 10. Faculty Section */}
        <FacultySection
          onEnquire={() => handleOpenEnquiry()}
        />

        {/* 11. Facilities Section */}
        <FacilitiesSection />

        {/* 12. Achievements Section */}
        <AchievementsSection />

        {/* 13. Testimonials Section */}
        <TestimonialsSection />

        {/* 14. Gallery Section */}
        <GallerySection
          onOpenLightbox={(item) => setSelectedLightboxItem(item)}
        />

        {/* 15. Blog & Technology Updates Section */}
        <BlogSection
          onEnquireClick={() => handleOpenEnquiry()}
        />

        {/* 16. FAQ Section */}
        <FAQSection />

        {/* 17. Major Admission CTA Section */}
        <AdmissionCTA
          onApplyClick={() => setCurrentView('admission')}
          phone={siteSettings.phone}
          whatsapp={siteSettings.whatsapp}
        />

        {/* 18. Contact Section */}
        <ContactSection
          onSuccessSubmit={() => {}}
          instituteAddress={siteSettings.address}
          institutePhone={siteSettings.phone}
          instituteWhatsApp={siteSettings.whatsapp}
          instituteEmail={siteSettings.email}
        />

        {/* 19. Google Map Section */}
        <GoogleMapSection
          address={siteSettings.address}
        />
      </main>

      {/* 20. Footer */}
      <Footer
        onStudentLoginClick={() => setLoginModalType('student')}
        onTeacherLoginClick={() => setLoginModalType('teacher')}
        onAdminLoginClick={() => setLoginModalType('admin')}
        onVerifyCertClick={() => setCurrentView('verify-certificate')}
        onAdmissionClick={() => setCurrentView('admission')}
        onEnquireClick={() => handleOpenEnquiry()}
        onOpenPolicy={(type) => setPolicyType(type)}
        onSelectCategory={handleSelectCategory}
        phone={siteSettings.phone}
        whatsapp={siteSettings.whatsapp}
        email={siteSettings.email}
        address={siteSettings.address}
      />

      {/* Floating Action Buttons (Desktop Float + Mobile Sticky Bottom) */}
      <FloatingActions
        phone={siteSettings.phone}
        whatsapp={siteSettings.whatsapp}
      />

      {/* MODALS */}

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        initialCourse={enquiryInitialCourse}
      />

      {/* Course Detail Syllabus Modal */}
      <CourseDetailModal
        course={selectedCourseDetail}
        onClose={() => setSelectedCourseDetail(null)}
        onEnquire={(course) => {
          setSelectedCourseDetail(null);
          handleOpenEnquiry(course);
        }}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
      />

      {/* Policy Modals (Privacy, Terms, Refund) */}
      <PolicyModals
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      {/* Login Modal for Student, Teacher, and Admin */}
      <LoginModal
        isOpen={loginModalType !== null}
        type={loginModalType || 'student'}
        onClose={() => setLoginModalType(null)}
        onSuccessLogin={(chosenRole) => {
          setLoginModalType(null);
          if (chosenRole === 'student') {
            setCurrentView('student-portal');
          } else if (chosenRole === 'teacher') {
            setCurrentView('teacher-portal');
          } else {
            setCurrentView('admin-panel');
          }
        }}
      />

    </div>
  );
}
