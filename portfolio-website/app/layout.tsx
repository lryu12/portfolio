import "./globals.css";
import { Suspense } from "react";
import SidebarContent from "./sidebar-content";
import { Analytics } from "@vercel/analytics/next"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen overflow-hidden">
      <body className="h-screen w-screen overflow-hidden bg-white antialiased text-black relative">
        
        {/* 📱 1. MOBILE VIEWPORT: Under Construction Banner */}
        {/* Flex layout on mobile screens, completely unmounts/hidden on 'md' screens and up */}
        <div className="flex md:hidden w-full h-full flex-col justify-between p-8 items-start select-none">
          {/* Top Header Branding */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#a1a1a1]">
              System Terminal v2
            </span>
            <h1 className="text-lg font-normal tracking-tight">Portfolio</h1>
          </div>

          {/* Core Status Block */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="font-mono text-xs tracking-wider uppercase text-black">
                Viewport Restricted
              </span>
            </div>
            
            <h2 className="text-2xl font-light tracking-tight leading-tight">
              Mobile layout currently under construction.
            </h2>
            
            <p className="text-sm font-light leading-relaxed text-[#575757]">
              This experience utilizes micro-interactions and custom viewport layouts optimized exclusively for desktop screens.
            </p>
          </div>

          {/* Bottom Diagnostics Footer */}
          <div className="w-full border-t border-black/10 pt-4 flex justify-between items-center text-[10px] font-mono text-[#a1a1a1]">
            <span>ERR_CODE: 404_MOBILE</span>
            <span>BEST VIEWED ON DESKTOP</span>
          </div>
        </div>


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
            <Analytics/>
          </main>
        </div>

      </body>
    </html>
  );
}