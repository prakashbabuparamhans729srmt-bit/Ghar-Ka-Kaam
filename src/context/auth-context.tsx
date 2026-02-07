'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (mobile?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
    setIsLoading(false);
  }, []);

  const login = (mobile?: string) => {
    try {
      localStorage.setItem('isAuthenticated', 'true');
      if (mobile) {
        // Save mobile number to be used across registration/profile pages
        localStorage.setItem('verifiedMobile', mobile);
      }
    } catch (error) {
       console.error("Could not access localStorage", error);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    try {
      // Clear all user-specific data on logout
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('customerName');
      localStorage.removeItem('customerMobile');
      localStorage.removeItem('customerAddress');
      localStorage.removeItem('providerName');
      localStorage.removeItem('providerMobile');
      localStorage.removeItem('providerService');
      localStorage.removeItem('verifiedMobile');
    } catch (error) {
       console.error("Could not access localStorage", error);
    }
    setIsAuthenticated(false);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
