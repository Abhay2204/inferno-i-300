import React from 'react';
import { motion } from 'framer-motion';
import { AuraColor } from '../types';

interface AuraBackgroundProps {
  color: AuraColor;
}

const AuraBackground: React.FC<AuraBackgroundProps> = React.memo(({ color }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] rounded-full filter blur-[120px] opacity-40 mix-blend-multiply will-change-transform"
        animate={{
          backgroundColor: color,
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 90, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
            transform: 'translate(-50%, -50%)'
        }}
      />
      
      <motion.div
        className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full filter blur-[100px] opacity-30 mix-blend-multiply will-change-transform"
        animate={{
          backgroundColor: color === AuraColor.WHITE ? AuraColor.BLUE : color,
          x: [0, -100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-white/30 backdrop-blur-[80px]" />

      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-[1]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}
      />
    </div>
  );
});

AuraBackground.displayName = 'AuraBackground';

export default AuraBackground;
