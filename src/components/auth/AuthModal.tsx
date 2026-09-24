import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { UserRole } from '../../types';
import { BrandLogo } from '../brand/BrandLogo';
import { X, Smartphone, KeyRound, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const { t } = useLocale();
  const { showToast } = useMarketplace();

  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('0300-1941940');
  const [otpCode, setOtpCode] = useState('4821');
  const [fullName, setFullName] = useState('Rana Muhammad Waqas');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [city, setCity] = useState('Faisalabad');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast('Please enter a valid Pakistani mobile number', 'error');
      return;
    }
    setStep('otp');
    showToast(`Verification code sent to ${phoneNumber}. Demo code is 4821.`, 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim() !== '4821' && otpCode.length < 4) {
      showToast('Invalid code. Please enter 4821.', 'error');
      return;
    }
    setStep('profile');
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    login(phoneNumber, selectedRole, fullName, city);
    showToast('Signed in successfully to Apna Maweshi!', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#fcfbf7] rounded-xl max-w-md w-full p-6 space-y-5 border border-stone-200 shadow-2xl relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">{t('loginTitle')}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t('loginSubtitle')}</p>
        </div>

        {/* STEP 1: Phone Input */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Pakistani Mobile Number
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-stone-300 focus-within:ring-2 focus-within:ring-emerald-700">
                <span className="font-semibold text-stone-500 text-xs">🇵🇰 +92</span>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs font-mono font-bold bg-transparent outline-none text-stone-900"
                />
              </div>
              <span className="text-[11px] text-stone-400 mt-1 block">
                Standard SMS rates apply. We will never share your private number.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>{t('sendOtp')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP Entry */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Enter 4-Digit Verification Code
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-stone-300 focus-within:ring-2 focus-within:ring-emerald-700">
                <KeyRound className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="4821"
                  className="w-full text-center text-sm font-mono tracking-widest font-extrabold bg-transparent outline-none text-stone-900"
                />
              </div>
              <span className="text-[11px] text-emerald-700 mt-1 block text-center font-medium">
                Demo code: <strong>4821</strong>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shadow-sm"
            >
              {t('verifyAndContinue')}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-stone-500 hover:underline"
            >
              Change phone number
            </button>
          </form>
        )}

        {/* STEP 3: Profile & Role Selection */}
        {step === 'profile' && (
          <form onSubmit={handleCompleteRegistration} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Chaudhry Tariq"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Your Home City / Mandi
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Faisalabad, Sahiwal, Lahore"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1.5">
                {t('selectRole')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'buyer', label: t('roleBuyer') },
                  { id: 'farmer', label: t('roleFarmer') },
                  { id: 'breeder', label: t('roleBreeder') },
                  { id: 'trader', label: t('roleTrader') },
                ].map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as UserRole)}
                    className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                      selectedRole === r.id
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-900 font-bold ring-1 ring-emerald-700'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Complete Setup & Enter Mandi
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
