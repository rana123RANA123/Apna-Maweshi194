import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLocale } from '../../context/LocaleContext';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    openSellWizard,
    unreadMessagesCount,
  } = useMarketplace();
  const { t } = useLocale();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fcfbf7]/98 backdrop-blur-md border-t border-stone-200/90 shadow-lg px-2 pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around h-15 max-w-lg mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors focus-visible:outline-none ${
            currentView === 'home' ? 'text-emerald-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Home</span>
        </button>

        {/* 2. Mandi / Search */}
        <button
          onClick={() => setCurrentView('search')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors focus-visible:outline-none ${
            currentView === 'search' ? 'text-emerald-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">{t('navMarketplace')}</span>
        </button>

        {/* 3. Center Prominent SELL Button */}
        <div className="relative -top-3 flex flex-col items-center">
          <button
            onClick={openSellWizard}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-900 to-emerald-700 text-white shadow-md shadow-emerald-900/30 flex items-center justify-center border-2 border-[#fcfbf7] active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            aria-label="Sell Livestock"
          >
            <Plus className="w-7 h-7 text-amber-300 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-bold text-emerald-900 mt-0.5">
            {t('sellBtn').split(' ')[0]}
          </span>
        </div>

        {/* 4. Messages */}
        <button
          onClick={() => setCurrentView('messages')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors relative focus-visible:outline-none ${
            currentView === 'messages' ? 'text-emerald-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full border border-white" />
            )}
          </div>
          <span className="text-[10px] leading-tight">Chat</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-colors focus-visible:outline-none ${
            currentView === 'profile' ? 'text-emerald-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
