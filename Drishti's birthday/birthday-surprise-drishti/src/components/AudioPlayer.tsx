import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

class AudioEngine {
  ctx: AudioContext;
  masterGain: GainNode;
  isPlaying: boolean = false;
  oscillators: OscillatorNode[] = [];

  constructor() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);
    this.setupNodes();
  }

  setupNodes() {
    // Create a lush pad sound using a few oscillators
    const freqs = [220, 277.18, 329.63, 440]; // A major chord
    
    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + (i * 0.05); // slow movement
      
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 10;
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = (i % 2 === 0 ? -1 : 1) * 0.5;
      
      const oscGain = this.ctx.createGain();
      oscGain.gain.value = 0.1;
      
      osc.connect(oscGain);
      oscGain.connect(panner);
      panner.connect(this.masterGain);
      
      osc.start();
      lfo.start();
      
      this.oscillators.push(osc, lfo);
    });
  }

  play() {
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.masterGain.gain.setTargetAtTime(0.3, this.ctx.currentTime, 2);
  }

  pause() {
    this.isPlaying = false;
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
  }

  increaseVolume() {
    if (this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(0.6, this.ctx.currentTime, 2);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }
}

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const engineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    engineRef.current = new AudioEngine();
    return () => {
      if (engineRef.current) {
        engineRef.current.pause();
      }
    };
  }, []);

  const toggle = () => {
    if (engineRef.current) {
      const state = engineRef.current.toggle();
      setIsPlaying(state);
    }
  };

  const increaseVolume = () => {
    if (engineRef.current) {
      engineRef.current.increaseVolume();
    }
  };

  return { isPlaying, toggle, increaseVolume };
}

export function MusicPlayer({ isPlaying, toggle }: { isPlaying: boolean, toggle: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full glass-card text-primary shadow-[0_0_15px_rgba(255,192,203,0.5)] hover:shadow-[0_0_25px_rgba(255,192,203,0.8)] transition-shadow"
      aria-label="Toggle background music"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </motion.button>
  );
}
