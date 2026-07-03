// components/more.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import CustomCard from "../customcard";
import CariemLogo from "@/public/cursiveoverlaygraphic-black.png";

// The structural data mapped straight out of your Figma layout canvas nodes
const CONTACT_ITEMS = [
  { id: "email", label: "Email", value: "ryulouis8@gmail.com", href: "mailto:ryulouis8@gmail.com" },
  { id: "github", label: "Github", value: "github.com/lryu12", href: "https://github.com/lryu12" },
  { id: "linkedin", label: "Linkedin", value: "linkedin.com/losryu", href: "https://linkedin.com/in/losryu" },
];

const MORE_DATA = [
  {
    id: 'cariem',
    title: 'Clothing Brand Business - Cariem',
    timeline: '2025 - Present',
    description: 'Owned and operated a clothing brand handling Meta ads, Photoshop/Illustrator design, marketing shoots, Klaviyo email & sms marketing, and Shopify store management.',
    tags: ["Meta Ads", "Shopify", "Photoshop", "Illustrator", "Klaviyo"],
    link: "https://cariemonline.com",
    image: CariemLogo,
  },
];

// 1. The Timeline Coordinator (Parent) - Matched perfectly to your Projects tab
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Controls the smooth timing down the page hierarchy
    },
  },
};

// 2. The Physical Motion Definition (Child) - Matched perfectly to your Projects tab
const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,              // Crisp horizontal layout slide vector
    filter: "blur(0px)"  
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] // Snappy Apple-inspired easing
    },
  },
};

export default function More() {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-start items-start select-none font-extralight w-full"
    >
      
      {/* Chunk 1: Tab Section Header Title */}
      <motion.h2 
        variants={itemVariants}
        className="text-3xl tracking-tight text-black mb-12"
      >
        more
      </motion.h2>

      {/* Chunk 2: Figma Node "Frame 1" (109:8) - Two-Column Contact Block */}
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-167 flex flex-col gap-3 mb-16 pb-2"
      >
        {CONTACT_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center text-base">
            {/* Left Column (Labels) */}
            <span className="w-32 text-black font-normal tracking-tight">
              {item.label}
            </span>
            
            {/* Right Column (Values as pristine external links) */}
            <a 
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#818181] hover:text-black transition-colors duration-200 tracking-wide font-light"
            >
              {item.value}
            </a>
          </div>
        ))}
      </motion.div>

      {/* Chunk 3: Business & Project Content Array */}
      <div className="w-full flex flex-col gap-14">
        {MORE_DATA.map((el) => (
            // Individual cards dropped sequentially into the stagger queue
            <motion.div variants={itemVariants} key={el.id} className="w-full">
              <CustomCard
                id={el.id}
                title={el.title}
                timeline={el.timeline}
                description={el.description}
                tags={el.tags}
                link={el.link}
                image={el.image}
              />
            </motion.div>
          ))}
      </div>

    </motion.section>
  );
}