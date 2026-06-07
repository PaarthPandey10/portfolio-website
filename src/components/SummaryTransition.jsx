import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';

const SummaryTransition = () => {
  const lines = [
    { text: 'ASPIRING CISO', delay: 0 },
    { text: 'DEFENDING DIGITAL', delay: 0.2 },
    { text: 'INFRASTRUCTURE', delay: 0.4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 md:px-20 border-t border-zinc-900 relative z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="text-center max-w-6xl"
      >
        {lines.map((line, idx) => (
          <div key={idx} className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.95] text-white">
            <DecryptedText 
              text={line.text}
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              speed={50}
              maxIterations={15}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default SummaryTransition;
