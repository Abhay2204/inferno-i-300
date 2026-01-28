import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SpatialExperienceSection: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only animate when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // Stop animation when not visible
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    class Wave {
      phase: number;
      speed: number;
      amplitude: number;
      frequency: number;
      yOffset: number;
      color: string;
      opacity: number;

      constructor(yOffset: number, amplitude: number, frequency: number, speed: number, color: string, opacity: number) {
        this.yOffset = yOffset;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.color = color;
        this.opacity = opacity;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.phase += this.speed;
      }

      draw(ctx: CanvasRenderingContext2D, width: number, centerY: number) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        // Increased step from 3 to 5 for 40% fewer calculations
        for (let x = 0; x <= width; x += 5) {
          const y = centerY + this.yOffset + 
                    Math.sin(x * this.frequency + this.phase) * this.amplitude +
                    Math.sin(x * this.frequency * 2 + this.phase * 0.5) * (this.amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    const centerY = canvas.height / 2;
    // Reduced from 8 to 5 waves for better performance
    const waves: Wave[] = [
      new Wave(-40, 35, 0.004, 0.03, '#667eea', 0.4),
      new Wave(-20, 45, 0.005, 0.035, '#f093fb', 0.6),
      new Wave(0, 50, 0.006, 0.04, '#4facfe', 0.7),
      new Wave(20, 45, 0.005, 0.035, '#43e97b', 0.6),
      new Wave(40, 35, 0.004, 0.03, '#38f9d7', 0.4),
    ];

    let lastFrameTime = 0;
    const targetFPS = 30; // Cap at 30fps for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isVisible) return;

      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        lastFrameTime = currentTime - (deltaTime % frameInterval);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        waves.forEach(wave => {
          wave.update();
          wave.draw(ctx, canvas.width, centerY);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute top-[20%] text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
            Spatial 3D Gaming Experience
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light tracking-wide">
            IMMERSIVE AUDIO TECHNOLOGY
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute bottom-[20%] text-center"
        >
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Experience three-dimensional audio precision with pinpoint accuracy.
            <br />
            Every sound positioned exactly where it belongs.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

SpatialExperienceSection.displayName = 'SpatialExperienceSection';

export default SpatialExperienceSection;
