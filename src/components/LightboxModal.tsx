import React from 'react';
import { GalleryItem } from '../data/galleryData';
import { X, Calendar, Tag } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#1A0020] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-5 sm:p-6 bg-[#26002F] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#E4B52D] font-bold uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                {item.category}
              </span>
              {item.date && (
                <span className="flex items-center gap-1 text-gray-300 font-normal">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">
              {item.title}
            </h3>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              {item.caption}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-[#E4B52D] font-bold block">
              The Future Track
            </span>
            <span className="text-xs text-gray-300">
              Campus Archive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
