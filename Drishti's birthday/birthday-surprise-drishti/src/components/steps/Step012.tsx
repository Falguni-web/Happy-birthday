import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { LilyCorner } from '../Decorations';

export function StepEntry({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffffff', '#e6e6fa', '#ffb6c1']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffffff', '#e6e6fa', '#ffb6c1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      <LilyCorner position="top-left" />
      <LilyCorner position="bottom-right" />
      
      <motion.h1 
        className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8 text-glow"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
      >
        Happy Birthday Drishti 🎂
      </motion.h1>

      <motion.div 
        className="w-64 h-64 md:w-80 md:h-80 mb-12 relative"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <img src="/generated_images/cake.png" alt="Birthday Cake" className="w-full h-full object-contain drop-shadow-2xl gold-glow" />
      </motion.div>

      <motion.button
        onClick={onNext}
        className="px-8 py-4 rounded-full glass-card text-xl font-medium hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Open Your Gift
      </motion.button>
    </motion.div>
  );
}

export function StepLogin({ onNext }: { onNext: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'friend' && password.toLowerCase() === 'bestfriend') {
      onNext();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LilyCorner position="top-right" />
      <LilyCorner position="bottom-left" />

      <motion.div 
        className="w-full max-w-md p-8 glass-card rounded-2xl relative"
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
          <img src="/generated_images/lily-flower.png" className="w-full h-full object-contain" alt="" />
        </div>

        <h2 className="text-3xl font-serif text-center mb-8 mt-4 text-glow">Unlock Surprise</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 ml-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input"
              placeholder="Hint: who are you?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input"
              placeholder="Hint: what kind of friend?"
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm font-medium">Oops! Try Again 😊</p>}

          <motion.button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enter
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

import { QRCodeSVG } from 'qrcode.react';

export function StepQR({ onNext }: { onNext: () => void }) {
  const url = window.location.href;

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative p-12 glass-card rounded-3xl flex flex-col items-center gap-8">
        <img src="/generated_images/lily-flower.png" className="absolute -top-8 -left-8 w-24 h-24" alt="" />
        <img src="/generated_images/lily-flower.png" className="absolute -bottom-8 -right-8 w-24 h-24 scale-110" alt="" />
        
        <h2 className="text-2xl md:text-3xl font-serif text-glow max-w-xs">Scan this QR Code for the Birthday Surprise 🎁</h2>
        
        <div className="p-4 bg-white rounded-xl shadow-xl">
          <QRCodeSVG value={url} size={200} fgColor="#4a0e4e" />
        </div>

        <motion.button
          onClick={onNext}
          className="mt-4 px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
