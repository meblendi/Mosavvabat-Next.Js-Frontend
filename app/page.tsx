"use client";

import { useAuth } from '../hooks/useAuth';
import Login from './components/login';
import Dashboard from './components/dashboard';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
}