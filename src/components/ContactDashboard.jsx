import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';

const SquishyHeading = ({ text }) => {
  return (
    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20 leading-[0.85] flex flex-wrap cursor-crosshair">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          whileHover={{ 
            scaleY: [1, 0.4, 1.3, 0.9, 1], 
            scaleX: [1, 1.5, 0.7, 1.1, 1], 
            color: "#22d3ee" 
          }}
          transition={{ type: "spring", bounce: 0.7, duration: 0.6 }}
          className="inline-block origin-bottom text-white transition-colors"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h2>
  );
};

const ContactDashboard = ({ onClose, direction, dashPhysics }) => {
  
  // BUG FIX: Identical global scroll lock to maintain consistency
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const contacts = [
    { id: '01', label: 'LINKEDIN', url: 'https://www.linkedin.com/in/paarth-pandey-13779529b/', text: 'linkedin.com/in/paarth-pandey-13779529b/' },
    { id: '02', label: 'EMAIL', url: 'mailto:paarthdxb@gmail.com', text: 'paarthdxb@gmail.com' },
    { id: '03', label: 'GITHUB', url: 'https://github.com/PaarthPandey10', text: 'github.com/PaarthPandey10' },
    { id: '04', label: 'CREDLY', url: 'https://www.credly.com/users/paarth-pandey.6d3d510b/badges', text: 'credly.com/users/paarth-pandey.6d3d510b/badges' },
    { id: '05', label: 'HACKERONE', url: 'https://hackerone.com/paarthpandey10', text: 'hackerone.com/paarthpandey10' },
    { id: '06', label: 'BUGCROWD', url: 'https://bugcrowd.com/PaarthPandey10', text: 'bugcrowd.com/PaarthPandey10' },
    { id: '07', label: 'HACKTHEBOX', url: 'https://app.hackthebox.eu/profile/1326608', text: 'app.hackthebox.eu/profile/1326608' },
    { id: '08', label: 'TRYHACKME', url: 'https://tryhackme.com/p/PaarthPandey10', text: 'tryhackme.com/p/PaarthPandey10' },
    { id: '09', label: 'CODECHEF', url: 'https://www.codechef.com/users/paarthpandey10', text: 'codechef.com/users/paarthpandey10' },
    { id: '10', label: 'LEETCODE', url: 'https://leetcode.com/u/paarthpandey10/', text: 'leetcode.com/u/paarthpandey10/' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial={{ x: direction.x, y: direction.y, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: direction.x, y: direction.y, opacity: 0 }}
      transition={dashPhysics}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="fixed inset-0 bg-black z-[200]"
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
          REVERT_
        </motion.button>

        <div className="max-w-7xl mx-auto w-full">
          <SquishyHeading text="CONTACT REGISTRY" />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full border-t border-zinc-800"
          >
            {contacts.map((node) => (
              <motion.div key={node.id} variants={itemVariants} className="border-b border-zinc-800 py-10 group">
                <a 
                  href={node.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group cursor-pointer outline-none"
                >
                  <div className="flex items-center gap-8 font-mono text-xs text-zinc-600">
                    <span className="w-8">{node.id}</span>
                    <span className="tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors uppercase">
                      {node.label}
                    </span>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <span className="font-mono text-lg md:text-2xl text-zinc-700 group-hover:text-white transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      {node.text}
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ReactLenis>
    </motion.div>
  );
};

export default ContactDashboard;