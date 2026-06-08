/**
 * WorkExperience.jsx — POLISHED
 *
 * WHY THESE CHANGES:
 *
 * 1. STAGGER: 0.1 → 0.08, delayChildren 0.2 → 0.1
 *    Published portfolio sites stagger list items at 60-80ms intervals, not
 *    100-150ms. Faster stagger = the list feels like it "materializes" as a
 *    unit rather than items awkwardly queuing up. 80ms is the sweet spot where
 *    you perceive sequence without perceiving delay.
 *
 * 2. EASING: 'easeOut' → [0.16, 1, 0.3, 1] (custom expo-out bezier)
 *    Standard 'easeOut' is a browser cubic-bezier approximation. The custom
 *    curve [0.16, 1, 0.3, 1] has a more aggressive initial velocity that
 *    immediately captures attention, then a long, satisfying deceleration tail.
 *    The difference is subtle in isolation but the cumulative effect across
 *    every animation makes the site feel "different" — more intentional.
 *
 * 3. DURATION: 0.6 → 0.65
 *    The extra 50ms gives the custom bezier curve enough runway to show off its
 *    deceleration tail. Short durations clip the best part of expressive curves.
 *
 * 4. SPACING: section header `mb-20` (was implied, now explicit)
 *    The 20-unit bottom margin on the header creates proper visual separation
 *    between the label/heading cluster and the list — matches the visual weight
 *    of py-32 on the section.
 *
 * 5. HorizontalStory fix: mobile px changed from px-12 to px-6 to match global gutter
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

// PREMIUM EASING — used consistently across all list-section components.
// Expo-out: fast entry burst → long elegant deceleration. Feels "published."
const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const WorkExperience = ({ onEnterVoid }) => {
  const experiences = [
    {
      id: 0,
      title: 'Tech-Legal Research Intern',
      company: 'Barakah Advisors',
      type: 'Legal Tech',
      duration: 'June 2026',
      location: 'Dubai, UAE',
      modality: 'Hybrid',
      responsibilities: [
        'Drafted research reports on GPU-as-a-Service (GPUaaS) regulations',
        'Analyzed cross-border data privacy compliance frameworks',
        'Synthesized policy recommendations for emerging tech governance',
        'Collaborated with legal and technical teams on regulatory alignment',
      ],
      skills: ['Legal Research', 'GPU-as-a-Service (GPUaaS)', 'Data Privacy (GDPR, CCPA)', 'Cross-border Compliance', 'Policy Analysis', 'Technical Writing']
    },
    {
      id: 1,
      title: 'AV/IT Security Intern',
      company: 'Egis Group',
      type: 'Infrastructure Security',
      duration: 'July 2025 - August 2025',
      location: 'Dubai, UAE',
      modality: 'Onsite',
      responsibilities: [
        'Analyzed SIRA (Security Industry Regulatory Authority) compliance frameworks for UAE',
        'Assessed TDRA (Telecommunications & Digital Regulatory Authority) requirements for KSA',
        'Conducted simulated WiFi heatmap analysis using Ekahau Site Survey',
        'Documented network security posture across multiple facility locations',
      ],
      skills: ['SIRA Framework', 'TDRA Compliance', 'Ekahau Site Survey', 'WiFi Security Analysis', 'Network Architecture', 'Risk Assessment']
    },
    {
      id: 2,
      title: 'Cyber Security Intern',
      company: 'Trend Micro Inc.',
      type: 'Incident Response',
      duration: 'May 2025 - June 2025',
      location: 'Dubai, UAE',
      modality: 'Onsite',
      responsibilities: [
        'Executed credential dumping attacks across Windows/Ubuntu servers in controlled lab environments',
        'Leveraged Trend Vision One XDR platform for incident detection and response',
        'Analyzed malware behavior and containment strategies',
        'Documented attack chains and mitigation procedures',
      ],
      skills: ['Credential Dumping (Mimikatz)', 'Trend Vision One XDR', 'Incident Response', 'Malware Analysis', 'Windows/Linux Security', 'Attack Simulation']
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // 80ms stagger: items materialize as a unit, not a queue
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: PREMIUM_EASE,
      },
    },
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-32 border-t border-zinc-900 flex flex-col justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        viewport={{ once: true, margin: '-100px' }}
        className="w-full"
      >
        {/* Section header — mb-20 gives the heading cluster room to breathe
            before the list begins. mb-16 felt cramped against the border-t. */}
        <div className="mb-20">
          <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">
            / WORK EXPERIENCE
          </p>
          <h2 className="text-[11vw] md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            INTERNSHIPS & ROLES
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full space-y-0 border-t border-b border-zinc-800"
        >
          {experiences.map((exp) => (
            <motion.button
              key={exp.id}
              variants={itemVariants}
              onClick={() => onEnterVoid(exp)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(24, 24, 27)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              className="w-full cursor-pointer border-b border-zinc-800 transition-colors duration-300 p-8 md:p-12 text-left group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              whileTap={{ scale: 0.97, backgroundColor: 'rgb(24, 24, 27)' }}
            >
              {/* LEFT SIDE: Company & Designation */}
              <div className="flex-1">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white group-hover:text-white transition-colors">
                  <GlitchText speed={1.5} enableShadows={false} enableOnHover={true}>
                    {exp.company}
                  </GlitchText>
                </h3>
                <span className="font-mono text-sm md:text-lg text-zinc-600 tracking-widest mt-3 block uppercase">
                  {exp.title}
                </span>
              </div>

              {/* RIGHT SIDE: Location, Modality, Duration */}
              <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
                <span className="font-mono text-xs md:text-sm text-zinc-500 tracking-widest mb-1 md:mb-2 uppercase">
                  {exp.location} | {exp.modality}
                </span>
                <p className="font-mono text-base md:text-xl tracking-[0.2em] text-zinc-400 uppercase mb-2">
                  {exp.duration}
                </p>
                {/* Arrow: `transition-colors duration-200` makes the color
                    change snappy rather than laggy on hover */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2, ease: PREMIUM_EASE }}
                  className="text-xl text-zinc-600 group-hover:text-white transition-colors duration-200 hidden md:block"
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkExperience;
