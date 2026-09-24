export type Language = 'en' | 'ur';

export type AnimalCategory = 'cattle' | 'buffalo' | 'goat' | 'sheep' | 'camel';
export type AnimalPurpose = 'milk' | 'qurbani' | 'meat' | 'breeding' | 'show';
export type TeethCount = 'kheera' | '2' | '4' | '6' | '8';
export type ListingStatus = 'active' | 'pending' | 'sold' | 'rejected' | 'featured';
export type UserRole = 'buyer' | 'farmer' | 'breeder' | 'dealer' | 'trader';

export interface Seller {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  isVerified: boolean;
  badgeTitle?: string;
  rating: number;
  reviewCount: number;
  role: UserRole;
  city: string;
  district: string;
  memberSince: string;
  avatarUrl?: string;
}

export interface AnimalListing {
  id: string;
  title: string;
  titleUrdu: string;
  category: AnimalCategory;
  purpose: AnimalPurpose;
  breed: string;
  breedUrdu: string;
  price: number;
  isNegotiable: boolean;
  pricePerKg?: number;
  qurbaniHissaPrice?: number;
  teeth: TeethCount;
  ageMonths: number;
  weightKg: number;
  weightMann: number;
  milkCapacityLitersPerDay?: number;
  lactationNumber?: number;
  isPregnant?: boolean;
  pregnantMonths?: number;
  images: string[];
  hasVideo: boolean;
  videoUrl?: string;
  city: string;
  cityUrdu: string;
  mandiName: string;
  mandiNameUrdu: string;
  description: string;
  descriptionUrdu: string;
  seller: Seller;
  health: {
    isVaccinated: boolean;
    isDewormed: boolean;
    isPurebred: boolean;
    shariaCompliantQurbani: boolean;
    beAibGuarantee: boolean; // Defect-free guarantee
  };
  status: ListingStatus;
  isFeatured: boolean;
  views: number;
  favoritesCount: number;
  createdAt: string;
}

export interface VeterinaryDoctor {
  id: string;
  name: string;
  nameUrdu: string;
  qualifications: string;
  specialization: 'Bovine Medicine' | 'Dairy Production' | 'Livestock Surgery' | 'Artificial Insemination' | 'Small Ruminant Health';
  specializationUrdu: string;
  clinicName: string;
  city: string;
  cityUrdu: string;
  district: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  consultationFeePkr: number;
  isAvailableToday: boolean;
  phone: string;
  whatsapp: string;
  emergencyVisitAvailable: boolean;
}

export interface TransportProvider {
  id: string;
  driverName: string;
  driverNameUrdu: string;
  vehicleType: 'Suzuki Ravi / Mini Pick' | 'Shehzore (1-Ton)' | 'Mazda Titan (3.5-Ton)' | 'Bedford 6-Wheeler' | '22-Wheeler Interprovincial';
  vehicleTypeUrdu: string;
  capacityLargeAnimals: number; // Cows/Buffaloes
  capacitySmallAnimals: number; // Goats/Sheep
  baseCity: string;
  routesCovered: string[];
  routesCoveredUrdu: string[];
  ratePerKmPkr: number;
  rating: number;
  tripsCompleted: number;
  hasGpsTracking: boolean;
  hasStrawBeddingSupplied: boolean;
  phone: string;
  whatsapp: string;
}

export interface CommercialProduct {
  id: string;
  type: 'feed' | 'equipment';
  title: string;
  titleUrdu: string;
  category: 'wanda' | 'silage' | 'rhodes_grass' | 'minerals' | 'milking_machine' | 'chaff_cutter' | 'tagging';
  brand: string;
  price: number;
  unit: string;
  unitUrdu: string;
  rating: number;
  reviewCount: number;
  supplierName: string;
  city: string;
  inStock: boolean;
  imageUrl: string;
  description: string;
  descriptionUrdu: string;
}

export interface DealerStorefront {
  id: string;
  farmName: string;
  farmNameUrdu: string;
  ownerName: string;
  verifiedType: 'Government Certified Stud' | 'Corporate Dairy Farm' | 'Verified Mandi Trader' | 'Certified Dairy Farm';
  verifiedTypeUrdu: string;
  city: string;
  cityUrdu: string;
  rating: number;
  reviewCount: number;
  activeListingsCount: number;
  specialties: string[];
  specialtiesUrdu: string[];
  bannerUrl: string;
  avatarUrl: string;
  phone: string;
  whatsapp: string;
  description: string;
  descriptionUrdu: string;
}

export interface QurbaniHissaOffer {
  id: string;
  animalType: 'Cow' | 'Bull' | 'Camel';
  totalShares: number; // Usually 7 for cattle/camel
  availableShares: number;
  pricePerSharePkr: number;
  breed: string;
  expectedWeightKg: number;
  slaughterServiceAvailable: boolean;
  slaughterFeePkr: number;
  doorstepDeliveryAvailable: boolean;
  charityDonationOption: boolean;
  city: string;
  mandiLocation: string;
  vendorName: string;
  shariaSupervised: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string;
    phone: string;
    avatarUrl?: string;
    isVerified: boolean;
    role: string;
  };
  listingContext?: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    city: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'inquiry' | 'price_drop' | 'verification' | 'qurbani' | 'security';
  title: string;
  titleUrdu: string;
  message: string;
  messageUrdu: string;
  timestamp: string;
  isRead: boolean;
  targetListingId?: string;
}

export interface UserReport {
  id: string;
  listingId: string;
  listingTitle: string;
  reporterPhone: string;
  reason: 'advance_scam' | 'fake_teeth' | 'sick_animal' | 'incorrect_weight' | 'abusive_seller' | 'stolen_livestock';
  details: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface AdminStats {
  totalListings: number;
  pendingApprovals: number;
  flaggedReports: number;
  verifiedDealers: number;
  estimatedMandiVolumePkr: number;
  activeTodayUsers: number;
}
