import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroPortal() {
  const [showArchive, setShowArchive] = useState(true);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArchive(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      // FIX: Added w-full and padding (px-4) to prevent text bleeding
      className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden px-4"
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="flex items-center justify-center w-full"
      >
        {/* FIX: Scaled mobile text down to 15vw and forced text-center */}
        <h1
          className="text-[15vw] md:text-[22vw] font-black tracking-tighter uppercase leading-[0.9] text-white mix-blend-difference text-center"
          style={{
            textShadow: '0 0 60px rgba(255, 255, 255, 0.1)',
          }}
        >
          PAARTH<br />PANDEY
        </h1>
      </motion.div>

      <motion.div 
        animate={{ opacity: showArchive ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-xs text-zinc-600 tracking-widest pointer-events-none w-max text-center"
      >
        ENTER THE ARCHIVE
      </motion.div>
    </motion.section>
  );
}