import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skills = ['PYTHON', 'C', 'SQL', 'HTML/CSS'];
const domains = ['OFFENSIVE SECURITY', 'MALWARE ANALYSIS', 'NETWORK DEFENSE'];
const operations = ['SPHINX & BLITZSCHLAG MARKETING', 'POLICYBAZAAR POSP'];

export default function AboutMatrix() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="bg-black px-6 md:px-20 py-20 md:py-32 border-b border-zinc-800">
      {/* Section Header */}
      <div className="mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-4">
          / MATRIX
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-2">
          ARCHITECTURE & EXPERTISE
        </h2>
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-zinc-800">
        {/* Cell 1: Education */}
        <div className="border-r border-b border-zinc-800 p-8 md:p-12">
          <p className="font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase mb-6">
            EDUCATION
          </p>
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-4">
            B.TECH CSE
          </h3>
          <p className="text-lg md:text-xl font-black tracking-tighter uppercase text-zinc-400 mb-4">
            MNIT JAIPUR
          </p>
          <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
            2025–2029
          </p>
          <div className="mt-6 border-t border-zinc-800 pt-6">
            <p className="font-mono text-xs tracking-widest text-zinc-600">
              Jaipur, IN / Dubai, AE
            </p>
          </div>
        </div>

        {/* Cell 2: Core Stack */}
        <div className="border-b border-zinc-800 p-8 md:p-12">
          <p className="font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase mb-6">
            CORE STACK
          </p>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => (
              <motion.button
                key={skill}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className="px-4 py-3 border border-zinc-700 font-mono text-sm font-black tracking-widest uppercase transition-all duration-300"
                style={{
                  color: hoveredSkill === skill ? '#ffffff' : '#a1a1a1',
                  borderColor: hoveredSkill === skill ? '#ffffff' : '#3f3f46',
                }}
              >
                {skill}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cell 3: Domains */}
        <div className="border-r border-zinc-800 p-8 md:p-12">
          <p className="font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase mb-6">
            DOMAINS
          </p>
          <div className="space-y-4">
            {domains.map((domain, idx) => (
              <div key={idx} className="border-l-2 border-zinc-800 pl-4">
                <p className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-white">
                  {domain}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cell 4: Operations */}
        <div className="p-8 md:p-12">
          <p className="font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase mb-6">
            OPERATIONS
          </p>
          <div className="space-y-4">
            {operations.map((op, idx) => (
              <div key={idx} className="border-l-2 border-zinc-800 pl-4">
                <p className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-zinc-400">
                  {op}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
