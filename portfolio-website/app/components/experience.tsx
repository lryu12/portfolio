// components/experience.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import CustomCard from "../customcard";

// Unified experiences timeline feed
const EXPERIENCES_DATA = [
  {
    id: "hypersecu",
    date: "2026 January - Present",
    role: "Software Engineer Intern",
    company: "Hypersecu",
    description:
      "I built internal tools to optimize everyday business operations such as internal network checker for token applications, automated database backup & restoration system using Docker, and developing the HyperFIDO security key programming & managing platform.",
    skills: ["C# .NET", "WPF", "Docker", "JavaScript", "MariaDB"],
    link: "https://www.hypersecu.com",
    index: 0
  },
  {
    id: "mygrid",
    date: "2024 November - 2025 April",
    role: "Software Engineer Intern",
    company: "Mygrid (Schema0)",
    description: "I worked on creating scalable backends and data pipelines with TypeScript. I’ve engineered automated engines to parse spreadsheets into relational models via PostgREST and Neon serverless Postgres, and designed optimization systems using DAG algorithms to analyze and track runtime efficiency for complex business processes.",
    skills: ["TypeScript", "Node.js", "React", "JavaScript"],
    link: "https://schema0.com",
    index: 1
  },
];

// 1. The Timeline Coordinator (Parent)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // The delay between each chunk sliding down
    },
  },
};

// 2. The Physical Motion Definition (Child)
const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,              // Clear left-to-right starting vector
    filter: "blur(0px)"  // The premium micro-blur finish
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

export default function Experience() {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-start items-start bg-transparent font-extralight"
    >
      {/* Chunk 1: Section Header */}
      <motion.h2 
        variants={itemVariants}
        className="text-black text-3xl tracking-tight mb-12"
      >
        experience
      </motion.h2>

      {/* Timeline Track Content */}
      <div className="w-full flex flex-col gap-14">
        {EXPERIENCES_DATA.map((exp) => (
          // Chunk 2 & 3: Each CustomCard handles its own sequential step
          <motion.div variants={itemVariants} key={exp.id} className="w-full">
            <CustomCard
              id={exp.id}
              title={exp.role + " - " + exp.company}
              timeline={exp.date}
              description={exp.description}
              tags={exp.skills}
              link={exp.link} // Changed from "/" to follow your actual link strings
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}