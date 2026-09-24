import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { mockVeterinarians } from '../../data/mockData';
import { VeterinaryDoctor } from '../../types';
import {
  Stethoscope,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Search,
} from 'lucide-react';

export const VetHubView: React.FC = () => {
  const { language, formatPrice, t } = useLocale();
  const { showToast } = useMarketplace();

  const [cityFilter, setCityFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<VeterinaryDoctor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredDoctors = mockVeterinarians.filter(vet => {
    if (cityFilter !== 'all' && vet.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    return true;
  });

  const handleBookVisit = (vet: VeterinaryDoctor) => {
    setSelectedDoctor(vet);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    showToast(`Farm visit requested with ${selectedDoctor?.name}. Doctor will call you.`, 'success');
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDoctor(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" />
            <span>Livestock Healthcare Network</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
            {t('vetHubTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            {t('vetHubSubtitle')}
          </p>
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-stone-600">Location:</label>
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 font-medium text-stone-800"
          >
            <option value="all">All Punjab & Sindh</option>
            <option value="Lahore">Lahore</option>
            <option value="Sahiwal">Sahiwal</option>
            <option value="Multan">Multan</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map(doctor => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {doctor.name}
                  </h3>
                  <span className="text-xs font-medium text-emerald-800 block mt-0.5">
                    {doctor.qualifications}
                  </span>
                </div>
                {doctor.emergencyVisitAvailable && (
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold shrink-0">
                    24/7 Emergency
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center gap-1.5 font-medium text-stone-800">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{doctor.specialization} · {doctor.experienceYears} {t('experienceYears')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{doctor.clinicName} ({doctor.city})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 font-semibold">Available for On-Farm Ultrasound & Surgery</span>
                </div>
              </div>

              <div className="mt-4 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between text-xs">
                <span className="text-stone-500">Consultation / Visit Fee:</span>
                <span className="font-bold text-stone-900 font-mono">
                  {formatPrice(doctor.consultationFeePkr)}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2">
              <button
                onClick={() => handleBookVisit(doctor)}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shadow-2xs"
              >
                {t('bookConsult')}
              </button>
              <a
                href={`tel:${doctor.phone}`}
                className="p-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50"
                aria-label="Call Doctor"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Book Doctor Farm Visit
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedDoctor.name} · {selectedDoctor.city}
                </p>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center text-emerald-700 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <p className="font-bold text-sm">Farm Visit Scheduled!</p>
                <p className="text-xs text-stone-500">The veterinarian will contact you prior to visiting.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Farm / Mandi Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chak 14-L, Chichawatni Road, Sahiwal"
                    className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Number & Type of Animals
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Dairy Cows needing ultrasound check"
                    className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs font-mono"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-lg text-stone-700 text-xs flex justify-between font-bold">
                  <span>Estimated Doctor Fee:</span>
                  <span className="font-mono text-emerald-900">
                    {formatPrice(selectedDoctor.consultationFeePkr)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 shadow-sm"
                >
                  Submit Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
