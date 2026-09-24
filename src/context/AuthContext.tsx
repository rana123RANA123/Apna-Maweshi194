import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  memberSince: string;
  city: string;
  farmName?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (phone: string, role: UserRole, name: string, city: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('apna_maweshi_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo authenticated user for frictionless experience
    return {
      id: 'user-demo-1',
      name: 'Rana Muhammad Waqas',
      phone: '0300-1941940',
      role: 'farmer',
      isVerified: true,
      memberSince: 'March 2024',
      city: 'Faisalabad',
      farmName: 'Waqas Cattle Farm 194-RB',
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apna_maweshi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('apna_maweshi_user');
    }
  }, [user]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = (phone: string, role: UserRole, name: string, city: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'Pakistani Farmer / Trader',
      phone,
      role,
      isVerified: true,
      memberSince: 'Today',
      city: city || 'Lahore',
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
