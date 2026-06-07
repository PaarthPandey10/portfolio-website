import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DecryptedText = ({ 
  text, 
  animateOn = 'view', 
  revealDirection = 'start', 
  sequential = true, 
  useOriginalCharsOnly = false, 
  speed = 50, 
  maxIterations = 15 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const animateText = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let currentIteration = 0;
    const animationInterval = setInterval(() => {
      setDisplayText((prevText) => {
        let newText = '';
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const progress = Math.min((currentIteration / maxIterations), 1);
          
          if (i < progress * text.length) {
            newText += char;
          } else if (Math.random() > 0.7) {
            newText += characters[Math.floor(Math.random() * characters.length)];
          } else {
            newText += char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)];
          }
        }
        return newText;
      });

      currentIteration++;

      if (currentIteration > maxIterations) {
        setDisplayText(text);
        clearInterval(animationInterval);
        setIsAnimating(false);
      }
    }, speed);

    return () => clearInterval(animationInterval);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      animateText();
    }
  }, []);

  return (
    <motion.span
      className="inline-block font-black tracking-tighter uppercase"
      onMouseEnter={animateOn === 'hover' ? animateText : undefined}
    >
      {displayText || text}
    </motion.span>
  );
};

export default DecryptedText;
