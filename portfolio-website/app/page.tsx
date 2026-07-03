import Image from "next/image";
import RootLayout from "./layout";
import Experience from "./components/experience";
import About from "./components/about";
import Projects from "./components/projects";
import More from "./components/more";

interface PageProps {
  // Next.js automatically injects the live URL search parameters here
  searchParams: Promise<{ tab?: string }>;
}

export default async function Home({ searchParams }: PageProps) {

  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || 'about';

  return (
    <div className="w-full">
      
      {/* {activeTab === 'about' && <About />} */}
      {activeTab === 'experience' && <Experience />}
      {activeTab === 'projects' && <Projects />}
      {activeTab === 'more' && <More />}
    </div>
    
  );
}
