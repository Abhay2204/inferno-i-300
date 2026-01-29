import React, { useEffect, useRef } from 'react';
import { useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const Soundwave: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Map velocity to amplitude
  const amplitude = useTransform(smoothVelocity, [0, 1000, -1000], [0.2, 1.5, 1.5]);

  // Reduced from 40 to 20 bars for better performance
  const bars = Array.from({ length: 20 });

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 flex items-end justify-center gap-1 z-50 pointer-events-none pb-4 opacity-50 mix-blend-difference">
      {bars.map((_, i) => (
        <Bar key={i} index={i} amplitude={amplitude} total={bars.length} />
      ))}
    </div>
  );
};

interface BarProps {
  index: number;
  amplitude: any;
  total: number;
}

const Bar: React.FC<BarProps> = ({ index, amplitude, total }) => {
    const barRef = useRef<HTMLDivElement>(null);
    
    // Calculate a sine wave shape for the base height so it looks like a waveform
    const offset = Math.abs((index - total / 2) / (total / 2)); // 0 at center, 1 at edges
    const baseHeight = Math.max(10, 60 * (1 - offset));
    const duration = 1 + Math.random();

    useEffect(() => {
      // Subscribe to amplitude changes
      const unsubscribe = amplitude.on('change', (value: number) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleY(${value})`;
        }
      });

      return unsubscribe;
    }, [amplitude]);

    return (
        <div
            ref={barRef}
            className="w-1 bg-black rounded-t-full"
            style={{ 
                height: baseHeight,
                transformOrigin: "bottom",
                animation: `soundwavePulse ${duration}s linear infinite`,
                willChange: 'transform'
            }}
        >
          <style>{`
            @keyframes soundwavePulse {
              0%, 100% { height: ${baseHeight * 0.8}px; }
              50% { height: ${baseHeight * 1.2}px; }
            }
          `}</style>
        </div>
    );
}

export default Soundwave;