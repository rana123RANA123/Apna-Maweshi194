import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLocale();
  const { setCurrentView } = useMarketplace();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-24 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-1">
            <BrandLogo variant="light" size="md" showTagline />
            <p className="text-xs text-stone-400 mt-3 leading-relaxed">
              {language === 'ur'
                ? 'پاکستان کی مستند ڈیجیٹل مویشی منڈی۔ کاشتکاروں، ڈیری فارمرز اور خریداروں کے درمیان شفاف تجارت کا محفوظ ذریعہ۔'
                : 'Pakistan’s verified livestock network connecting rural breeders, dairy producers, and urban buyers directly without middleman markups.'}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Government Registered Stud Network</span>
            </div>
          </div>

          {/* Col 2: Marketplace Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-3">
              {t('categories')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setCurrentView('search')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('cattle')} (Sahiwal, Cholistani, Red Sindhi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('search')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('buffalo')} (Nili-Ravi, Kundhi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('search')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('goat')} (Rajanpuri, Beetal, Kamori)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('search')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('sheep')} (Kajli, Dumbi, Balkhi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('qurbani')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  {t('qurbaniSpecial')} & Hissa Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Commercial */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-3">
              {t('navServices')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setCurrentView('vets')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('vetHubTitle')} (DVM Doctors)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('transport')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('transportTitle')} (Freight Trucks)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('feed')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('navFeed')} (Wanda, Silage, Machinery)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dealers')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('navDealers')} Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('navAdmin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Safety & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-3">
              {t('safetyWarningTitle')}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              {language === 'ur'
                ? 'کبھی بھی جانور دیکھے بغیر نامعلوم اکاؤنٹس میں رقم جمع نہ کروائیں۔ تصدیق شدہ بیوپاریوں سے ہی سودا کریں۔'
                : 'Never send advance deposits via digital wallets before inspecting the animal physically in the mandi.'}
            </p>
            <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700/60 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Mandi Helpline: 042-111-MAWESHI</span>
              </div>
              <span className="text-[11px] text-stone-400">Mon - Sat: 8:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div>
            &copy; 2026 Apna Maweshi Technologies Pakistan (Pvt.) Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Islamabad · Lahore · Karachi · Multan</span>
            <span>·</span>
            <button
              onClick={() => setCurrentView('admin')}
              className="hover:text-stone-200 transition-colors"
            >
              Moderator Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
