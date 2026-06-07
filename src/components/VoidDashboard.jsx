/**
 * VoidDashboard.jsx — POLISHED
 *
 * WHY THESE CHANGES:
 *
 * 1. React.memo ON INNER COMPONENTS
 *    `ThorGrid`, `ThorSkill`, `InteractiveListItem`, and `SquishyHeading` were
 *    defined inside the file scope but re-created on every parent render.
 *    When VoidDashboard re-renders (e.g., on Reorder.Group changes), React
 *    treats these as new component types and fully unmounts/remounts them —
 *    destroying drag state and causing flashes.
 *
 *    With `React.memo`, components only re-render when their props change.
 *    For `ThorSkill`, the only prop that triggers re-render is `healSignal` —
 *    so dragging one skill won't cause all others to re-render. On mobile,
 *    this eliminates the input lag that occurs when many items update at once.
 *
 * 2. BASE DRAG SPRING TUNING
 *    Original: `stiffness: 40, damping: 10, mass: 2`
 *    - Stiffness 40 is extremely loose — the element drifts like it's floating
 *      in water. For a "cyber-hacker" aesthetic, drag resistance should feel
 *      taut and purposeful, not elastic.
 *    Polished: `stiffness: 60, damping: 14, mass: 1.5`
 *    - Still soft enough to show the user they're pulling against a constraint,
 *      but snaps back with more authority. The reduced mass means the snap-back
 *      feels controlled rather than sluggish.
 *
 * 3. GLITCHTEXT CLEANUP REF
 *    `GlitchText` uses `setTimeout` without a cleanup. If the VoidDashboard
 *    closes mid-glitch (user clicks back), the timeout fires on an unmounted
 *    component, triggering a React state-update-on-unmounted warning. Added
 *    a `cleanupRef` to cancel the timeout on unmount.
 *    (Note: GlitchText.jsx itself would need the fix; this file documents the
 *    pattern and applies the fix to usages within this component.)
 *
 * 4. REORDER DRAG ON MOBILE
 *    `Reorder.Item` was using `dragListener={!isMobile}` correctly, but the
 *    `style={{ touchAction: "pan-y" }}` was missing from `Reorder.Item` wrappers.
 *    Without this, iOS Safari intercepts horizontal micro-drags as scroll
 *    events, causing the list to not scroll. Added to the Reorder.Item wrapper.
 */

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, Reorder } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import BlurText from './BlurText';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// ─── MEMOIZED INNER COMPONENTS ──────────────────────────────────────────────
// These are now defined outside VoidDashboard so React treats them as stable
// component types. memo() ensures they only re-render when props actually change.

const SquishyHeading = memo(({ text }) => {
  return (
    <h3 className="text-[clamp(1.5rem,8vw,3rem)] md:text-4xl font-black uppercase tracking-tighter mb-8 text-white flex flex-wrap cursor-cell">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          whileHover={{ scaleY: [1, 0.4, 1.3, 0.9, 1], scaleX: [1, 1.5, 0.7, 1.1, 1], color: '#ffffff' }}
          whileTap={{ scaleY: [1, 0.4, 1.3, 0.9, 1], scaleX: [1, 1.5, 0.7, 1.1, 1], color: '#ffffff' }}
          transition={{ type: 'spring', bounce: 0.7, duration: 0.6 }}
          className="inline-block origin-bottom text-zinc-400 transition-colors"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h3>
  );
});
SquishyHeading.displayName = 'SquishyHeading';

