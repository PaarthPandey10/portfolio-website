import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ 
  children, 
  speed = 1.5, 
  enableShadows = false, 
  enableOnHover = true 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleHover = () => {
    if (!enableOnHover) return;
    setIsGlitching(true);
    
    const glitchDuration = 500 / speed;
    setTimeout(() => setIsGlitching(false), glitchDuration);
  };

  const glitchVariants = {
    normal: {
      textShadow: enableShadows ? '0 0 0 rgba(255,0,0,0)' : 'none',
      transform: 'translate(0, 0)',
    },
    glitch: {
      textShadow: enableShadows 
        ? [
            '2px 0 #ff0000, -2px 0 #00ffff',
            '-2px 0 #ff0000, 2px 0 #00ffff',
            '0 0 #ff0000, 0 0 #00ffff',
          ]
        : 'none',
      transform: [
        'translate(0, 0)',
        'translate(-2px, 2px)',
        'translate(2px, -2px)',
        'translate(-2px, -2px)',
        'translate(0, 0)',
      ],
      transition: {
        duration: 0.5 / speed,
        repeat: isGlitching ? 3 : 0,
        repeatType: 'loop',
      },
    },
  };

  return (
    <motion.span
      variants={glitchVariants}
      initial="normal"
      animate={isGlitching ? 'glitch' : 'normal'}
      onMouseEnter={handleHover}
      className="inline-block font-black tracking-tighter uppercase cursor-pointer relative"
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
};

export default GlitchText;
