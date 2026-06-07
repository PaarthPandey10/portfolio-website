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
    <section className="min-h-screen bg-black flex items-center justify-center px-4 md:px-20 border-t border-zinc-900 relative z-10 w-full overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        // Added w-full to ensure it respects the parent constraints
        className="text-center w-full max-w-7xl"
      >
        {lines.map((line, idx) => (
          // FIX: Swapped fixed 6xl/9xl for mathematically calculated vw units. 
          // 7.5vw ensures a 14-letter word never exceeds 100% of the screen width.
          <div 
            key={idx} 
            className="text-[7.5vw] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[5vw] xl:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-white break-words"
          >
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