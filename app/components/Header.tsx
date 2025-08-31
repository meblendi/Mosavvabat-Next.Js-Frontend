"use client";
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import Image from "next/image";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

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
            onClick={logout}
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