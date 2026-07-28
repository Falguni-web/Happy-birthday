import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LilyCorner, Sparkles } from '../Decorations';

const wishes = [
  "You are the best friend anyone could ask for.",
  "Your smile brightens up the darkest days.",
  "I hope every dream of yours comes true.",
  "Thank you for always being by my side.",
  "You deserve all the happiness in the world."
];

export function StepWishes({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < wishes.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onNext();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onNext]);

  return (
    <motion.div 
      className="relative z-10 min-h-screen flex items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LilyCorner position="top-left" />
      <LilyCorner position="bottom-right" />

      <AnimatePresence mode="wait">
        {currentIndex < wishes.length && (
          <motion.h2
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-serif text-glow max-w-3xl leading-relaxed"
          >
            "{wishes[currentIndex]}"
          </motion.h2>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function StepFinale({ increaseVolume }: { increaseVolume: () => void }) {
  useEffect(() => {
    increaseVolume();
    
    // Grand Celebration!
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: (Math.random() * skew) - 0.2
        },
        colors: ['#ffffff', '#ffb6c1', '#ffd700', '#e6e6fa'],
        shapes: ['circle'],
        gravity: Math.random() * 0.4 + 0.6,
        scalar: Math.random() * 0.4 + 0.4,
        drift: Math.random() * 0.4 - 0.2
      });

      requestAnimationFrame(frame);
    };
    frame();
  }, [increaseVolume]);

  return (
    <motion.div 
      className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Sparkles />
      
      <div className="absolute inset-0 pointer-events-none flex justify-between px-10">
        <LilyCorner position="top-left" />
        <LilyCorner position="top-right" />
        <LilyCorner position="bottom-left" />
        <LilyCorner position="bottom-right" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-8"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-primary drop-shadow-[0_0_20px_rgba(255,182,193,1)]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>

      <motion.h1 
        className="text-5xl md:text-7xl font-script text-glow text-primary-foreground drop-shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Thank You For Being My Best Friend ❤️
      </motion.h1>
    </motion.div>
  );
}
