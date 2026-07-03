import React from 'react';
import CustomCard from '../customcard';

// Clean data structure mapped straight from your Figma child arrays
const PROJECTS_DATA = [
  {
    id: 'ubc-spot',
    title: 'Overdose Detection Software - UBC SPOT',
    timeline: '2025 January - Present',
    description: 'Led a cross-functional team of five developers and designers at UBC SPOT to build an overdose detection application supporting safe drug usage within the campus community, ultimately securing a formal sponsorship from the UBC Security Team to scale production. Personally engineered the marketing landing page and contributed to the development of the core React Native application.',
    tags: ['JavaScript', 'React', 'Firebase', 'Figma', 'Trello'],
    link: '#', // Add your real project repository or live link string here
  },
  {
    id: 'ubc-mint',
    title: 'Brain-Computer Interface Software - UBC MINT',
    timeline: '2024 November - 2025 April',
    description: 'Developed an open-source Brain-Computer Interface (BCI) application with the UBC MINT team to capture and analyze real-time brainwave activity from EEG headsets. Designed modular components to process and render live, high-frequency signal graphs, allowing users to easily customize frequency thresholds. By building reusable canvas elements with React-Flow, the new architecture significantly accelerated MVP development cycles for the entire engineering team.',
    tags: ['Next.js', 'React', 'JavaScript', 'Tailwind'],
    link: '#',
  }
];

export default function Projects() {
  return (
    <section className="flex flex-col justify-start items-start select-none font-extralight">
      
      {/* Tab Section Header Title (Figma Node 10:237) */}
      <h2 className="text-3xl tracking-tight text-black mb-12">
        projects
      </h2>

      {/* Projects List Loop Deck wrapper */}
      <div className="w-full flex flex-col gap-14">
        {PROJECTS_DATA.map((project) => (
            <CustomCard
                key={project.id}
                id={project.id}
                title={project.title}
                timeline={project.timeline}
                description={project.description}
                tags={project.tags}
                link={project.link}
                />
          ))}
      </div>

    </section>
  );
}