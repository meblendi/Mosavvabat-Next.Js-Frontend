"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && isClient) {
      // Redirect logic
      if (isAuthenticated && pathname === '/') {
        router.push('/dashboard');
      } else if (!isAuthenticated && pathname !== '/') {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, pathname, isClient, router]);

  // Show loading state until we know if user is authenticated
  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Don't show layout on login page for non-authenticated users
  if (!isAuthenticated && pathname === '/') {
    return <>{children}</>;
  }

  // Show layout for authenticated users or other pages
  return <>{children}</>;
}