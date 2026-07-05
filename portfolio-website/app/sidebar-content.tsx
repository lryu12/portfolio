"use client";

import { useSearchParams } from "next/navigation";
import Nav from "./nav";
import Header from "./header";
import About from "./components/about";

export default function SidebarContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "about";
  
  const isAboutPage = currentTab === "about";

  return (
    <div className="ml-32 flex-shrink-0">
      <Header />
      
      {/* About is visible only when on the about tab */}
      <div className={isAboutPage ? "block" : "hidden"}>
        <About />
      </div>

      {/* Nav is hidden on about, but its background logic stays alive */}
      <div className={!isAboutPage ? "block" : "hidden"}>
        <Nav />
      </div>
      {/* <GridMatrix isAboutPage={isAboutPage} /> */}
    </div>
  );
}