import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-32 border-t border-zinc-900 flex flex-col justify-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: '-100px' }} className="w-full">
        
        <div className="mb-20">
          <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">/ WORK EXPERIENCE</p>
          <h2 className="text-[11vw] md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            INTERNSHIPS & ROLES
          </h2>
        </div>

        {/* Replaced max-w constraints with w-full to span the screen */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="w-full space-y-0 border-t border-b border-zinc-800">
          {experiences.map((exp) => (
            <motion.button
              key={exp.id}
              variants={itemVariants}
              onClick={() => onEnterVoid(exp)}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(24, 24, 27)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              className="w-full cursor-pointer border-b border-zinc-800 transition-colors duration-300 p-8 md:p-12 text-left group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
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
                <motion.div whileHover={{ x: 8 }} className="text-xl text-zinc-600 group-hover:text-white transition-colors hidden md:block">→</motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkExperience;