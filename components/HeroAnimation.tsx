import React from 'react';
import { motion } from 'framer-motion';

const HeroAnimation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed inset-0 z-[100] pointer-events-none bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter uppercase">
          Inferno
        </h1>
        <p className="text-sm md:text-base font-mono text-gray-400 mt-4 tracking-widest">
          i-300
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroAnimation;
