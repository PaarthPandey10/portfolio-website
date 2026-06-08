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
        className="text-center w-full max-w-7xl flex flex-col items-center"
      >
        {lines.map((line, idx) => (
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

        {/* NEW: Centered Resume Button */}
        <motion.a
          href="https://1drv.ms/b/c/907395d00dce913c/IQC0s8ZZMOUeTYBKZqEHomwLATXLRwxc_LIMvX1O4-ZVH7Q?e=TwZ2MB"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }} // Delays so it fades in after text decrypts
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.95, backgroundColor: "#ffffff", color: "#000000" }} // Mobile Reactive
          className="mt-16 md:mt-20 inline-block px-8 py-4 border border-zinc-700 text-zinc-300 font-mono text-xs md:text-sm tracking-[0.2em] uppercase transition-colors outline-none"
        >
          [ DOWNLOAD_RESUME ]
        </motion.a>
      </motion.div>
    </section>
  );
};

export default SummaryTransition;