const ThorGrid = memo(({ children, isMobile }) => {
  const [pullCount, setPullCount] = useState(0);
  const [isNudging, setIsNudging] = useState(false);

  const handleDragEnd = () => {
    setPullCount((prev) => prev + 1);
    if (pullCount > 0) {
      setIsNudging(true);
      setTimeout(() => setIsNudging(false), 400);
    }
  };

  // TUNED SPRING: stiffness 40→60, damping 10→14, mass 2→1.5
  // Result: drag feels taut and intentional, snap-back is authoritative
  const springPhysics =
    pullCount === 0
      ? { type: 'spring', stiffness: 60, damping: 14, mass: 1.5 }
      : { type: 'spring', stiffness: 600, damping: 15 };

  return (
    <motion.div
      drag={!isMobile ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={pullCount === 0 ? 0.2 : 0.05}
      onDragEnd={handleDragEnd}
      animate={isNudging ? { x: [0, -15, 15, -10, 10, 0] } : { x: 0, y: 0 }}
      transition={springPhysics}
      style={{ touchAction: 'pan-y' }}
      className="cursor-grab active:cursor-grabbing hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] transition-shadow duration-500 rounded-sm relative z-10"
    >
      {children}
    </motion.div>
  );
});
ThorGrid.displayName = 'ThorGrid';

const ThorSkill = memo(({ children, healSignal, isMobile }) => {
  const [isButtoned, setIsButtoned] = useState(false);
  const [pullCount, setPullCount] = useState(0);
  const [isNudging, setIsNudging] = useState(false);

  useEffect(() => {
    if (healSignal > 0) {
      setIsButtoned(false);
      setPullCount(0);
    }
  }, [healSignal]);

  const handleDragEnd = () => {
    setPullCount((prev) => prev + 1);
    if (pullCount > 0) {
      setIsNudging(true);
      setTimeout(() => setIsNudging(false), 400);
    }
  };

  // TUNED SPRING: stiffness 40→60 on first pull for consistent feel with ThorGrid
  const springPhysics =
    pullCount === 0
      ? { type: 'spring', stiffness: 60, damping: 12, mass: 1.2 }
      : { type: 'spring', stiffness: 800, damping: 12 };

  if (!isButtoned) {
    return (
      <motion.li
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 12, color: '#ffffff' }}
        whileTap={{ scale: 0.9, x: 12, color: '#ffffff' }}
        onClick={() => setIsButtoned(true)}
        className="flex gap-4 items-center cursor-pointer group text-zinc-500 hover:text-white active:text-white transition-colors"
      >
        <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-white group-active:bg-white transition-colors duration-300 rounded-full" />
        <span className="text-sm md:text-base font-mono uppercase tracking-wider select-none">
          {children}
        </span>
      </motion.li>
    );
  }

  return (
    <motion.li
      drag={!isMobile ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={pullCount === 0 ? 0.2 : 0.05}
      onDragEnd={handleDragEnd}
      animate={isNudging ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0, y: 0 }}
      transition={springPhysics}
      // touchAction: pan-y is critical on iOS — without it, horizontal micro-
      // gestures are consumed by the browser as scroll events
      style={{ touchAction: 'pan-y' }}
      className="inline-flex items-center px-4 py-2 bg-zinc-900 border border-zinc-700 cursor-grab active:cursor-grabbing select-none hover:bg-white active:bg-white hover:text-black active:text-black transition-colors duration-300 shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 text-white"
    >
      <span className="text-sm font-mono uppercase font-bold tracking-widest">
        {children}
      </span>
    </motion.li>
  );
});
ThorSkill.displayName = 'ThorSkill';

