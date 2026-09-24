import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { AnimalCard } from '../cards/AnimalCard';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Heart,
  Package,
  Bell,
  LogOut,
  MapPin,
  Calendar,
  Settings,
  PlusCircle,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, logout, openAuthModal } = useAuth();
  const { t } = useLocale();
  const {
    listings,
    favorites,
    notifications,
    markNotificationAsRead,
    openSellWizard,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'listings' | 'favorites' | 'notifications'>('listings');

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-xl border border-stone-200 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
          <User className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-stone-900">Sign in to your Mandi Account</h2>
        <p className="text-xs text-stone-500">
          Manage your posted livestock ads, track inquiries, and view saved favorite animals.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-2.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900"
        >
          Sign In with Mobile
        </button>
      </div>
    );
  }

  // Filter listings posted by this user (or sample)
  const myListings = listings.filter(l => l.seller.name.includes(user.name) || l.seller.id === user.id);
  const favoriteListings = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-800 text-white text-2xl font-bold flex items-center justify-center shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-stone-900">{user.name}</h1>
              {user.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Mandi Partner</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
              <span className="capitalize">{user.role}</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3" />
                {user.phone}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {user.city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openSellWizard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Post New Ad</span>
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'listings'
              ? 'border-emerald-800 text-emerald-800 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Listings ({myListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'border-emerald-800 text-emerald-800 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Favorites ({favoriteListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'notifications'
              ? 'border-emerald-800 text-emerald-800 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Mandi Notifications ({notifications.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'listings' && (
          <div>
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myListings.map(item => (
                  <AnimalCard key={item.id} listing={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-stone-200 text-center space-y-3">
                <p className="text-xs text-stone-500">You have no active animal ads currently listed.</p>
                <button
                  onClick={openSellWizard}
                  className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold text-xs"
                >
                  Post Your First Animal Ad
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            {favoriteListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteListings.map(item => (
                  <AnimalCard key={item.id} listing={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-stone-200 text-center space-y-2">
                <Heart className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs text-stone-500">No saved animals yet. Tap the heart on any animal card in the mandi to save it here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-4 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                  n.isRead
                    ? 'bg-white border-stone-200 text-stone-600'
                    : 'bg-emerald-50/70 border-emerald-200 text-stone-900 font-medium'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{n.title}</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-stone-400 mt-1 block">{n.timestamp}</span>
                </div>
                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
