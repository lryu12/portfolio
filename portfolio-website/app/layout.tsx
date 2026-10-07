import "./globals.css";
import { Suspense } from "react";
import SidebarContent from "./sidebar-content";
import MobileViewport from "./mobile-viewport";
import { Analytics } from "@vercel/analytics/next";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen overflow-hidden">
      <body className="h-screen w-screen overflow-hidden bg-white antialiased text-black relative">
        
        <Suspense fallback={<div className="h-full w-full md:hidden bg-[#f5f5f5]" />}>
          <MobileViewport />
        </Suspense>
        <Analytics />


        {/* 💻 2. DESKTOP VIEWPORT: Your Pristine Architecture */}
        {/* Completely hidden on mobile viewports, snaps right into flex layouts on desktop */}
        <div className="hidden md:flex flex-row w-full h-full">
          {/* Safe client-side conditional sidebar area */}
          <Suspense fallback={<div className="ml-32 w-48 bg-white" />}>
            <SidebarContent />
          </Suspense>
          
          {/* The Scrollable Portal Frame stays completely unaffected */}
          <main className="max-w-176 px-4 py-5 h-screen overflow-y-auto ml-50 w-1/2 mr-15 pt-24 mt-4 custom-scrollbar pb-32">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}