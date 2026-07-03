"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'more', label: 'more' },
];

// 1. The Coordinator (Parent)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Slightly quicker stagger for nav items so it feels snappy
    },
  },
};

// 2. The Physical Motion Definition (Child)
const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,              // Matching left-to-right starting vector
    filter: "blur(0px)" 
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] // Snappy Apple-style ease-out curve
    },
  },
};

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'about';
  const currentIndex = NAV_ITEMS.findIndex((item) => item.id === currentTab);

  useEffect(() => {
    // Prevent navigation hijacking while hidden on the about tab
    if (currentTab === 'about') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
        event.key === 'ArrowRight' || event.key === 'ArrowLeft'
      ) {
        event.preventDefault();
      } else {
        return;
      }

      let nextIndex = currentIndex;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        nextIndex = Math.min(currentIndex + 1, NAV_ITEMS.length - 1);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        const nextItem = NAV_ITEMS[nextIndex];
        router.push(`/?tab=${nextItem.id}`, { scroll: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, router, currentTab]);

  return (
    <motion.nav 
      variants={containerVariants}
      initial="hidden"
      /* 🔥 Re-runs the slide-in stagger every single time you navigate away from about */
      animate={currentTab !== 'about' ? 'visible' : 'hidden'}
      className="flex flex-col justify-start items-start gap-6 mt-20 select-none font-thin"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <motion.div 
            key={item.id} 
            variants={itemVariants}
            className="w-full"
          >
            <Link
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
          </motion.div>
        );
      })}
    </motion.nav>
  );
}