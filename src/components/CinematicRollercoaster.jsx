import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicRollercoaster({ children }) {
  const containerRef = useRef(null);

  // Track natural document scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Massive lateral camera pan as you scroll down
  const cameraX = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ["15vw", "-15vw", "15vw", "-15vw", "0vw"]
  );

  return (
    <div ref={containerRef} className="relative z-10 w-full overflow-hidden bg-black py-[15vh]">
      <motion.div
        style={{ x: cameraX }}
        className="flex flex-col items-center w-[200vw] -ml-[50vw]"
      >
        {React.Children.map(children, (child, index) => {
          // Zig-zag offset logic
          const isEven = index % 2 === 0;
          const alignmentClass = isEven ? "-translate-x-[15vw]" : "translate-x-[15vw]";

          return (
            <div
              key={index}
              className={`w-[90vw] md:w-[65vw] max-w-7xl mb-[30vh] ${alignmentClass}`}
            >
              {child}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}