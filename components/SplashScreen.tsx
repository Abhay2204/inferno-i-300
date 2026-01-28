import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = React.memo(({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(handleComplete, 8000);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/splashscreen.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-12 right-12 text-right"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase">
              Inferno
            </h1>
            <p className="text-sm md:text-base font-mono text-gray-400 mt-2 tracking-widest">
              i-300 GAMING HEADSET
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleComplete}
            className="absolute top-8 right-8 text-white/60 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen;
