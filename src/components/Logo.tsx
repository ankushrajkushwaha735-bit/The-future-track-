import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  inverted = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimensions map
  const sizeMap = {
    sm: { seal: 40, bannerH: 14, totalH: 52, textClass: 'text-sm' },
    md: { seal: 52, bannerH: 18, totalH: 68, textClass: 'text-base' },
    lg: { seal: 68, bannerH: 22, totalH: 88, textClass: 'text-lg' },
    xl: { seal: 96, bannerH: 28, totalH: 120, textClass: 'text-2xl' },
  };

  const currentSize = sizeMap[size];
  const uploadedLogoSrc = "12IgMPBn7Jhul3WWgBLE6o7W1tmEA-ZLyRuU5S-UpYv9C92TSBwH-nGKxEZUtqRyNOcm8dpdgZ4-k4vniJxx=w526-h296-rw.jpg";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Insignia Seal */}
      <div 
        className="relative shrink-0 flex items-center justify-center overflow-hidden"
        style={{ width: currentSize.seal, height: currentSize.totalH }}
        aria-label="The Future Track Computer Education Official Logo"
      >
        {!imageError ? (
          <img
            src={uploadedLogoSrc}
            alt="The Future Track Computer Education Official Logo"
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full drop-shadow-sm overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
          <defs>
            {/* Curved text path along top circle */}
            <path
              id="futureTrackTextPath"
              d="M 28 100 A 72 72 0 1 1 172 100"
              fill="none"
            />
            {/* Subtle gradients */}
            <linearGradient id="purpleRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E0238" />
              <stop offset="100%" stopColor="#1E0025" />
            </linearGradient>
            <linearGradient id="redScallop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2442F" />
              <stop offset="100%" stopColor="#C92E1C" />
            </linearGradient>
            <linearGradient id="goldStar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D05D" />
              <stop offset="100%" stopColor="#D99B16" />
            </linearGradient>
          </defs>

          {/* Group for circular seal (center at 100, 100, radius ~88) */}
          <g id="seal-round">
            {/* Outer Deep Purple Ring */}
            <circle cx="100" cy="100" r="88" fill="url(#purpleRing)" />
            
            {/* Thin Golden Ring Outline */}
            <circle cx="100" cy="100" r="87" fill="none" stroke="#E4B52D" strokeWidth="1.2" opacity="0.7" />

            {/* Circular Text: THE FUTURE TRACK COMPUTER EDUCATION */}
            <text
              fill="#FFFFFF"
              fontSize="12.4"
              fontWeight="800"
              letterSpacing="2.8"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            >
              <textPath
                href="#futureTrackTextPath"
                startOffset="50%"
                textAnchor="middle"
              >
                THE FUTURE TRACK COMPUTER EDUCATION
              </textPath>
            </text>

            {/* Red / Orange Scalloped Rosette Ring */}
            <g id="scallop">
              <path
                d="M 100 24 
                  C 106 24, 110 27, 115 28 C 120 29, 125 28, 129 31 C 134 34, 137 38, 142 42 
                  C 146 45, 151 47, 154 52 C 158 57, 159 62, 162 67 C 165 72, 169 75, 170 81 
                  C 172 87, 171 92, 172 98 C 172 104, 172 109, 170 115 C 168 121, 164 125, 162 131 
                  C 159 136, 158 141, 153 146 C 149 150, 145 153, 140 157 C 136 160, 132 163, 127 166 
                  C 122 168, 117 168, 112 170 C 106 172, 101 172, 95 171 C 89 171, 84 169, 78 167 
                  C 73 164, 69 161, 64 158 C 60 154, 56 151, 52 146 C 48 142, 46 137, 43 132 
                  C 40 126, 37 122, 36 116 C 34 110, 35 105, 34 99 C 34 93, 35 88, 37 82 
                  C 39 77, 42 73, 45 68 C 48 63, 50 58, 54 53 C 58 49, 62 46, 67 43 
                  C 72 39, 76 36, 81 33 C 86 30, 91 30, 96 28 Z"
                fill="url(#redScallop)"
              />
            </g>

            {/* Inner White Ring Borders */}
            <circle cx="100" cy="100" r="61" fill="#881519" opacity="0.3" />
            <circle cx="100" cy="100" r="59" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="57" fill="#FFFFFF" stroke="#8A131B" strokeWidth="2.2" />

            {/* Inner Computer & Mouse Emblem */}
            <g id="computer-graphic" transform="translate(48, 56)">
              {/* Computer Screen Frame */}
              <rect
                x="8"
                y="12"
                width="88"
                height="56"
                rx="8"
                ry="8"
                fill="#FFFFFF"
                stroke="#1E1B20"
                strokeWidth="4"
              />
              {/* Screen Base / Stand */}
              <path
                d="M 44 68 L 60 68 L 68 78 L 36 78 Z"
                fill="#1E1B20"
              />
              
              {/* Dynamic Curved Mouse Wire / Motion Path */}
              <path
                d="M 4 60 C 18 72, 38 72, 54 52"
                fill="none"
                stroke="#1E1B20"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Computer Mouse hovering on screen */}
              <g transform="translate(50, 26) rotate(-22)">
                <ellipse cx="14" cy="18" rx="11" ry="15" fill="#3A0842" />
                <path d="M 14 3 L 14 18" stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M 3 17 L 25 17" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="14" cy="17" r="2" fill="#E4B52D" />
              </g>
            </g>
          </g>

          {/* Bottom Banner Ribbon */}
          <g id="ribbon-banner" transform="translate(18, 172)">
            {/* Ribbon tail left */}
            <path
              d="M 4 24 L 20 10 L 20 32 L 4 40 L 12 32 Z"
              fill="#EFECEF"
              stroke="#66616A"
              strokeWidth="0.8"
            />
            {/* Ribbon tail right */}
            <path
              d="M 160 24 L 144 10 L 144 32 L 160 40 L 152 32 Z"
              fill="#EFECEF"
              stroke="#66616A"
              strokeWidth="0.8"
            />
            {/* Center ribbon body */}
            <path
              d="M 16 10 L 148 10 L 142 34 L 10 34 Z"
              fill="#FFFFFF"
              stroke="#7E7682"
              strokeWidth="1"
            />
            
            {/* Left Star */}
            <polygon
              points="28,20 30,25 35,25 31,28 33,33 28,30 24,33 26,28 22,25 27,25"
              fill="url(#goldStar)"
              stroke="#B3800B"
              strokeWidth="0.5"
            />

            {/* Motto in Devanagari: विद्या परम् बलम् */}
            <text
              x="82"
              y="25"
              fill="#942116"
              fontSize="12.5"
              fontWeight="700"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
            >
              विद्या परम् बलम्
            </text>

            {/* Right Star */}
            <polygon
              points="136,20 138,25 143,25 139,28 141,33 136,30 132,33 134,28 130,25 135,25"
              fill="url(#goldStar)"
              stroke="#B3800B"
              strokeWidth="0.5"
            />
          </g>
        </svg>
        )}
      </div>

      {/* Brand Text Block (Optional) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight uppercase leading-none font-['Plus_Jakarta_Sans'] ${
                inverted ? 'text-white' : 'text-[#26002F]'
              } ${currentSize.textClass}`}
            >
              The Future Track
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none ${
                inverted ? 'text-[#E4B52D]' : 'text-[#D83A27]'
              }`}
            >
              Computer Education
            </span>
            <span className="hidden sm:inline text-[9px] text-[#8C8592] font-medium border-l border-gray-300 dark:border-gray-700 pl-1.5">
              विद्या परम् बलम्
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
