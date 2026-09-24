import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AnimalListing,
  AnimalCategory,
  AnimalPurpose,
  TeethCount,
  Conversation,
  NotificationItem,
  UserReport,
  AdminStats,
} from '../types';
import {
  initialAnimalListings,
  mockConversations,
  mockNotifications,
  mockReports,
  mockAdminStats,
} from '../data/mockData';

export type ActiveView =
  | 'home'
  | 'search'
  | 'qurbani'
  | 'vets'
  | 'transport'
  | 'feed'
  | 'dealers'
  | 'profile'
  | 'favorites'
  | 'messages'
  | 'admin';

export interface FilterState {
  searchQuery: string;
  category: AnimalCategory | 'all';
  purpose: AnimalPurpose | 'all';
  city: string;
  teeth: TeethCount | 'all';
  minPrice: number;
  maxPrice: number;
  verifiedOnly: boolean;
  hasVideoOnly: boolean;
  sortBy: 'latest' | 'price_low' | 'price_high' | 'weight' | 'milk';
}

const defaultFilters: FilterState = {
  searchQuery: '',
  category: 'all',
  purpose: 'all',
  city: 'all',
  teeth: 'all',
  minPrice: 0,
  maxPrice: 2000000,
  verifiedOnly: false,
  hasVideoOnly: false,
  sortBy: 'latest',
};

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface MarketplaceContextType {
  listings: AnimalListing[];
  filteredListings: AnimalListing[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  
  // Navigation & Modals
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  selectedListing: AnimalListing | null;
  setSelectedListing: (listing: AnimalListing | null) => void;
  isSellWizardOpen: boolean;
  openSellWizard: () => void;
  closeSellWizard: () => void;
  isReportModalOpen: boolean;
  reportingListing: AnimalListing | null;
  openReportModal: (listing: AnimalListing) => void;
  closeReportModal: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;

  // Sell Flow
  addListing: (newListing: AnimalListing) => void;

  // Admin Actions
  adminStats: AdminStats;
  reports: UserReport[];
  approveListing: (id: string) => void;
  rejectListing: (id: string) => void;
  featureListing: (id: string) => void;
  removeListing: (id: string) => void;
  resolveReport: (id: string) => void;

  // Messaging & Notifications
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (convId: string, text: string) => void;
  startConversationWithSeller: (listing: AnimalListing) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;

  // Toast
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<AnimalListing[]>(() => {
    const saved = localStorage.getItem('apna_maweshi_listings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialAnimalListings;
      }
    }
    return initialAnimalListings;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('apna_maweshi_favs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['listing-1', 'listing-2'];
      }
    }
    return ['listing-1', 'listing-2'];
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedListing, setSelectedListing] = useState<AnimalListing | null>(null);
  const [isSellWizardOpen, setIsSellWizardOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingListing, setReportingListing] = useState<AnimalListing | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [reports, setReports] = useState<UserReport[]>(mockReports);
  const [adminStats, setAdminStats] = useState<AdminStats>(mockAdminStats);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('apna_maweshi_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('apna_maweshi_favs', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(listingId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter(id => id !== listingId);
      } else {
        showToast('Added to your favorite animals list', 'success');
        return [...prev, listingId];
      }
    });
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);

  const openSellWizard = () => setIsSellWizardOpen(true);
  const closeSellWizard = () => setIsSellWizardOpen(false);

  const openReportModal = (listing: AnimalListing) => {
    setReportingListing(listing);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setReportingListing(null);
  };

  const addListing = (newListing: AnimalListing) => {
    setListings(prev => [newListing, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      totalListings: prev.totalListings + 1,
      pendingApprovals: prev.pendingApprovals + 1,
    }));
    showToast('Your animal ad was successfully posted to the mandi!', 'success');
  };

  const approveListing = (id: string) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'active' } : item))
    );
    setAdminStats(prev => ({
      ...prev,
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1),
    }));
    showToast('Listing approved and published on live mandi', 'success');
  };

  const rejectListing = (id: string) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
    showToast('Listing marked as rejected', 'info');
  };

  const featureListing = (id: string) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
    showToast('Listing featured status updated', 'success');
  };

  const removeListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    showToast('Listing permanently deleted from mandi', 'info');
  };

  const resolveReport = (id: string) => {
    setReports(prev =>
      prev.map(rep => (rep.id === id ? { ...rep, status: 'resolved' } : rep))
    );
    showToast('Report marked as resolved', 'success');
  };

  const startConversationWithSeller = (listing: AnimalListing) => {
    const existing = conversations.find(c => c.otherUser.id === listing.seller.id);
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        otherUser: {
          id: listing.seller.id,
          name: listing.seller.name,
          phone: listing.seller.phone,
          isVerified: listing.seller.isVerified,
          role: listing.seller.role,
        },
        listingContext: {
          id: listing.id,
          title: listing.title,
          price: listing.price,
          imageUrl: listing.images[0],
          city: listing.city,
        },
        lastMessage: `Salam, I am interested in your ${listing.breed} (${listing.title}).`,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            senderName: 'You',
            text: `Salam! I saw your ${listing.breed} for Rs ${listing.price.toLocaleString()}. Is this animal still available?`,
            timestamp: 'Just now',
            isMine: true,
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    }
    setCurrentView('messages');
  };

  const sendMessage = (convId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
      text,
      timestamp: 'Just now',
      isMine: true,
    };
    setConversations(prev =>
      prev.map(c => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Filter listings based on current filter state
  const filteredListings = listings.filter(item => {
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.purpose !== 'all' && item.purpose !== filters.purpose) return false;
    if (filters.city !== 'all' && item.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.teeth !== 'all' && item.teeth !== filters.teeth) return false;
    if (item.price < filters.minPrice || item.price > filters.maxPrice) return false;
    if (filters.verifiedOnly && !item.seller.isVerified) return false;
    if (filters.hasVideoOnly && !item.hasVideo) return false;
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.titleUrdu.includes(q) ||
        item.breed.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.cityUrdu.includes(q) ||
        item.mandiName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_low') return a.price - b.price;
    if (filters.sortBy === 'price_high') return b.price - a.price;
    if (filters.sortBy === 'weight') return b.weightKg - a.weightKg;
    if (filters.sortBy === 'milk') return (b.milkCapacityLitersPerDay || 0) - (a.milkCapacityLitersPerDay || 0);
    return 0; // default latest
  });

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        filteredListings,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        currentView,
        setCurrentView,
        selectedListing,
        setSelectedListing,
        isSellWizardOpen,
        openSellWizard,
        closeSellWizard,
        isReportModalOpen,
        reportingListing,
        openReportModal,
        closeReportModal,
        favorites,
        toggleFavorite,
        isFavorite,
        addListing,
        adminStats,
        reports,
        approveListing,
        rejectListing,
        featureListing,
        removeListing,
        resolveReport,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startConversationWithSeller,
        notifications,
        markNotificationAsRead,
        unreadNotificationsCount,
        unreadMessagesCount,
        toasts,
        showToast,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
