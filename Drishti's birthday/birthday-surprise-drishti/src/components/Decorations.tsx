import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingLilies() {
  const [petals, setPetals] = useState<Array<{ id: number, x: number, delay: number, duration: number, scale: number }>>([]);

  useEffect(() => {
    // Generate initial petals
    const initialPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      scale: 0.5 + Math.random() * 0.8
    }));
    setPetals(initialPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -50, x: `${petal.x}vw`, opacity: 0, rotate: 0 }}
          animate={{ 
            y: '110vh', 
            x: [`${petal.x}vw`, `${petal.x + 10}vw`, `${petal.x - 5}vw`, `${petal.x + 5}vw`],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear"
          }}
          style={{ position: 'absolute', scale: petal.scale }}
        >
          <img src="/generated_images/lily-petal.png" className="w-8 h-8 object-contain opacity-60" alt="" />
        </motion.div>
      ))}
    </div>
  );
}

export function LilyCorner({ position = 'top-left' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const posClasses = {
    'top-left': 'top-0 left-0 origin-top-left',
    'top-right': 'top-0 right-0 origin-top-right scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 origin-bottom-left scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 origin-bottom-right scale-x-[-1] scale-y-[-1]'
  };

  return (
    <motion.img
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      src="/generated_images/lily-flower.png"
      alt=""
      className={`absolute w-32 md:w-48 lg:w-64 pointer-events-none z-10 ${posClasses[position]} opacity-80`}
    />
  );
}

export function Sparkles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full gold-glow"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
}
