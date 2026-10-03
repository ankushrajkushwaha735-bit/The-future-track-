import React, { useState } from 'react';
import { Logo } from './Logo';
import { DEMO_CERTIFICATES, CertificateItem } from '../data/portalData';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Calendar, 
  FileCheck, 
  Printer, 
  Download, 
  Building2, 
  ArrowLeft,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface CertificateVerificationProps {
  onBackToHome: () => void;
  onEnquireClick: () => void;
}

export const CertificateVerification: React.FC<CertificateVerificationProps> = ({
  onBackToHome,
  onEnquireClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedCertificate, setVerifiedCertificate] = useState<CertificateItem | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const query = (customCode || searchQuery).trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);
    const found = DEMO_CERTIFICATES.find(c => 
      c.certId.toUpperCase() === query || 
      c.verificationCode.toUpperCase() === query
    );

    if (found) {
      setVerifiedCertificate(found);
    } else {
      setVerifiedCertificate(null);
    }
  };

  const handleQuickVerify = (certId: string) => {
    setSearchQuery(certId);
    handleSearch(undefined, certId);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F8] text-[#1E1B20] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner */}
      <div className="bg-[#26002F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-purple-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-200 hover:text-white bg-white/10 px-3 py-1.5 rounded-full mb-6 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Institute Website
          </button>

          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} inverted={true} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            Official Certificate Verification Portal
          </h1>
          <p className="text-purple-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Verify the authenticity of digital diplomas, course completion certifications, and government-standard credentials issued by <strong className="text-white">The Future Track Computer Education</strong>.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Enter Certificate Serial (e.g. TFT-2025-0842)"
                className="w-full bg-white text-gray-900 pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D83A27] shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg shrink-0 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#E4B52D]" />
              Verify Authenticity
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-purple-200">
            <span>Sample Verifications:</span>
            {DEMO_CERTIFICATES.slice(0, 3).map(cert => (
              <button
                key={cert.certId}
                onClick={() => handleQuickVerify(cert.certId)}
                className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono text-[#E4B52D] font-bold border border-white/10"
              >
                {cert.certId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Result Area */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {hasSearched && verifiedCertificate && (
          <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden animate-fadeIn">
            {/* Header Status Strip */}
            <div className="bg-emerald-600 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base">OFFICIALLY VERIFIED &amp; AUTHENTIC</h3>
                  <p className="text-[11px] text-emerald-100">Valid record verified from Institute Central Database</p>
                </div>
              </div>
              <div className="font-mono text-xs font-black bg-white/20 px-3 py-1 rounded-full text-white self-start sm:self-auto">
                ID: {verifiedCertificate.certId}
              </div>
            </div>

            {/* Certificate Visual Body */}
            <div className="p-6 sm:p-10 border-8 border double border-purple-50 m-4 rounded-2xl relative bg-white">
              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Logo size="xl" showText={false} />
              </div>

              <div className="text-center mb-8 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D83A27] bg-red-50 px-3 py-1 rounded-full">
                  The Future Track Computer Education
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-[#26002F] mt-2">
                  Certificate of Achievement &amp; Proficiency
                </h2>
                <p className="text-xs text-[#66616A] mt-1 font-serif italic">
                  विद्या परम् बलम् • Knowledge is Supreme Strength
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 text-center relative z-10">
                <p className="text-xs text-[#66616A] uppercase tracking-wider font-semibold">
                  This is to certify that
                </p>
                <div className="text-2xl sm:text-3xl font-black text-[#26002F] font-serif border-b-2 border-purple-100 pb-2 inline-block px-8">
                  {verifiedCertificate.studentName}
                </div>
                <p className="text-xs text-[#66616A] leading-relaxed">
                  has successfully completed the comprehensive training and lab evaluation for the certified curriculum of
                </p>
                <div className="text-base sm:text-xl font-black text-[#D83A27]">
                  {verifiedCertificate.courseName}
                </div>
                <p className="text-xs text-[#66616A]">
                  with an exemplary performance record achieving Grade: <strong className="text-[#26002F] font-extrabold">{verifiedCertificate.grade}</strong> ({verifiedCertificate.percentage}%).
                </p>
              </div>

              {/* Certificate Verification Table */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left relative z-10">
                <div className="bg-[#F7F5F8] p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-[#66616A] block">CERTIFICATE NO.</span>
                  <span className="text-xs font-mono font-bold text-[#26002F]">{verifiedCertificate.certId}</span>
                </div>
                <div className="bg-[#F7F5F8] p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-[#66616A] block">COMPLETION DATE</span>
                  <span className="text-xs font-bold text-[#26002F]">{verifiedCertificate.completionDate}</span>
                </div>
                <div className="bg-[#F7F5F8] p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-[#66616A] block">ISSUE DATE</span>
                  <span className="text-xs font-bold text-[#26002F]">{verifiedCertificate.issueDate}</span>
                </div>
                <div className="bg-[#F7F5F8] p-3 rounded-xl">
                  <span className="text-[10px] font-bold text-[#66616A] block">SIGNATORY</span>
                  <span className="text-xs font-bold text-[#26002F]">{verifiedCertificate.authorizedSignatory}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 border-t border-gray-100">
                <div className="text-left text-[11px] text-[#66616A]">
                  <p>Center: <strong>Bartand, Dhanbad, Jharkhand 826001</strong></p>
                  <p>Verification Hash: <span className="font-mono text-purple-900">{verifiedCertificate.verificationCode}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 bg-[#26002F] hover:bg-[#3d004b] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#E4B52D]" />
                    Print Verified Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasSearched && !verifiedCertificate && (
          <div className="bg-white rounded-3xl border border-red-100 p-8 text-center shadow-lg max-w-xl mx-auto animate-fadeIn">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-[#1E1B20]">No Matching Certificate Record Found</h3>
            <p className="text-xs text-[#66616A] mt-2 leading-relaxed">
              We could not find any issued certificate matching <strong>"{searchQuery}"</strong> in our official records.
            </p>
            <div className="mt-6 p-4 bg-purple-50 rounded-2xl text-left text-xs text-[#26002F]">
              <p className="font-bold mb-1">Please ensure:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-[#66616A]">
                <li>You entered the complete certificate number including prefix (e.g. <code>TFT-2025-0842</code>).</li>
                <li>There are no spaces before or after the certificate code.</li>
                <li>If newly issued, please allow 24-48 hours for online portal synchronization.</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setSearchQuery('')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                Try Another Code
              </button>
              <a
                href="https://wa.me/916203269614"
                target="_blank"
                rel="noreferrer"
                className="bg-[#D83A27] hover:bg-[#b82e1d] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Contact Helpdesk
              </a>
            </div>
          </div>
        )}

        {/* Informational Cards */}
        {!hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#26002F] flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5 text-[#D83A27]" />
              </div>
              <h3 className="text-sm font-bold text-[#26002F] mb-1">Instant Verification</h3>
              <p className="text-xs text-[#66616A] leading-relaxed">
                Direct cryptographic validation against student roll numbers and exam transcripts issued by our authorized Dhanbad campus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D83A27] flex items-center justify-center font-bold mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#26002F] mb-1">Govt. Job &amp; DV Ready</h3>
              <p className="text-xs text-[#66616A] leading-relaxed">
                Accepted for document verification by SSC, State High Courts, Banking assistants, and corporate enterprise HR departments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#26002F] mb-1">Dhanbad Head Office</h3>
              <p className="text-xs text-[#66616A] leading-relaxed">
                Physical verification and transcript endorsement available at City Centre, Bartand, Dhanbad.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
