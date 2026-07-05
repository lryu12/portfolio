// components/project.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion'; // 👈 Import motion
import CustomCard from '../customcard';

// Clean data structure mapped straight from your Figma child arrays
const PROJECTS_DATA = [
  {
    id: 'ubc-spot',
    title: 'Overdose Detection Software - UBC SPOT',
    timeline: '2025 January - Present',
    description: 'I led a cross-functional team of five developers and designers at UBC SPOT to build an overdose detection application supporting safe drug usage within the campus community, ultimately securing a formal sponsorship from the UBC Security Team to scale production. Personally engineered the marketing landing page and contributed to the development of the core React Native application.',
    tags: ['JavaScript', 'React', 'Firebase', 'Figma', 'Trello'],
    link: '#', 
    index: 0
  },
  {
    id: 'ubc-mint',
    title: 'Brain-Computer Interface Software - UBC MINT',
    timeline: '2024 November - 2025 April',
    description: 'I developed an open-source Brain-Computer Interface (BCI) application with the UBC MINT team to capture and analyze real-time brainwave activity from EEG headsets. Designed modular components to process and render live, high-frequency signal graphs, allowing users to easily customize frequency thresholds. By building reusable canvas elements with React-Flow, the new architecture significantly accelerated MVP development cycles for the entire engineering team.',
    tags: ['Next.js', 'React', 'JavaScript', 'Tailwind'],
    link: '#',
    index: 1
  }
];

// 1. The Timeline Coordinator (Parent)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Controls the smooth timing down the page hierarchy
    },
  },
};

// 2. The Physical Motion Definition (Child)
const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,              // Crisp horizontal layout slide vector
    filter: "blur(0px)"  // Smooth blur-in reveal
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

export default function Projects() {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-start items-start select-none font-extralight"
    >
      
      {/* Chunk 1: Tab Section Header Title */}
      <motion.h2 
        variants={itemVariants}
        className="text-3xl tracking-tight text-black mb-12"
      >
        projects
      </motion.h2>

      {/* Projects List Loop Deck wrapper */}
      <div className="w-full flex flex-col gap-14">
        {PROJECTS_DATA.map((project) => (
            // Chunk 2 & 3: Individual cards dropped sequentially into the stagger queue
            <motion.div variants={itemVariants} key={project.id} className="w-full">
              <CustomCard
                id={project.id}
                title={project.title}
                timeline={project.timeline}
                description={project.description}
                tags={project.tags}
                link={project.link}
                index={project.index}
              />
            </motion.div>
          ))}
      </div>

    </motion.section>
  );
}