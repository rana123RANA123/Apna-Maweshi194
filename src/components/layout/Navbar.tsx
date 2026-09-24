import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace, ActiveView } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle, Globe, Shield, User, Bell, MessageSquare } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLocale();
  const {
    currentView,
    setCurrentView,
    openSellWizard,
    unreadNotificationsCount,
    unreadMessagesCount,
  } = useMarketplace();
  const { user, openAuthModal } = useAuth();

  const navLinks: { view: ActiveView; label: string; highlight?: boolean }[] = [
    { view: 'search', label: t('navMarketplace') },
    { view: 'qurbani', label: t('navQurbani'), highlight: true },
    { view: 'vets', label: t('navVets') },
    { view: 'transport', label: t('navTransport') },
    { view: 'feed', label: t('navFeed') },
    { view: 'dealers', label: t('navDealers') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf7]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Zone */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1 -m-1"
          aria-label="Apna Maweshi Home"
        >
          <BrandLogo size="md" />
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map(link => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`transition-colors py-1 relative whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded ${
                  isActive
                    ? 'text-emerald-800 font-semibold'
                    : 'hover:text-emerald-700 text-stone-700'
                } ${link.highlight ? 'text-amber-800 font-semibold' : ''}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-stone-300/80 bg-white text-stone-700 hover:bg-stone-50 hover:text-emerald-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 whitespace-nowrap shadow-2xs"
            title="Switch language (English / اردو)"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Messages link (desktop) */}
          <button
            onClick={() => setCurrentView('messages')}
            className={`hidden sm:flex relative p-2 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              currentView === 'messages' ? 'text-emerald-800 bg-emerald-50' : ''
            }`}
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full" />
            )}
          </button>

          {/* Notifications bell */}
          <button
            onClick={() => setCurrentView('profile')}
            className="relative p-2 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            )}
          </button>

          {/* Admin link (compact) */}
          <button
            onClick={() => setCurrentView('admin')}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-stone-200 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 transition-colors ${
              currentView === 'admin' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : ''
            }`}
            title="Admin Moderation"
          >
            <Shield className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden xl:inline">{t('navAdmin')}</span>
          </button>

          {/* User profile / login button */}
          {user ? (
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg text-stone-800 hover:bg-stone-100 transition-colors border border-stone-200 bg-white"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px]">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-stone-800 hover:bg-stone-100 transition-colors border border-stone-200 bg-white"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Primary Action CTA: Post Animal Ad */}
          <button
            onClick={openSellWizard}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{t('sellBtn')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
