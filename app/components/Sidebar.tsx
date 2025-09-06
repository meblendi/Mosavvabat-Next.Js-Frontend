"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Building, 
  Settings,
  ChevronDown,
  PlusCircle,
  List
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const { user } = useAuth();

  if (loading) {
    return (
      <aside className="w-64 bg-slate-100 shadow-lg">
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
  if (!isAuthenticated) {
    return null;
  }
  
  const menuItems = [
    {
      name: 'داشبورد',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'مدیریت دستورات',
      href: '/orders',
      icon: FileText,
      subItems: [
        { name: 'همه دستورات', href: '/orders' },
        { name: 'ایجاد دستور جدید', href: '/orders/create' },
        { name: 'دستورات من', href: '/orders/my' },
      ],
    },
    {
      name: 'تأیید دستورات',
      href: '/approvals',
      icon: FileText,
      show: user?.profile?.can_approve,
    },
    {
      name: 'سازمان‌ها',
      href: '/organizations',
      icon: Building,
      show: user?.is_staff,
    },
    {
      name: 'کاربران',
      href: '/users',
      icon: Users,
      show: user?.is_staff,
    },
    {
      name: 'مراحل',
      href: '/stages',
      icon: Settings,
      show: user?.is_staff,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-gray-100">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">منو</h2>
      </div>
      
      <nav className="p-4 border-t border-b">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            if (item.show === false) return null;
            
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                {item.subItems ? (
                  <details className="group">
                    <summary className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.name}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    
                    <ul className="mt-1 space-y-1 pr-8">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                              isActive(subItem.href)
                                ? 'bg-slate-200 text-cyan-600 font-medium'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-slate-200 text-cyan-600 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">اقدامات سریع</h3>
        <div className="space-y-2">
          <Link
            href="/orders/create"
            className="flex items-center space-x-2 p-2 bg-cyan-100 text-gray-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="text-sm font-medium">دستور جدید</span>
          </Link>
          
          <Link
            href="/orders"
            className="flex items-center space-x-2 p-2 bg-cyan-100 text-gray-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <List className="w-4 h-4" />
            <span className="text-sm font-medium">مشاهده همه</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;