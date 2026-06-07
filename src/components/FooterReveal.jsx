import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HudLink = ({ href, label, delayOffset }) => {
  const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: delayOffset } }
  };

  return (
    <motion.a
      variants={linkVariants}
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05 }}
      className="relative flex items-center justify-center group cursor-pointer px-4 py-2 z-50 outline-none"
    >
      <span className="uppercase font-bold tracking-[0.3em] text-[10px] md:text-xs text-zinc-300 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
        {label}
      </span>
    </motion.a>
  );
};

const FooterReveal = ({ onInitiateComms }) => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "0px" });

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section ref={footerRef} className="h-screen bg-black text-white px-6 md:px-20 flex flex-col justify-center items-center border-t border-zinc-900 z-10 relative overflow-hidden py-10">
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full flex flex-col items-center justify-center text-center h-full max-w-7xl mx-auto"
      >
        <motion.p variants={textItemVariants} className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6 md:mb-10">
          / CONTACT ME
        </motion.p>

        <motion.h1 
          variants={textItemVariants}
          className="text-[14vw] md:text-[10vw] font-black tracking-tighter uppercase leading-[0.85] text-white mb-8 md:mb-12 flex flex-col items-center"
        >
          <span>LET'S DO SOMETHING</span>
          <span className="mt-2 text-white">EPIC</span>
        </motion.h1>

        <motion.div variants={textItemVariants} className="mb-16 md:mb-20">
          <button 
            onClick={onInitiateComms}
            className="relative group inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black uppercase tracking-widest text-sm md:text-base overflow-hidden transition-transform active:scale-95 cursor-pointer outline-none focus:outline-none"
          >
            <span className="absolute inset-0 bg-zinc-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            <span className="relative flex items-center gap-3">
              CONTACT
            </span>
          </button>
        </motion.div>

        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-6 md:gap-16 relative">
          <HudLink href="mailto:paarthdxb@gmail.com" label="EMAIL" delayOffset={0.4} />
          <HudLink href="https://linkedin.com/in/paarthpandey" label="LINKEDIN" delayOffset={0.8} />
          <HudLink href="https://github.com/paarthpandey10" label="GITHUB" delayOffset={0.6} />
        </div>
      </motion.div>
    </section>
  );
};

export default FooterReveal;