import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { mockQurbaniShares } from '../../data/mockData';
import { QurbaniHissaOffer } from '../../types';
import {
  Sparkles,
  Calculator,
  ShieldCheck,
  CheckCircle,
  Truck,
  Heart,
  Scale,
  Calendar,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export const QurbaniHubView: React.FC = () => {
  const { language, formatPrice, t } = useLocale();
  const { updateFilter, setCurrentView, showToast } = useMarketplace();

  // Live Weight Price Calculator state
  const [calcAnimalType, setCalcAnimalType] = useState<'bull' | 'goat' | 'buffalo'>('bull');
  const [calcWeightKg, setCalcWeightKg] = useState<number>(450);
  const [selectedHissa, setSelectedHissa] = useState<QurbaniHissaOffer | null>(null);
  const [hissaBookedSuccess, setHissaBookedSuccess] = useState(false);

  // Approximate live weight rates per kg
  const liveRates = {
    bull: 460,
    goat: 1100,
    buffalo: 395,
  };

  const estimatedTotal = calcWeightKg * liveRates[calcAnimalType];

  const handleBookHissa = (hissa: QurbaniHissaOffer) => {
    setSelectedHissa(hissa);
  };

  const handleConfirmHissa = (e: React.FormEvent) => {
    e.preventDefault();
    setHissaBookedSuccess(true);
    showToast('Qurbani Hissa booked successfully! Mandi manager will call you for receipt.', 'success');
    setTimeout(() => {
      setHissaBookedSuccess(false);
      setSelectedHissa(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Festive Saffron & Deep Green Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 text-white p-6 sm:p-10 shadow-lg border border-amber-600/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Eid-ul-Adha 2026 Livestock Gateway</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {t('qurbaniTitle')}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {t('qurbaniSubtitle')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                updateFilter('purpose', 'qurbani');
                setCurrentView('search');
              }}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
            >
              Browse Qurbani Bulls & Goats
            </button>
            <a
              href="#hissa-section"
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              Online Hissa Booking
            </a>
          </div>
        </div>
      </div>

      {/* Sharia Compliance Guarantee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">
            {language === 'ur' ? 'شرعی دانت اور عمر کی تسلی' : 'Age & Teeth Verified'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every sacrificial animal is inspected for mandatory minimum age (2 teeth / do-daant for cattle, 1 year for sheep/goats).
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">
            {language === 'ur' ? '۱۰۰ فیصد بے عیب کی ضمانت' : '100% Be-Aib (Defect-Free)'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Sound horns, unslit ears, healthy eyesight, and solid gait guaranteed under Apna Maweshi inspection warranty.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">
            {language === 'ur' ? 'ڈیجیٹل کنڈا زندہ وزن' : 'Certified Digital Weighing'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Fair mandi weighing on official certified truck scales (Kanda) prior to loading and delivery.
          </p>
        </div>
      </div>

      {/* Live Weight Price Estimator Tool */}
      <section className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs space-y-5">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-800" />
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            {t('liveWeightCalc')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase">
              Animal Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bull', label: 'Bull / Cattle' },
                { id: 'goat', label: 'Goat / Bakra' },
                { id: 'buffalo', label: 'Buffalo' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCalcAnimalType(opt.id as any)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors ${
                    calcAnimalType === opt.id
                      ? 'bg-emerald-50 border-emerald-700 text-emerald-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-stone-700 uppercase">
                Live Weight: <span className="font-mono">{calcWeightKg} Kg</span>
              </label>
              <span className="text-xs text-stone-500 font-mono">
                ≈ {Math.round((calcWeightKg / 40) * 10) / 10} Mann
              </span>
            </div>
            <input
              type="range"
              min={calcAnimalType === 'goat' ? 40 : 250}
              max={calcAnimalType === 'goat' ? 140 : 900}
              step="5"
              value={calcWeightKg}
              onChange={e => setCalcWeightKg(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-lg border border-emerald-200 text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase block">
              Estimated Mandi Market Value
            </span>
            <span className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums block mt-1">
              {formatPrice(estimatedTotal)}
            </span>
            <span className="text-[11px] text-stone-500 mt-0.5 block">
              @ Rs {liveRates[calcAnimalType]} per kg live weight rate
            </span>
          </div>
        </div>
      </section>

      {/* Online Qurbani Hissa Booking Section */}
      <section id="hissa-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {t('bookHissa')} (7 Shares per Bull / Camel)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Cooperative sacrificial bookings supervised by verified religious trust scholars
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockQurbaniShares.map(hissa => (
            <div
              key={hissa.id}
              className="bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {hissa.animalType} Qurbani
                  </span>
                  <span className="text-xs font-semibold text-amber-700">
                    {hissa.availableShares} {t('sharesAvailable')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 mt-2.5">
                  {hissa.breed}
                </h3>

                <div className="mt-3 text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
                  {formatPrice(hissa.pricePerSharePkr)}
                  <span className="text-xs font-normal text-stone-500"> / share</span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Live Weight: ~{hissa.expectedWeightKg} kg bull</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t('slaughterService')} (+Rs {hissa.slaughterFeePkr.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t('doorstepDelivery')} or Charity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Location: {hissa.city} ({hissa.mandiLocation})</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleBookHissa(hissa)}
                  className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  Reserve Hissa in this {hissa.animalType}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedHissa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Reserve Qurbani Hissa
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedHissa.breed} · {selectedHissa.city}
                </p>
              </div>
              <button
                onClick={() => setSelectedHissa(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {hissaBookedSuccess ? (
              <div className="py-6 text-center text-emerald-700 space-y-2">
                <CheckCircle className="w-12 h-12 mx-auto" />
                <p className="font-bold text-sm">Hissa Booked Successfully!</p>
                <p className="text-xs text-stone-500">A confirmation SMS has been dispatched.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmHissa} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Name (برائے قربانی حصہ)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Waqas"
                    className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Pakistani Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Slaughter & Delivery Preference
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs">
                    <option>Deliver 1/7th Share meat to home (Day 1 of Eid)</option>
                    <option>Deliver 1/7th Share meat to home (Day 2 of Eid)</option>
                    <option>Donate entire share to deserving families in Balochistan/Tharparkar</option>
                  </select>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg text-stone-700 text-xs flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span className="font-mono text-emerald-900">
                    {formatPrice(selectedHissa.pricePerSharePkr + selectedHissa.slaughterFeePkr)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 shadow-sm"
                >
                  Confirm Hissa Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
