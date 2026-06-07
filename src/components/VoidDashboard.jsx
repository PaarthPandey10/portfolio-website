import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import BlurText from './BlurText';

const SquishyHeading = ({ text }) => {
  return (
    <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-white flex cursor-cell">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          whileHover={{ 
            scaleY: [1, 0.4, 1.3, 0.9, 1], 
            scaleX: [1, 1.5, 0.7, 1.1, 1], 
            color: "#ffffff" 
          }}
          transition={{ type: "spring", bounce: 0.7, duration: 0.6 }}
          className="inline-block origin-bottom text-zinc-400 transition-colors"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h3>
  );
};

const ThorGrid = ({ children }) => {
  const [pullCount, setPullCount] = useState(0);
  const [isNudging, setIsNudging] = useState(false);

  const handleDragEnd = () => {
    setPullCount((prev) => prev + 1);
    if (pullCount > 0) {
      setIsNudging(true);
      setTimeout(() => setIsNudging(false), 400);
    }
  };

  const springPhysics = pullCount === 0 
    ? { type: "spring", stiffness: 40, damping: 10, mass: 2 } 
    : { type: "spring", stiffness: 600, damping: 15 };

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={pullCount === 0 ? 0.6 : 0.05}
      onDragEnd={handleDragEnd}
      animate={isNudging ? { x: [0, -15, 15, -10, 10, 0] } : { x: 0, y: 0 }}
      transition={springPhysics}
      className="cursor-grab active:cursor-grabbing hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] transition-shadow duration-500 rounded-sm relative z-10"
    >
      {children}
    </motion.div>
  );
};

const ThorSkill = ({ children, healSignal }) => {
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

  const springPhysics = pullCount === 0 
    ? { type: "spring", stiffness: 40, damping: 10, mass: 1.5 } 
    : { type: "spring", stiffness: 800, damping: 12 };

  if (!isButtoned) {
    return (
      <motion.li 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 12, color: "#ffffff" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsButtoned(true)}
        className="flex gap-4 items-center cursor-pointer group text-zinc-500 hover:text-white transition-colors"
      >
        <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-white transition-colors duration-300 rounded-full" />
        <span className="text-sm md:text-base font-mono uppercase tracking-wider select-none">{children}</span>
      </motion.li>
    );
  }

  return (
    <motion.li
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={pullCount === 0 ? 0.8 : 0.05}
      onDragEnd={handleDragEnd}
      animate={isNudging ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0, y: 0 }}
      transition={springPhysics}
      className="inline-flex items-center px-4 py-2 bg-zinc-900 border border-zinc-700 cursor-grab active:cursor-grabbing select-none hover:bg-white hover:text-black transition-colors duration-300 shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 text-white"
    >
      <span className="text-sm font-mono uppercase font-bold tracking-widest">{children}</span>
    </motion.li>
  );
};

const InteractiveListItem = ({ children, healSignal }) => {
  const [isNeutralized, setIsNeutralized] = useState(false);

  useEffect(() => {
    if (healSignal > 0) setIsNeutralized(false);
  }, [healSignal]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 12, color: "#ffffff", scale: 1.01 }}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      onClick={() => setIsNeutralized(!isNeutralized)}
      className={`flex gap-4 items-start cursor-grab active:cursor-grabbing group p-2 -ml-2 rounded-md hover:bg-zinc-900 transition-colors text-zinc-400 ${isNeutralized ? 'line-through text-zinc-800 opacity-50' : ''}`}
    >
      <motion.span 
        animate={{ rotate: isNeutralized ? 90 : 0 }} 
        className="text-zinc-700 font-mono mt-1 text-xs transition-colors group-hover:text-white shrink-0"
      >
        {isNeutralized ? 'X' : '|||'} 
      </motion.span>
      <p className="text-sm md:text-base leading-relaxed select-none">{children}</p>
    </motion.div>
  );
};

