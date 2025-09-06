"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Only redirect if we're sure about authentication state
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        // Stay on home page, don't redirect to login
        // The login link will be available in the UI
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">سامانه مدیریت مصوبات</h1>
        <p className="text-gray-600">به سامانه مدیریت مصوبات خوش آمدید</p>
        
        {!isAuthenticated && (
          <div className="space-y-4">
            <a
              href="/login"
              className="w-full bg-primary-600 text-slate-900 py-2 px-4 rounded-md hover:bg-primary-700 transition-colors block"
            >
              ورود به سامانه
            </a>
          </div>
        )}
        
        {isAuthenticated && (
          <div className="space-y-4">
            <a
              href="/dashboard"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors block"
            >
              رفتن به داشبورد
            </a>
          </div>
        )}
      </div>
    </div>
  );
}