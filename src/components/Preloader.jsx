import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ fillComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 100) {
      const duration = count < 30 ? 40 : count < 75 ? 20 : 10; // Variable speed for cinematic feel
      const timer = setTimeout(() => setCount(prev => prev + 1), duration);
      return () => clearTimeout(timer);
    } else {
      // Subtle delay after hitting 100% before triggering the slide out
      const doneTimer = setTimeout(() => {
        fillComplete();
      }, 500);
      return () => clearTimeout(doneTimer);
    }
  }, [count, fillComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-black text-white z-[9999] flex flex-col justify-between p-6 md:p-12 font-mono select-none"
    >
      {/* Top Metadata Status */}
      <div className="flex justify-between items-start text-xs text-zinc-500 tracking-widest uppercase">
        <div>
          <p>SYS.INIT // PAARTH_PORTFOLIO_V2</p>
          <p>LOC // DUBAI_AE</p>
        </div>
        <div className="text-right">
          <p>STATUS: RUNNING</p>
          <p>OPSEC_ENG_READY</p>
        </div>
      </div>

      {/* Massive Brutalist Counter */}
      <div className="overflow-hidden leading-none">
        <h1 className="text-[22vw] font-black tracking-tighter text-white select-none">
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