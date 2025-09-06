"use client";

import { useState, useEffect } from 'react';
import { isAuthenticated, removeAuthTokens } from '../lib/auth';
import api from '../lib/axios';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(0); // Add a state counter to force re-renders

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    checkAuth();
  }, [authState]); // Add authState as dependency

  const checkAuth = async () => {
    try {
      if (isAuthenticated()) {
        const response = await api.get('/auth/users/me/');
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      removeAuthTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
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
      
      // Force re-render of all components using useAuth
      setAuthState(prev => prev + 1);
      
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 
               'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = () => {
    removeAuthTokens();
    setUser(null);
    // Force re-render of all components using useAuth
    setAuthState(prev => prev + 1);
  };

  return { 
    user, 
    loading, 
    login, 
    logout, 
    isAuthenticated: isAuthenticated(),
    refreshAuth: () => setAuthState(prev => prev + 1) // Add refresh function
  };
};