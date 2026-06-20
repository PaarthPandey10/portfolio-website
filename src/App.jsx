import React, { useState, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import HeroPortal from './components/HeroPortal';
import SummaryTransition from './components/SummaryTransition';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import OpenSource from './components/OpenSource';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import FooterReveal from './components/FooterReveal';
import VoidDashboard from './components/VoidDashboard';
import ContactDashboard from './components/ContactDashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeVoidData, setActiveVoidData] = useState(null);
  const [showContactDashboard, setShowContactDashboard] = useState(false);
  const [voidDirection, setVoidDirection] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);

  const dashPhysics = { 
    type: "spring", 
    damping: 30,
    stiffness: 200,
    mass: 0.8,
    restDelta: 0.0001
  };

  const enterVoid = (data) => {
    setScrollPos(window.scrollY);
    
    const angle = Math.random() * Math.PI * 2;
    const x = `${Math.cos(angle) * 150}vw`;
    const y = `${Math.sin(angle) * 150}vh`;
    
    setVoidDirection({ x, y });
    setActiveVoidData(data);
  };

  const enterContactVoid = () => {
    setScrollPos(window.scrollY);
    
    const angle = Math.random() * Math.PI * 2;
    const x = `${Math.cos(angle) * 150}vw`;
    const y = `${Math.sin(angle) * 150}vh`;
    
    setVoidDirection({ x, y });
    setShowContactDashboard(true);
  };

  const closeContact = () => {
    setShowContactDashboard(false);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  useEffect(() => {
    if (!activeVoidData && !showContactDashboard && !isLoading) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPos);
      });
    }
  }, [activeVoidData, showContactDashboard, isLoading, scrollPos]);

  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      smoothWheel: true,
      syncTouch: false,
      smoothTouch: false 
      }}>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden antialiased relative z-0">
        
        <AnimatePresence mode="wait">
          {isLoading && (
            <Preloader fillComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && !activeVoidData && !showContactDashboard && (
            <motion.main
              key="main-portfolio"
              style={{ willChange: "transform, filter" }}
              initial={{ 
                x: `calc(${voidDirection.x} * -1)`, 
                y: `calc(${voidDirection.y} * -1)`, 
                filter: "blur(20px)", 
                scale: 1.1, 
                opacity: 0 
              }}
              animate={{ 
                x: 0, 
                y: 0, 
                filter: "blur(0px)", 
                scale: 1, 
                opacity: 1 
              }}
              exit={{ 
                x: `calc(${voidDirection.x} * -1)`, 
                y: `calc(${voidDirection.y} * -1)`, 
                filter: "blur(20px)", 
                scale: 0.9, 
                opacity: 0 
              }}
              transition={dashPhysics}
            >
              <HeroPortal />
              <SummaryTransition />
              
              <WorkExperience onEnterVoid={enterVoid} />
              <Education onEnterVoid={enterVoid} />
              <OpenSource onEnterVoid={enterVoid} />
              <Projects onEnterVoid={enterVoid} />
              <Expertise onEnterVoid={enterVoid} />
              
              <FooterReveal onInitiateComms={enterContactVoid} />
            </motion.main>
          )}

          {activeVoidData && (
            <VoidDashboard
              key="void-dashboard"
              data={activeVoidData}
              onClose={() => setActiveVoidData(null)}
              direction={voidDirection}
              dashPhysics={dashPhysics}
            />
          )}

          {showContactDashboard && (
            <ContactDashboard
              key="contact-dashboard"
              onClose={closeContact}
              direction={voidDirection}
              dashPhysics={dashPhysics}
            />
          )}
        </AnimatePresence>

      </div>
    </ReactLenis>
  );
}

export default App;