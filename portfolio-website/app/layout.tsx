import "./globals.css";
import Nav from './nav'
import Header from './header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="min-h-full flex flex-row">
        <div className="ml-32">
          <Header/>
          <Nav/>
        </div>
        <main className="max-w-176 px-4 py-5 min-h-full ml-50 w-1/2 mr-15 mt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
