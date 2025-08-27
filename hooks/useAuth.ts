"use client";

import { useState, useEffect } from 'react';
import { isAuthenticated, removeAuthTokens } from '../lib/auth';
import api from '../lib/axios';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      try {
        const response = await api.get('/auth/users/me/');
        setUser(response.data);
      } catch (error) {
        removeAuthTokens();
      }
    }
    setLoading(false);
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await api.post('/token/', credentials);
      const { access, refresh } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      const userResponse = await api.get('/auth/users/me/');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const logout = () => {
    removeAuthTokens();
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: isAuthenticated() };
};