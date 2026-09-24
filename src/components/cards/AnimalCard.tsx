import React from 'react';
import { AnimalListing } from '../../types';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Heart, MapPin, Video, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AnimalCardProps {
  listing: AnimalListing;
  priority?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ listing }) => {
  const { language, formatPrice, formatTeethCount, t } = useLocale();
  const { setSelectedListing, toggleFavorite, isFavorite } = useMarketplace();

  const favorited = isFavorite(listing.id);

  const displayTitle = language === 'ur' ? listing.titleUrdu : listing.title;
  const displayBreed = language === 'ur' ? listing.breedUrdu : listing.breed;
  const displayCity = language === 'ur' ? listing.cityUrdu : listing.city;

  const imageSrc = listing.images && listing.images.length > 0 ? listing.images[0] : '';

  return (
    <div
      onClick={() => setSelectedListing(listing)}
      className="group bg-white rounded-lg border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-emerald-700"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedListing(listing);
        }
      }}
    >
      {/* Visual Slot (65-70% height emphasis) */}
      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={displayTitle}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500">
            <span className="text-xs font-medium">{displayBreed}</span>
          </div>
        )}

        {/* Quiet Top Overlays: Video indicator & Favorite Action */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {listing.hasVideo ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium pointer-events-auto">
              <Video className="w-3 h-3 text-emerald-400" />
              <span>Video</span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(listing.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              favorited
                ? 'bg-rose-50 text-rose-600 shadow-sm'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
          </button>
        </div>

        {/* Feature status quiet banner (if featured) */}
        {listing.isFeatured && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-amber-500/95 text-stone-950 font-bold text-[10px] tracking-wide uppercase">
            Featured Mandi
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Quiet Metadata Line */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1">
            <span className="text-emerald-800 font-semibold">{displayBreed}</span>
            <span aria-hidden="true">·</span>
            <span>{formatTeethCount(listing.teeth)}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{listing.weightMann} {t('mannUnit')} ({listing.weightKg} {t('kgUnit')})</span>
          </div>

          {/* Primary Title (Text-wrap balance, no orphan words) */}
          <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
            {displayTitle}
          </h3>

          {/* Special spec tag if dairy / milk */}
          {listing.milkCapacityLitersPerDay && listing.milkCapacityLitersPerDay > 0 ? (
            <div className="mt-1 text-xs text-emerald-700 font-medium flex items-center gap-1">
              <span>{listing.milkCapacityLitersPerDay} {t('milkYieldPerDay')}</span>
              {listing.isPregnant && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700">{listing.pregnantMonths} {t('months')} {t('pregnant')}</span>
                </>
              )}
            </div>
          ) : null}
        </div>

        {/* Pricing & Location Baseline */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-end justify-between gap-2">
          <div>
            <div className="text-base font-extrabold text-stone-900 font-mono tabular-nums tracking-tight">
              {formatPrice(listing.price)}
            </div>
            <div className="text-[11px] text-stone-500">
              {listing.isNegotiable ? t('priceNegotiable') : t('priceFixed')}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs text-stone-600 font-medium">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="truncate max-w-[110px]">{displayCity}</span>
            </div>
            {listing.seller.isVerified && (
              <div className="flex items-center justify-end gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
