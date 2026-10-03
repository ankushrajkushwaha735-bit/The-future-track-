import React from 'react';
import { MapPin, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

interface GoogleMapSectionProps {
  locationName?: string;
  address?: string;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  locationName = 'The Future Track Computer Education',
  address = 'City Centre, Near Bus Stand, Bartand, Jharudih, Dhanbad, Jharkhand 826001',
}) => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'The Future Track Computer Education ' + address
  )}`;

  return (
    <section className="py-12 bg-[#F7F5F8] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Map Container Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D83A27] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Our Campus</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#26002F]">
                {locationName}
              </h3>
              <p className="text-xs sm:text-sm text-[#66616A] mt-1 max-w-xl">
                {address} • Prime location at City Centre near Bartand bus stand with convenient connectivity across Dhanbad.
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#26002F] hover:bg-[#3D004B] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 shrink-0"
            >
              <Navigation className="w-4 h-4 text-[#E4B52D]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-100">
            <iframe
              title="The Future Track Computer Education Location"
              src="https://maps.google.com/maps?q=The%20Future%20Track%20Computer%20Education%20Bartand%20Dhanbad%20Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale-[15%] hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
            
            {/* Map Overlay Card */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-gray-100 max-w-xs hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#26002F] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#E4B52D]" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#1E1B20] font-bold">The Future Track Campus</strong>
                <span className="text-[11px] text-gray-500">Open Daily 8:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
