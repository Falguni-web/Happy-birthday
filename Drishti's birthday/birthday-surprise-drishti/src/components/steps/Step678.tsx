import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timelineEvents, galleryImages } from '../../lib/data';
import { LilyCorner } from '../Decorations';
import { X } from 'lucide-react';

export function StepTimeline({ onNext }: { onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <motion.div 
      className="relative z-10 min-h-screen p-6 pt-20 pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      <LilyCorner position="top-right" />
      
      <h2 className="text-4xl font-serif text-center mb-16 text-glow">Our Journey</h2>

      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/30 rounded-full" />
        
        {timelineEvents.map((event, i) => (
          <motion.div 
            key={i}
            className={`relative mb-12 flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Center dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(255,182,193,0.8)]" />
            
            {/* Card */}
            <div className={`w-5/12 glass-card p-6 rounded-2xl relative ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <img 
                src="/generated_images/lily-flower.png" 
                className={`absolute w-12 h-12 opacity-50 -top-4 ${i % 2 === 0 ? '-left-4' : '-right-4'}`}
                alt=""
              />
              <div className="text-sm font-bold text-primary mb-1">{event.date}</div>
              <h3 className="text-xl font-serif mb-2">{event.title}</h3>
              <p className="text-sm opacity-80">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <motion.button
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Keep going...
        </motion.button>
      </div>
    </motion.div>
  );
}

export function StepGallery({ onNext }: { onNext: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <motion.div 
      className="relative z-10 min-h-screen p-6 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LilyCorner position="top-left" />
      <LilyCorner position="bottom-right" />

      <h2 className="text-4xl font-serif mb-12 text-glow">Memories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden glass-card p-2"
            onClick={() => setSelectedImage(img.src)}
            whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 2 : -2 }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-xl" />
            <img 
              src="/generated_images/lily-flower.png" 
              className="absolute -bottom-4 -right-4 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
              alt=""
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="mt-12 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Read my letter
      </motion.button>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-primary transition-colors">
            <X size={32} />
          </button>
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage} 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" 
            alt="Enlarged" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </motion.div>
  );
}

export function StepLetter({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const letterText = "Dear Drishti,\n\nFrom the moment we met, I knew our friendship was something special. You bring so much light and joy into my life. Every laugh we share, every late-night conversation, every silly inside joke means the world to me.\n\nOn your birthday, I just wanted to remind you how deeply loved you are. You deserve nothing but the absolute best. Keep shining, keep smiling, and never stop being your amazing self.\n\nWith all my love,\nYour Best Friend";
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (isOpen) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(letterText.slice(0, i));
        i++;
        if (i > letterText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <motion.div 
      className="relative z-10 min-h-screen p-6 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LilyCorner position="top-right" />

      {!isOpen ? (
        <motion.div 
          className="cursor-pointer text-center group"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
        >
          <motion.img 
            src="/generated_images/envelope-closed.png" 
            className="w-64 md:w-96 drop-shadow-2xl gold-glow mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            alt="Closed Envelope"
          />
          <span className="glass-card px-6 py-3 rounded-full text-lg font-serif">Tap to open</span>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative max-w-2xl w-full"
        >
          <img 
            src="/generated_images/envelope-open.png" 
            className="w-full opacity-30 absolute top-0 -z-10 object-cover rounded-3xl"
            alt="Open Envelope"
          />
          <div className="glass-card p-8 md:p-12 rounded-3xl bg-white/80 min-h-[400px]">
            <p className="font-script text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap text-slate-800">
              {displayedText}
            </p>
          </div>
          
          {displayedText.length === letterText.length && (
            <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-colors"
              >
                Almost done...
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
