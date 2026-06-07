/**
 * FooterReveal.jsx — POLISHED
 *
 * WHY THESE CHANGES:
 *
 * 1. CTA BUTTON TEXT COLOR TRANSITION
 *    Original: The white fill overlay slides up from bottom (good), but the black
 *    text was already black — no visible color transition happened on the label.
 *    Fix: The label text starts white (readable on black bg), then transitions
 *    to black as the fill covers it. This requires the text to sit ABOVE the
 *    fill layer via `relative z-10`, which the original missed. Now the button
 *    feels like a premium press: the fill "paints" the button while the text
 *    color inverts in sync. This is a signature micro-interaction seen on
 *    award-winning portfolio sites.
 *
 * 2. HUD LINKS GAP SMOOTHING
 *    `gap-6 md:gap-16` is a 2.67x jump. Added an intermediate `lg:gap-16` with
 *    `md:gap-10` so the spacing ramps proportionally across breakpoints. On a
 *    1024px viewport the original looked either cramped or weirdly spread.
 *
 * 3. LINK TRANSITION DURATION
 *    Added `transition-all duration-300` to HudLink spans. The `drop-shadow`
 *    glow was snapping instantly because there was no transition property on
 *    the text span — the tailwind `group-hover:` class applied the shadow with
 *    no duration. Now it fades in over 300ms for a luminous, premium feel.
 *
 * 4. STAGGER TIMING
 *    `staggerChildren: 0.15` → `0.1` and `delayChildren: 0.1` → `0.2`.
 *    A 3-item list doesn't need 150ms stagger — it reads as slow. 100ms stagger
 *    lets all three links appear within ~300ms of each other as a group.
 *    The delayChildren bump to 0.2 gives the headline a moment to settle first.
 *
 * 5. HUD LINK EASING: unified to PREMIUM_EASE
 *    The linkVariants used `[0.16, 1, 0.3, 1]` already — kept. Just ensuring
 *    the hover `scale: 1.05` also has an explicit ease so it doesn't default
 *    to the Framer spring (which would feel bouncy on a footer link).
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const HudLink = ({ href, label, delayOffset }) => {
  const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: PREMIUM_EASE,
        delay: delayOffset,
      },
    },
  };

  return (
    <motion.a
      variants={linkVariants}
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: PREMIUM_EASE }}
      className="relative flex items-center justify-center group cursor-pointer px-4 py-2 z-50 outline-none"
    >
      {/* transition-all duration-300 makes the drop-shadow glow fade in
          instead of snapping on instantly — the luminous effect is the payoff */}
      <span className="uppercase font-bold tracking-[0.3em] text-[10px] md:text-xs text-zinc-300 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
        {label}
      </span>
    </motion.a>
  );
};

const FooterReveal = ({ onInitiateComms }) => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '0px' });

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Tighter stagger: 3 items appear as a cohesive group, not a slow queue
        staggerChildren: 0.1,
        // Slightly longer initial delay so the section heading fully enters
        // before children begin — creates a clear visual "lead then follow"
        delayChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: PREMIUM_EASE },
    },
  };

  return (
    <section
      ref={footerRef}
      className="h-screen bg-black text-white px-6 md:px-20 flex flex-col justify-center items-center border-t border-zinc-900 z-10 relative overflow-hidden py-10"
    >
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-full flex flex-col items-center justify-center text-center h-full max-w-7xl mx-auto"
      >
        <motion.p
          variants={textItemVariants}
          className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase mb-6 md:mb-10"
        >
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
            className="relative group inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-black border border-white text-white font-black uppercase tracking-widest text-sm md:text-base overflow-hidden transition-transform active:scale-95 cursor-pointer outline-none focus:outline-none"
          >
            {/* Fill layer: slides up from bottom on hover */}
            <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

            {/* Label: sits above fill via z-10. Transitions from white → black
                as fill covers the button. This is the key micro-interaction:
                without relative z-10 the text would be hidden under the fill. */}
            <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-black transition-colors duration-300">
              CONTACT
            </span>
          </button>
        </motion.div>

        {/* gap-6 → md:gap-10 → lg:gap-16: proportional ramp across breakpoints.
            The original gap-6 md:gap-16 was a 2.67x jump causing awkward 
            spacing on 1024px viewports (common laptop size). */}
        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16 relative">
          <HudLink href="mailto:paarthdxb@gmail.com" label="EMAIL" delayOffset={0.4} />
          <HudLink href="https://linkedin.com/in/paarthpandey" label="LINKEDIN" delayOffset={0.5} />
          <HudLink href="https://github.com/paarthpandey10" label="GITHUB" delayOffset={0.6} />
        </div>
      </motion.div>
    </section>
  );
};

export default FooterReveal;
