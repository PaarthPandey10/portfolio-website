import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import BlurText from './BlurText';

// --- SQUASH & STRETCH HEADING (Cartoon Physics) ---
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

// --- THE MAIN DRAGGABLE THOR GRID ---
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

// --- MINI THOR SKILL (Transforms on click, listens to Global Heal) ---
const ThorSkill = ({ children, healSignal }) => {
  const [isButtoned, setIsButtoned] = useState(false);
  const [pullCount, setPullCount] = useState(0);
  const [isNudging, setIsNudging] = useState(false);

  // Global Heal Listener
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
        initial={{ x: 0, color: "#71717a" }}
        whileHover={{ x: 12, color: "#ffffff" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsButtoned(true)}
        className="flex gap-4 items-center cursor-pointer group"
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
      className="inline-flex items-center px-4 py-2 bg-zinc-900 border border-zinc-700 cursor-grab active:cursor-grabbing select-none hover:bg-white hover:text-black transition-colors duration-300 shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1"
    >
      <span className="text-sm font-mono uppercase font-bold tracking-widest">{children}</span>
    </motion.li>
  );
};

// --- INTERACTIVE RESPONSIBILITY ITEM (Listens to Global Heal) ---
const InteractiveListItem = ({ children, healSignal }) => {
  const [isNeutralized, setIsNeutralized] = useState(false);

  // Global Heal Listener
  useEffect(() => {
    if (healSignal > 0) setIsNeutralized(false);
  }, [healSignal]);

  return (
    <motion.div 
      initial={{ x: 0, color: "#71717a" }}
      whileHover={{ x: 12, color: "#ffffff", scale: 1.02 }}
      whileTap={{ scale: 0.95, cursor: "grabbing" }}
      onClick={() => setIsNeutralized(!isNeutralized)}
      className={`flex gap-4 items-start cursor-grab active:cursor-grabbing group p-2 -ml-2 rounded-md hover:bg-zinc-900 transition-colors ${isNeutralized ? 'line-through text-zinc-800 opacity-50' : ''}`}
    >
      <motion.span 
        animate={{ rotate: isNeutralized ? 90 : 0 }} 
        className="text-zinc-700 font-mono mt-1 text-xs transition-colors group-hover:text-white"
      >
        {isNeutralized ? 'X' : '|||'} 
      </motion.span>
      <p className="text-sm md:text-base leading-relaxed select-none">{children}</p>
    </motion.div>
  );
};

