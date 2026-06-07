import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroPortal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale the text progressively as user scrolls
  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Portal Hero Text */}
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="flex items-center justify-center"
      >
        <h1
          className="text-9xl md:text-[22vw] font-black tracking-tighter uppercase leading-[0.9] text-white mix-blend-difference"
          style={{
            textShadow: '0 0 60px rgba(255, 255, 255, 0.1)',
          }}
        >
          PAARTH<br />PANDEY
        </h1>
      </motion.div>

      {/* Subtle bottom cue */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-xs text-zinc-600 tracking-widest">
        ENTER THE ARCHIVE
      </div>
    </motion.section>
  );
}
