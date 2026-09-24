import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { mockTransporters } from '../../data/mockData';
import { TransportProvider } from '../../types';
import {
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Calculator,
  Navigation,
} from 'lucide-react';

export const TransportView: React.FC = () => {
  const { language, formatPrice, t } = useLocale();
  const { showToast } = useMarketplace();

  // Quote Calculator state
  const [fromCity, setFromCity] = useState('Sahiwal');
  const [toCity, setToCity] = useState('Karachi');
  const [animalCount, setAnimalCount] = useState<number>(4);
  const [selectedVehicleRate, setSelectedVehicleRate] = useState<number>(140);
  const [quoteRequested, setQuoteRequested] = useState(false);

  // Approximate distance lookup between popular Pakistani mandi routes
  const estimatedDistanceKm =
    fromCity === toCity
      ? 45
      : (fromCity === 'Sahiwal' && toCity === 'Karachi') || (fromCity === 'Lahore' && toCity === 'Karachi')
      ? 1050
      : (fromCity === 'Multan' && toCity === 'Lahore')
      ? 340
      : (fromCity === 'Sahiwal' && toCity === 'Lahore')
      ? 180
      : 420;

  const estimatedFarePkr = estimatedDistanceKm * selectedVehicleRate;

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteRequested(true);
    showToast(`Transport quote requested for ${fromCity} to ${toCity}. Transporters will send bids.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
          <Truck className="w-4 h-4" />
          <span>Intercity Livestock Logistics</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
          {t('transportTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          {t('transportSubtitle')}
        </p>
      </div>

      {/* Interactive Fare Calculator */}
      <section className="bg-gradient-to-br from-stone-900 to-stone-950 text-white p-6 rounded-xl border border-stone-800 shadow-md space-y-5">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold">
            Intercity Livestock Freight Calculator
          </h2>
        </div>

        <form onSubmit={handleRequestQuote} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Loading Mandi / City
            </label>
            <select
              value={fromCity}
              onChange={e => setFromCity(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-700 bg-stone-800 text-white font-medium"
            >
              <option value="Sahiwal">Sahiwal Cattle Market</option>
              <option value="Lahore">Lahore Shahpur Kanjra</option>
              <option value="Multan">Multan Bypass Mandi</option>
              <option value="Faisalabad">Faisalabad Niamoana</option>
              <option value="Sargodha">Sargodha Maweshi Mandi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Destination City
            </label>
            <select
              value={toCity}
              onChange={e => setToCity(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-700 bg-stone-800 text-white font-medium"
            >
              <option value="Karachi">Karachi Super Highway Mandi</option>
              <option value="Lahore">Lahore City / Farm</option>
              <option value="Rawalpindi">Rawalpindi / Islamabad</option>
              <option value="Peshawar">Peshawar Livestock Yard</option>
              <option value="Quetta">Quetta Eastern Bypass</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Carrier Vehicle Type
            </label>
            <select
              value={selectedVehicleRate}
              onChange={e => setSelectedVehicleRate(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-700 bg-stone-800 text-white font-medium"
            >
              <option value={95}>Shehzore (1-2 Cattle / 12 Goats) @ Rs 95/km</option>
              <option value={140}>Mazda Titan (6 Cattle / 35 Goats) @ Rs 140/km</option>
              <option value={280}>22-Wheeler (24 Cattle / 120 Goats) @ Rs 280/km</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              Request Driver Bids
            </button>
          </div>
        </form>

        <div className="p-3 bg-stone-800/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-300 border border-stone-700">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Estimated Distance: <strong className="text-white font-mono">{estimatedDistanceKm} Km</strong></span>
          </div>
          <div className="text-right">
            <span>Estimated Total Freight Fare: </span>
            <strong className="text-base text-amber-400 font-mono tabular-nums ml-1">
              {formatPrice(estimatedFarePkr)}
            </strong>
          </div>
        </div>
      </section>

      {/* Transporters Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mockTransporters.map(trans => (
          <div
            key={trans.id}
            className="bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {trans.driverName}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800 block mt-0.5">
                    {trans.vehicleType}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                  ★ {trans.rating} ({trans.tripsCompleted} trips)
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Base Hub: {trans.baseCity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Capacity: {trans.capacityLargeAnimals} Big Animals or {trans.capacitySmallAnimals} Small</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Padded Straw Bedding & Live GPS Tracking</span>
                </div>
              </div>

              <div className="mt-4 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between text-xs">
                <span className="text-stone-500">Standard Rate:</span>
                <span className="font-bold text-stone-900 font-mono">
                  Rs {trans.ratePerKmPkr} / Km
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2">
              <a
                href={`tel:${trans.phone}`}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs text-center transition-colors shadow-2xs"
              >
                Call Driver
              </a>
              <a
                href={`https://wa.me/92${trans.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-stone-300 text-emerald-700 hover:bg-emerald-50"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
