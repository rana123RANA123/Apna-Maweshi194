import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { AnimalCard } from '../cards/AnimalCard';
import { AnimalCategory, AnimalPurpose, TeethCount } from '../../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Video,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const SearchView: React.FC = () => {
  const { language, t } = useLocale();
  const {
    filteredListings,
    filters,
    updateFilter,
    resetFilters,
    openSellWizard,
  } = useMarketplace();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination calculation
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage) || 1;
  const paginatedItems = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories: { id: AnimalCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Livestock' },
    { id: 'cattle', label: t('cattle') },
    { id: 'buffalo', label: t('buffalo') },
    { id: 'goat', label: t('goat') },
    { id: 'sheep', label: t('sheep') },
    { id: 'camel', label: t('camel') },
  ];

  const quickChips = [
    { label: 'All', active: filters.category === 'all' && filters.purpose === 'all', onClick: () => { updateFilter('category', 'all'); updateFilter('purpose', 'all'); } },
    { label: 'Cows & Bulls', active: filters.category === 'cattle', onClick: () => updateFilter('category', 'cattle') },
    { label: 'Nili Buffalo', active: filters.category === 'buffalo', onClick: () => updateFilter('category', 'buffalo') },
    { label: 'Goats & Bakra', active: filters.category === 'goat', onClick: () => updateFilter('category', 'goat') },
    { label: 'Qurbani Special', active: filters.purpose === 'qurbani', onClick: () => updateFilter('purpose', 'qurbani') },
    { label: 'Dairy Milking', active: filters.purpose === 'milk', onClick: () => updateFilter('purpose', 'milk') },
    { label: 'Verified Sellers', active: filters.verifiedOnly, onClick: () => updateFilter('verifiedOnly', !filters.verifiedOnly) },
    { label: 'With Video', active: filters.hasVideoOnly, onClick: () => updateFilter('hasVideoOnly', !filters.hasVideoOnly) },
  ];

  // Reusable Filter Sidebar/Drawer Content
  const FilterControls = () => (
    <div className="space-y-6 text-xs text-stone-700">
      {/* Category */}
      <div>
        <label className="block text-xs font-bold text-stone-900 mb-2 uppercase tracking-wide">
          {t('categories')}
        </label>
        <div className="space-y-1">
          {categories.map(cat => (
            <label
              key={cat.id}
              className="flex items-center gap-2 p-1.5 rounded hover:bg-stone-100 cursor-pointer font-medium"
            >
              <input
                type="radio"
                name="filter-category"
                checked={filters.category === cat.id}
                onChange={() => updateFilter('category', cat.id)}
                className="text-emerald-700 focus:ring-emerald-700"
              />
              <span className={filters.category === cat.id ? 'font-bold text-emerald-900' : ''}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-xs font-bold text-stone-900 mb-2 uppercase tracking-wide">
          Livestock Purpose
        </label>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'All Purposes' },
            { id: 'milk', label: t('purposeMilk') },
            { id: 'qurbani', label: t('purposeQurbani') },
            { id: 'breeding', label: t('purposeBreeding') },
            { id: 'meat', label: t('purposeMeat') },
            { id: 'show', label: t('purposeShow') },
          ].map(p => (
            <label
              key={p.id}
              className="flex items-center gap-2 p-1.5 rounded hover:bg-stone-100 cursor-pointer"
            >
              <input
                type="radio"
                name="filter-purpose"
                checked={filters.purpose === p.id}
                onChange={() => updateFilter('purpose', p.id as AnimalPurpose | 'all')}
                className="text-emerald-700 focus:ring-emerald-700"
              />
              <span className={filters.purpose === p.id ? 'font-bold text-emerald-900' : ''}>
                {p.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-bold text-stone-900 mb-1.5 uppercase tracking-wide">
          City / Mandi
        </label>
        <select
          value={filters.city}
          onChange={e => updateFilter('city', e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-medium text-stone-800 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
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

      {/* Teeth / Daant Count */}
      <div>
        <label className="block text-xs font-bold text-stone-900 mb-1.5 uppercase tracking-wide">
          {t('specTeeth')}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'Any Daant' },
            { id: 'kheera', label: 'Kheera (Milk)' },
            { id: '2', label: '2 Daant' },
            { id: '4', label: '4 Daant' },
            { id: '6', label: '6 Daant' },
            { id: '8', label: 'Full (Pura)' },
          ].map(tItem => (
            <button
              key={tItem.id}
              type="button"
              onClick={() => updateFilter('teeth', tItem.id as TeethCount | 'all')}
              className={`px-2 py-1.5 rounded text-xs text-left border transition-colors ${
                filters.teeth === tItem.id
                  ? 'bg-emerald-50 border-emerald-700 text-emerald-900 font-bold'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {tItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-wide">
            Max Price
          </label>
          <span className="font-mono tabular-nums font-bold text-emerald-800 text-xs">
            PKR {(filters.maxPrice / 100000).toFixed(1)} Lakh
          </span>
        </div>
        <input
          type="range"
          min="50000"
          max="2000000"
          step="50000"
          value={filters.maxPrice}
          onChange={e => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full accent-emerald-700 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
          <span>50k</span>
          <span>10 Lakh</span>
          <span>20 Lakh</span>
        </div>
      </div>

      {/* Verification & Media Toggles */}
      <div className="space-y-2 pt-2 border-t border-stone-200">
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={e => updateFilter('verifiedOnly', e.target.checked)}
            className="rounded text-emerald-700 focus:ring-emerald-700"
          />
          <span>{t('verifiedOnly')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={filters.hasVideoOnly}
            onChange={e => updateFilter('hasVideoOnly', e.target.checked)}
            className="rounded text-emerald-700 focus:ring-emerald-700"
          />
          <span>{t('hasVideoOnly')}</span>
        </label>
      </div>

      {/* Reset button */}
      <div className="pt-2">
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('resetFilters')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200/80">
            <Search className="w-4 h-4 text-emerald-800 shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => updateFilter('searchQuery', e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-stone-900"
            />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200/80 text-xs font-semibold text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={filters.sortBy}
                onChange={e => updateFilter('sortBy', e.target.value as any)}
                className="bg-transparent border-none outline-none text-stone-800 cursor-pointer"
              >
                <option value="latest">{t('sortLatest')}</option>
                <option value="price_low">{t('sortPriceLow')}</option>
                <option value="price_high">{t('sortPriceHigh')}</option>
                <option value="weight">{t('sortWeight')}</option>
                <option value="milk">{t('sortMilkYield')}</option>
              </select>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Chips (Horizontal Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={chip.onClick}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                chip.active
                  ? 'bg-emerald-800 text-white font-semibold shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Query Summary & Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-600 px-1">
        <div>
          Showing <span className="font-bold text-stone-900 font-mono tabular-nums">{filteredListings.length}</span> livestock listings
          {filters.city !== 'all' && <span> in <span className="font-semibold text-stone-800">{filters.city}</span></span>}
          {filters.category !== 'all' && <span> under <span className="font-semibold text-stone-800">{filters.category}</span></span>}
        </div>
        {(filters.category !== 'all' || filters.city !== 'all' || filters.purpose !== 'all' || filters.searchQuery) && (
          <button
            onClick={resetFilters}
            className="text-emerald-800 hover:underline font-semibold"
          >
            {t('resetFilters')}
          </button>
        )}
      </div>

      {/* Main Grid & Desktop Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block bg-white p-5 rounded-xl border border-stone-200 shadow-2xs sticky top-20">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-emerald-800" />
              <span>{t('filterBy')}</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-emerald-800"
            >
              Reset
            </button>
          </div>
          <FilterControls />
        </aside>

        {/* Listings Result Grid */}
        <main className="lg:col-span-3 space-y-6">
          {paginatedItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedItems.map(item => (
                  <AnimalCard key={item.id} listing={item} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-2 rounded-lg border border-stone-300 disabled:opacity-40 hover:bg-stone-50 text-stone-700"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-semibold text-stone-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-lg border border-stone-300 disabled:opacity-40 hover:bg-stone-50 text-stone-700"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Results Fallback State */
            <div className="bg-white p-8 sm:p-12 rounded-xl border border-stone-200 text-center space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {t('noResultsFound')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                {t('noResultsSuggestion')}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-black"
                >
                  {t('resetFilters')}
                </button>
                <button
                  onClick={openSellWizard}
                  className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900"
                >
                  Post Animal Wanted Ad
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-emerald-800" />
                  <span>{t('filterBy')}</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterControls />
            </div>

            <div className="pt-4 mt-6 border-t border-stone-200">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-lg bg-emerald-800 text-white font-bold text-xs"
              >
                {t('applyFilters')} ({filteredListings.length} Ads)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
