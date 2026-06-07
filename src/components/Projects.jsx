import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const Projects = ({ onEnterVoid }) => {
  const projects = [
    {
      id: 0,
      title: 'DNS COVERT COMMS',
      company: 'THREAT RESEARCH',
      type: 'Security Analytics',
      duration: '2024-2025',
      location: 'Virtual Lab',
      modality: 'Simulation',
      responsibilities: [
        'Simulated credential dumping on Windows and Ubuntu VMs',
        'Monitored detection protocols via TM Vision One',
        'Analyzed XDR alerts to map attacker methodologies',
        'Conducted advanced malware analysis and threat detection',
      ],
      skills: ['VMs', 'TM Vision One', 'Windows/Linux', 'Malware Analysis'],
    },
    {
      id: 1,
      title: 'TECHNICAL VAULT',
      company: 'KNOWLEDGE BASE',
      type: 'Documentation',
      duration: 'Continuous',
      location: 'GitHub',
      modality: 'Open Source',
      responsibilities: [
        'Built a centralized Obsidian/GitHub repository',
        'Aggregated labs for Google Cyber, IBM Z Mainframe, and AWS Cloud',
        'Authored and published Trend Micro whitepapers',
        'Maintained verified records of enterprise certifications',
      ],
      skills: ['Git', 'Markdown', 'AWS', 'IBM ZOS'],
    },
    {
      id: 2,
      title: 'FOCUS MATE AI',
      company: 'UAE INNOVALTE',
      type: 'Hackathon Finalist',
      duration: 'March 2024',
      location: 'UAE',
      modality: 'Team Build',
      responsibilities: [
        'Engineered an AI desktop application to track student attention',
        'Integrated real-time computer vision data pipelines',
        'Competed as National Finalists in the UAE InnovAlte Hackathon',
      ],
      skills: ['Python', 'Computer Vision', 'Software Engineering'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="bg-black text-white px-6 md:px-20 py-32 border-t border-zinc-900 flex flex-col justify-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: '-100px' }} className="w-full">
        <div className="mb-20">
          <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">/ PROJECTS</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">TECHNICAL WORK</h2>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="w-full space-y-0 border-t border-b border-zinc-800">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              variants={projectVariants}
              onClick={() => onEnterVoid(project)}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(24, 24, 27)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              className="w-full cursor-pointer border-b border-zinc-800 p-8 md:p-12 transition-colors duration-300 text-left group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex-1">
                <motion.h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-0 group-hover:translate-x-3 transition-transform duration-300 text-white">
                  <GlitchText speed={1.5} enableShadows={false} enableOnHover={true}>{project.title}</GlitchText>
                </motion.h3>
                <span className="font-mono text-sm md:text-lg text-zinc-600 tracking-widest mt-3 block uppercase group-hover:translate-x-3 transition-transform duration-300">
                  {project.type}
                </span>
              </div>

              <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
                <span className="font-mono text-xs md:text-sm text-zinc-500 tracking-widest mb-1 md:mb-2 uppercase">
                  {project.location} | {project.modality}
                </span>
                <p className="font-mono text-base md:text-xl tracking-[0.2em] text-zinc-400 uppercase mb-2">{project.duration}</p>
                <motion.div whileHover={{ x: 8 }} className="text-xl text-zinc-600 group-hover:text-white transition-colors hidden md:block">→</motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;