"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'more', label: 'more' },
];

const containerVariants : Variants = {
  hidden: { 
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    },
  },
};

const itemVariants : Variants = {
  hidden: { 
    opacity: 0, 
    x: -40,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2 
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'about';
  const currentIndex = NAV_ITEMS.findIndex((item) => item.id === currentTab);

  useEffect(() => {
    if (currentTab === 'about') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
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
            {/* ⚡ 'initial="rest" whileHover="hover"' propagates states down to both sub-components cleanly */}
            <Link
              href={`/?tab=${item.id}`}
              scroll={false} 
              className="group flex items-center gap-4 h-9.5 cursor-pointer text-left focus:outline-none decoration-none"
            >
              <motion.span
                initial={false}
                animate={{
                  width: isActive ? "66px" : "33px"
                }}
                whileHover={{ 
                  // If it's active it stays extended, otherwise stretches cleanly to 48px
                  width: isActive ? "66px" : "48px" 
                }}
                transition={{
                  duration: 0.22,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`h-0.75 rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-[#575757]' : 'bg-[#a1a1a1] group-hover:bg-[#575757]'
                }`}
              />

              {/* ⚡ Micro Typography Slide: moves right slightly (x: 4) on hover for a tactile response */}
              <motion.span
                whileHover={{ x: isActive ? 0 : 4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`text-lg tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? 'text-black font-normal' 
                    : 'text-[#a1a1a1] group-hover:text-black'
                }`}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}