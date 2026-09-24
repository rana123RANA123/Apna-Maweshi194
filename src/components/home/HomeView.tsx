import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { AnimalCard } from '../cards/AnimalCard';
import { mockDealers } from '../../data/mockData';
import {
  Search,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Truck,
  Stethoscope,
  Wheat,
  PlusCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Flame,
} from 'lucide-react';

import heroBullImg from '../../assets/images/pakistan_qurbani_bull_1790281660863.jpg';

export const HomeView: React.FC = () => {
  const { language, t } = useLocale();
  const {
    listings,
    setCurrentView,
    updateFilter,
    openSellWizard,
    setSelectedListing,
  } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const featuredListings = listings.filter(l => l.isFeatured || l.status === 'featured').slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('searchQuery', searchQuery);
    updateFilter('city', selectedCity);
    setCurrentView('search');
  };

  const handleCategoryClick = (cat: string) => {
    updateFilter('category', cat as any);
    setCurrentView('search');
  };

  const categories = [
    { id: 'cattle', name: t('cattle'), nameUrdu: 'گائے اور بیل', count: '4,280+ ads' },
    { id: 'buffalo', name: t('buffalo'), nameUrdu: 'دودھیل بھینسیں', count: '2,940+ ads' },
    { id: 'goat', name: t('goat'), nameUrdu: 'بکرے اور بکریاں', count: '5,120+ ads' },
    { id: 'sheep', name: t('sheep'), nameUrdu: 'کجلی و دنبے', count: '1,850+ ads' },
    { id: 'camel', name: t('camel'), nameUrdu: 'اونٹ و سانڈھنی', count: '390+ ads' },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Search Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6">
        {/* Subtle agricultural background accent */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src={heroBullImg}
            alt="Mandi background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Pakistani Farm-to-Buyer Livestock Mandi</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            {language === 'ur'
              ? 'پاکستان کی مستند ڈیجیٹل مویشی منڈی'
              : 'Buy & Sell Verified Livestock Across Pakistan'}
          </h1>

          <p className="text-xs sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            {language === 'ur'
              ? 'ساہیوال گائے، نیلی راوی بھینس، راجن پوری بکرے اور قربانی کے اصیل جانور موقع پر تسلی کے ساتھ خریدیں۔'
              : 'Purebred Sahiwal cattle, Nili-Ravi dairy buffaloes, Rajanpuri goats, and certified defect-free Qurbani stock.'}
          </p>

          {/* Unified Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 bg-white rounded-xl p-2 sm:p-2.5 shadow-xl shadow-black/25 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-stone-900 border border-stone-200"
          >
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200/80">
              <Search className="w-4 h-4 text-emerald-800 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-400"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200/80 sm:w-48">
              <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-stone-800 font-medium cursor-pointer"
              >
                <option value="all">{t('allCities')}</option>
                <option value="Sahiwal">{t('sahiwal')}</option>
                <option value="Lahore">{t('lahore')}</option>
                <option value="Faisalabad">{t('faisalabad')}</option>
                <option value="Multan">{t('multan')}</option>
                <option value="Rawalpindi">{t('rawalpindi')}</option>
                <option value="Karachi">{t('karachi')}</option>
                <option value="Sargodha">{t('sargodha')}</option>
                <option value="Bahawalpur">{t('bahawalpur')}</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>{t('searchBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 2. Live Mandi Weight Rates Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-amber-50 rounded-xl border border-amber-200/90 shadow-sm p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold shrink-0 text-amber-900">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <TrendingUp className="w-4 h-4 text-amber-700" />
            <span>{t('liveMandiTicker')}:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-semibold">
            <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200/70">
              {t('liveRateCattle')}
            </span>
            <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200/70">
              {t('liveRateGoats')}
            </span>
            <span className="bg-white/80 px-2.5 py-1 rounded border border-amber-200/70">
              {t('liveRateBuffalo')}
            </span>
          </div>

          <button
            onClick={() => setCurrentView('qurbani')}
            className="text-emerald-800 hover:underline font-bold text-xs shrink-0 flex items-center gap-1"
          >
            <span>Live Calculator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Category Shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            {t('categories')}
          </h2>
          <button
            onClick={() => setCurrentView('search')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="p-3.5 bg-white rounded-lg border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition-colors block">
                  {cat.name}
                </span>
                <span className="text-[11px] text-stone-500 block mt-0.5 font-urdu">
                  {cat.nameUrdu}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold mt-3 block">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Featured Mandi Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {t('featuredListings')}
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('search')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Explore Mandi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map(listing => (
            <AnimalCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* 5. Qurbani Hub Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-950 text-white p-6 sm:p-8 shadow-md">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-stone-950 font-bold text-[11px] uppercase tracking-wider">
              {t('qurbaniSpecial')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {t('qurbaniTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {t('qurbaniSubtitle')}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentView('qurbani')}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shadow-sm"
              >
                {t('bookHissa')}
              </button>
              <button
                onClick={() => {
                  updateFilter('purpose', 'qurbani');
                  setCurrentView('search');
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                Explore Qurbani Animals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Livestock Services Quick Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight mb-4">
          Integrated Farm & Logistics Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setCurrentView('vets')}
            className="p-4 bg-white rounded-lg border border-stone-200 shadow-2xs hover:border-emerald-600 transition-all cursor-pointer flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800">
                {t('vetHubTitle')}
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-snug">
                On-call DVM surgeons, pregnancy ultrasound & artificial insemination.
              </p>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('transport')}
            className="p-4 bg-white rounded-lg border border-stone-200 shadow-2xs hover:border-emerald-600 transition-all cursor-pointer flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800">
                {t('transportTitle')}
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-snug">
                Padded Shehzore, Mazda & 22-Wheeler trucks across Pakistani mandis.
              </p>
            </div>
          </div>

          <div
            onClick={() => setCurrentView('feed')}
            className="p-4 bg-white rounded-lg border border-stone-200 shadow-2xs hover:border-emerald-600 transition-all cursor-pointer flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800">
                Feed, Wanda & Toka Machinery
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-snug">
                Silage bales, milking machines, CP-18 wanda, and spare parts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Studs & Dealers Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {t('navDealers')} & Registered Studs
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified farms with established pedigrees and defect-free guarantees
            </p>
          </div>
          <button
            onClick={() => setCurrentView('dealers')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900"
          >
            All Dealers
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockDealers.map(dealer => (
            <div
              key={dealer.id}
              onClick={() => setCurrentView('dealers')}
              className="p-4 bg-white rounded-lg border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex gap-4"
            >
              <img
                src={dealer.avatarUrl}
                alt={dealer.farmName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-stone-900">{dealer.farmName}</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {dealer.ownerName} · {dealer.city}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-emerald-800 font-semibold">
                  <span>★ {dealer.rating} ({dealer.reviewCount} reviews)</span>
                  <span>·</span>
                  <span>{dealer.activeListingsCount} Animals in Mandi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Call To Action Banner: Sell Your Animal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 bg-stone-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Are you a farmer, breeder, or mandi trader?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg">
              Post your cows, buffaloes, goats, or sheep for free. Reach over 100,000 genuine livestock buyers with zero middleman fee.
            </p>
          </div>
          <button
            onClick={openSellWizard}
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-amber-300" />
            <span>{t('sellBtn')}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