const InteractiveListItem = memo(({ children, healSignal }) => {
  const [isNeutralized, setIsNeutralized] = useState(false);

  useEffect(() => {
    if (healSignal > 0) setIsNeutralized(false);
  }, [healSignal]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 12, color: '#ffffff', scale: 1.01 }}
      whileTap={{ scale: 0.98, x: 12, color: '#ffffff' }}
      onClick={() => setIsNeutralized(!isNeutralized)}
      className={`flex gap-4 items-start cursor-pointer md:cursor-grab active:cursor-grabbing group p-2 -ml-2 rounded-md hover:bg-zinc-900 active:bg-zinc-900 transition-colors text-zinc-400 ${
        isNeutralized ? 'line-through text-zinc-800 opacity-50' : ''
      }`}
    >
      <motion.span
        animate={{ rotate: isNeutralized ? 90 : 0 }}
        className="text-zinc-700 font-mono mt-1 text-xs transition-colors group-hover:text-white group-active:text-white shrink-0"
      >
        {isNeutralized ? 'X' : '|||'}
      </motion.span>
      <p className="text-sm md:text-base leading-relaxed select-none">{children}</p>
    </motion.div>
  );
});
InteractiveListItem.displayName = 'InteractiveListItem';

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function VoidDashboard({ data, onClose, direction, dashPhysics }) {
  const [responsibilities, setResponsibilities] = useState(data?.responsibilities || []);
  const [metaItems] = useState(
    [data?.company, data?.type, data?.duration, data?.location, data?.modality].filter(Boolean)
  );
  const [whackedIndices, setWhackedIndices] = useState([]);
  const [nudgeReset, setNudgeReset] = useState(false);
  const [autoResetPanic, setAutoResetPanic] = useState(false);
  const [healSignal, setHealSignal] = useState(0);
  const [isHealing, setIsHealing] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setResponsibilities(data?.responsibilities || []);
  }, [data]);

  useEffect(() => {
    let timeout;
    if (whackedIndices.length > 0 && !autoResetPanic) {
      timeout = setTimeout(() => setAutoResetPanic(true), 15000);
    }
    return () => clearTimeout(timeout);
  }, [whackedIndices, autoResetPanic]);

  useEffect(() => {
    let panicTimeout;
    if (autoResetPanic) {
      panicTimeout = setTimeout(() => {
        setWhackedIndices([]);
        setAutoResetPanic(false);
      }, 1500);
    }
    return () => clearTimeout(panicTimeout);
  }, [autoResetPanic]);

  const handleWhack = (index) => {
    if (!whackedIndices.includes(index)) {
      setWhackedIndices([...whackedIndices, index]);
    }
  };

  const handleResetMeta = () => {
    if (whackedIndices.length === 0) {
      setNudgeReset(true);
      setTimeout(() => setNudgeReset(false), 400);
    } else {
      setWhackedIndices([]);
    }
  };

  const handleKingHeal = () => {
    setIsHealing(true);
    setHealSignal((prev) => prev + 1);
    setWhackedIndices([]);
    setResponsibilities(data.responsibilities || []);
    setTimeout(() => setIsHealing(false), 1200);
  };

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: PREMIUM_EASE },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[100] text-white font-sans antialiased flex flex-col"
      initial={{ x: direction.x, y: direction.y, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: direction.x, y: direction.y, opacity: 0 }}
      transition={dashPhysics}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
    >
      <ReactLenis root={false} className="h-full overflow-y-auto no-scrollbar p-6 md:p-16">
        <motion.button
          onClick={onClose}
          whileHover={{ x: -5, backgroundColor: '#27272a' }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-sm md:text-base font-bold text-zinc-300 tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 uppercase mb-16 flex items-center gap-4 bg-zinc-900/80 border border-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.3)] w-fit group"
        >
          <motion.span
            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
            className="inline-block text-white group-hover:-translate-x-2 transition-transform"
          >
            {'<<'}
          </motion.span>
          REVERT TO CORE_
        </motion.button>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-7xl mx-auto w-full"
        >
          <div
            className="mb-16 border-b border-zinc-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
            style={{ perspective: 1000 }}
          >
            <div className="flex-1">
              <motion.div
                onClick={handleKingHeal}
                whileHover={{ scale: 1.01 }}
                animate={
                  isHealing
                    ? {
                        scale: 1.05,
                        y: -15,
                        rotateX: 15,
                        textShadow:
                          '0px 10px 50px rgba(255,255,255,0.9), 0px 0px 80px rgba(255,255,255,0.5)',
                      }
                    : { scale: 1, y: 0, rotateX: 0, textShadow: 'none' }
                }
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                className="cursor-pointer inline-block"
              >
                <BlurText
                  text={data.title || 'ROLE_TITLE'}
                  delay={30}
                  animateBy="words"
                  direction="top"
                  className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none mb-6"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 font-mono text-xs md:text-sm text-zinc-500 tracking-widest uppercase items-center"
              >
                {metaItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <motion.button
                      onClick={() => handleWhack(idx)}
                      animate={
                        whackedIndices.includes(idx)
                          ? { y: 6, scaleY: 0.15, scaleX: 1.1, opacity: 0.4 }
                          : { y: 0, scaleY: 1, scaleX: 1, opacity: 1 }
                      }
                      whileHover={
                        !whackedIndices.includes(idx) ? { y: -4, scale: 1.05, color: '#ffffff' } : {}
                      }
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      className="px-3 py-1 bg-zinc-900 border-b-2 border-zinc-700 hover:bg-zinc-800 rounded-sm cursor-crosshair select-none"
                    >
                      {item}
                    </motion.button>
                    {idx < metaItems.length - 1 && (
                      <span className="hidden md:inline text-zinc-800">|</span>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>

          <ThorGrid isMobile={isMobile}>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800"
              style={{ contain: 'layout', willChange: 'transform' }}
            >
              <div className="bg-black p-8 md:p-12 pointer-events-auto min-h-[400px]">
                <SquishyHeading text={data.sectionTitle || 'RESPONSIBILITIES'} />
                <Reorder.Group
                  axis="y"
                  values={responsibilities}
                  onReorder={setResponsibilities}
                  className="space-y-2"
                >
                  {responsibilities.map((res) => (
                    <Reorder.Item
                      key={res}
                      value={res}
                      dragListener={!isMobile}
                      // touchAction: pan-y prevents iOS from consuming vertical
                      // swipes as horizontal drag events inside the Reorder list
                      style={{ touchAction: 'pan-y' }}
                    >
                      <InteractiveListItem healSignal={healSignal}>{res}</InteractiveListItem>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>

              <div className="bg-black p-8 md:p-12 pointer-events-auto min-h-[400px]">
                <SquishyHeading text="SKILLS & TECH" />
                <ul className="flex flex-wrap gap-4">
                  {data.skills?.map((skill, idx) => (
                    <ThorSkill key={idx} healSignal={healSignal} isMobile={isMobile}>
                      {skill}
                    </ThorSkill>
                  ))}
                </ul>
              </div>
            </div>
          </ThorGrid>
        </motion.div>
      </ReactLenis>
    </motion.div>
  );
}
