import React, { useState } from 'react';
import { AnimalListing } from '../../types';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  X,
  Heart,
  Share2,
  Flag,
  Phone,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Maximize2,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface AnimalDetailModalProps {
  listing: AnimalListing;
  onClose: () => void;
}

export const AnimalDetailModal: React.FC<AnimalDetailModalProps> = ({ listing, onClose }) => {
  const { language, formatPrice, formatTeethCount, t } = useLocale();
  const {
    toggleFavorite,
    isFavorite,
    startConversationWithSeller,
    openReportModal,
    showToast,
  } = useMarketplace();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const favorited = isFavorite(listing.id);
  const displayTitle = language === 'ur' ? listing.titleUrdu : listing.title;
  const displayBreed = language === 'ur' ? listing.breedUrdu : listing.breed;
  const displayCity = language === 'ur' ? listing.cityUrdu : listing.city;
  const displayMandi = language === 'ur' ? listing.mandiNameUrdu : listing.mandiName;
  const displayDesc = language === 'ur' ? listing.descriptionUrdu : listing.description;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayTitle,
        text: `Check out this ${displayBreed} on Apna Maweshi: ${displayTitle}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard', 'info');
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${listing.seller.phone}`;
  };

  const handleWhatsApp = () => {
    const cleanPhone = listing.seller.whatsapp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/92${cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(
      `Assalam-o-Alaikum, I am inquiring about your listing on Apna Maweshi: ${listing.title} (Rs ${listing.price.toLocaleString()})`
    )}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-animal-title"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#fcfbf7] rounded-none sm:rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[100vh] sm:max-h-[92vh] border border-stone-200">
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#fcfbf7]/90 backdrop-blur-md border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
            <span className="text-emerald-800 font-semibold">{displayBreed}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.category.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(listing.id)}
              className={`p-2 rounded-lg transition-colors border ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              aria-label={favorited ? 'Favorited' : 'Favorite'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
              aria-label="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => openReportModal(listing)}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
              aria-label="Report listing"
              title="Report fraud or issue"
            >
              <Flag className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 pb-28 sm:pb-6 space-y-6">
          {/* Main Gallery Area */}
          <div className="space-y-3">
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-stone-900 rounded-lg overflow-hidden flex items-center justify-center">
              {showVideoPlayer && listing.hasVideo ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-950 text-white p-4 text-center">
                  <Play className="w-12 h-12 text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold">Simulated Mandi Video Inspection</p>
                  <p className="text-xs text-stone-400 mt-1 max-w-sm">
                    In live mobile app, 360° walkaround and teeth inspection video plays directly with audio.
                  </p>
                  <button
                    onClick={() => setShowVideoPlayer(false)}
                    className="mt-4 px-3 py-1.5 rounded bg-stone-800 text-xs text-stone-200 hover:bg-stone-700"
                  >
                    Back to Photo Gallery
                  </button>
                </div>
              ) : (
                <img
                  src={listing.images[activePhotoIdx] || listing.images[0]}
                  alt={displayTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Expand Fullscreen Button */}
              {!showVideoPlayer && (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                  aria-label="View Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Thumbnail Strip (supporting up to 6 photos + video tile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePhotoIdx(idx);
                    setShowVideoPlayer(false);
                  }}
                  className={`relative w-18 h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    !showVideoPlayer && activePhotoIdx === idx
                      ? 'border-emerald-700 ring-2 ring-emerald-700/20'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {listing.hasVideo && (
                <button
                  onClick={() => setShowVideoPlayer(true)}
                  className={`relative w-18 h-14 rounded-md shrink-0 border-2 bg-stone-800 text-white flex flex-col items-center justify-center transition-all ${
                    showVideoPlayer
                      ? 'border-emerald-600 ring-2 ring-emerald-600/30'
                      : 'border-stone-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <Play className="w-5 h-5 text-emerald-400" />
                  <span className="text-[9px] font-bold mt-0.5">VIDEO</span>
                </button>
              )}
            </div>
          </div>

          {/* Pricing & Key Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h1 id="modal-animal-title" className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{displayMandi}</span>
                <span aria-hidden="true">·</span>
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{listing.createdAt}</span>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
                {formatPrice(listing.price)}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {listing.isNegotiable ? t('priceNegotiable') : t('priceFixed')}
              </div>
              {listing.pricePerKg && (
                <div className="text-xs font-semibold text-emerald-800 mt-1">
                  Rs {listing.pricePerKg} / kg live weight
                </div>
              )}
            </div>
          </div>

          {/* Key Specifications Table */}
          <div>
            <h2 className="text-sm font-bold text-stone-900 mb-3 tracking-wide uppercase">
              {t('animalDetails')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <span className="text-[11px] text-stone-500 block">{t('specTeeth')}</span>
                <span className="text-sm font-bold text-stone-800 mt-0.5 block">
                  {formatTeethCount(listing.teeth)}
                </span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <span className="text-[11px] text-stone-500 block">{t('specWeight')}</span>
                <span className="text-sm font-bold text-stone-800 mt-0.5 block font-mono tabular-nums">
                  {listing.weightMann} {t('mannUnit')} ({listing.weightKg} {t('kgUnit')})
                </span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <span className="text-[11px] text-stone-500 block">{t('specAge')}</span>
                <span className="text-sm font-bold text-stone-800 mt-0.5 block">
                  {listing.ageMonths} {t('months')}
                </span>
              </div>

              {listing.milkCapacityLitersPerDay ? (
                <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                  <span className="text-[11px] text-emerald-800 block">{t('specMilk')}</span>
                  <span className="text-sm font-bold text-emerald-900 mt-0.5 block">
                    {listing.milkCapacityLitersPerDay} {t('milkYieldPerDay')}
                  </span>
                </div>
              ) : null}

              {listing.isPregnant !== undefined ? (
                <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                  <span className="text-[11px] text-amber-800 block">{t('specPregnancy')}</span>
                  <span className="text-sm font-bold text-amber-900 mt-0.5 block">
                    {listing.isPregnant
                      ? `${listing.pregnantMonths} ${t('months')} ${t('pregnant')}`
                      : t('notPregnant')}
                  </span>
                </div>
              ) : null}

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <span className="text-[11px] text-stone-500 block">Breed Verification</span>
                <span className="text-sm font-bold text-stone-800 mt-0.5 block">
                  {displayBreed}
                </span>
              </div>
            </div>
          </div>

          {/* Health & Guarantees Badges */}
          <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-200/80">
            <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Health, Vaccination & Sharia Compliance</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('specVaccination')}: FMD & HS Cleared</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('specBeAib')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('specSharia')} (2 Daant / Complete Horns)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Milk Testing & Physical Inspection Permitted</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 mb-1.5">Seller Notes</h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50 p-3.5 rounded-lg border border-stone-200">
              {displayDesc}
            </p>
          </div>

          {/* Seller Profile Card */}
          <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-2xs">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-800 text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {listing.seller.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900">{listing.seller.name}</h4>
                    {listing.seller.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <span className="text-xs text-stone-500 block">
                    {listing.seller.badgeTitle || 'Mandi Breeder'} · {listing.seller.city}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                    <span>★ {listing.seller.rating} ({listing.seller.reviewCount} reviews)</span>
                    <span>·</span>
                    <span>{t('sellerMemberSince')} {listing.seller.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Notice Callout */}
          <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200/90 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t('safetyWarningTitle')}</span>
            </div>
            <p className="leading-relaxed text-amber-800">
              {t('safetyWarningText')}
            </p>
          </div>
        </div>

        {/* Sticky Mobile/Desktop Bottom Action Bar */}
        <div className="sticky bottom-0 z-30 p-3 sm:p-4 bg-[#fcfbf7] border-t border-stone-200 shadow-lg flex items-center justify-between gap-2.5">
          <div className="hidden sm:block">
            <div className="text-xs text-stone-500">Listed Price</div>
            <div className="text-lg font-bold text-stone-900 font-mono tabular-nums">
              {formatPrice(listing.price)}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                startConversationWithSeller(listing);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <MessageSquare className="w-4 h-4 text-stone-600" />
              <span>{t('inAppChat')}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCall}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{t('callSeller')}</span>
            </button>
          </div>
        </div>

        {/* Fullscreen Lightbox Overlay */}
        {isFullscreen && (
          <div className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-2 text-white bg-white/20 hover:bg-white/30 rounded-full"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={listing.images[activePhotoIdx] || listing.images[0]}
              alt={displayTitle}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="mt-4 text-white text-xs">
              Photo {activePhotoIdx + 1} of {listing.images.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
