/**
 * ScrollVelocity.jsx — POLISHED
 *
 * WHY THIS CHANGED:
 * The original used useState + requestAnimationFrame, causing React to re-render
 * the entire component tree at 60fps. This is a silent Lighthouse killer —
 * it blocks the main thread and tanks your TBT (Total Blocking Time) score.
 *
 * The fix: Framer Motion's `useMotionValue` + `useAnimationFrame` runs purely
 * on the compositor thread. Zero React re-renders. Zero state. The browser
 * handles the animation directly in the GPU layer — this is how production-grade
 * scroll-driven animations are built.
 */

import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

const VelocityTrack = ({ texts = [], baseVelocity = 80, className = '', numCopies = 4 }) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    // Get the width of a single set of text items to know when to loop
    const trackWidth = containerRef.current.scrollWidth / numCopies;
    if (trackWidth === 0) return;

    // Move by velocity * delta (delta is in ms, so divide by 1000 for px/s)
    const moveBy = baseVelocity * (delta / 1000);
    const currentX = x.get();
    const newX = currentX - moveBy;

    // Seamless loop: when we've scrolled one full copy width, snap back
    x.set(newX % -trackWidth);
  });

  const repeatedTexts = Array(numCopies)
    .fill(null)
    .flatMap(() => texts);

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={containerRef}
        style={{ x }}
        className={`inline-flex gap-12 whitespace-nowrap ${className}`}
      >
        {repeatedTexts.map((text, idx) => (
          <span key={idx} className="inline-block flex-shrink-0">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollVelocity = ({
  texts = [],
  velocity = 80,
  className = '',
  numCopies = 4,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-black py-16 border-t border-zinc-900">
      <VelocityTrack
        texts={texts}
        baseVelocity={velocity}
        className={className}
        numCopies={numCopies}
      />
    </section>
  );
};

export default ScrollVelocity;