// --- MAIN EXPORT COMPONENT ---
export default function VoidDashboard({ data, onClose, direction, dashPhysics }) {
  const [responsibilities, setResponsibilities] = useState([]);
  const [metaItems, setMetaItems] = useState([]);
  const [whackedIndices, setWhackedIndices] = useState([]);
  
  // Interaction States
  const [nudgeReset, setNudgeReset] = useState(false);
  const [autoResetPanic, setAutoResetPanic] = useState(false);
  
  // The Majestic King Heal State
  const [healSignal, setHealSignal] = useState(0);
  const [isHealing, setIsHealing] = useState(false);

  useEffect(() => {
    if (data) {
      setResponsibilities(data.responsibilities || []);
      setMetaItems([data.company, data.type, data.duration, data.location, data.modality].filter(Boolean));
    }
  }, [data]);

  // --- THE 15 SECOND PANIC TIMER ---
  useEffect(() => {
    let timeout;
    if (whackedIndices.length > 0 && !autoResetPanic) {
      // 15,000ms = 15 seconds
      timeout = setTimeout(() => {
        setAutoResetPanic(true);
      }, 15000);
    }
    return () => clearTimeout(timeout);
  }, [whackedIndices, autoResetPanic]);

  // Handle the panic animation duration before actually resetting
  useEffect(() => {
    let panicTimeout;
    if (autoResetPanic) {
      panicTimeout = setTimeout(() => {
        setWhackedIndices([]);
        setAutoResetPanic(false);
      }, 1500); // Panics for 1.5 seconds, then heals
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

  // --- THE KING's GLOBAL HEAL ACTION ---
  const handleKingHeal = () => {
    setIsHealing(true);
    setHealSignal((prev) => prev + 1); // Broadcasts to all child components
    setWhackedIndices([]); // Heals flattened metadata
    setResponsibilities(data.responsibilities || []); // Resets shuffled order
    setTimeout(() => setIsHealing(false), 1200); // Glow duration
  };

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0, filter: "blur(10px)" },
    animate: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-[100] text-white font-sans antialiased flex flex-col"
      initial={{ x: direction.x, y: direction.y, filter: "blur(30px)", scale: 1.2, opacity: 0 }}
      animate={{ x: 0, y: 0, filter: "blur(0px)", scale: 1, opacity: 1 }}
      exit={{ x: direction.x, y: direction.y, filter: "blur(30px)", scale: 0.8, opacity: 0 }}
      transition={dashPhysics}
      style={{ willChange: "transform, filter" }}
    >
      <ReactLenis root={false} className="h-full overflow-y-auto no-scrollbar p-6 md:p-12">
        
        {/* Revert Button */}
        {/* Tactical Revert Button */}
        <motion.button 
          onClick={onClose}
          whileHover={{ x: -5, backgroundColor: "#27272a" }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-sm md:text-base font-bold text-zinc-300 tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 uppercase mb-12 flex items-center gap-4 bg-zinc-900/80 border border-zinc-700 px-6 py-3 md:px-8 md:py-4 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.3)] w-fit group"
        >
          <motion.span 
            transition={{ duration: 0.3, ease: "easeOut" }} 
            className="inline-block text-white group-hover:-translate-x-2 transition-transform"
          >
            {'<<'}
          </motion.span> 
          REVERT TO CORE_
        </motion.button>

        <motion.div variants={containerVariants} initial="initial" animate="animate" className="max-w-6xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="mb-16 border-b border-zinc-800 pb-8 flex justify-between items-end" style={{ perspective: 1000 }}>
            <div className="flex-1">
              {/* THE MAJESTIC KING: Grand Title Heal Animation */}
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
              
              {/* Whack-a-Mole Metadata Bar (Tom & Jerry Squash) */}
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

            {/* Whack-a-Mole Reset Button (With Panic States) */}
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
              className="hidden md:flex ml-8 w-12 h-12 items-center justify-center rounded-full font-black text-xl shadow-[0_4px_0_#52525b] active:shadow-[0_0px_0_#52525b] active:translate-y-1 transition-all"
            >
              {autoResetPanic ? "!" : "↑"}
            </motion.button>
          </div>

          {/* THE DRAGGABLE THOR GRID */}
          <ThorGrid>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
              
              {/* Responsibilities Pane (Reorderable) */}
              <motion.div variants={itemVariants} className="bg-black p-8 md:p-12 pointer-events-auto">
                <SquishyHeading text="RESPONSIBILITIES" />
                <Reorder.Group axis="y" values={responsibilities} onReorder={setResponsibilities} className="space-y-2">
                  {responsibilities.map((res) => (
                    <Reorder.Item key={res} value={res}>
                      <InteractiveListItem healSignal={healSignal}>{res}</InteractiveListItem>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </motion.div>

              {/* Skills & Tech Pane (Transformable Thor Buttons) */}
              <motion.div variants={itemVariants} className="bg-black p-8 md:p-12 pointer-events-auto">
                <SquishyHeading text="SKILLS & TECH" />
                <ul className="flex flex-wrap gap-4">
                  {data.skills?.map((skill, idx) => (
                    <ThorSkill key={idx} healSignal={healSignal}>{skill}</ThorSkill>
                  ))}
                </ul>
              </motion.div>

            </div>
          </ThorGrid>
        </motion.div>
      </ReactLenis>
    </motion.div>
  );
}