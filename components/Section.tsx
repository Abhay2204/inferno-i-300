import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SectionProps } from '../types';
import MagneticButton from './MagneticButton';
import { ArrowRight, Plus } from 'lucide-react';

const Section: React.FC<SectionProps> = ({ 
  title, 
  subtitle, 
  description, 
  alignment, 
  onInView, 
  auraColor,
  index 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  
  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Elements move at different speeds for depth
  const yText = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const yDesc = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  useEffect(() => {
    if (isInView) {
      onInView(auraColor);
    }
  }, [isInView, auraColor, onInView]);

  // Split title into words for layout
  const words = title.split(" ");

  return (
    <section 
        ref={ref}
        className="relative min-h-screen py-20 w-full flex items-center z-10"
    >
      {alignment === 'split' ? (
        // Split Layout: Title left, Description right, Headset middle
        <div className="w-full max-w-[90%] mx-auto relative h-screen flex items-center justify-between">
          
          {/* Technical Header */}
          <div className="absolute top-24 left-0 flex items-center gap-4 opacity-50 font-mono text-xs tracking-widest">
              <Plus className="w-3 h-3" />
              <span>FIG. 0{index + 1}</span>
              <div className="h-[1px] w-24 bg-black"></div>
              <span className="uppercase text-black font-bold">{subtitle}</span>
          </div>

          {/* Left Side - Title */}
          <motion.div 
              style={{ y: yText }}
              className="relative z-20 w-[35%] text-left items-start flex flex-col"
          >
              {words.map((word, i) => (
                  <h2
                      key={i}
                      className="text-[7vw] leading-[0.8] font-black tracking-tighter uppercase text-black"
                  >
                      {word}
                  </h2>
              ))}
          </motion.div>

          {/* Right Side - Description */}
          <motion.div 
              style={{ y: yDesc }}
              className="w-[35%] backdrop-blur-sm bg-white/50 p-8 border-l border-black/10"
          >
              <p className="font-mono text-xs font-bold mb-4 text-gray-400 uppercase tracking-wider">
                  Specifications // {index + 1}.0
              </p>
              <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                 {description}
              </p>
              <MagneticButton className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase group-hover:tracking-[0.2em] transition-all">
                      Explore Node
                  </span>
              </MagneticButton>
          </motion.div>

          {/* Decorative Grid Marker */}
          <div className="absolute bottom-12 right-12 font-mono text-[10px] opacity-30">
            COORD: {Math.random().toFixed(4)} / {Math.random().toFixed(4)}
          </div>
        </div>
      ) : (
        // Original Layout
        <div className="w-full max-w-[90%] mx-auto relative h-screen flex flex-col justify-center">
        
        {/* Technical Header */}
        <div className="absolute top-24 left-0 flex items-center gap-4 opacity-50 font-mono text-xs tracking-widest">
            <Plus className="w-3 h-3" />
            <span>FIG. 0{index + 1}</span>
            <div className="h-[1px] w-24 bg-black"></div>
            <span className="uppercase text-black font-bold">{subtitle}</span>
        </div>

        {/* Massive Editorial Title */}
        <motion.div 
            style={{ y: yText }}
            className={`relative z-20 mix-blend-difference text-white md:text-black md:mix-blend-normal ${
              alignment === 'center' ? 'text-center items-center' : 
              alignment === 'right' ? 'text-right items-end' : 
              'text-left items-start'
            } flex flex-col`}
        >
            {words.map((word, i) => (
                <h2
                    key={i}
                    className="text-[10vw] leading-[0.8] font-black tracking-tighter uppercase"
                >
                    {word}
                </h2>
            ))}
        </motion.div>

        {/* Content Block - Offset from title */}
        <motion.div 
            style={{ y: yDesc }}
            className={`mt-12 max-w-md ${
              alignment === 'center' ? 'mx-auto' : 
              alignment === 'right' ? 'ml-auto mr-0' : 
              'mr-auto ml-0'
            } backdrop-blur-sm bg-white/50 p-8 border-l border-black/10`}
        >
            <p className="font-mono text-xs font-bold mb-4 text-gray-400 uppercase tracking-wider">
                Specifications // {index + 1}.0
            </p>
            <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
               {description}
            </p>
            <MagneticButton className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold tracking-widest uppercase group-hover:tracking-[0.2em] transition-all">
                    Explore Node
                </span>
            </MagneticButton>
        </motion.div>
      </div>
      )}
      
      {alignment !== 'split' && (
        <div className="absolute bottom-12 right-12 font-mono text-[10px] opacity-30">
          COORD: {Math.random().toFixed(4)} / {Math.random().toFixed(4)}
        </div>
      )}
    </section>
  );
};

export default Section;