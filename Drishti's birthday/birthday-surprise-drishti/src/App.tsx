import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useAudio, MusicPlayer } from './components/AudioPlayer';
import { FloatingLilies } from './components/Decorations';

import { StepEntry, StepLogin, StepQR } from './components/steps/Step012';
import { StepWelcome, StepCake, StepQuiz } from './components/steps/Step345';
import { StepTimeline, StepGallery, StepLetter } from './components/steps/Step678';
import { StepWishes, StepFinale } from './components/steps/Step910';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isPlaying, toggle, increaseVolume } = useAudio();

  const nextStep = () => {
    // If user interacts, start audio if not playing (only on entry to login, etc.)
    if (currentStep === 0 && !isPlaying) {
      toggle();
    }
    setCurrentStep(s => Math.min(s + 1, 10));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepEntry key="step0" onNext={nextStep} />;
      case 1: return <StepLogin key="step1" onNext={nextStep} />;
      case 2: return <StepQR key="step2" onNext={nextStep} />;
      case 3: return <StepWelcome key="step3" onNext={nextStep} />;
      case 4: return <StepCake key="step4" onNext={nextStep} />;
      case 5: return <StepQuiz key="step5" onNext={nextStep} />;
      case 6: return <StepTimeline key="step6" onNext={nextStep} />;
      case 7: return <StepGallery key="step7" onNext={nextStep} />;
      case 8: return <StepLetter key="step8" onNext={nextStep} />;
      case 9: return <StepWishes key="step9" onNext={nextStep} />;
      case 10: return <StepFinale key="step10" increaseVolume={increaseVolume} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background overflow-hidden relative selection:bg-primary/30">
      <FloatingLilies />
      <MusicPlayer isPlaying={isPlaying} toggle={toggle} />
      
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}

export default App;
