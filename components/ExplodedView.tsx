import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useScroll, motion } from 'framer-motion';

const ExplodedView: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optimized image loading with progressive loading
  useEffect(() => {
    const frameCount = 53;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    // Load images in batches for better performance
    const loadBatch = (startIndex: number, batchSize: number) => {
      const endIndex = Math.min(startIndex + batchSize, frameCount);
      
      for (let i = startIndex; i < endIndex; i++) {
        const img = new Image();
        const frameNumber = (i + 1).toString().padStart(3, '0');
        img.src = `/assets/headphne%20frames/ezgif-frame-${frameNumber}.png`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };
        
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };
        
        loadedImages[i] = img;
      }
    };

    // Load first 10 frames immediately, then load rest in batches
    loadBatch(0, 10);
    setTimeout(() => loadBatch(10, 20), 100);
    setTimeout(() => loadBatch(30, 23), 200);
    
    setImages(loadedImages);
  }, []);

  // Optimized render with RAF
  const render = useCallback(() => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const scrollProgress = scrollYProgress.get();
    const frameIndex = Math.min(
      Math.floor(scrollProgress * images.length),
      images.length - 1
    );

    // Only render if frame changed
    if (frameIndex === frameIndexRef.current) return;
    frameIndexRef.current = frameIndex;

    const img = images[frameIndex];
    if (img && img.complete && img.naturalHeight !== 0) {
      // Set canvas size only once
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    }
  }, [scrollYProgress, images, imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return;
    const unsubscribe = scrollYProgress.on('change', render);
    render();
    return () => unsubscribe();
  }, [scrollYProgress, render, imagesLoaded]);

  const specs = useMemo(() => [
    { label: 'Color', value: 'Matte Black' },
    { label: 'Model', value: 'INF-i300-BLK' },
    { label: 'Drivers', value: '50mm Titanium' },
    { label: 'Frequency', value: '20Hz-40kHz' },
    { label: 'Impedance', value: '32Ω' },
    { label: 'Battery', value: '30 Hours' },
    { label: 'Wireless', value: '2.4GHz' },
    { label: 'RGB', value: '16.8M Colors' }
  ], []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full flex items-center px-8 md:px-20 gap-16">
        
        <div className="w-1/2 flex items-center justify-center relative">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl"
          />
          
          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-mono text-sm animate-pulse">Loading...</div>
            </div>
          )}
        </div>

        <div className="w-1/2 text-white space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 border border-white/20 rounded-full mb-6">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Technical Breakdown</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Inferno<br/>i-300
            </h2>
            <p className="text-xl text-gray-400">Premium Gaming Headset</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {specs.map((spec, index) => (
              <div key={index} className="space-y-2">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">{spec.label}</p>
                <p className="text-2xl font-bold">{spec.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-gray-500"
          >
            <div className="w-12 h-[1px] bg-gray-700"></div>
            <p className="text-xs font-mono uppercase tracking-widest">Scroll to explore</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ExplodedView.displayName = 'ExplodedView';

export default ExplodedView;
