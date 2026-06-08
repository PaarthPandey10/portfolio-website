/**
 * Preloader.jsx — POLISHED
 *
 * WHY THESE CHANGES:
 *
 * 1. EXIT EASING [0.76, 0, 0.24, 1] → "Expo In"
 *    The original `y: "-100vh"` exit used the default ease, which decelerates
 *    as it leaves — the opposite of what feels right. An exit should ACCELERATE
 *    away (like a curtain snapping up). The expo-in curve starts slow, then
 *    surges — the preloader "launches" off screen instead of drifting. It's the
 *    difference between a theater curtain and a wet towel sliding off a counter.
 *
 * 2. `will-change: transform` on the overlay
 *    Tells the browser to promote this element to its own GPU layer before the
 *    animation starts. Without it, the browser has to recalculate compositing
 *    mid-animation, causing a brief stutter on lower-end devices.
 *
 * 3. `will-change: contents` on the counter h1
 *    The counter updates innerHTML rapidly. This hint prevents the browser from
 *    triggering full layout recalculation on each tick, keeping the counter
 *    visually smooth even on throttled CPU.
 *
 * 4. Slightly longer exit duration (0.9 → 1.1s)
 *    The expo-in curve needs a touch more runway to feel weighty. A shorter
 *    duration with expo-in feels like a glitch; 1.1s lets it build tension.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ fillComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 100) {
      const duration = count < 30 ? 40 : count < 75 ? 20 : 10;
      const timer = setTimeout(() => setCount((prev) => prev + 1), duration);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => {
        fillComplete();
      }, 500);
      return () => clearTimeout(doneTimer);
    }
  }, [count, fillComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{
        duration: 1.1,
        // Expo-in: slow start → aggressive acceleration → screen exit.
        // This reads as "purposeful departure" vs. the default curve's "drift."
        ease: [0.76, 0, 0.24, 1],
      }}
      // GPU layer promotion: prevents compositing stutter on exit
      style={{ willChange: 'transform' }}
      className="fixed inset-0 bg-black text-white z-[9999] flex flex-col justify-between p-6 md:p-12 font-mono select-none"
    >
      {/* Top Metadata Status */}
      <div className="flex justify-between items-start text-xs text-zinc-500 tracking-widest uppercase">
        <div>
          <p>SYS.INIT // PAARTH_PORTFOLIO</p>
        </div>
        <div className="text-right">
          <p>STATUS: RUNNING</p>
          <p>READY</p>
        </div>
      </div>

      {/* Massive Brutalist Counter */}
      <div className="overflow-hidden leading-none">
        {/* will-change: contents prevents layout recalc on each number change */}
        <h1
          className="text-[22vw] font-black tracking-tighter text-white select-none"
          style={{ willChange: 'contents' }}
        >
          {count.toString().padStart(3, '0')}
        </h1>
      </div>

      {/* Bottom Loading Bar & Detail */}
      <div className="space-y-4">
        <div className="w-full bg-zinc-900 h-[2px] relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-white"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-zinc-500 tracking-wider">
          <p>LOADING CORE ASSETS...</p>
          <p>[ {count}% ]</p>
        </div>
      </div>
    </motion.div>
  );
}
