"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'project', label: 'project' },
  { id: 'more', label: 'more' },
];

export default function Nav() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'about';

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