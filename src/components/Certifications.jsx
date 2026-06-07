import React, { useState } from 'react';
import { motion } from 'framer-motion';

const certifications = [
  {
    id: '01',
    title: 'AWS CLOUD PRACTITIONER',
    issuer: 'AMAZON WEB SERVICES',
  },
  {
    id: '02',
    title: 'IBM Z XPLORE',
    issuer: 'CONCEPTS & ADVANCED BADGES',
  },
  {
    id: '03',
    title: 'INTERNSHIP',
    issuer: 'TREND MICRO (DUBAI)',
  },
  {
    id: '04',
    title: 'INTERNSHIP',
    issuer: 'EGIS GROUP (DUBAI)',
  },
];

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-zinc-950 px-6 md:px-20 py-20 md:py-32 border-b border-zinc-900">
      {/* Section Header */}
      <div className="mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-zinc-600 uppercase mb-4">
          / CREDENTIALS
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-2">
          CERTIFICATIONS
        </h2>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            onMouseEnter={() => setHoveredId(cert.id)}
            onMouseLeave={() => setHoveredId(null)}
            animate={{
              scale: hoveredId === cert.id ? 0.98 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`aspect-square p-8 md:p-12 border-4 flex flex-col justify-between transition-colors duration-300 bg-black cursor-pointer ${
              hoveredId === cert.id ? 'border-white' : 'border-zinc-800'
            }`}
          >
            {/* Card ID */}
            <div className="font-mono text-xs tracking-[0.3em] text-zinc-600 uppercase">
              {cert.id}
            </div>

            {/* Card Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-4">
                {cert.title}
              </h3>
              <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-zinc-500">
                {cert.issuer}
              </p>
            </div>

            {/* Hover Indicator */}
            {hoveredId === cert.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs tracking-widest text-zinc-600 uppercase"
              >
                VIEW
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
