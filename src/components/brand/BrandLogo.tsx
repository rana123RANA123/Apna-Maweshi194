import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  variant = 'dark',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Cow and Leaf Vector Emblem */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-lg flex items-center justify-center p-1.5 shadow-sm transition-transform duration-200 hover:scale-105 ${
          isLight ? 'bg-white/10 text-white border border-white/20' : 'bg-emerald-900 text-white shadow-emerald-950/20'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle agricultural earth furrow foundation */}
          <path
            d="M8 40C16 38 32 38 40 40"
            stroke="#eab308"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Noble Pakistani Bull / Cow silhouette */}
          <path
            d="M12 34C13 28 15 24 19 22C17 19 16 15 17 11C19 12 21 13 23 15C25 12 28 11 31 12C33 13 34 16 34 19C36 19 38 21 39 24C37 25 36 27 36 30C36 33 38 34 38 35C35 36 29 36 26 35C24 33 22 34 18 35C14 36 12 35 12 34Z"
            fill="currentColor"
          />
          {/* Prominent hump & dewlap curves */}
          <path
            d="M20 22C20 18 24 16 27 18"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Fresh vibrant agricultural leaf sprouting upward */}
          <path
            d="M28 8C33 8 38 12 37 19C32 20 26 15 28 8Z"
            fill="#22c55e"
          />
          <path
            d="M28 16C31 13 34 11 37 10"
            stroke="#fcfbf7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Golden saffron auspicious dot / sun badge */}
          <circle cx="34" cy="9" r="2.5" fill="#f59e0b" />
        </svg>
      </div>

      {/* Brand Name & Script */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className={`${titleSizes[size]} ${isLight ? 'text-white' : 'text-stone-900'} font-sans`}>
            Apna Maweshi
          </span>
          <span className={`text-xs font-semibold px-1 py-0.5 rounded tracking-normal ${
            isLight ? 'text-emerald-200 bg-white/10' : 'text-emerald-800 bg-emerald-100/70'
          }`}>
            اپنا مویشی
          </span>
        </div>
        {showTagline && (
          <span className={`text-[11px] mt-0.5 tracking-normal ${isLight ? 'text-emerald-100/80' : 'text-stone-500'}`}>
            Pakistan&apos;s Livestock Network
          </span>
        )}
      </div>
    </div>
  );
};
