import React, { useEffect, useRef } from 'react';
import { AuraColor } from '../types';

interface AuraBackgroundProps {
  color: AuraColor;
}

const AuraBackground: React.FC<AuraBackgroundProps> = React.memo(({ color }) => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update colors when prop changes
    if (orb1Ref.current) {
      orb1Ref.current.style.backgroundColor = color;
    }
    if (orb2Ref.current) {
      orb2Ref.current.style.backgroundColor = color === AuraColor.WHITE ? AuraColor.BLUE : color;
    }
  }, [color]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      {/* Primary orb - CSS animations for better performance */}
      <div
        ref={orb1Ref}
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] rounded-full opacity-40 mix-blend-multiply"
        style={{
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          backgroundColor: color,
          animation: 'auraFloat 10s linear infinite',
          willChange: 'transform'
        }}
      />
      
      {/* Secondary orb */}
      <div
        ref={orb2Ref}
        className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full opacity-30 mix-blend-multiply"
        style={{
          filter: 'blur(50px)',
          backgroundColor: color === AuraColor.WHITE ? AuraColor.BLUE : color,
          animation: 'auraSlide 15s ease-in-out infinite',
          willChange: 'transform'
        }}
      />

      <div className="absolute inset-0 bg-white/30 backdrop-blur-[40px]" />

      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-[1]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}
      />

      <style>{`
        @keyframes auraFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          33% { transform: translate(-50%, -50%) scale(1.3) rotate(90deg); }
          66% { transform: translate(-50%, -50%) scale(0.9) rotate(180deg); }
        }
        
        @keyframes auraSlide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-100px); }
        }
      `}</style>
    </div>
  );
});

AuraBackground.displayName = 'AuraBackground';

export default AuraBackground;
