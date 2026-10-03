import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { Eye, Image as ImageIcon } from 'lucide-react';

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filters = ['All', 'Classes', 'Students', 'Teachers', 'Events', 'Workshops', 'Achievements', 'Certificates', 'Campus', 'Activities'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D83A27]/10 text-[#D83A27] text-xs font-bold uppercase tracking-wider mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26002F] tracking-tight">
            Our Campus <span className="text-[#D83A27]">Gallery</span>
          </h2>
          <p className="text-base text-[#66616A] mt-2">
            A glimpse into everyday lab sessions, certificate ceremonies, student projects, and tech workshops.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === filter
                  ? 'bg-[#26002F] text-white shadow-md'
                  : 'bg-[#F7F5F8] text-[#66616A] hover:bg-gray-200 hover:text-[#1E1B20]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-gray-100 aspect-[4/3] border border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#26002F]/90 via-[#26002F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-white">
                <span className="self-start text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#D83A27] text-white mb-2">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-200 line-clamp-2 mt-1">
                  {item.caption}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#E4B52D] font-bold mt-2 pt-2 border-t border-white/20">
                  <Eye className="w-4 h-4" />
                  <span>Click to view larger</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-[#F7F5F8] hover:bg-gray-200 text-[#26002F] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-gray-200"
          >
            <span>{showAll ? 'Show Fewer Photos' : 'View Full Gallery (All Photos)'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
