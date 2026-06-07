import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: '01',
    name: 'CONTAINR',
    description: 'USB QUARANTINE & SANDBOX SCANNER',
  },
  {
    id: '02',
    name: 'Z-XPLORE',
    description: 'MAINFRAME ARCHITECTURE LABS',
  },
  {
    id: '03',
    name: 'POLICY ENGINE',
    description: 'POSP DIGITAL INFRASTRUCTURE',
  },
];

export default function BrutalistWork() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-black px-6 md:px-20 py-20 md:py-32 border-b border-zinc-900">
      {/* Section Header */}
      <div className="mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-4">
          / SELECTED WORK
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
          SYSTEMS & SOLUTIONS
        </h2>
      </div>

      {/* Projects List */}
      <div className="max-w-4xl">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="border-t border-zinc-800 py-12 md:py-16 cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Project ID */}
              <div className="font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase flex-shrink-0">
                {project.id}
              </div>

              {/* Project Name */}
              <motion.div
                animate={{
                  x: hoveredId === project.id ? 20 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3
                  className={`text-4xl md:text-5xl font-black tracking-tighter uppercase transition-colors duration-300 ${
                    hoveredId === project.id ? 'text-white' : 'text-zinc-600'
                  }`}
                >
                  {project.name}
                </h3>
              </motion.div>

              {/* Project Description */}
              <p className="font-mono text-xs md:text-sm tracking-widest text-zinc-500 uppercase flex-shrink-0">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 pt-12 border-t border-zinc-800">
        <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
          // FULL ARCHIVE AVAILABLE ON REQUEST
        </p>
      </div>
    </section>
  );
}
