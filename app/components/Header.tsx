"use client";

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Add router

const Header: React.FC = () => {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    router.push('/');
  };

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="animate-pulse bg-gray-200 h-10 w-10 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-6 w-40 rounded"></div>
          <div className="flex items-center space-x-4">
            <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  if (!isAuthenticated) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <Image
            src="/images/01.png"
            alt="Logo"
            width={40}
            height={40}
            className="inline mb-2"
          />
          <h1 className="text-xl font-semibold text-gray-900">
            سامانه مدیریت مصوبات
          </h1>
          <Link
            href="/login"
            className="text-sm text-cyan-500 font-bold hover:text-cyan-400"
          >
            ورود
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <Image
          src="/images/01.png"
          alt="Logo"
          width={40}
          height={40}
          className="inline mb-2"
        />
        <h1 className="text-xl font-semibold text-gray-900">
          سامانه مدیریت مصوبات
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          
          <button
            onClick={handleLogout} // Use the new logout handler
            className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;