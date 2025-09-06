"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Only redirect if we're sure about authentication state
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/");
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-10 p-10 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-xl font-bold text-gray-900">
            به سامانه مدیریت مصوبات خوش آمدید
          </h1>
          <p className="text-gray-600 text-sm">لطفا جهت بهره‌مندی از سامانه ابتدا وارد شوید</p>

          {!isAuthenticated && (
            <div className="space-y-4 flex justify-center">
              <a
                href="/login"
                className="w-2/3 bg-cyan-300 text-slate-800 font-bold py-2 px-4 rounded-md hover:bg-cyan-400 hover:text-slate-100 transition-colors block"
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
}
