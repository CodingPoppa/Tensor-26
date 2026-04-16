import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Smooth springs for the cursor ring
  const cursorXSpring = useSpring(position.x, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorYSpring = useSpring(position.y, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorXSpring.set(e.clientX);
      cursorYSpring.set(e.clientY);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    // Global listener for interactive elements
    const handleMouseOver = (e) => {
      const isInteractive = 
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') !== null ||
        e.target.closest('button') !== null;
      setHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorXSpring, cursorYSpring]);

  // Hide the default cursor using global CSS
  useEffect(() => {
    document.body.style.cursor = 'none';
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => el.style.cursor = 'none');
    
    return () => {
      document.body.style.cursor = 'auto';
      interactiveElements.forEach(el => el.style.cursor = 'pointer');
    };
  }, []);

  return (
    <>
      {/* Central Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicking ? 0.5 : hovering ? 2 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        style={{
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
        }}
      />
      
      {/* Outer Springy Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          border: '1.5px solid rgba(34, 211, 238, 0.5)',
          backgroundColor: hovering ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
          boxShadow: hovering ? "0 0 20px rgba(34, 211, 238, 0.3)" : "none",
        }}
        animate={{
          scale: clicking ? 0.8 : hovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
