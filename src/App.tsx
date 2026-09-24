/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { SearchView } from './components/search/SearchView';
import { QurbaniHubView } from './components/qurbani/QurbaniHubView';
import { VetHubView } from './components/services/VetHubView';
import { TransportView } from './components/services/TransportView';
import { FeedEquipmentView } from './components/services/FeedEquipmentView';
import { DealersView } from './components/dealers/DealersView';
import { ProfileView } from './components/profile/ProfileView';
import { MessagesView } from './components/messages/MessagesView';
import { AdminView } from './components/admin/AdminView';
import { AnimalDetailModal } from './components/details/AnimalDetailModal';
import { SellWizardModal } from './components/sell/SellWizardModal';
import { AuthModal } from './components/auth/AuthModal';
import { ReportDialog } from './components/common/ReportDialog';
import { Toast } from './components/common/Toast';

const MainContent: React.FC = () => {
  const { currentView, selectedListing, setSelectedListing } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c1917]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentView === 'home' && <HomeView />}
        {currentView === 'search' && <SearchView />}
        {currentView === 'qurbani' && <QurbaniHubView />}
        {currentView === 'vets' && <VetHubView />}
        {currentView === 'transport' && <TransportView />}
        {currentView === 'feed' && <FeedEquipmentView />}
        {currentView === 'dealers' && <DealersView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'favorites' && <ProfileView />}
        {currentView === 'messages' && <MessagesView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (Ergonomic thumb zone, Sell center button) */}
      <BottomNav />

      {/* Modals & Dialogs */}
      {selectedListing && (
        <AnimalDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
      <SellWizardModal />
      <AuthModal />
      <ReportDialog />

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <MarketplaceProvider>
          <MainContent />
        </MarketplaceProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
