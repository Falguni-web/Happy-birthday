import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LilyCorner } from '../Decorations';
import { quizQuestions } from '../../lib/data';

export function StepWelcome({ onNext }: { onNext: () => void }) {
  const text = "Welcome Drishti ❤️";

  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div 
      className="relative z-10 flex items-center justify-center min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LilyCorner position="top-left" />
      <LilyCorner position="bottom-right" />
      
      <motion.img 
        src="/generated_images/butterfly.png"
        className="absolute top-1/4 left-1/4 w-16 h-16 pointer-events-none opacity-80"
        animate={{ 
          y: [0, -20, 0], 
          x: [0, 10, 0],
          rotate: [-10, 10, -10]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img 
        src="/generated_images/butterfly.png"
        className="absolute bottom-1/4 right-1/4 w-12 h-12 pointer-events-none opacity-60 scale-x-[-1]"
        animate={{ 
          y: [0, 20, 0], 
          x: [0, -10, 0],
          rotate: [10, -10, 10]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <h1 className="text-4xl md:text-6xl font-script text-glow text-center flex flex-wrap justify-center gap-x-3">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
}

export function StepCake({ onNext }: { onNext: () => void }) {
  const [cut, setCut] = useState(false);

  const handleCut = () => {
    if (cut) return;
    setCut(true);
    
    // Fireworks effect
    const duration = 3000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb6c1', '#e6e6fa', '#ffd700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb6c1', '#e6e6fa', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onNext();
    }, 4000);
  };

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LilyCorner position="top-right" />
      
      <motion.h2 
        className="text-4xl font-serif text-glow mb-12 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Make a wish and cut the cake!
      </motion.h2>

      <motion.div 
        className="relative cursor-pointer group"
        onClick={handleCut}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={cut ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src="/generated_images/cake.png" className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl" alt="Birthday Cake" />
        </motion.div>
        
        {!cut && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="px-6 py-2 glass-card rounded-full font-medium shadow-lg">Tap to cut</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function StepQuiz({ onNext }: { onNext: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === quizQuestions[currentQ].correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffb6c1', '#e6e6fa']
      });
    }

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setTimeout(onNext, 2000);
    }
  };

  const isDone = currentQ === quizQuestions.length - 1 && score > -1; // always true logic just to detect end

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <LilyCorner position="top-left" />
      <LilyCorner position="bottom-right" />

      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8 px-4">
          <span className="font-serif text-xl font-bold text-primary">Friendship Quiz</span>
          <span className="glass-card px-4 py-1 rounded-full font-medium">Score: {score}/{quizQuestions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-serif mb-8 text-center">{quizQuestions[currentQ].question}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizQuestions[currentQ].options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="p-4 rounded-xl border border-white/40 bg-white/30 hover:bg-white/50 text-left transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {currentQ === quizQuestions.length - 1 && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center"
           >
             <p className="text-glow font-medium mb-4">You did great! Moving to the next surprise...</p>
             <button onClick={onNext} className="px-6 py-2 glass-card rounded-full">Skip delay</button>
           </motion.div>
        )}
      </div>
    </motion.div>
  );
}
