import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Server } from '../server/Server';

export type UserRole = 'admin' | 'hr' | 'employee';

interface User {
  id: string;
  email: string;
}

interface UserProfile {
  id: string;
  role: UserRole;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// axios instance
const api = axios.create({
  baseURL: Server,
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('profile');

    if (storedUser && storedProfile) {
      setUser(JSON.parse(storedUser));
      setProfile(JSON.parse(storedProfile));
    }

    setLoading(false);
  }, []);

  // LOGIN
  const signIn = async (email: string, password: string) => {
    const res = await api.post('/user/login', { email, password });

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem(
      'user',
      JSON.stringify({ id: user.id, email: user.email })
    );
    localStorage.setItem(
      'profile',
      JSON.stringify({
        id: user.id,
        role: user.role,
        is_active: user.is_active,
      })
    );

    setUser({ id: user.id, email: user.email });
    setProfile({
      id: user.id,
      role: user.role,
      is_active: user.is_active,
    });
  };

  // LOGOUT
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');

    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
