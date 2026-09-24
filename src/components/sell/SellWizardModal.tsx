import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { AnimalCategory, AnimalPurpose, TeethCount, AnimalListing } from '../../types';
import { AnimalCard } from '../cards/AnimalCard';
import {
  X,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
  Camera,
  Trash2,
  AlertCircle,
} from 'lucide-react';

import sahiwalCowImg from '../../assets/images/pakistan_sahiwal_cow_1790281616832.jpg';
import niliRaviBuffaloImg from '../../assets/images/pakistan_nili_ravi_buffalo_1790281633880.jpg';
import gulabiGoatImg from '../../assets/images/pakistan_gulabi_goat_1790281648384.jpg';
import qurbaniBullImg from '../../assets/images/pakistan_qurbani_bull_1790281660863.jpg';
import kajliSheepImg from '../../assets/images/pakistan_kajli_sheep_1790281675633.jpg';

export const SellWizardModal: React.FC = () => {
  const { language, t } = useLocale();
  const { isSellWizardOpen, closeSellWizard, addListing } = useMarketplace();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [isPublished, setIsPublished] = useState(false);

  // Form State
  const [category, setCategory] = useState<AnimalCategory>('cattle');
  const [purpose, setPurpose] = useState<AnimalPurpose>('milk');
  const [title, setTitle] = useState('');
  const [titleUrdu, setTitleUrdu] = useState('');
  const [breed, setBreed] = useState('Sahiwal Red Gold');
  const [price, setPrice] = useState<number>(280000);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [teeth, setTeeth] = useState<TeethCount>('2');
  const [ageMonths, setAgeMonths] = useState<number>(30);
  const [weightKg, setWeightKg] = useState<number>(380);
  const [milkCapacity, setMilkCapacity] = useState<number>(14);
  const [isVaccinated, setIsVaccinated] = useState(true);
  const [beAibGuarantee, setBeAibGuarantee] = useState(true);
  const [shariaCompliant, setShariaCompliant] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([sahiwalCowImg]);
  const [city, setCity] = useState('Sahiwal');
  const [mandiName, setMandiName] = useState('Sahiwal Cattle Yard, Bypass');
  const [phone, setPhone] = useState(user?.phone || '0300-1234567');
  const [whatsapp, setWhatsapp] = useState(user?.phone || '0300-1234567');
  const [description, setDescription] = useState('');

  if (!isSellWizardOpen) return null;

  const samplePhotoOptions = [
    { label: 'Sahiwal Cow', url: sahiwalCowImg },
    { label: 'Nili Buffalo', url: niliRaviBuffaloImg },
    { label: 'Gulabi Goat', url: gulabiGoatImg },
    { label: 'Qurbani Bull', url: qurbaniBullImg },
    { label: 'Kajli Sheep', url: kajliSheepImg },
  ];

  const handleAddSamplePhoto = (url: string) => {
    if (uploadedPhotos.length < 6) {
      setUploadedPhotos(prev => [...prev, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== index));
  };

  const createdListingPreview: AnimalListing = {
    id: `listing-new-${Date.now()}`,
    title: title.trim() || `${breed} (${teeth === 'kheera' ? 'Kheera' : teeth + ' Daant'})`,
    titleUrdu: titleUrdu.trim() || `اصیل ${breed} برائے فروخت`,
    category,
    purpose,
    breed,
    breedUrdu: breed,
    price: Number(price) || 100000,
    isNegotiable,
    teeth,
    ageMonths: Number(ageMonths) || 24,
    weightKg: Number(weightKg) || 300,
    weightMann: Math.round(((Number(weightKg) || 300) / 40) * 10) / 10,
    milkCapacityLitersPerDay: purpose === 'milk' ? Number(milkCapacity) || 0 : undefined,
    images: uploadedPhotos.length > 0 ? uploadedPhotos : [sahiwalCowImg],
    hasVideo,
    city,
    cityUrdu: city,
    mandiName,
    mandiNameUrdu: mandiName,
    description: description.trim() || 'Healthy livestock raised on high nutrition green fodder.',
    descriptionUrdu: 'مکمل تندرست و توانا جانور۔ خالص چارے پر پلا ہوا۔',
    seller: {
      id: user?.id || 'seller-guest',
      name: user?.name || 'Pakistani Farmer',
      phone,
      whatsapp,
      isVerified: user?.isVerified || false,
      rating: 5.0,
      reviewCount: 1,
      role: user?.role || 'farmer',
      city,
      district: city,
      memberSince: 'Just now',
    },
    health: {
      isVaccinated,
      isDewormed: true,
      isPurebred: true,
      shariaCompliantQurbani: shariaCompliant,
      beAibGuarantee,
    },
    status: 'active',
    isFeatured: false,
    views: 1,
    favoritesCount: 0,
    createdAt: 'Just now',
  };

  const handleFinalPublish = () => {
    addListing(createdListingPreview);
    setIsPublished(true);
  };

  const handleResetAndClose = () => {
    setIsPublished(false);
    setStep(1);
    closeSellWizard();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#fcfbf7] rounded-none sm:rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto border border-stone-200">
        {/* Header with Step Progress */}
        <div className="px-5 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Step {step} of 5
            </span>
            <h2 className="text-base font-bold text-stone-900">
              {step === 1 && t('step1Title')}
              {step === 2 && t('step2Title')}
              {step === 3 && t('step3Title')}
              {step === 4 && t('step4Title')}
              {step === 5 && t('step5Title')}
            </h2>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100"
            aria-label="Close wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-stone-100 h-1">
          <div
            className="bg-emerald-700 h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[70vh]">
          {isPublished ? (
            /* Celebration Screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Mubarak! Ad Published</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your livestock listing is now live in the Apna Maweshi marketplace. Buyers from across Pakistan can contact you via call or WhatsApp.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
                >
                  View in Marketplace
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Category & Purpose */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-2 uppercase">
                      Select Livestock Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'cattle', label: 'Cow / Bull (گائے و بیل)' },
                        { id: 'buffalo', label: 'Buffalo (بھینس)' },
                        { id: 'goat', label: 'Goat / Bakra (بکرا)' },
                        { id: 'sheep', label: 'Kajli / Sheep (چھترا)' },
                        { id: 'camel', label: 'Camel (اونٹ)' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCategory(item.id as AnimalCategory)}
                          className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                            category === item.id
                              ? 'bg-emerald-50 border-emerald-700 text-emerald-900 ring-1 ring-emerald-700'
                              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-2 uppercase">
                      Primary Purpose
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'milk', label: 'Dairy & Milking (دودھ)' },
                        { id: 'qurbani', label: 'Qurbani Sacrifice (قربانی)' },
                        { id: 'breeding', label: 'Stud / Breeding (بریڈنگ)' },
                        { id: 'meat', label: 'Commercial Meat (گوشت)' },
                        { id: 'show', label: 'Beauty & Exhibition (میلہ)' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPurpose(item.id as AnimalPurpose)}
                          className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                            purpose === item.id
                              ? 'bg-amber-50 border-amber-600 text-amber-900 ring-1 ring-amber-600'
                              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Animal Specs & Price */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Breed Name
                      </label>
                      <input
                        type="text"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        placeholder="e.g. Sahiwal Pure Red, Nili-Ravi, Rajanpuri"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Expected Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Teeth (دانت)
                      </label>
                      <select
                        value={teeth}
                        onChange={e => setTeeth(e.target.value as TeethCount)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      >
                        <option value="kheera">Kheera (دودھ کے دانت)</option>
                        <option value="2">2 Teeth (Do-Daant دو دانت)</option>
                        <option value="4">4 Teeth (Chowga چوگا)</option>
                        <option value="6">6 Teeth (Chhigga چھگا)</option>
                        <option value="8">8 Teeth (Full Mouth پورا)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Weight (Kg)
                      </label>
                      <input
                        type="number"
                        value={weightKg}
                        onChange={e => setWeightKg(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                      <span className="text-[10px] text-stone-500">
                        ≈ {Math.round((weightKg / 40) * 10) / 10} Mann
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Age (Months)
                      </label>
                      <input
                        type="number"
                        value={ageMonths}
                        onChange={e => setAgeMonths(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {purpose === 'milk' && (
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Daily Milk Yield (Litres / Day)
                      </label>
                      <input
                        type="number"
                        value={milkCapacity}
                        onChange={e => setMilkCapacity(Number(e.target.value))}
                        placeholder="e.g. 16"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNegotiable}
                        onChange={e => setIsNegotiable(e.target.checked)}
                        className="rounded text-emerald-700 focus:ring-emerald-700"
                      />
                      <span>Price Negotiable (کمی بیشی ممکن ہے)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isVaccinated}
                        onChange={e => setIsVaccinated(e.target.checked)}
                        className="rounded text-emerald-700 focus:ring-emerald-700"
                      />
                      <span>Vaccinated & Dewormed</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={beAibGuarantee}
                        onChange={e => setBeAibGuarantee(e.target.checked)}
                        className="rounded text-emerald-700 focus:ring-emerald-700"
                      />
                      <span>100% Defect-Free (بے عیب ضمانت)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: Media Upload Simulator */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-stone-50 rounded-lg border-2 border-dashed border-stone-300 text-center">
                    <Camera className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-stone-800">
                      Upload Animal Inspection Photos
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Clear photos of full body, teeth, udder (for dairy), and facial profile.
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <span className="text-xs text-stone-600 block w-full mb-1">
                        Select Pakistani livestock preset photos to attach:
                      </span>
                      {samplePhotoOptions.map(opt => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleAddSamplePhoto(opt.url)}
                          className="px-2.5 py-1 text-xs rounded bg-white border border-stone-300 hover:bg-emerald-50 hover:border-emerald-500 text-stone-700"
                        >
                          + {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Uploaded Gallery */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-2">
                      Attached Photos ({uploadedPhotos.length} / 6)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {uploadedPhotos.map((url, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden border border-stone-300 group"
                        >
                          <img
                            src={url}
                            alt="Uploaded"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] px-1 rounded">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-1 right-1 p-1 rounded bg-rose-600 text-white opacity-80 hover:opacity-100"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasVideo}
                        onChange={e => setHasVideo(e.target.checked)}
                        className="rounded text-emerald-700 focus:ring-emerald-700"
                      />
                      <span>I have a video walkaround of this animal</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: Location & Contact */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City / District
                      </label>
                      <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      >
                        <option value="Sahiwal">Sahiwal (ساہیوال)</option>
                        <option value="Lahore">Lahore (لاہور)</option>
                        <option value="Faisalabad">Faisalabad (فیصل آباد)</option>
                        <option value="Multan">Multan (ملتان)</option>
                        <option value="Rawalpindi">Rawalpindi (راولپنڈی)</option>
                        <option value="Karachi">Karachi (کراچی)</option>
                        <option value="Sargodha">Sargodha (سرگودھا)</option>
                        <option value="Bahawalpur">Bahawalpur (بہاولپور)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nearest Mandi / Farm Location
                      </label>
                      <input
                        type="text"
                        value={mandiName}
                        onChange={e => setMandiName(e.target.value)}
                        placeholder="e.g. Shahpur Kanjra Mandi, Multan Road"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp Number (for videos)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ad Description & Feeding Details
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Describe temper, test milking allowances, pedigree, or special feeding ration..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Live Exact Preview */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                    <span className="font-bold">Exact Marketplace Preview: </span>
                    This is how buyers across Pakistan will see your animal in the mandi search results.
                  </div>

                  <div className="max-w-sm mx-auto">
                    <AnimalCard listing={createdListingPreview} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!isPublished && (
          <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('stepBack')}</span>
              </button>
            ) : (
              <span />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
              >
                <span>{t('stepNext')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalPublish}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t('publishAd')}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
