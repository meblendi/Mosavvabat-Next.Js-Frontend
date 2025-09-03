"use client";

import { useState, useEffect } from 'react';
import { isAuthenticated, removeAuthTokens, getAccessToken } from '../lib/auth';
import api from '../lib/axios';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      try {
        const response = await api.get('/auth/users/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        removeAuthTokens();
        setUser(null);
      }
    }
    setLoading(false);
    setAuthChecked(true);
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      // Get tokens
      const tokenResponse = await api.post('/token/', credentials);
      const { access, refresh } = tokenResponse.data;
      
      // Store tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Get user info
      const userResponse = await api.get('/auth/users/me/');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 
               error.response?.data?.message || 
               'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = () => {
    removeAuthTokens();
    setUser(null);
    // Optional: Call backend logout endpoint if needed
    // api.post('/auth/logout/');
  };

  return { 
    user, 
    loading, 
    login, 
    logout, 
    isAuthenticated: isAuthenticated(),
    authChecked 
  };
};