export default function VoidDashboard({ data, onClose, direction, dashPhysics }) {
  const [responsibilities, setResponsibilities] = useState(data?.responsibilities || []);
  const [metaItems] = useState([data?.company, data?.type, data?.duration, data?.location, data?.modality].filter(Boolean));
  const [whackedIndices, setWhackedIndices] = useState([]);
  
  const [nudgeReset, setNudgeReset] = useState(false);
  const [autoResetPanic, setAutoResetPanic] = useState(false);
  const [healSignal, setHealSignal] = useState(0);
  const [isHealing, setIsHealing] = useState(false);

  // BUG FIX: Lock the native scrollbar INSTANTLY to prevent layout shift popping
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
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
    animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-[100] text-white font-sans antialiased flex flex-col"
      initial={{ x: direction.x, y: direction.y, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: direction.x, y: direction.y, opacity: 0 }}
      transition={dashPhysics}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      <ReactLenis root={false} className="h-full overflow-y-auto no-scrollbar p-6 md:p-16">
        <motion.button 
          onClick={onClose}
          whileHover={{ x: -5, backgroundColor: "#27272a" }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-sm md:text-base font-bold text-zinc-300 tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 uppercase mb-16 flex items-center gap-4 bg-zinc-900/80 border border-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.3)] w-fit group"
        >
          <motion.span 
            transition={{ duration: 0.3, ease: "easeOut" }} 
            className="inline-block text-white group-hover:-translate-x-2 transition-transform"
          >
            {'<<'}
          </motion.span> 
          REVERT TO CORE_
        </motion.button>

        <motion.div variants={containerVariants} initial="initial" animate="animate" className="max-w-7xl mx-auto w-full">
          
          <div className="mb-16 border-b border-zinc-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8" style={{ perspective: 1000 }}>
            <div className="flex-1">
              <motion.div 
                onClick={handleKingHeal}
                whileHover={{ scale: 1.01 }}
                animate={isHealing ? { 
                  scale: 1.05, 
                  y: -15, 
                  rotateX: 15, 
                  textShadow: "0px 10px 50px rgba(255,255,255,0.9), 0px 0px 80px rgba(255,255,255,0.5)" 
                } : { 
                  scale: 1, y: 0, rotateX: 0, textShadow: "none" 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className="cursor-pointer inline-block"
              >
                <BlurText 
                  text={data.title || "ROLE_TITLE"} 
                  delay={30} 
                  animateBy="words" 
                  direction="top" 
                  className="text-5xl md:text-[6vw] font-black uppercase tracking-tighter leading-none mb-6" 
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 font-mono text-xs md:text-sm text-zinc-500 tracking-widest uppercase items-center">
                {metaItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <motion.button
                      onClick={() => handleWhack(idx)}
                      style={{ transformOrigin: "bottom" }}
                      animate={whackedIndices.includes(idx) 
                        ? { y: 6, scaleY: 0.15, scaleX: 1.1, opacity: 0.4 } 
                        : { y: 0, scaleY: 1, scaleX: 1, opacity: 1 }
                      }
                      whileHover={!whackedIndices.includes(idx) ? { y: -4, scale: 1.05, color: "#ffffff" } : {}}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="px-3 py-1 bg-zinc-900 border-b-2 border-zinc-700 hover:bg-zinc-800 rounded-sm cursor-crosshair select-none"
                    >
                      {item}
                    </motion.button>
                    {idx < metaItems.length - 1 && <span className="hidden md:inline text-zinc-800">|</span>}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            <motion.button
              onClick={handleResetMeta}
              animate={
                autoResetPanic 
                  ? { scale: [1, 1.4, 0.9, 1.2, 1], rotate: [0, -15, 15, -10, 10, 0], backgroundColor: "#ef4444", color: "#ffffff" } 
                  : nudgeReset 
                  ? { x: [-5, 5, -5, 5, 0], rotate: [-5, 5, -5, 5, 0] } 
                  : { backgroundColor: "#ffffff", color: "#000000" }
              }
              whileHover={!autoResetPanic ? { scale: 1.1 } : {}}
              whileTap={!autoResetPanic ? { scale: 0.95 } : {}}
              transition={{ duration: autoResetPanic ? 0.6 : 0.2 }}
              className="hidden md:flex w-12 h-12 shrink-0 items-center justify-center rounded-full font-black text-xl shadow-[0_4px_0_#52525b] active:shadow-[0_0px_0_#52525b] active:translate-y-1 transition-all"
            >
              {autoResetPanic ? "!" : "↑"}
            </motion.button>
          </div>

          <ThorGrid>
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
              
              <div className="bg-black p-8 md:p-12 pointer-events-auto min-h-[400px]">
                <SquishyHeading text={data.sectionTitle || "RESPONSIBILITIES"} />
                <Reorder.Group axis="y" values={responsibilities} onReorder={setResponsibilities} className="space-y-2">
                  {responsibilities.map((res) => (
                    <Reorder.Item key={res} value={res}>
                      <InteractiveListItem healSignal={healSignal}>{res}</InteractiveListItem>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>

              <div className="bg-black p-8 md:p-12 pointer-events-auto min-h-[400px]">
                <SquishyHeading text="SKILLS & TECH" />
                <ul className="flex flex-wrap gap-4">
                  {data.skills?.map((skill, idx) => (
                    <ThorSkill key={idx} healSignal={healSignal}>{skill}</ThorSkill>
                  ))}
                </ul>
              </div>

            </motion.div>
          </ThorGrid>
        </motion.div>
      </ReactLenis>
    </motion.div>
  );
} 