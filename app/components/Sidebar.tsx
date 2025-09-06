"use client";

import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <aside className="w-64 bg-white shadow-lg border-l">
        <div className="p-4 border-b">
          <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <div className="animate-pulse bg-gray-200 h-10 rounded-lg"></div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }

  // Don't show sidebar for non-authenticated users
  if (!isAuthenticated) {
    return null;
  }

  // ... rest of your authenticated sidebar code
  return (
    <aside className="w-64 bg-white shadow-lg border-l">
      {/* Your authenticated sidebar content */}
    </aside>
  );
};

export default Sidebar;