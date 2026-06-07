import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const Education = ({ onEnterVoid }) => {
  const education = [
    {
      id: 0,
      title: 'B.Tech Computer Science & Engineering',
      company: 'MNIT JAIPUR',
      type: 'Undergraduate',
      duration: '2025-2029',
      location: 'Jaipur, India',
      modality: 'Onsite',
      sectionTitle: 'DESCRIPTION', // OVERRIDES "RESPONSIBILITIES"
      responsibilities: [
        'Focus: Cybersecurity (CRYX Club) - leading student cybersecurity initiative',
        'Marketing Team Member for Sphinx\'25 and Blitzschlag\'26',
        'Core coursework: Data Structures, Databases, Networks, Algorithms',
        'Participating in national-level coding and security competitions',
      ],
      skills: ['Data Structures & Algorithms', 'Database Design', 'Network Protocols', 'Cybersecurity Fundamentals', 'Operating Systems'],
    },
    {
      id: 1,
      title: 'High School Diploma (Science Stream)',
      company: 'JSS PRIVATE SCHOOL',
      type: 'Secondary Education',
      duration: 'Graduated March 2025',
      location: 'Dubai, UAE',
      modality: 'Onsite',
      sectionTitle: 'DESCRIPTION', // OVERRIDES "RESPONSIBILITIES"
      responsibilities: [
        'Graduated with Distinction in Science stream (95.4% in 12th, 97.8% in 10th)',
        'Recipient of the Genius & Specialist Award',
        'Active member of the Coding Club and school Cricket Team',
      ],
      skills: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Computer Science Fundamentals'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="bg-black text-white px-6 md:px-20 py-32 border-t border-zinc-900 flex flex-col justify-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: '-100px' }} className="w-full">
        <div className="mb-20">
          <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6">/ EDUCATION</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">ACADEMIC PATH</h2>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="w-full space-y-0 border-t border-b border-zinc-800">
          {education.map((edu) => (
            <motion.button
              key={edu.id}
              variants={itemVariants}
              onClick={() => onEnterVoid(edu)}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(24, 24, 27)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              className="w-full cursor-pointer border-b border-zinc-800 transition-colors duration-300 p-8 md:p-12 text-left group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex-1">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white group-hover:text-white transition-colors">
                  <GlitchText speed={1.5} enableShadows={false} enableOnHover={true}>{edu.company}</GlitchText>
                </h3>
                <span className="font-mono text-sm md:text-lg text-zinc-600 tracking-widest mt-3 block uppercase">
                  {edu.title}
                </span>
              </div>
              
              <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
                <span className="font-mono text-xs md:text-sm text-zinc-500 tracking-widest mb-1 md:mb-2 uppercase">
                  {edu.location} | {edu.modality}
                </span>
                <p className="font-mono text-base md:text-xl tracking-[0.2em] text-zinc-400 uppercase mb-2">{edu.duration}</p>
                <motion.div whileHover={{ x: 8 }} className="text-xl text-zinc-600 group-hover:text-white transition-colors hidden md:block">→</motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;