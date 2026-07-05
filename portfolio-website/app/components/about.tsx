"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,
    filter: "blur(0px)" 
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1]
    },
  },
};

export default function About() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "about";

  useEffect(() => {
    if (currentTab !== "about") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default behavior (scrolling / layout jumps)
      if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
      }

      // ⚡ ONE PRESS REVEAL: Immediately routes to the experience tab
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        router.push("/?tab=experience", { scroll: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, currentTab]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate={currentTab === "about" ? "visible" : "hidden"}
      className="mt-20 font-extralight text-black"
    >
      <motion.p variants={itemVariants} className="max-w-md">
        I’m a senior at University of British Columbia studying a Combined Major in Computer Science and Business.
      </motion.p>
      
      <motion.p variants={itemVariants} className="max-w-md mt-5">
        I enjoy designing - whether it’s the data pipelines and APIs that power an application, or the cut and construction of a garment for my clothing brand.
      </motion.p>

      {/* Static premium helper prompt: Since it goes to experience instantly, we lock the text */}
      <motion.p variants={itemVariants} className="mt-10 font-thin select-none uppercase tracking-wider text-xs ">
        press → or ↓ for experience
      </motion.p>
    </motion.div>
  );
}