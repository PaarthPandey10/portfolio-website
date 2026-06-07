import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HorizontalStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Horizontal translation tied to vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], [0, -1200]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-black overflow-hidden"
    >
      {/* Sticky viewport for horizontal scroll */}
      <motion.div
        className="sticky top-0 h-screen flex items-center overflow-hidden bg-black"
      >
        <motion.div
          style={{ x }}
          className="flex gap-0 flex-shrink-0 h-full items-center"
        >
          {/* Panel 1 */}
          <div className="w-screen h-screen flex items-center justify-center px-12 md:px-20 border-r border-zinc-900 bg-black flex-shrink-0">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-8">
                / CHAPTER 01
              </p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-6">
                INITIATED<br />IN DUBAI
              </h2>
              <p className="font-mono text-sm md:text-base tracking-wide text-zinc-400 leading-relaxed">
                Trend Micro & Egis Group Operations
              </p>
              <div className="mt-8 border-l-2 border-zinc-800 pl-4">
                <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
                  SYSTEMS OPERATIONS • SECURITY PROTOCOLS
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="w-screen h-screen flex items-center justify-center px-12 md:px-20 border-r border-zinc-900 bg-black flex-shrink-0">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-8">
                / CHAPTER 02
              </p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-6">
                ENGINEERED AT<br />MNIT JAIPUR
              </h2>
              <p className="font-mono text-sm md:text-base tracking-wide text-zinc-400 leading-relaxed">
                B.Tech Computer Science
              </p>
              <div className="mt-8 border-l-2 border-zinc-800 pl-4">
                <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
                  ALGORITHMS • SYSTEMS DESIGN • INFRASTRUCTURE
                </p>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="w-screen h-screen flex items-center justify-center px-12 md:px-20 border-r border-zinc-900 bg-black flex-shrink-0">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-8">
                / CHAPTER 03
              </p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-6">
                FOCUS
              </h2>
              <p className="font-mono text-sm md:text-base tracking-wide text-zinc-400 leading-relaxed">
                Offensive Security & Infrastructure
              </p>
              <div className="mt-8 border-l-2 border-zinc-800 pl-4">
                <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
                  PENETRATION TESTING • ARCHITECTURE • HARDENING
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
