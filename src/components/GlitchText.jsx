/**
 * GlitchText.jsx — POLISHED
 *
 * WHY THESE CHANGES:
 *
 * 1. UNMOUNT CLEANUP REF
 *    Original setTimeout had no cleanup. When a user clicks into VoidDashboard
 *    and immediately clicks back while glitch is mid-animation, the timeout fires
 *    on an unmounted component → React warning + potential state corruption.
 *    Fix: useRef tracks the timeout ID and useEffect cleanup cancels it.
 *
 * 2. FRAMER VARIANT TRANSITION BUG FIX
 *    In Framer Motion, transition inside a variant IS supported, but repeat and
 *    repeatType inside the variant's transition are ignored when animate is driven
 *    by a state string (not useAnimation). The glitch was never repeating — it
 *    ran once per animate call.
 *
 *    Fix: Move repeat and repeatType to the transition prop on the component
 *    itself (not inside the variant), conditioned on isGlitching. This is the
 *    correct Framer pattern for conditional looping.
 *
 * 3. X/Y KEYFRAMES INSTEAD OF TRANSFORM STRING
 *    Original used a transform array ["translate(0, 0)", ...] which Framer
 *    cannot interpolate with its spring engine — it falls back to CSS transitions.
 *    Using x/y motion values directly lets Framer handle interpolation properly
 *    and enables the repeat to actually work.
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({
  children,
  speed = 1.5,
  enableShadows = false,
  enableOnHover = true,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleHover = () => {
    if (!enableOnHover || isGlitching) return;
    setIsGlitching(true);
    const glitchDuration = 500 / speed;
    timeoutRef.current = setTimeout(() => setIsGlitching(false), glitchDuration);
  };

  const glitchVariants = {
    normal: {
      textShadow: enableShadows ? '0 0 0 rgba(255,0,0,0)' : 'none',
      x: 0,
      y: 0,
    },
    glitch: {
      textShadow: enableShadows
        ? [
            '2px 0 #ff0000, -2px 0 #00ffff',
            '-2px 0 #ff0000, 2px 0 #00ffff',
            '0 0 #ff0000, 0 0 #00ffff',
          ]
        : 'none',
      x: [0, -2, 2, -2, 0],
      y: [0, 2, -2, -2, 0],
    },
  };

  return (
    <motion.span
      variants={glitchVariants}
      initial="normal"
      animate={isGlitching ? 'glitch' : 'normal'}
      transition={
        isGlitching
          ? {
              duration: 0.45 / speed,
              repeat: 3,
              repeatType: 'loop',
              ease: 'linear',
            }
          : { duration: 0.2 }
      }
      onMouseEnter={handleHover}
      className="inline-block font-black tracking-tighter uppercase cursor-pointer relative"
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
};

export default GlitchText;
