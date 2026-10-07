"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./header";
import About from "./components/about";
import Experience from "./components/experience";
import Projects from "./components/projects";
import More from "./components/more";

const TABS = ["about", "experience", "projects", "more"] as const;
type TabId = (typeof TABS)[number];

function tabIndex(tab: string | null): number {
  if (tab && TABS.includes(tab as TabId)) {
    return TABS.indexOf(tab as TabId);
  }
  return 0;
}

export default function MobileViewport() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const urlIndex = tabIndex(searchParams.get("tab"));
  const [activeIndex, setActiveIndex] = useState(urlIndex);

  useEffect(() => {
    setActiveIndex(urlIndex);
    const panel = scrollRef.current;
    if (!panel) return;
    panel.scrollTo({ left: panel.clientWidth * urlIndex, behavior: "auto" });
  }, [urlIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(TABS.length - 1, index));
      const panel = scrollRef.current;
      if (panel) {
        panel.scrollTo({
          left: panel.clientWidth * next,
          behavior: "smooth",
        });
      }
      setActiveIndex(next);
      router.push(`/?tab=${TABS[next]}`, { scroll: false });
    },
    [router],
  );

  const syncIndexFromScroll = useCallback(() => {
    const panel = scrollRef.current;
    if (!panel || panel.clientWidth === 0) return;

    const index = Math.round(panel.scrollLeft / panel.clientWidth);
    if (index < 0 || index >= TABS.length) return;

    setActiveIndex(index);
    const tab = TABS[index];
    if (searchParams.get("tab") !== tab) {
      router.replace(`/?tab=${tab}`, { scroll: false });
    }
  }, [router, searchParams]);

  const handleScroll = () => {
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(syncIndexFromScroll, 80);
  };

  useEffect(() => {
    const panel = scrollRef.current;
    if (!panel) return;

    panel.addEventListener("scrollend", syncIndexFromScroll);
    return () => {
      panel.removeEventListener("scrollend", syncIndexFromScroll);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, [syncIndexFromScroll]);

  return (
    <div className="flex h-full w-full flex-col bg-[#f5f5f5] md:hidden">
      <div className="min-h-0 flex-1">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex h-full w-full shrink-0 snap-start flex-col items-start overflow-y-auto px-6 pb-6 pt-2">
            <Header />
            <About isActiveSlide={activeIndex === 0} />
          </div>
          <div className="h-full w-full shrink-0 snap-start overflow-y-auto px-6 pb-6 pt-2">
            <Experience />
          </div>
          <div className="h-full w-full shrink-0 snap-start overflow-y-auto px-6 pb-6 pt-2">
            <Projects />
          </div>
          <div className="h-full w-full shrink-0 snap-start overflow-y-auto px-6 pb-6 pt-2">
            <More />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-black/10 px-6 py-4">
        <button
          type="button"
          aria-label="Previous section"
          disabled={activeIndex === 0}
          onClick={() => goToIndex(activeIndex - 1)}
          className="flex h-10 w-10 items-center justify-center text-xl font-light transition-opacity disabled:opacity-25"
        >
          ←
        </button>
        <span className="text-xs font-thin uppercase tracking-wider text-[#a1a1a1]">
          {TABS[activeIndex]}
        </span>
        <button
          type="button"
          aria-label="Next section"
          disabled={activeIndex === TABS.length - 1}
          onClick={() => goToIndex(activeIndex + 1)}
          className="flex h-10 w-10 items-center justify-center text-xl font-light transition-opacity disabled:opacity-25"
        >
          →
        </button>
      </div>
    </div>
  );
}
