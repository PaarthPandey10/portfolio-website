import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const Expertise = ({ onEnterVoid }) => {
  const accolades = [
    { 
      id: 'acc-0',
      title: 'UAE GOLDEN VISA', 
      company: 'DISTINCTION STUDENT',
      type: 'Merit-Based 10-Year Residency',
      duration: 'Awarded 2025',
      location: 'Dubai, UAE',
      modality: 'Merit',
      responsibilities: [
        'Awarded prestigious long-term residency by the UAE Government',
        'Recognized under the Distinction Student category',
        'Acknowledged for superior academic merit and exceptional performance in secondary education',
      ],
      skills: ['Academic Excellence', 'Distinction', 'Consistent Merit']
    },
    { 
      id: 'acc-1',
      title: 'INNOVALTE HACKATHON', 
      company: 'NATIONAL FINALIST',
      type: 'SOFTWARE ENGINEER',
      duration: 'March 2024',
      location: 'Dubai, UAE',
      modality: 'Competition',
      responsibilities: [
        'Engineered Focus Mate, an AI desktop application to track student attention',
        'Integrated real-time computer vision data pipelines using Python',
        'Competed as National Finalists showcasing rapid problem-solving and cross-functional teamwork',
      ],
      skills: ['Python', 'Computer Vision', 'AI Integration', 'Rapid Prototyping']
    },
    { 
      id: 'acc-2',
      title: 'YAS F1 IN SCHOOLS', 
      company: 'NATIONAL FINALIST',
      type: 'MANUFACTURING ENGINEER',
      duration: 'June 2024',
      location: 'Abu Dhabi, UAE',
      modality: 'Competition',
      responsibilities: [
        'Built a 3D-printed mini F1 car matching stringent competition guidelines and standards',
        'Designed the miniature F1 car using Fusion 360',
        'Applied advanced CAD modeling and aerodynamics for performance optimization',
        'Competed as a Finalist at the Yas Marina Circuit in Abu Dhabi',
      ],
      skills: ['Fusion 360', 'CAD Design', 'Aerodynamics', '3D Printing']
    },
  ];

  const domains = [
    { title: 'CYBERSECURITY', tech: 'XDR & Risk // TM Vision One // Red & Blue Teaming // Network Defense' },
    { title: 'NETWORKING', tech: 'Network Architecture // CCNA (Pursuing)' },
    { title: 'PROGRAMMING', tech: 'Python // C // SQL // HTML & CSS // Git' },
    { title: 'CLOUD & INFRA', tech: 'AWS // VMs // Linux // Windows // IBM ZOS' },
  ];

  const certs = [
    { title: 'IBM Z Mainframe - Advanced (2026) & Concepts (2025)', url: '#' },
    { title: 'Certified Google Cybersecurity Professional (2025)', url: '#' },
    { title: 'Trend Micro Vision One - XDR Professional (2025)', url: '#' },
    { title: 'AWS Certified Cloud Practitioner (2025-2028)', url: '#' },
    { title: 'Data Science & AI - IIT Madras (2025)', url: '#' }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="bg-black text-white px-6 md:px-20 py-32 border-t border-zinc-900 flex flex-col justify-center relative z-10 w-full">
      
      {/* 1. ACCOLADES */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mb-48 md:mb-64 w-full">
        <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">/ ACHIEVEMENTS</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">ACCOLADES</h2>
        
        <motion.div variants={containerVariants} className="w-full space-y-0 border-t border-b border-zinc-800">
          {accolades.map((acc) => (
            <motion.button
              key={acc.id}
              variants={itemVariants}
              onClick={() => onEnterVoid && onEnterVoid(acc)}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(24, 24, 27)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              className="w-full cursor-pointer border-b border-zinc-800 p-8 md:p-12 transition-colors duration-300 text-left group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex-1">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-white group-hover:text-white transition-colors">
                  <GlitchText speed={1.5} enableShadows={false} enableOnHover={true}>{acc.title}</GlitchText>
                </h3>
                <span className="font-mono text-sm md:text-lg text-zinc-600 tracking-widest mt-3 block uppercase">
                  {acc.company} | {acc.type}
                </span>
              </div>
              <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
                <span className="font-mono text-xs md:text-sm text-zinc-500 tracking-widest mb-1 md:mb-2 uppercase">
                  {acc.location} | {acc.modality}
                </span>
                <p className="font-mono text-base md:text-xl tracking-[0.3em] text-zinc-400 uppercase mb-2">
                  {acc.duration}
                </p>
                <motion.div whileHover={{ x: 8 }} className="text-xl text-zinc-600 group-hover:text-white transition-colors hidden md:block">→</motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* 2. DOMAINS - Full width table-row layout */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="mb-48 md:mb-64 w-full">
        <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">/ EXPERTISE</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">SKILLS & DOMAINS</h2>
        <div className="w-full space-y-0 border-t border-b border-zinc-800">
          {domains.map((domain, i) => (
            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 md:p-12 border-b border-zinc-800 group cursor-crosshair transition-colors hover:bg-zinc-900">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-600 group-hover:text-white transition-colors w-full md:w-auto">
                {domain.title}
              </h3>
              <p className="font-mono text-sm md:text-lg text-zinc-400 group-hover:text-zinc-200 transition-colors leading-relaxed text-left md:text-right w-full md:w-auto md:max-w-2xl">
                {domain.tech}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. CERTIFICATIONS - Two column grid layout */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="w-full">
        <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">/ VERIFICATION</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">CERTIFICATIONS</h2>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border-t border-zinc-800 pt-12">
          {certs.map((cert, i) => (
            <motion.li 
              key={i} 
              whileHover={{ x: 12 }} 
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <a 
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start md:items-center gap-4 group cursor-pointer py-3 w-fit"
              >
                <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-white transition-colors mt-2 md:mt-0 shrink-0" />
                <span className="font-mono text-sm md:text-lg text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest leading-relaxed">
                  {cert.title}
                </span>
                <span className="font-mono text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest ml-4 mt-1 md:mt-0 shrink-0">
                  [VERIFY]
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>

    </section>
  );
};

export default Expertise;