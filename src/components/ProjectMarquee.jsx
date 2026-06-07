import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectMarquee() {
  const marqueeVariants = {
    animate: {
      x: [0, -1920],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    },
  };

  const marqueeVariantsReverse = {
    animate: {
      x: [-1920, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    },
  };

  const row1Text = 'PYTHON // C // AWS CLOUD // IBM MAINFRAME // ';
  const row2Text = 'MALWARE ANALYSIS // RED TEAMING // NETWORK DEFENSE // ';

  return (
    <section className="bg-black py-20 md:py-32 border-t border-b border-zinc-900 overflow-hidden">
      {/* Row 1: Left-to-Right Scroll */}
      <div className="mb-12 overflow-hidden">
        <motion.div
          variants={marqueeVariants}
          animate="animate"
          className="flex whitespace-nowrap"
        >
          {[0, 1, 2].map((key) => (
            <p
              key={key}
              className="text-7xl md:text-9xl font-black tracking-tighter text-white ml-8"
            >
              {row1Text}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Right-to-Left Scroll with Outlined Text */}
      <div className="overflow-hidden">
        <motion.div
          variants={marqueeVariantsReverse}
          animate="animate"
          className="flex whitespace-nowrap"
        >
          {[0, 1, 2].map((key) => (
            <p
              key={key}
              className="text-7xl md:text-9xl font-black tracking-tighter text-transparent ml-8"
              style={{
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
              }}
            >
              {row2Text}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
