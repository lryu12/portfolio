// components/Nav.tsx
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'more', label: 'more' },
];

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'about';

  // Find the numerical index of the currently active tab layout panel
  const currentIndex = NAV_ITEMS.findIndex((item) => item.id === currentTab);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent standard page jumping if user taps Arrow keys
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      } else {
        return; // Ignore all other keys
      }

      let nextIndex = currentIndex;

      if (event.key === 'ArrowDown') {
        // Drop down to next item, clamping at the bottom of the deck array index
        nextIndex = Math.min(currentIndex + 1, NAV_ITEMS.length - 1);
      } else if (event.key === 'ArrowUp') {
        // Move up to previous item, clamping at index 0
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      // If the target index is different from where we are, update the route parameter
      if (nextIndex !== currentIndex) {
        const nextItem = NAV_ITEMS[nextIndex];
        // Use scroll: false so the viewport tracking parameters persist smoothly
        router.push(`/?tab=${nextItem.id}`, { scroll: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, router]);

  return (
    <nav className="flex flex-col justify-start items-start gap-6 mt-20 select-none font-thin">
      {NAV_ITEMS.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <Link
            key={item.id}
            href={`/?tab=${item.id}`}
            scroll={false} 
            className="group flex items-center gap-4 h-9.5 cursor-pointer text-left focus:outline-none decoration-none"
          >
            {/* Interactive Vector Indicators */}
            <span
              className={`h-0.75 rounded-full transition-all duration-200 ease-out ${
                isActive 
                  ? 'w-16.5 bg-[#575757]' 
                  : 'w-8.25 bg-[#a1a1a1] group-hover:w-12 group-hover:bg-[#575757]'
              }`}
            />

            {/* Typography Labels */}
            <span
              className={`text-lg tracking-wide transition-colors duration-200 ${
                isActive 
                  ? 'text-black' 
                  : 'text-[#a1a1a1] group-hover:text-black'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}