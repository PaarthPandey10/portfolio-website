import React from 'react';
import { motion } from 'framer-motion';

const BlurText = ({ 
  text, 
  delay = 50, 
  animateBy = 'words', 
  direction = 'top',
  className = ''
}) => {
  const words = text.split(' ');
  
  const directionMapping = {
    top: { initial: { opacity: 0, y: 20, filter: 'blur(10px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    bottom: { initial: { opacity: 0, y: -20, filter: 'blur(10px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' } },
    left: { initial: { opacity: 0, x: 20, filter: 'blur(10px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)' } },
    right: { initial: { opacity: 0, x: -20, filter: 'blur(10px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)' } },
  };

  const variants = directionMapping[direction] || directionMapping.top;

  return (
    <div className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={variants.initial}
          whileInView={variants.animate}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ 
            duration: 0.6, 
            delay: idx * (delay / 1000),
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default BlurText;
