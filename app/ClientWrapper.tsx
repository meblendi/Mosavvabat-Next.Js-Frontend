"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const { loading } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state until we're on client side
  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}