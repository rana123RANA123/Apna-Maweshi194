import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { mockDealers } from '../../data/mockData';
import { ShieldCheck, MapPin, Phone, MessageCircle, Star, Award } from 'lucide-react';

export const DealersView: React.FC = () => {
  const { t } = useLocale();
  const { setCurrentView, updateFilter } = useMarketplace();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>Government Certified Studs & Mandi Beopari Network</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
          Verified Pakistani Stud Farms & Dealers
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          Browse verified livestock breeding studs, licensed dairy farms, and reputable mandi traders with confirmed credentials and healthy lineage.
        </p>
      </div>

      {/* Dealers List */}
      <div className="space-y-6">
        {mockDealers.map(dealer => (
          <div
            key={dealer.id}
            className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden"
          >
            {/* Storefront Banner */}
            <div className="h-36 sm:h-48 bg-stone-900 relative">
              <img
                src={dealer.bannerUrl}
                alt={dealer.farmName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider">
                    {dealer.verifiedType}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                    {dealer.farmName}
                  </h2>
                </div>
              </div>
            </div>

            {/* Storefront Content */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                    <span>Proprietor: <strong>{dealer.ownerName}</strong></span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {dealer.city}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 mt-2 max-w-2xl leading-relaxed">
                    {dealer.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 text-right">
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{dealer.rating} ({dealer.reviewCount} verified reviews)</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800">
                    {dealer.activeListingsCount} Animals Available Now
                  </span>
                </div>
              </div>

              {/* Farm Specialties */}
              <div>
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide block mb-2">
                  Farm Specialties & Bloodlines:
                </span>
                <div className="flex flex-wrap gap-2">
                  {dealer.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    updateFilter('city', dealer.city);
                    setCurrentView('search');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-2xs"
                >
                  View Farm&apos;s Mandi Stock
                </button>
                <a
                  href={`tel:${dealer.phone}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-300 text-stone-800 font-semibold text-xs hover:bg-stone-50"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call {dealer.phone}</span>
                </a>
                <a
                  href={`https://wa.me/92${dealer.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-xs hover:bg-emerald-100"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp Video Inspection</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
