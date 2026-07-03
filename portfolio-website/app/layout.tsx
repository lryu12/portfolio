import "./globals.css";
import { Suspense } from "react";
import SidebarContent from "./sidebar-content";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen overflow-hidden">
      <body className="h-screen w-screen overflow-hidden flex flex-row bg-white antialiased">
        
        {/* Safe client-side conditional sidebar area */}
        <Suspense fallback={<div className="ml-32 w-48 bg-white" />}>
          <SidebarContent />
        </Suspense>
        
        {/* The Scrollable Portal Frame stays completely unaffected */}
        <main className="max-w-176 px-4 py-5 h-screen overflow-y-auto ml-50 w-1/2 mr-15 pt-24 mt-4 custom-scrollbar pb-32">
          {children}
        </main>

      </body>
    </html>
  );
}