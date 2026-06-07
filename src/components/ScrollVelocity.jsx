import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollVelocity = ({ 
  texts = [], 
  velocity = 80, 
  className = '', 
  numCopies = 4, 
  damping = 50, 
  stiffness = 400 
}) => {
  const [xPosition, setXPosition] = useState(0);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let currentVelocity = 0;
    let targetVelocity = velocity;
    const totalWidth = containerRef.current?.scrollWidth || 0;

    const animate = () => {
      // Spring physics for smooth deceleration
      currentVelocity += (targetVelocity - currentVelocity) * (damping / 100);
      setXPosition((prev) => {
        const newPosition = prev - currentVelocity;
        return newPosition % totalWidth;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [velocity, damping]);

  const repeatedTexts = Array(numCopies)
    .fill(null)
    .flatMap(() => texts);

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 border-t border-zinc-900">
      <div ref={containerRef} className="relative whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: xPosition }}
          transition={{ type: 'tween', duration: 0, ease: 'linear' }}
          className={`inline-flex gap-12 ${className}`}
        >
          {repeatedTexts.map((text, idx) => (
            <span key={idx} className="inline-block flex-shrink-0">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollVelocity;
