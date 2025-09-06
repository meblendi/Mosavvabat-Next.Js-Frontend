import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import ClientWrapper from "./ClientWrapper";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ClientWrapper>
          {/* Header and Sidebar will conditionally render based on auth state */}
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
          <Toaster position="top-center" />
        </ClientWrapper>
      </body>
    </html>
  );
}