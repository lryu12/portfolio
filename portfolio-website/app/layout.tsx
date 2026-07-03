// app/layout.tsx
import "./globals.css";
import Nav from './nav'
import Header from './header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Force the root html element to take up exactly the viewport height and block overflow bounce
    <html lang="en" className="h-screen overflow-hidden">
      {/* 2. Constrain the body layout row so it cannot scroll globally */}
      <body className="h-screen w-screen overflow-hidden flex flex-row bg-white antialiased">
        
        {/* Persistent Sidebar Column: Fixed in place, never moves */}
        <div className="ml-32 flex-shrink-0">
          <Header/>
          <Nav/>
        </div>
        
        {/* 
          3. The Scrollable Portal Frame: 
          - h-screen limits its height to the window bounds
          - overflow-y-auto lets just this section handle scrolling
          - custom-scrollbar class can be used to hide the scrollbar track completely
        */}
        <main className="max-w-176 px-4 py-5 h-screen overflow-y-auto ml-50 w-1/2 mr-15 pt-24 mt-4 custom-scrollbar pb-32">
          {children}
        </main>

      </body>
    </html>
  );
}